import React, {PureComponent} from 'react';
import {FormGroup, FormFeedback, Input, Label} from 'reactstrap';
import DatePicker from "../DatePicker";

export default class InputDatepicker extends PureComponent {

    state = {
        isShowMessage: false,
        isError: false,
        message: ''
    }

    constructor(props) {
        super(props);
        {
            item
        }
        = props
        this.rangeMode = item.mode === 'range'
    }


    showError = (msg = '') => {
        this.setState({message: msg, isError: true, isShowMessage: true})
    }

    showSuccess = (msg = '') => {
        this.setState({message: msg, isError: false, isShowMessage: true})
    }

    clearMsg = () => {
        this.setState({message: '', isError: false, isShowMessage: false})
    }

    clear = () => {
        const {item, model} = this.props
        if (this.rangeMode) {
            model[item.accessor + '__lte'] = ''
            model[item.accessor + '__gte'] = ''
        } else {
            model[item.accessor] = ''
        }
    }

    render() {
        const {item, model} = this.props
        const extraProps = this.state.isShowMessage ?
            (this.state.isError ? {invalid: true} : {valid: true})
            : {}
        if (item.mode === 'range') {
            return <FormGroup className='row'>
                <Label className='col-sm-2'>{item.label}</Label>
                <DatePicker className='col-sm-4' {...extraProps}
                            onChangeFormatted={(e) => {
                                model[item.accessor + '__gte'] = e
                            }}
                            placeholderText='click to select date'
                />
                <Label className='col-sm-2 d-flex justify-content-center'>-</Label>
                <DatePicker className='col-sm-4' {...extraProps}
                            onChangeFormatted={(e) => {
                                model[item.accessor + '__lte'] = e
                            }}
                            placeholderText='click to select date'
                />
                {!this.state.isShowMessage && this.state.message == '' ? null :
                    <div className={this.state.isError ? 'col invalid-feedback' : 'col valid-feedback'}
                         style={{display: 'block'}}>{this.state.message}</div>
                }
            </FormGroup>
        }
        else {
            return <FormGroup className='row'>
                <Label className='col-sm-2'>{item.label}</Label>
                <DatePicker className='col-sm-10' {...extraProps}
                            onChangeFormatted={(e) => {
                                model[item.accessor] = e
                            }}
                            placeholderText='click to select date'
                />
                {!this.state.isShowMessage && this.state.message == '' ? null :
                    <div className={this.state.isError ? 'col invalid-feedback' : 'col valid-feedback'}
                         style={{display: 'block'}}>{this.state.message}</div>
                }
            </FormGroup>
        }
    }
}
