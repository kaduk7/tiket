/* eslint-disable @next/next/no-img-element */
"use client"
import { useState, SyntheticEvent, useEffect } from "react"
import axios from "axios"
import Modal from 'react-bootstrap/Modal';
import Swal from "sweetalert2"
import { JadwalTb, MobilTb, SesiTb } from "@prisma/client";
import { useRouter } from "next/navigation"
import { supabase, supabaseBUCKET } from '@/app/helper'

function Update({ jadwal,reload, tanggal, datauser, datamobil, datasesi }: { jadwal:JadwalTb,reload: Function, tanggal: String, datauser: Array<any>, datamobil: Array<any>, datasesi: Array<any> }) {
    const [userId, setUserid] = useState(String(jadwal.userId))
    const [mobilId, setMobilid] = useState(String(jadwal.mobilId))
    const [sesiId, setSesiId] = useState(String(jadwal.sesiId))
    const [ongkos, setOngkos] = useState(String(jadwal.ongkos))
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

    const handleClose = () => {
        setShow(false);
        refreshform()
    }

    const handleShow = () => setShow(true);

    const refreshform = () => {
        setUserid(String(jadwal.userId))
        setMobilid(String(jadwal.mobilId))
        setSesiId(String(jadwal.sesiId))
        setOngkos(String(jadwal.ongkos))
    }

    const handleUpdate = async (e: SyntheticEvent) => {
        setIsLoading(true)
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('userId', userId)
            formData.append('mobilId', mobilId)
            formData.append('sesiId', sesiId)
            formData.append('ongkos', ongkos)

            const xxx = await axios.patch(`/admin/api/jadwal/${jadwal.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            setTimeout(async function () {
                if (xxx.data.pesan == 'berhasil') {
                    setShow(false);
                    setIsLoading(false)
                    reload(tanggal)
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
                dialogClassName="modal-lg"
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <form onSubmit={handleUpdate}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Jadwal</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
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

export default Update