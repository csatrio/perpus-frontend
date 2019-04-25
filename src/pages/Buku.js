import React, {Component} from 'react';
import Axios from 'axios'
import "react-table/react-table.css";
import {Button} from 'react-bootstrap';
import InputForm from '../components/InputForm'
import ServerDataTable from "../components/ServerDataTable";
import {BuildQueryParam} from "../helpers/network";

class Buku extends Component {
    constructor(props) {
        super(props)
        this.state = {
            apiUrl: 'http://localhost:8008/api/test_perpus/buku/',
            queryParam: {},
            model: {
                nama: '',
                penerbit: '',
                tanggal_terbit: '',
            },
            inputFields: [
                {label: 'Nama', accessor: 'nama', placeholder: 'nama'},
                {label: 'Penerbit', accessor: 'penerbit', placeholder: 'penerbit'},
                {label: 'Tanggal Terbit', accessor: 'tanggal_terbit', placeholder: 'tanggal terbit'},
            ]
        }
    }

    addEntry = () => {
        Axios.post(this.state.apiUrl, this.state.model)
            .then(response => {
                console.log(JSON.stringify(response.data))
                Object.keys(this.state.model).forEach((key)=>{
                    this.state.model[key] = ''
                })
                this.search()
                this.setState({model: this.state.model})
            })
    }

    search = () => {
        this.setState({queryParam: BuildQueryParam(this.state.model)}, () => {
            this.refs.table.fetchData()
        })
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
                <ServerDataTable url={this.state.apiUrl}
                                 queryParam={this.state.queryParam}
                                 columns={[
                                     {Header: 'ID', accessor: 'id'},
                                     {Header: 'Nama', accessor: 'nama'},
                                     {Header: 'Penerbit', accessor: 'penerbit'},
                                     {Header: 'Tanggal Terbit', accessor: 'tanggal_terbit'},
                                 ]}
                                 ref='table'
                />
            </div>
        );
    }
}

export default Buku;
