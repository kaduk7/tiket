/* eslint-disable @next/next/no-img-element */
"use client"
import { useState, SyntheticEvent, useEffect } from "react"
import axios from "axios"
import Modal from 'react-bootstrap/Modal';
import Swal from "sweetalert2"
import { MobilTb } from "@prisma/client";
import { useRouter } from "next/navigation"
import { supabase, supabaseBUCKET } from '@/app/helper'

function Update({ mobil, reload }: { mobil: MobilTb, reload: Function }) {
    const [nama, setNama] = useState(mobil.nama)
    const [plat, setPlat] = useState(mobil.plat)
    const [merek, setMerek] = useState(mobil.merek)
    const [jumlahBangku, setJumlahBangku] = useState(String(mobil.jumlahBangku))
    const [file, setFile] = useState<File | null>()
    const [foto, setFoto] = useState(mobil.foto)
    const [show, setShow] = useState(false);
    const router = useRouter()
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

    useEffect(() => {
        if (!file) {
            return
        }
        const objectUrl = URL.createObjectURL(file)
        setFoto(objectUrl)
        return () => URL.revokeObjectURL(objectUrl)
    }, [file])

    const handleClose = () => {
        setShow(false);
        refreshform()
    }

    const handleShow = () => setShow(true);

    const refreshform = () => {
        setNama(mobil.nama)
        setPlat(mobil.plat)
        setMerek(mobil.merek)
        setJumlahBangku(String(mobil.jumlahBangku))
        setFoto(mobil.foto)
    }

    const handleUpdate = async (e: SyntheticEvent) => {
        setIsLoading(true)
        e.preventDefault()
        const newfoto = foto === mobil.foto ? 'no' : 'yes'
        try {
            const formData = new FormData()
            formData.append('nama', nama)
            formData.append('plat', plat)
            formData.append('merek', merek)
            formData.append('jumlahBangku',jumlahBangku)
            formData.append('file', file as File)
            formData.append('newfoto', newfoto)
            const image = formData.get('file') as File;
            const namaunik = Date.now() + '-' + image.name
            formData.append('namaunik', namaunik)

            const xxx = await axios.patch(`/admin/api/mobil/${mobil.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            setTimeout(async function () {
                if (xxx.data.pesan == 'sudah ada plat') {
                    setIsLoading(false)
                    Swal.fire({
                        position: 'top-end',
                        icon: 'warning',
                        title: 'No polisi ini sudah terdaftar',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
                if (xxx.data.pesan == 'berhasil') {
                    if (newfoto === 'yes') {
                        await supabase.storage
                            .from(supabaseBUCKET)
                            .remove([`foto-mobil/${mobil.foto}`]);
                        
                        await supabase.storage
                            .from(supabaseBUCKET)
                            .upload(`foto-mobil/${namaunik}`, image);
                        setFoto(namaunik)
                    }
                    setShow(false);
                    setIsLoading(false)
                    reload()
                    router.refresh()
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Berhasil diubah',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            }, 1500);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div>
            <span onClick={handleShow} className="btn btn-success shadow btn-xs sharp mx-1"><i className="fa fa-edit"></i></span>
            <Modal
                dialogClassName="modal-m"
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <form onSubmit={handleUpdate}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Data Mobil</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <div className="row">
                            <div className="mb-3 col-md-12">
                                <label className="form-label" >Nama</label>
                                <input
                                    required
                                    autoFocus
                                    type="text"
                                    className="form-control"
                                    value={nama} onChange={(e) => setNama(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3 col-md-12">
                                <label className="form-label" >No Polisi</label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    value={plat} onChange={(e) => setPlat(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3 col-md-12">
                                <label className="form-label" >Merek</label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    value={merek} onChange={(e) => setMerek(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3 col-md-12">
                                <label className="form-label" >Jumlah Bangku</label>
                                <input
                                    required
                                    type="number"
                                    className="form-control"
                                    value={jumlahBangku} onChange={(e) => setJumlahBangku(e.target.value)}
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

export default Update