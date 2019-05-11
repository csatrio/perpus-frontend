import React, {PureComponent} from 'react';
import {FormGroup, FormFeedback, Input, Label} from 'reactstrap';

export default class InputCheckbox extends PureComponent {

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
    }

    render() {
        const {item, model} = this.props
        const extraProps = this.state.isShowMessage ?
            (this.state.isError ? {invalid: true} : {valid: true})
            : {}
        return <React.Fragment>
            <Label>{item.label}</Label>
            <FormGroup>
                {item.options.map((chk, i) => {
                    return <div className='form-check form-check-inline' key={i}>
                        <Label check>{chk.label}&nbsp;</Label>
                        <Input type='checkbox'
                               name={chk.label}
                               defaultValue={chk.value}
                               onChange={() => model[chk.accessor] = chk.value}
                               label={chk.label}
                        /></div>
                })}
                {!this.state.isShowMessage && this.state.message == '' ? null :
                    <div className={this.state.isError ? 'invalid-feedback' : 'valid-feedback'}
                         style={{display:'block'}}>{this.state.message}</div>
                }
            </FormGroup>
        </React.Fragment>
    }
}
