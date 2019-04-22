import React, {Component} from 'react';
import Axios from 'axios'
import ReactTable from "react-table";
import "react-table/react-table.css";
import {Button} from 'react-bootstrap';
import InputForm from '../../components/InputForm'
import SewaDetail from './SewaDetail'

class Sewa extends Component {
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
            showModal: false,
            model: {
                nama: '',
                penerbit: '',
                tanggal_terbit: '',
            },
            inputFields: [
                {label: 'Peminjam', accessor: 'anggota_id', type: 'select', options: []},
                {label: 'Tanggal Pinjam', accessor: 'tanggal_pinjam', type: 'datepicker'},
                {label: 'Tanggal Kembali', accessor: 'tanggal_kembali', type: 'datepicker'},
            ]
        }
        this.store = this.props.store
        this.store.showModal = false
        this.store.setGlobal({'ds': 'Detail Sewa'})
        if (typeof(this.store.getGlobal('ctr')) === 'undefined') {
            this.store.setGlobal({'ctr': 0})
        }
        if (typeof(this.store.getComputed('dsTitle')) === 'undefined') {
            this.store.setComputed('dsTitle', ()=>{
                return 'Detil Sewa-' + this.store.getGlobal('ctr')
            })
        }
    }

    componentWillMount() {
        Axios.get('http://localhost:8008/api/test_perpus/anggota/')
            .then(response => {
                const inputFields = this.state.inputFields
                inputFields[0].options = response.data.rows.map((anggota) => {
                    const obj = {}
                    obj[anggota.nama] = anggota.id
                    return obj
                })
                this.setState(inputFields)
            })
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
        console.log(JSON.stringify(this.state.model))
    }

    rowActions = (props) => {
        return (
            <button className='btn btn-sm btn-success' onClick={() => {
                const sewa = this.state.data[props.index]
                this.store.showModal = true
                this.store.setGlobal({'ctr': this.store.getGlobal('ctr') + 1})
                this.setState({'sewaId': sewa.id})
            }}>Detail</button>
        );
    }


    render() {
        return (
            <div className='container'>
                <h3 style={{textAlign: 'center'}}>Sewa List</h3>
                <InputForm model={this.state.model} ref='input'
                           fields={this.state.inputFields}
                />
                <Button onClick={this.addEntry} style={{marginBottom: '10px'}}>Add</Button>

                <SewaDetail showModal={this.store.showModal} sewaId={this.state.sewaId}
                            onHide={() => this.store.showModal = false}/>

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

export default Sewa;
