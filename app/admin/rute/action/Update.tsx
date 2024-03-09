/* eslint-disable @next/next/no-img-element */
"use client"
import { useState, SyntheticEvent, useEffect } from "react"
import axios from "axios"
import Modal from 'react-bootstrap/Modal';
import Swal from "sweetalert2"
import { RuteTb } from "@prisma/client";
import { useRouter } from "next/navigation"

function Update({ rute, reload }: { rute: RuteTb, reload: Function }) {
    const [dari, setDari] = useState("")
    const [tujuan, setTujuan] = useState("")
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

    useEffect(() => {
        splitData()
    }, []);

    const splitData = () => {
        const koordinat = rute.nama.split(' - ');
        if (koordinat.length === 2) {
            setDari(koordinat[0]);
            setTujuan(koordinat[1]);
        }
    }

    const refreshform = () => {
        splitData()
    }

    const handleUpdate = async (e: SyntheticEvent) => {
        setIsLoading(true)
        e.preventDefault()
        const nama = `${dari} - ${tujuan}`;
        try {
            const formData = new FormData()
            formData.append('nama', nama)

            const xxx = await axios.patch(`/admin/api/rute/${rute.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            setTimeout(async function () {
                if (xxx.data.pesan == 'berhasil') {
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
                dialogClassName="modal-lg"
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <form onSubmit={handleUpdate}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Data Rute</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label" >Dari</label>
                            <div className="col-sm-4">
                                <input
                                    autoFocus
                                    required
                                    type="text"
                                    className="form-control"
                                    value={dari} onChange={(e) => setDari(e.target.value)}
                                />
                            </div>
                            <label className="col-sm-2 col-form-label" >Tujuan </label>
                            <div className="col-sm-4">
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    value={tujuan} onChange={(e) => setTujuan(e.target.value)}
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