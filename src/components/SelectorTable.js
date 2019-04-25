import ServerDataTable from "./ServerDataTable";
import React from "react";

export default class SelectorTable extends React.Component {
    static defaultProps = {
        url: '',
        columns: [],
        queryParam: {},
        btnClass: 'btn btn-sm btn-success',
        itemCallback: (e) => {}
    }

    constructor(props) {
        super(props);
        this.tableCols = this.props.columns.slice()
        this.tableCols.push({Header: 'Action', Cell: this.addItemAction})
    }

    addItemAction = (props) => {
        return (
            <center>
                <button className={this.props.btnClass}
                        onClick={() => {
                            const item = this.refs.table.getData()[props.index]
                            this.props.itemCallback(item)
                        }}>Get
                </button>
            </center>
        );
    }

    render() {
        return <ServerDataTable url={this.props.url}
                                columns={this.tableCols}
                                queryParam={this.props.queryParam}
                                ref='table'
        />
    }

}
