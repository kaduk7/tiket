"use client"
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Add from './action/Add';
import Update from './action/Update';
import Delete from './action/Delete';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';


const Jadwal = () => {
  const [datajadwal, setDatajadwal] = useState([])
  const [datauser, setUser] = useState([])
  const [datamobil, setMobil] = useState([])
  const [datasesi, setSesi] = useState([])
  const [tanggal, setTanggal] = useState(null)
  const [tanggalvalue, setTanggalvalue] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    daftarsopir()
    daftarmobil()
    daftarsesi()
  }, [])

  const reload = async (tanggal: any) => {
    try {
      const response = await fetch(`/admin/api/jadwal/${tanggal}`)
      const result = await response.json();
      setDatajadwal(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const daftarsopir = async () => {
    try {
      const response = await fetch(`/admin/api/karyawan/`)
      const result = await response.json();
      const sopirData = result[1];
      setUser(sopirData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const daftarmobil = async () => {
    try {
      const response = await fetch(`/admin/api/mobil/`)
      const result = await response.json();
      setMobil(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const daftarsesi = async () => {
    try {
      const response = await fetch(`/admin/api/sesi/`)
      const result = await response.json();
      setSesi(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleTanggal = async (date: any) => {
    setTanggal(date);
    setTanggalvalue(moment(date).format('YYYY-MM-DD'))
    try {
      const response = await fetch(`/admin/api/jadwal/${String(moment(date).format('YYYY-MM-DD'))}`)
      const result = await response.json();
      setDatajadwal(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleRowsPerPageChange = (newPerPage: number, page: number) => {
    setItemsPerPage(newPerPage);
    setCurrentPage(page);
  };

  const filteredItems = datajadwal;

  const columns = [
    {
      name: 'No',
      cell: (row: any, index: number) => <div>{(currentPage - 1) * itemsPerPage + index + 1}</div>,
      sortable: false,
      width: '80px'
    },
    {
      name: 'Jadwal',
      selector: (row: any) => row.sesiTb.nama,
      sortable: true,
    },
    {
      name: 'Jam',
      selector: (row: any) => row.sesiTb.jam,
      sortable: true,
    },
    {
      name: 'Nama Sopir',
      selector: (row: any) => row.userTb.nama,
      sortable: true,
    },
    {
      name: 'Mobil',
      selector: (row: any) => row.mobilTb.nama,
      sortable: true,
    },
    {
      name: 'Action',
      cell: (row: any) => (
        <div className="d-flex">
          <Update reload={reload} jadwal={row} tanggal={tanggalvalue} datauser={datauser} datamobil={datamobil} datasesi={datasesi}  />
          <Delete reload={reload} jadwalId={row.id} tanggal={tanggalvalue}  />
        </div>
      ),
      width: '150px'
    },

  ];



  return (
    <div>
      <div className="row">
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-header">
              <h1 className="card-title col-md-5">Jadwal Berangkat</h1>
              <div className="card-title col-md-3">
                <div className="row">
                  <div className="mb-3 col-md-12">
                    <h6 className="form-label" >Tanggal</h6>
                    <DatePicker
                      id="dateInput"
                      className='form-control'
                      selected={tanggal}
                      onChange={handleTanggal}
                      dateFormat="dd-MM-yyyy"
                      placeholderText="Pilih tanggal"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body">
              {tanggal === null ?
                <div>Silahkan Pilih tanggal terlebih dahulu</div>
                :
                <>
                  <div className="row mb-3">
                    <div className="col-md-9">
                      <Add reload={reload} tanggal={tanggalvalue} datauser={datauser} datamobil={datamobil} datasesi={datasesi} />
                    </div>
                  </div>
                  <DataTable
                    columns={columns}
                    data={filteredItems}
                    pagination
                    persistTableHead
                    responsive
                    paginationPerPage={itemsPerPage}
                    paginationTotalRows={filteredItems.length}
                    onChangePage={(page) => setCurrentPage(page)}
                    onChangeRowsPerPage={handleRowsPerPageChange}
                    paginationRowsPerPageOptions={[5, 10, 20]}
                    customStyles={{
                      headRow: {
                        style: {
                          backgroundColor: '#53d0b2',
                        },
                      },
                    }}
                  />
                </>
              }
            </div>
          </div>
        </div>
      </div >
    </div >
  )
}

export default Jadwal