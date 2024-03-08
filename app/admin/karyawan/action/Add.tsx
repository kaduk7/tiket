"use client"
import { useState, SyntheticEvent, useRef, useEffect } from "react"
import axios from "axios"
import Modal from 'react-bootstrap/Modal';
import Swal from "sweetalert2";
import { useRouter } from "next/navigation"
import { supabase, supabaseBUCKET } from '@/app/helper'

function Add({ reload }: { reload: Function }) {
    const [nama, setNama] = useState("")
    const [jenis, setJenis] = useState("")
    const [hp, setHp] = useState("")
    const [wa, setWa] = useState("")
    const [file, setFile] = useState<File | null>()
    const [show, setShow] = useState(false);
    const router = useRouter()
    const ref = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false)
    if (isLoading) {
        Swal.fire({
            title: "Mohon tunggu!",
            html: "Sedang mengirim data ke server",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        })
    }

    const handleClose = () => {
        setShow(false);
        clearForm();
    }

    const handleShow = () => setShow(true);

    useEffect(() => {
        ref.current?.focus();
    }, [])

    function clearForm() {
        setNama('')
        setJenis('')
        setHp('')
        setWa('')
        setFile(null)
    }

    const handleSubmit = async (e: SyntheticEvent) => {
        setIsLoading(true)
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('nama', nama)
            formData.append('jenis', jenis)
            formData.append('hp', hp)
            formData.append('wa', wa)
            formData.append('file', file as File)
            const image = formData.get('file') as File;
            const namaunik = Date.now() + '-' + image.name
            formData.append('namaunik', namaunik)

            const xxx = await axios.post(`/admin/api/karyawan`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            setTimeout(async function () {
                if (xxx.data.pesan == 'Nohp sudah ada') {
                    setIsLoading(false)
                    Swal.fire({
                        position: 'top-end',
                        icon: 'warning',
                        title: 'No Hp sudah terdaftar',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
                if (xxx.data.pesan == 'Nowa sudah ada') {
                    setIsLoading(false)
                    Swal.fire({
                        position: 'top-end',
                        icon: 'warning',
                        title: 'No WA sudah terdaftar',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
                if (xxx.data.pesan == 'berhasil') {
                    if (file) {
                        await supabase.storage
                            .from(supabaseBUCKET)
                            .upload(`foto-user/${namaunik}`, image);
                    }
                    handleClose();
                    setIsLoading(false)
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Berhasil Simpan',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    clearForm();
                    reload()
                    router.refresh()
                }
            }, 1500);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div>
            <button onClick={handleShow} type="button" className="btn btn-success btn-icon-text">
                Tambah</button>
            <Modal
                dialogClassName="modal-lg"
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Tambah Data Karyawan</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <div className="mb-3 col-md-6">
                                <label className="form-label" >Nama</label>
                                <input
                                    required
                                    autoFocus
                                    type="text"
                                    className="form-control"
                                    value={nama} onChange={(e) => setNama(e.target.value)}
                                />
                            </div>
                            <div className="mb-3 col-md-6">
                                <label className="form-label" >Jenis</label>
                                <select
                                    required
                                    className="form-control"
                                    value={jenis} onChange={(e) => setJenis(e.target.value)}>
                                    <option value={''}>Pilih Jenis</option>
                                    <option value={'Kasir'}>Kasir</option>
                                    <option value={'Sopir'}>Sopir</option>

                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3 col-md-6">
                                <label className="form-label" >No Hp</label>
                                <input
                                    required
                                    type="number"
                                    className="form-control"
                                    value={hp} onChange={(e) => setHp(e.target.value)}
                                />
                            </div>
                            <div className="mb-3 col-md-6">
                                <label className="form-label" >No WA</label>
                                <input
                                    required
                                    type="number"
                                    className="form-control"
                                    value={wa} onChange={(e) => setWa(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3 col-md-12">
                                <label className="form-label" >Foto</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    accept="image/png, image/jpeg"
                                    onChange={(e) => setFile(e.target.files?.[0])}
                                />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" className="btn btn-danger light" onClick={handleClose}>Close</button>
                        <button type="submit" className="btn btn-primary light">Simpan</button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    )
}

export default Add