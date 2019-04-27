import React, {Component} from 'react';
import Axios from 'axios'
import ReactTable from "react-table";
import "react-table/react-table.css";
import {Button} from 'react-bootstrap';
import SewaDetail from './SewaDetail'
import {Link} from 'react-router-dom'

export default class Sewa extends Component {
    constructor(props) {
        super(props)
        this.state = {
            apiUrl: 'http://localhost:8008/api/test_perpus/sewa/',
            data: [],
            detail: [],
            sewaId: 0,
            page: 1,
            pages: 1,
            loading: true,
        }
        this.store = this.props.store
        this.store.global.showModal = false
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


    rowActions = (props) => {
        return (
            <button className='btn btn-sm btn-success' onClick={() => {
                const sewa = this.state.data[props.index]
                this.store.global.showModal = true
                this.setState({'sewaId': sewa.id})
            }}>Detail</button>
        );
    }


    render() {
        return (
            <div className='container'>
                <h3 style={{textAlign: 'center'}}>Sewa List</h3>

                <Link to='/sewa/add' className='buttonToolbar'><Button>Add</Button></Link>

                <SewaDetail showModal={this.store.global.showModal} sewaId={this.state.sewaId}
                            onHide={() => this.store.global.showModal = false}/>

                <ReactTable manual data={this.state.data}
                            className='col'
                            loading={this.state.loading}
                            pages={this.state.pages}
                            pageSizeOptions={[1, 2, 3, 5, 10, 20]}
                            defaultPageSize={this.props.settings.itemPerPage}
                            columns={[
                                {Header: 'ID', accessor: 'anggota_id'},
                                {Header: 'Nama', accessor: 'anggota.nama'},
                                {Header: 'Tanggal Pinjam', accessor: 'tanggal_pinjam'},
                                {Header: 'Tanggal Kembali', accessor: 'tanggal_kembali'},
                                {Header: 'Action', Cell: this.rowActions}
                            ]}
                            onFetchData={this.fetchData}
                />
            </div>
        );
    }
}
