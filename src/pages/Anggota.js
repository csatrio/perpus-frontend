import React, {Component} from 'react';
import Axios from 'axios'
import ReactTable from "react-table";
import "react-table/react-table.css";
import {Button} from 'react-bootstrap';
import InputForm from '../components/InputForm'

class Anggota extends Component {
    constructor(props) {
        super(props)
        this.state = {
            apiUrl:'http://localhost:8008/api/test_perpus/anggota/',
            data: [],
            page: 1,
            pages: 1,
            loading: true,
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
    }

    fetchData = (state, instance) => {
        this.setState({loading: true})
        Axios.get(this.state.apiUrl, {
            params: {
                page: state !== null ? Math.min(state.page + 1, this.state.pages) : 1,
                per_page: state !== null ? state.pageSize : this.state.pageSize
            }
        })
            .then(response => {
                this.setState({
                    data: response.data.rows,
                    pages: response.data.last_page,
                    loading: false
                })
            })
    }

    addEntry = () => {
        Axios.post(this.state.apiUrl, this.state.model)
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
                <Button onClick={this.addEntry} style={{marginBottom:'10px'}}>Add</Button>

                <ReactTable manual data={this.state.data}
                            className='col'
                            loading={this.state.loading}
                            pages={this.state.pages}
                            pageSizeOptions={[1, 2, 3, 5, 10, 20]}
                            defaultPageSize={this.props.settings.itemPerPage}
                            columns={[
                                {Header: 'ID', accessor: 'id'},
                                {Header: 'Nama', accessor: 'nama'},
                                {Header: 'Alamat', accessor: 'alamat'},
                                {Header: 'Umur', accessor: 'umur'},
                            ]}
                            onFetchData={this.fetchData}
                />
            </div>
        );
    }
}

export default Anggota;
