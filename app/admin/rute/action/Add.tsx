"use client"
import { useState, SyntheticEvent, useRef, useEffect } from "react"
import axios from "axios"
import Modal from 'react-bootstrap/Modal';
import Swal from "sweetalert2";
import { useRouter } from "next/navigation"

function Add({ reload }: { reload: Function }) {
    const [dari, setDari] = useState("")
    const [tujuan, setTujuan] = useState("")
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
        setDari('')
        setTujuan('')
    }

    const handleSubmit = async (e: SyntheticEvent) => {
        setIsLoading(true)
        e.preventDefault()
        const nama = `${dari} - ${tujuan}`;
        try {
            const formData = new FormData()
            formData.append('nama', nama)

            const xxx = await axios.post(`/admin/api/rute`, formData, {
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
                        <Modal.Title>Tambah Data Rute</Modal.Title>
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

export default Add