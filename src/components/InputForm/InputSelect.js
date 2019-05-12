import React, {PureComponent} from 'react';
import {FormFeedback, FormGroup, Input, Label} from 'reactstrap';

export default class InputSelect extends PureComponent {

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

    clear = () => {
        const {item, model} = this.props
        model[item.accessor] = ''
    }

    render() {
        const {item, model} = this.props
        const extraProps = this.state.isShowMessage ?
            (this.state.isError ? {invalid: true} : {valid: true})
            : {}
        return <FormGroup className='row'>
            <Label className='col-sm-2'>{item.label}</Label>
            <Input className='col-sm-10' type='select' {...extraProps}
                   defaultValue={model[item.accessor]}
                   onChange={
                       (e) => {
                           model[item.accessor] = e.target.value
                       }
                   }
            >
                {item.options.map((option, i) => {
                    if (typeof(option) === 'object') {
                        const property = Object.keys(option)[0];
                        return <option label={property} key={i}>{option[property]}</option>
                    }
                    return <option key={i}>{option}</option>
                })}
            </Input>
            {!this.state.isShowMessage && this.state.message == '' ? null :
                this.state.isError ? <FormFeedback className='col'>{this.state.message}</FormFeedback>
                    : <FormFeedback className='col' valid>{this.state.message}</FormFeedback>
            }
        </FormGroup>
    }
}
