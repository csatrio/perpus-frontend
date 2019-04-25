import React, {Component} from 'react';
import Axios from 'axios'
import {Button} from 'react-bootstrap';
import InputForm from '../components/InputForm'
import ServerDataTable from '../components/ServerDataTable'
import {BuildQueryParam} from '../helpers/network'

class Anggota extends Component {
    constructor(props) {
        super(props)
        this.state = {
            queryParam: {},
            model: {
                nama: '',
                umur: '',
                alamat: '',
            },
            inputFields: [
                {label: 'Nama', accessor: 'nama', placeholder: 'input nama'},
                {label: 'Umur', accessor: 'umur', placeholder: 'umur anda'},
                {label: 'Alamat', accessor: 'alamat', placeholder: 'alamat anda'},
            ]
        }
        this.apiUrl = 'http://localhost:8008/api/test_perpus/anggota/'
    }

    addEntry = () => {
        Axios.post(this.apiUrl, this.state.model)
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
                <h3 style={{textAlign: 'center'}}>Anggota List</h3>
                <InputForm model={this.state.model} ref='input'
                           fields={this.state.inputFields}
                />
                <div className='buttonToolbar'>
                    <Button onClick={this.addEntry} className='btn-grp'>Add</Button>
                    <Button onClick={this.search} className='btn-grp'>Search</Button>
                </div>
                <ServerDataTable url={this.apiUrl}
                                 queryParam={this.state.queryParam}
                                 columns={[
                                     {Header: 'ID', accessor: 'id'},
                                     {Header: 'Nama', accessor: 'nama'},
                                     {Header: 'Alamat', accessor: 'alamat'},
                                     {Header: 'Umur', accessor: 'umur'},
                                 ]}
                                 ref='table'
                />
            </div>
        );
    }
}

export default Anggota;
