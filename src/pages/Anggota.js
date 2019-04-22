import React, {Component} from 'react';
import Axios from 'axios'
import {Button} from 'react-bootstrap';
import InputForm from '../components/InputForm'
import ServerDataTable from '../components/ServerDataTable'

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
                this.fetchData(null, null)
            })
    }

    render() {
        return (
            <div className='container'>
                <h3 style={{textAlign: 'center'}}>Anggota List</h3>
                <InputForm model={this.state.model} ref='input'
                           fields={this.state.inputFields}
                />
                <Button onClick={this.addEntry} style={{marginBottom: '10px'}}>Add</Button>

                <ServerDataTable url={this.apiUrl}
                                 queryParam={this.state.queryParam}
                                 columns={[
                                     {Header: 'ID', accessor: 'id'},
                                     {Header: 'Nama', accessor: 'nama'},
                                     {Header: 'Alamat', accessor: 'alamat'},
                                     {Header: 'Umur', accessor: 'umur'},
                                 ]}
                />
            </div>
        );
    }
}

export default Anggota;
