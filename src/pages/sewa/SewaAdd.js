import React, {Component} from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import {Button, Modal, Form, Alert} from 'react-bootstrap';
import InputForm from '../../components/InputForm'
import SelectorTable from '../../components/SelectorTable'

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
        this.store = this.props.store.sewaStore
    }

    render() {
        return (
            <div className='container'>
                <h3 style={{textAlign: 'center'}}>Add Sewa</h3>

                <Alert show={this.store.isShowAlert}
                       variant="danger"
                       style={{textAlign: 'center'}}
                       dismissible={true}
                       onClose={this.store.closeAlert}
                >
                    <Alert.Heading>{this.store.alertTitle}</Alert.Heading>
                    <p>{this.store.alertMsg}</p>
                </Alert>

                <InputForm model={this.state.model} ref='input'
                           fields={this.state.inputFields}
                />

                <Form.Group className='row'>
                    <Form.Label className='col-sm-2'>Peminjam</Form.Label>
                    <Form.Control type='input' className='col-sm-6'
                                  style={{marginRight: '10px'}}
                                  readOnly={true}
                                  onClick={() => this.store.showAddAnggota = true}
                                  value={this.store.anggota.nama}/>
                </Form.Group>

                <Form.Group className='row'>
                    <Form.Label className='col-sm-2'>Buku</Form.Label>
                    <Form.Control type='input' className='col-sm-3'
                                  style={{marginRight: '10px'}}
                                  readOnly={true}
                                  onClick={() => this.store.showAddBuku = true}
                                  value={this.store.buku.judul}/>
                    <Form.Label className='col-sm-1'>Jumlah Pinjam</Form.Label>
                    <Form.Control type='input' className='col-sm-1'
                                  style={{marginRight: '10px'}}
                                  value={this.store.buku.jumlahPinjam}
                                  onChange={(e) => this.store.buku.jumlahPinjam = e.target.value}
                    />
                    <Button variant="secondary" onClick={() => this.store.showAddAnggota = true}
                            className='col-sm-1'
                            onClick={() => this.store.addBuku()}
                            style={{marginBottom: '20px'}}>Add</Button>
                </Form.Group>

                <Modal show={this.store.showAddBuku}
                       onHide={() => this.store.hideAddBuku()} size='lg'>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Buku</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <SelectorTable url='http://localhost:8008/api/test_perpus/buku/'
                                       columns={[
                                           {Header: 'ID', accessor: 'id'},
                                           {Header: 'Nama', accessor: 'nama'},
                                           {Header: 'Penerbit', accessor: 'penerbit'},
                                           {Header: 'Tanggal Terbit', accessor: 'tanggal_terbit'},
                                       ]}
                                       itemCallback={(buku) => {
                                           this.store.selectBuku(buku)
                                       }}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary"
                                onClick={() => this.store.hideAddBuku()}>Close</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.store.showAddAnggota}
                       onHide={() => this.store.hideAnggota()} size='lg'>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Anggota</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <SelectorTable url='http://localhost:8008/api/test_perpus/anggota/'
                                       columns={[
                                           {Header: 'ID', accessor: 'id'},
                                           {Header: 'Nama', accessor: 'nama'},
                                           {Header: 'Alamat', accessor: 'penerbit'},
                                           {Header: 'Umur', accessor: 'umur'},
                                       ]}
                                       itemCallback={(anggota) => {
                                           this.store.addAnggota(anggota)
                                       }}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary"
                                onClick={() => this.store.hideAnggota()}>Close</Button>
                    </Modal.Footer>
                </Modal>

                <ReactTable data={this.store.bukuList}
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
