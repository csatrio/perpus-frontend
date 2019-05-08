import React, {PureComponent} from 'react';
import Axios from 'axios'
import ReactTable from "react-table";
import "react-table/react-table.css";
import settings from '../configurations'
import {Card, CardBody, CardHeader} from "reactstrap";

export default class ServerDataTable extends PureComponent {
    static defaultProps = {
        className: 'col',
        queryParam: {},
        columns: [],
        url: '',
        title: undefined
    };

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            page: 1,
            pages: 1,
            loading: true,
        }
    }

    fetchData = (state = null, instance = null) => {
        this.setState({loading: true});
        const _params = {
            page: state !== null ? Math.min(state.page + 1, this.state.pages) : 1,
            per_page: state !== null ? state.pageSize : settings.itemPerPage
        };
        Object.keys(this.props.queryParam).forEach(key => _params[key] = this.props.queryParam[key]);
        Axios.get(this.props.url, {
            params: _params
        })
            .then(response => {
                this.setState({
                    data: response.data.rows,
                    pages: response.data.last_page,
                    loading: false
                })
            })
    };

    getData = () => {
        return this.state.data;
    };

    addRow = (row) => {
        this.state.data.unshift(row);
        this.setState({data: this.state.data.slice()})
    };

    deleteRow = (row) => {
        this.state.data.splice(row.index, 1);
        this.setState({data: this.state.data.slice()})
    };

    refreshRow = () => {
        this.setState({data: this.state.data.slice()})
    };

    render() {
        return this.props.title === undefined ?
            (
                <ReactTable manual data={this.state.data}
                            className={this.props.className}
                            loading={this.state.loading}
                            pages={this.state.pages}
                            pageSizeOptions={settings.itemPerPageOptions}
                            defaultPageSize={settings.itemPerPage}
                            columns={this.props.columns}
                            onFetchData={this.fetchData}
                />
            )
            : (
                <Card>
                    <CardHeader>{this.props.title}</CardHeader>
                    <CardBody>
                        <ReactTable manual data={this.state.data}
                                    className={this.props.className}
                                    loading={this.state.loading}
                                    pages={this.state.pages}
                                    pageSizeOptions={settings.itemPerPageOptions}
                                    defaultPageSize={settings.itemPerPage}
                                    columns={this.props.columns}
                                    onFetchData={this.fetchData}
                        />
                    </CardBody>
                </Card>
            );
    }
}
