import React, {Component} from 'react';
import Axios from 'axios'
import ReactTable from "react-table";
import "react-table/react-table.css";
import {Button, Modal} from 'reactstrap';
import {inject, observer} from 'mobx-react'

@inject('store', 'settings') @observer
class SewaDetail extends Component {
    static defaultProps = {
        sewaId: 0,
        showModal: false,
        title: 'Sewa Detail',
        onHide: () => {
            alert('onHide not set !')
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            detail: [],
            pages: 1,
            loading: false,
        }
    }

    fetchDetail = (state, instance) => {
        this.setState({loading: true});
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
    };

    render() {
        return (
            <Modal show={this.props.store.global.showModal} onHide={this.props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Detail Sewa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ReactTable manual data={this.state.detail}
                                className='row'
                                loading={this.state.loading}
                                defaultPageSize={this.props.settings.itemPerPage}
                                columns={[
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
                </Modal.Footer>
            </Modal>
        )
    }

}

export default SewaDetail
