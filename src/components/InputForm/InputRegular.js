import React, {PureComponent} from 'react';
import {FormGroup, FormFeedback, Input, Label} from 'reactstrap';

export default class InputRegular extends PureComponent {

    state = {
        isShowMessage: false,
        isError: false,
        message: ''
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

    render() {
        const {fieldType, item, model} = this.props
        const extraProps = this.state.isShowMessage ?
            (this.state.isError ? {invalid: true} : {valid: true})
            : {}
        const inputProps = {
            type: fieldType,
            readOnly: !!item.readonly,
            placeholder: item.placeholder !== undefined ? item.placeholder : '',
            onClick: item.onclick !== undefined ? item.onclick : () => {
            },
            onChange: !!item.readonly ? () => {
                } :
                (e) => {
                    model[item.accessor] = e.target.value
                },
            ...extraProps
        }
        if (item.value !== undefined) {
            inputProps.value = item.value
        } else {
            inputProps.defaultValue = model[item.accessor]
        }
        return <FormGroup className='row'>
            <Label className='col-sm-2'>{item.label}</Label>
            <Input className='col-sm-10' {...inputProps}/>
            <div id={'valid-' + item.accessor}
                 className='col valid-feedback'>Validation OK
            </div>
            <div id={'invalid-' + item.accessor}
                 className='col invalid-feedback'>Validation Error
            </div>
            {!this.state.isShowMessage && this.state.message == '' ? null :
                this.state.isError ? <FormFeedback className='col'>{this.state.message}</FormFeedback>
                    : <FormFeedback className='col' valid>{this.state.message}</FormFeedback>
            }
        </FormGroup>
    }
}
