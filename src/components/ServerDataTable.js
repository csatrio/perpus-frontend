import React, {Component} from 'react';
import Axios from 'axios'
import ReactTable from "react-table";
import "react-table/react-table.css";
import settings from '../configurations'

class ServerDataTable extends Component {
    static defaultProps = {
        className: 'col',
        queryParam: {},
        columns: [],
        url: ''
    }

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            page: 1,
            pages: 1,
            loading: true,
        }
    }

    fetchData = (state, instance) => {
        this.setState({loading: true})
        const _params = {
            page: state !== null ? Math.min(state.page + 1, this.state.pages) : 1,
            per_page: state !== null ? state.pageSize : settings.itemPerPage
        }
        Object.keys(this.props.queryParam).forEach(key => _params[key] = this.props.queryParam[key])
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
    }

    render() {
        return (
            <ReactTable manual data={this.state.data}
                        className={this.props.className}
                        loading={this.state.loading}
                        pages={this.state.pages}
                        pageSizeOptions={settings.itemPerPageOptions}
                        defaultPageSize={settings.itemPerPage}
                        columns={this.props.columns}
                        onFetchData={this.fetchData}
            />
        );
    }
}

export default ServerDataTable;
