import React from 'react'
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/themes/material_blue.css'


export default class DatePicker extends React.Component {
    static defaultProps = {
        enableTime: false,
        noCalendar: false,
        dateFormat: 'Y-m-d',
        onChange: null,
        onChangeFormatted: null,
        className: ''
    }

    constructor(props) {
        super(props)
        this.state = {
            date: new Date()
        };
    }

    getDate = () => {
        return this.state.date
    }

    render() {
        const {date} = this.state;
        return (
            <Flatpickr options={{...this.props}}
                       className={this.props.className}
                       value={date}
                       onChange={(date, dateStr) => {
                           this.setState({date}, () => {
                               if(this.props.onChange !== null) this.props.onChange(date)
                               if(this.props.onChangeFormatted !== null){
                                   this.props.onChangeFormatted(dateStr)
                               }
                           })
                       }}/>
        )
    }
}
