import React, {Component} from 'react';
import Axios from 'axios'
import {Button, Card, CardBody, CardHeader} from 'reactstrap';
import InputForm from '../components/InputForm/InputForm'
import ServerDataTable from '../components/ServerDataTable'
import ModalDialog from '../components/ModalDialog'
import {BuildQueryParam} from '../helpers/network'
import BukuModel from '../model/BukuModel'
import {toInputFields} from "../helpers/formdecorator";

export default class Buku extends Component {
    state = {
        queryParam: {},
        showEdit: false,
        model: new BukuModel(),
        editModel: new BukuModel(),
    };
    apiUrl = 'http://localhost:8008/api/test_perpus/buku/'
    editModelFields = toInputFields(this.state.editModel)


    addEntry = () => {
        Axios.post(this.apiUrl, this.state.model)
            .then(response => {
                this.refs.table.addRow(response.data);
                this.refs.input.clearValues()
            })``
    };


    saveEdit = () => {
        const row = this.refs.table.getData()[this.state.editModel.index]
        this.state.editModel.copyToRow(row)
        const patchUrl = `${this.apiUrl}${this.state.editModel.id}/`;
        Axios.patch(patchUrl, this.state.editModel)
            .then(() => {
                this.refs.table.refreshRow();
                this.setState({showEdit: false})
            })
    };


    search = () => {
        this.setState({queryParam: BuildQueryParam(this.state.model)}, () => {
            this.refs.table.fetchData()
        })
    };


    rowActions = (row) => {
        return (
            <div className='buttonGroup'>
                <Button onClick={() => {
                    this.setState({editModel: this.state.editModel.copyFromRow(row), showEdit: true})
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
                             component={<InputForm model={this.state.editModel} ref='inputModal'
                                                   fields={this.editModelFields}
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
