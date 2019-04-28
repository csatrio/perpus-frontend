import React, {Component} from 'react';
import "react-table/react-table.css";
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import ServerDataTable from '../../components/ServerDataTable'
import ReactTable from "react-table";
import settings from "../../configurations";
import ModalDialog from "../../components/ModalDialog";

export default class Sewa extends Component {
    constructor(props) {
        super(props)
        this.store = this.props.store.sewaStore
        this.apiUrl = 'http://localhost:8008/api/test_perpus/sewa/'
    }


    rowActions = (row) => {
        return (
            <React.Fragment>
                <Link to='sewa/edit' size='sm' onClick={() => {
                    const store = this.store
                    const original = row.original
                    store.anggota = original.anggota
                    store.tanggalPinjam = new Date(Date.parse(original.tanggal_pinjam, 'yyyy-mm-dd'))
                    store.tanggalKembali = new Date(Date.parse(original.tanggal_kembali, 'yyyy-mm-dd'))
                    this.store.fetchDetail(row)
                }}><Button className='btn-grp' size='sm'>Edit</Button></Link>
                <Button className='btn-grp' size='sm' onClick={() => {
                    this.store.fetchDetail(row)
                    this.store.showDetail = true
                }}>Detail
                </Button>
                <Button className='btn-grp' size='sm' onClick={() => {
                    this.store.deleteSewa(row)
                    this.refs.table.deleteRow(row)
                }}>Delete
                </Button>
            </React.Fragment>
        );
    }


    render() {
        return (
            <div className='container'>
                <h3 style={{textAlign: 'center'}}>Sewa List</h3>

                <Link to='/sewa/add' className='buttonToolbar'><Button>Add</Button></Link>

                <ModalDialog show={this.store.showDetail} title='DetailSewa' size='lg'
                             onHide={() => this.store.showDetail = false}
                             component={<ReactTable data={this.store.bukuList}
                                                    className='row'
                                                    defaultPageSize={settings.itemPerPage}
                                                    columns={[
                                                        {Header: 'Judul', accessor: 'judul'},
                                                        {Header: 'Penerbit', accessor: 'penerbit'},
                                                        {Header: 'Tanggal terbit', accessor: 'tanggal_terbit'},
                                                        {Header: 'Jumlah Pinjam', accessor: 'jumlahPinjam'},
                                                    ]}
                             />}
                />

                <ServerDataTable url={this.apiUrl}
                                 columns={[
                                     {Header: 'ID', accessor: 'id'},
                                     {Header: 'Nama', accessor: 'anggota.nama'},
                                     {Header: 'Tanggal Pinjam', accessor: 'tanggal_pinjam'},
                                     {Header: 'Tanggal Kembali', accessor: 'tanggal_kembali'},
                                     {Header: 'Action', Cell: this.rowActions}
                                 ]}
                                 ref='table'
                />
            </div>
        );
    }
}
