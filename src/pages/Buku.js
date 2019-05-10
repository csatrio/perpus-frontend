import React, {Component} from 'react';
import Axios from 'axios'
import {Button, Card, CardHeader, CardBody} from 'reactstrap';
import InputForm from '../components/InputForm/InputForm'
import ServerDataTable from '../components/ServerDataTable'
import ModalDialog from '../components/ModalDialog'
import {formatModelDates, formatDate} from "../helpers/util";
import {BuildQueryParam} from '../helpers/network'

export default class Buku extends Component {
    constructor(props) {
        super(props);
        this.state = {
            queryParam: {},
            showEdit: false,
            model: {
                tanggal_terbit__gte: formatDate(new Date()),
                tanggal_terbit__lte: formatDate(new Date())
            },
            editModel: {row: {}},
            inputFields: [
                {label: 'Judul', accessor: 'nama', placeholder: 'nama'},
                {label: 'Penerbit', accessor: 'penerbit', placeholder: 'penerbit'},
                {
                    label: 'Tanggal Terbit',
                    accessor: 'tanggal_terbit',
                    placeholder: 'tanggal terbit',
                    type: 'datepicker',
                    mode: 'range'
                },
            ]
        };
        this.apiUrl = 'http://localhost:8008/api/test_perpus/buku/'
    }


    addEntry = () => {
        Axios.post(this.apiUrl, formatModelDates(this.state.model))
            .then(response => {
                this.refs.table.addRow(response.data);
                this.refs.input.clearValues()
            })
    };


    saveEdit = () => {
        const editModel = this.state.editModel.row._original;
        this.refs.table.getData()[this.state.editModel.index] = editModel;
        const patchUrl = `${this.apiUrl}${editModel.id}/`;
        Axios.patch(patchUrl, formatModelDates(editModel))
            .then(response => {
                this.refs.table.refreshRow();
                this.setState({showEdit: false})
            })
    };


    search = () => {
        this.setState({queryParam: BuildQueryParam(this.state.model)}, () => {
            console.log(this.state.model)
            this.refs.table.fetchData()
        })
    };


    rowActions = (row) => {
        return (
            <div className='buttonGroup'>
                <Button onClick={() => {
                    this.setState({editModel: row, showEdit: true})
                }} className='btn-grp' size='sm'>Edit</Button>
                <Button onClick={() => {
                    Axios.delete(`${this.apiUrl}${row.original.id}/`).catch(err => console.log(err));
                    this.refs.table.deleteRow(row)
                }} className='btn-grp' size='sm'>Delete</Button>
            </div>
        )
    };


    render() {
        return (
            <React.Fragment>
                <Card>
                    <CardHeader>Search Buku</CardHeader>
                    <CardBody>
                        <InputForm model={this.state.model} ref='input'
                                   fields={this.state.inputFields}
                                   title='Input Buku'
                        />
                        <div className='buttonToolbar'>
                            <Button onClick={this.addEntry} className='btn-grp'>Add</Button>
                            <Button onClick={this.search} className='btn-grp'>Search</Button>
                            <Button onClick={() => this.refs.input.clearValues()} className='btn-grp'>Clear</Button>
                        </div>
                    </CardBody>
                </Card>

                <ModalDialog show={this.state.showEdit} title='Edit Buku' size='lg'
                             closeButton={true}
                             onHide={() => this.setState({showEdit: false})}
                             component={<InputForm model={this.state.editModel.row._original} ref='inputModal'
                                                   fields={this.state.inputFields}
                             />}
                             footer={<Button onClick={this.saveEdit}>Save</Button>}
                />
                <ServerDataTable url={this.apiUrl}
                                 queryParam={this.state.queryParam}
                                 columns={[
                                     {Header: 'Nama', accessor: 'nama'},
                                     {Header: 'Penerbit', accessor: 'penerbit'},
                                     {Header: 'Tanggal Terbit', accessor: 'tanggal_terbit'},
                                     {Header: 'Actions', Cell: this.rowActions}
                                 ]}
                                 title='Buku List'
                                 ref='table'
                />
            </React.Fragment>
        );
    }
}
