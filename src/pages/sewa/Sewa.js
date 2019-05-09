import React, {Component} from 'react';
import "react-table/react-table.css";
import {Button, Card, CardBody, CardHeader, FormGroup, Input, Label} from 'reactstrap';
import {Link} from 'react-router-dom'
import ServerDataTable from '../../components/ServerDataTable'
import ReactTable from "react-table";
import settings from "../../configurations";
import ModalDialog from "../../components/ModalDialog";
import InputForm from "../../components/InputForm";
import {BuildQueryParam} from "../../helpers/network";
import SelectorTable from "../../components/SelectorTable";

export default class Sewa extends Component {
    constructor(props) {
        super(props);
        this.store = this.props.store.sewaStore;
        this.apiUrl = 'http://localhost:8008/api/test_perpus/sewa/'
        this.state = {
            queryParam: {}
        }
        this.model = {}
        this.inputFields = [
            {
                label: 'Tanggal Pinjam',
                accessor: 'tanggal_pinjam',
                type: 'datepicker',
                mode: 'range'
            },
            {
                label: 'Tanggal Kembali',
                accessor: 'tanggal_kembali',
                type: 'datepicker',
                mode: 'range'
            },
        ]

    }


    rowActions = (row) => {
        return (
            <React.Fragment>
                <Link to='sewa/edit' size='sm' onClick={() => {
                    const store = this.store;
                    const original = row.original;
                    store.anggota = original.anggota;
                    store.tanggalPinjam = original.tanggal_pinjam
                    store.tanggalKembali = original.tanggal_kembali;
                    this.store.fetchDetail(row)
                }}><Button className='btn-grp' size='sm'>Edit</Button></Link>
                <Button className='btn-grp' size='sm' onClick={() => {
                    this.store.fetchDetail(row);
                    this.store.showDetail = true
                }}>Detail
                </Button>
                <Button className='btn-grp' size='sm' onClick={() => {
                    this.store.deleteSewa(row);
                    this.refs.table.deleteRow(row)
                }}>Delete
                </Button>
            </React.Fragment>
        );
    };

    search = () => {
        this.setState({queryParam: BuildQueryParam(this.model)}, () => {
            console.log(this.model)
            this.refs.table.fetchData()
        })
    }


    render() {
        return (
            <React.Fragment>
                <Card>
                    <CardHeader>Search Sewa</CardHeader>
                    <CardBody>
                        <FormGroup className='row'>
                            <Label className='col-sm-2'>Peminjam</Label>
                            <Input type='text' className='col-sm-6'
                                   style={{marginRight: '10px'}}
                                   readOnly={true}
                                   onClick={() => this.store.showAddAnggota = true}
                                   value={this.store.anggota.nama}/>
                        </FormGroup>
                        <InputForm model={this.model} ref='input'
                                   fields={this.inputFields}
                                   title='Search Sewa'
                        />
                        <div className='buttonToolbar'>
                            <Button onClick={this.search} className='btn-grp'>Search</Button>
                            <Button className='btn-grp'>Clear</Button>
                        </div>
                    </CardBody>
                </Card>

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
                                                           this.model.anggota_id = anggota.id
                                                       }}
                             />}
                />

                <ServerDataTable url={this.apiUrl} queryParam={this.state.queryParam}
                                 columns={[
                                     {Header: 'ID', accessor: 'id'},
                                     {Header: 'Nama', accessor: 'anggota.nama'},
                                     {Header: 'Tanggal Pinjam', accessor: 'tanggal_pinjam'},
                                     {Header: 'Tanggal Kembali', accessor: 'tanggal_kembali'},
                                     {Header: 'Action', Cell: this.rowActions}
                                 ]}
                                 title='Sewa List'
                                 ref='table'
                />
            </React.Fragment>
        );
    }
}
