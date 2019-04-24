import React, {Component} from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import {Button, Modal, Form} from 'react-bootstrap';
import InputForm from '../../components/InputForm'
import ServerDataTable from '../../components/ServerDataTable'

export default class SewaAdd extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            model: {
                anggota_id: '',
                tanggal_pinjam: '',
                tanggal_kembali: '',
            },
            inputFields: [
                {label: 'Tanggal Pinjam', accessor: 'tanggal_pinjam', type: 'datepicker'},
                {label: 'Tanggal Kembali', accessor: 'tanggal_kembali', type: 'datepicker'},
            ]
        }
        this.store = this.props.store
    }


    selectBuku = (props) => {
        return (
            <center>
                <button className='btn btn-sm btn-success'
                        onClick={() => {
                            const buku = this.refs.bukuList.getData()[props.index]
                            this.store.sewaStore.selectBuku(buku)
                        }}>Get
                </button>
            </center>
        );
    }

    addAnggota = (props) => {
        return (
            <center>
                <button className='btn btn-sm btn-success'
                        onClick={() => {
                            const anggota = this.refs.anggotaList.getData()[props.index]
                            this.store.sewaStore.addAnggota(anggota)
                        }}>Get
                </button>
            </center>
        );
    }

    render() {
        return (
            <div className='container'>
                <h3 style={{textAlign: 'center'}}>Add Sewa</h3>
                <InputForm model={this.state.model} ref='input'
                           fields={this.state.inputFields}
                />

                <Form.Group className='row'>
                    <Form.Label className='col-sm-2'>Peminjam</Form.Label>
                    <Form.Control type='input' className='col-sm-6'
                                  style={{marginRight: '10px'}}
                                  readOnly={true}
                                  onClick={() => this.store.sewaStore.showAddAnggota = true}
                                  value={this.store.sewaStore.anggota.nama}/>
                </Form.Group>

                <Form.Group className='row'>
                    <Form.Label className='col-sm-2'>Buku</Form.Label>
                    <Form.Control type='input' className='col-sm-3'
                                  style={{marginRight: '10px'}}
                                  readOnly={true}
                                  onClick={() => this.store.sewaStore.showAddBuku = true}
                                  value={this.store.sewaStore.buku.judul}/>
                    <Form.Label className='col-sm-1'>Jumlah Pinjam</Form.Label>
                    <Form.Control type='input' className='col-sm-1'
                                  style={{marginRight: '10px'}}
                                  value={this.store.sewaStore.buku.jumlahPinjam}
                                  onChange={(e) => this.store.sewaStore.buku.jumlahPinjam = e.target.value}
                    />
                    <Button variant="secondary" onClick={() => this.store.sewaStore.showAddAnggota = true}
                            className='col-sm-1'
                            onClick={() => this.store.sewaStore.addBuku()}
                            style={{marginBottom: '20px'}}>Add</Button>
                </Form.Group>

                <Modal show={this.store.sewaStore.showAddBuku}
                       onHide={() => this.store.sewaStore.showAddBuku = false} size='lg'>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Buku</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ServerDataTable url='http://localhost:8008/api/test_perpus/buku/'
                                         columns={[
                                             {Header: 'ID', accessor: 'id'},
                                             {Header: 'Nama', accessor: 'nama'},
                                             {Header: 'Penerbit', accessor: 'penerbit'},
                                             {Header: 'Tanggal Terbit', accessor: 'tanggal_terbit'},
                                             {Header: 'Action', Cell: this.selectBuku},
                                         ]}
                                         ref='bukuList'
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary"
                                onClick={() => this.store.sewaStore.showAddBuku = false}>Close</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.store.sewaStore.showAddAnggota}
                       onHide={() => this.store.sewaStore.showAddAnggota = false} size='lg'>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Anggota</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ServerDataTable url='http://localhost:8008/api/test_perpus/anggota/'
                                         columns={[
                                             {Header: 'ID', accessor: 'id'},
                                             {Header: 'Nama', accessor: 'nama'},
                                             {Header: 'Alamat', accessor: 'penerbit'},
                                             {Header: 'Umur', accessor: 'umur'},
                                             {Header: 'Action', Cell: this.addAnggota},
                                         ]}
                                         ref='anggotaList'
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary"
                                onClick={() => this.store.sewaStore.showAddAnggota = false}>Close</Button>
                    </Modal.Footer>
                </Modal>

                <ReactTable data={this.store.sewaStore.bukuList}
                            className='col'
                            loading={this.state.loading}
                            defaultPageSize={this.props.settings.itemPerPage}
                            columns={[
                                {Header: 'ID', accessor: 'id'},
                                {Header: 'Nama', accessor: 'nama'},
                                {Header: 'Penerbit', accessor: 'penerbit'},
                                {Header: 'Tanggal Terbit', accessor: 'tanggal_terbit'},
                                {Header: 'Jumlah Pinjam', accessor: 'jumlahPinjam'},
                            ]}
                />
            </div>
        );
    }
}
