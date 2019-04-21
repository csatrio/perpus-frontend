import React, {Component} from 'react';
import Axios from 'axios'
import ReactTable from "react-table";
import "react-table/react-table.css";
import {Button, Modal} from 'react-bootstrap';
import {observer} from 'mobx-react'

class SewaDetail extends Component {
    static defaultProps = {
        sewaId: 0,
        showModal: false,
        title: 'Sewa Detail',
        onHide: () => {
            alert('onHide not set !')
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            detail: [],
            pages: 1,
            loading: false,
        }
    }

    fetchDetail = (state, instance) => {
        this.setState({loading: true})
        Axios.get('http://localhost:8008/api/test_perpus/ds/', {
            params: {
                sewa_id: this.props.sewaId,
            }
        })
            .then(response => {
                this.setState({
                    detail: response.data,
                    pages: 1,
                    loading: false
                })
            })
    }

    render() {
        return (
            <Modal show={this.props.store.showModal} onHide={this.props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.store.getGlobal('ds')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ReactTable manual data={this.state.detail}
                                className='row'
                                loading={this.state.loading}
                                defaultPageSize={5}
                                columns={[
                                    {Header: 'Peminjam', accessor: 'anggota'},
                                    {Header: 'Buku', accessor: 'buku'},
                                    {Header: 'Penerbit', accessor: 'penerbit'},
                                    {Header: 'Jumlah Pinjam', accessor: 'jumlah'},
                                ]}
                                onFetchData={this.fetchDetail}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.onHide}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.props.onHide}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

}

export default observer(SewaDetail)
