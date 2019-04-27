import React, {Component} from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import {Button, Modal, Form, Alert} from 'react-bootstrap';
import SelectorTable from '../../components/SelectorTable'
import ModalDialog from '../../components/ModalDialog'
import DatePicker from "react-datepicker/es";

export default class SewaAdd extends Component {
    static defaultProps = {
        title: 'Add Sewa'
    }

    constructor(props) {
        super(props)
        this.store = this.props.store.sewaStore
    }

    render() {
        return (
            <div className='container'>
                <h3 style={{textAlign: 'center'}}>{this.props.title}</h3>

                <Alert show={this.store.isShowAlert}
                       variant="danger"
                       style={{textAlign: 'center'}}
                       dismissible={true}
                       onClose={this.store.closeAlert}
                >
                    <Alert.Heading>{this.store.alertTitle}</Alert.Heading>
                    <p>{this.store.alertMsg}</p>
                </Alert>

                <Form.Group className='row'>
                    <Form.Label className='col-sm-2'>Tanggal Pinjam</Form.Label>
                    <DatePicker className='col-sm-10'
                                dateFormat="yyyy-MM-dd"
                                selected={this.store.tanggalPinjam}
                                isClearable={true}
                                onChange={
                                    (e) => {
                                        this.store.tanggalPinjam = e
                                    }
                                }
                                placeholderText='click to select date'
                    />
                    <Form.Label className='col-sm-2'>Tanggal Kembali</Form.Label>
                    <DatePicker className='col-sm-10'
                                dateFormat="yyyy-MM-dd"
                                selected={this.store.tanggalKembali}
                                isClearable={true}
                                onChange={
                                    (e) => {
                                        this.store.tanggalKembali = e
                                    }
                                }
                                placeholderText='click to select date'
                    />
                </Form.Group>

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

                <ModalDialog size='lg' title='Choose Buku'
                             show={this.store.showAddBuku}
                             onHide={() => this.store.hideAddBuku()}
                             component={<SelectorTable url='http://localhost:8008/api/test_perpus/buku/'
                                                       columns={[
                                                           {Header: 'ID', accessor: 'id'},
                                                           {Header: 'Nama', accessor: 'nama'},
                                                           {Header: 'Penerbit', accessor: 'penerbit'},
                                                           {Header: 'Tanggal Terbit', accessor: 'tanggal_terbit'},
                                                       ]}
                                                       itemCallback={(buku) => {
                                                           this.store.selectBuku(buku)
                                                       }}
                             />}
                />

                <ModalDialog size='lg' title='Choose Anggota'
                             show={this.store.showAddAnggota}
                             onHide={() => this.store.hideAddAnggota()}
                             component={<SelectorTable url='http://localhost:8008/api/test_perpus/anggota/'
                                                       columns={[
                                                           {Header: 'ID', accessor: 'id'},
                                                           {Header: 'Nama', accessor: 'nama'},
                                                           {Header: 'Alamat', accessor: 'penerbit'},
                                                           {Header: 'Umur', accessor: 'umur'},
                                                       ]}
                                                       itemCallback={(anggota) => {
                                                           this.store.addAnggota(anggota)
                                                       }}
                             />}
                />

                <ReactTable data={this.store.bukuList}
                            className='col'
                            loading={false}
                            defaultPageSize={this.props.settings.itemPerPage}
                            columns={[
                                {Header: 'ID', accessor: 'id'},
                                {Header: 'Nama', accessor: 'nama'},
                                {Header: 'Penerbit', accessor: 'penerbit'},
                                {Header: 'Tanggal Terbit', accessor: 'tanggal_terbit'},
                                {Header: 'Jumlah Pinjam', accessor: 'jumlahPinjam'},
                                {
                                    Header: 'Action',
                                    Cell: (row) => <Button onClick={() => this.store.deleteBuku(row)}>Delete</Button>
                                },
                            ]}
                />

                <div className='buttonToolbar'>
                    <Button onClick={() => this.store.saveSewa()}>Save</Button>
                    <Button onClick={() => this.store.reset()}>Reset</Button>
                </div>
            </div>
        );
    }
}
