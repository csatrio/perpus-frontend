import ServerDataTable from "./ServerDataTable";
import React from "react";

export default class SelectorTable extends React.Component {
    static defaultProps = {
        url: '',
        columns: [],
        queryParam: {},
        btnClass: 'btn btn-sm btn-success',
        itemCallback: () => null
    }

    constructor(props) {
        super(props);
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

    addActionColumn = () => {
        const tableCols = this.props.columns.slice()
        tableCols.push({Header: 'Action', Cell: this.addItemAction})
        return tableCols
    }

    render() {
        return <ServerDataTable url={this.props.url}
                                columns={this.addActionColumn()}
                                queryParam={this.props.queryParam}
                                ref='table'
        />
    }

}
