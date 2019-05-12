import React, {PureComponent} from 'react';
import {FormGroup, Input, Label} from 'reactstrap';

export default class InputRadio extends PureComponent {

    state = {
        isShowMessage: false,
        isError: false,
        message: ''
    }

    elements = []

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
        this.elements.forEach(e => {
            if(e.current !== null && typeof(e.current) !== 'undefined') e.current.checked = false
        })
    }

    render() {
        const {item, model} = this.props
        return <React.Fragment>
            <Label>{item.label}</Label>
            <FormGroup>
                {item.options.map((chk, i) => {
                    this.elements.push(React.createRef())
                    return <div className='form-check form-check-inline' key={i}>
                        <Label check>{chk.label}&nbsp;</Label>
                        <Input className='col-sm-4' type='radio'
                               name={chk.label}
                               defaultValue={chk.value}
                               onChange={() => model[item.accessor] = chk.value}
                               label={chk.label}
                               innerRef={this.elements[i]}
                        />
                    </div>
                })}
                {!this.state.isShowMessage && this.state.message == '' ? null :
                    <div className={this.state.isError ? 'invalid-feedback' : 'valid-feedback'}
                         style={{display: 'block'}}>{this.state.message}</div>
                }
            </FormGroup>
        </React.Fragment>
    }
}
