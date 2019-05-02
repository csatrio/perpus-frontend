import React, {Component} from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import {Alert, Button, Form} from 'react-bootstrap';
import SelectorTable from '../../components/SelectorTable'
import ModalDialog from '../../components/ModalDialog'
import DatePicker from "react-datepicker";
import InputForm from "../../components/InputForm";

export default class SewaAddEdit extends Component {
    static defaultProps = {
        title: 'Add Sewa',
        isEdit: false
    };

    constructor(props) {
        super(props);
        this.store = this.props.store.sewaStore;
        this.store.isEdit = this.props.isEdit
    }

    rowActions = (row) => {
        return (
            <React.Fragment>
                <Button className='btn-grp' size='sm' onClick={() => this.store.deleteBuku(row)}>Delete</Button>
                <Button className='btn-grp' size='sm' onClick={() => {
                    this.store.editBuku = row.original;
                    this.store.showEditBuku = true
                }}>Edit</Button>
            </React.Fragment>
        )
    };

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
                                                           {Header: 'Judul', accessor: 'nama'},
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

                <ModalDialog show={this.store.showEditBuku} title='Edit Buku' size='lg'
                             closeButton={true}
                             onHide={() => this.store.showEditBuku = false}
                             component={<InputForm model={this.store.editBuku} ref='inputModal'
                                                   fields={[{label: 'Judul', accessor: 'judul', placeholder: 'judul'},
                                                       {
                                                           label: 'Jumlah Pinjam',
                                                           accessor: 'jumlahPinjam',
                                                           placeholder: 'jumlah pinjam'
                                                       }]}
                             />}
                             footer={<Button onClick={() => this.store.saveEditBuku()}>Save</Button>}
                />

                <ReactTable data={this.store.bukuList}
                            className='col'
                            loading={false}
                            defaultPageSize={this.props.settings.itemPerPage}
                            columns={[
                                {Header: 'Judul', accessor: 'judul'},
                                {Header: 'Penerbit', accessor: 'penerbit'},
                                {Header: 'Tanggal Terbit', accessor: 'tanggal_terbit'},
                                {Header: 'Jumlah Pinjam', accessor: 'jumlahPinjam'},
                                {
                                    Header: 'Action',
                                    Cell: this.rowActions
                                },
                            ]}
                />

                <div className='buttonToolbar'>
                    <Button onClick={() => {
                        this.store.saveSewa();
                        this.props.history.push('/sewa')
                    }} className='btn-grp'>Save</Button>
                    <Button onClick={() => this.store.reset()} className='btn-grp'>Reset</Button>
                </div>
            </div>
        );
    }
}
