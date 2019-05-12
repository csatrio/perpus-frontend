import React, {PureComponent} from 'react';
import {FormGroup, Input, Label} from 'reactstrap';

export default class InputCheckbox extends PureComponent {

    state = {
        isShowMessage: false,
        isError: false,
        message: ''
    }

    elements = {}

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
        item.options.forEach((chk) => {
            model[chk.accessor] = ''
            this.elements[chk.accessor].current.checked = false
        })
    }

    render() {
        const {item, model} = this.props
        return <React.Fragment>
            <Label>{item.label}</Label>
            <FormGroup>
                {item.options.map((chk, i) => {
                    this.elements[chk.accessor] = React.createRef()
                    return <div className='form-check form-check-inline' key={i}>
                        <Label check>{chk.label}&nbsp;</Label>
                        <Input type='checkbox'
                               name={chk.label}
                               defaultValue={chk.value}
                               onChange={() => model[chk.accessor] = chk.value}
                               label={chk.label}
                               innerRef={this.elements[chk.accessor]}
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
