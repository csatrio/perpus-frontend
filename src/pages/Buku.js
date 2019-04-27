import React, {Component} from 'react';
import Axios from 'axios'
import {Button} from 'react-bootstrap';
import InputForm from '../components/InputForm'
import ServerDataTable from '../components/ServerDataTable'
import ModalDialog from '../components/ModalDialog'
import {formatModelDates} from "../helpers/util";
import {BuildQueryParam} from '../helpers/network'

export default class Anggota extends Component {
    constructor(props) {
        super(props)
        this.state = {
            queryParam: {},
            showEdit: false,
            model: {},
            editModel: {row: {}},
            inputFields: [
                {label: 'Nama', accessor: 'nama', placeholder: 'nama'},
                {label: 'Penerbit', accessor: 'penerbit', placeholder: 'penerbit'},
                {label: 'Tanggal Terbit', accessor: 'tanggal_terbit', placeholder: 'tanggal terbit', type:'datepicker'},
            ]
        }
        this.apiUrl = 'http://localhost:8008/api/test_perpus/buku/'
    }

    addEntry = () => {
        this.refs.input.clearValues()
        Axios.post(this.apiUrl, this.state.model)
            .then(response => {
                console.log('Add entry response : ' + JSON.stringify(response.data))
                this.refs.table.addRow(response.data)
                this.refs.input.clearValues()
            })
    }

    saveEdit = () => {
        const editModel = this.state.editModel.row
        this.refs.table.getData()[this.state.editModel.index] = editModel
        console.log(JSON.stringify(editModel))
        const patchUrl = `${this.apiUrl}${editModel.id}/`
        Axios.patch(patchUrl, formatModelDates(editModel))
            .then(response => {
                console.log('save edit response : ' + JSON.stringify(response.data))
                this.refs.table.refreshRow()
                this.setState({showEdit: false})
            })
    }

    search = () => {
        this.setState({queryParam: BuildQueryParam(this.state.model)}, () => {
            this.refs.table.fetchData()
        })
    }

    rowActions = (row) => {
        return (
            <div className='buttonToolbar'>
                <Button onClick={() => {
                    this.setState({editModel: row, showEdit: true})
                }} className='btn-grp'>Edit</Button>
                <Button onClick={() => this.refs.table.deleteRow(row)} className='btn-grp'>Delete</Button>
            </div>
        )
    }

    render() {
        return (
            <div className='container'>
                <h3 style={{textAlign: 'center'}}>Buku List</h3>
                <InputForm model={this.state.model} ref='input'
                           fields={this.state.inputFields}
                />
                <div className='buttonToolbar'>
                    <Button onClick={this.addEntry} className='btn-grp'>Add</Button>
                    <Button onClick={this.search} className='btn-grp'>Search</Button>
                </div>

                <ModalDialog show={this.state.showEdit} title='Edit Buku' size='lg'
                             closeButton={true}
                             onHide={() => this.setState({showEdit: false})}
                             component={<InputForm model={this.state.editModel.row} ref='inputModal'
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
                                     {Header: 'Acions', Cell: this.rowActions}
                                 ]}
                                 ref='table'
                />
            </div>
        );
    }
}
