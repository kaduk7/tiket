"use client"
import { useState, SyntheticEvent, useRef, useEffect } from "react"
import axios from "axios"
import Modal from 'react-bootstrap/Modal';
import Swal from "sweetalert2";
import { useRouter } from "next/navigation"
import { supabase, supabaseBUCKET } from '@/app/helper'

function Add({ reload, tanggal, datauser, datamobil, datasesi, datarute }: { reload: Function, tanggal: String, datauser: Array<any>, datamobil: Array<any>, datasesi: Array<any>, datarute: Array<any> }) {
    const [userId, setUserid] = useState("")
    const [mobilId, setMobilid] = useState("")
    const [sesiId, setSesiId] = useState("")
    const [ruteId, setRuteId] = useState("")
    const [ongkos, setOngkos] = useState("")
    const tanggalBerangkat = tanggal
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
        setUserid('')
        setMobilid('')
        setSesiId('')
        setRuteId('')
        setOngkos('')
    }

    const handleSubmit = async (e: SyntheticEvent) => {
        setIsLoading(true)
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('userId', userId)
            formData.append('mobilId', mobilId)
            formData.append('sesiId', sesiId)
            formData.append('ruteId', ruteId)
            formData.append('ongkos', ongkos)
            formData.append('tanggalBerangkat', String(tanggalBerangkat))

            const xxx = await axios.post(`/admin/api/jadwal`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            setTimeout(async function () {
                if (xxx.data.pesan == 'berhasil') {
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
                    reload(tanggal)
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
                        <Modal.Title>Tambah Jadwal</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <div className="mb-3 col-md-6">
                                <label className="form-label" >Rute</label>
                                <select
                                    required
                                    autoFocus
                                    className="form-control"
                                    value={ruteId} onChange={(e) => setRuteId(e.target.value)}>
                                    <option value={''}> Pilih Rute</option>
                                    {datarute?.map((item: any, i) => (
                                        <option key={i} value={item.id} >{item.nama}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3 col-md-6">
                                <label className="form-label" >Pilih Sesi</label>
                                <select
                                    required
                                    className="form-control"
                                    value={sesiId} onChange={(e) => setSesiId(e.target.value)}>
                                    <option value={''}> Pilih Sesi</option>
                                    {datasesi?.map((item: any, i) => (
                                        <option key={i} value={item.id} >{item.nama}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3 col-md-6">
                                <label className="form-label" >Nama Sopir</label>
                                <select
                                    required
                                    autoFocus
                                    className="form-control"
                                    value={userId} onChange={(e) => setUserid(e.target.value)}>
                                    <option value={''}> Pilih Sopir</option>
                                    {datauser?.map((item: any, i) => (
                                        <option key={i} value={item.id} >{item.nama}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3 col-md-6">
                                <label className="form-label" >Pilih Mobil</label>
                                <select
                                    required
                                    className="form-control"
                                    value={mobilId} onChange={(e) => setMobilid(e.target.value)}>
                                    <option value={''}> Pilih Mobil</option>
                                    {datamobil?.map((item: any, i) => (
                                        <option key={i} value={item.id} >{item.plat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3 col-md-6">
                                <label className="form-label" >Ongkos</label>
                                <input
                                    required
                                    type="number"
                                    className="form-control"
                                    value={ongkos} onChange={(e) => setOngkos(e.target.value)}>
                                </input>
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