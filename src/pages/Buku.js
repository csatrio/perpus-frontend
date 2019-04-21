import React, {Component} from 'react';
import Axios from 'axios'
import ReactTable from "react-table";
import "react-table/react-table.css";
import {Button} from 'react-bootstrap';
import InputForm from '../components/InputForm'

class Buku extends Component {
    constructor(props) {
        super(props)
        this.state = {
            apiUrl: 'http://localhost:8008/api/test_perpus/buku/',
            data: [],
            page: 1,
            pages: 1,
            loading: true,
            model: {
                nama: '',
                penerbit: '',
                tanggal_terbit: '',
            },
            inputFields: [
                {label: 'Nama', accessor: 'nama', placeholder: 'nama'},
                {label: 'Penerbit', accessor: 'penerbit', placeholder: 'penerbit'},
                {label: 'Tanggal Terbit', accessor: 'tanggal_terbit', placeholder: 'tanggal terbit'},
                {label: 'Pilihan', accessor: 'x', type:'select', options:[1,2,3,4,5]},
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
                <h3 style={{textAlign: 'center'}}>Buku List</h3>
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
                                {Header: 'Penerbit', accessor: 'penerbit'},
                                {Header: 'Tanggal Terbit', accessor: 'tanggal_terbit'},
                            ]}
                            onFetchData={this.fetchData}
                />
            </div>
        );
    }
}

export default Buku;
