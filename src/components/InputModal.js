import React, {Component} from 'react';
import {Form} from 'react-bootstrap';


class InputForm extends Component {
    static defaultProps = {
        fields: [],
        model: {}
    }

    showAlert(_id, msg, valid) {
        const id = valid ? 'valid-' + _id : 'invalid-' + _id
        const element = document.getElementById(id)
        element.innerHTML = msg
        element.setAttribute('style', 'display:block')
    }

    dismissAlert(id) {
        document.getElementById('valid-' + id).setAttribute('style', 'display:none')
        document.getElementById('invalid-' + id).setAttribute('style', 'display:none')
    }

    render() {
        window.dismissAlert = this.dismissAlert
        window.showAlert = this.showAlert
        return (
            <Form>
                {this.props.fields.map((item, index) => {
                    const fieldType = typeof(item.type) !== 'undefined' ? item.type : 'input'

                    // render select box
                    if (fieldType === 'select') {
                        return <Form.Group className='row' key={index}>
                            <Form.Label className='col-sm-2'>{item.label}</Form.Label>
                            <Form.Control className='col-sm-10' as='select' type={fieldType}
                                          defaultValue={this.props.model[item.accessor]}
                                          onChange={
                                              (e) => {
                                                  this.props.model[item.accessor] = e.target.value
                                              }
                                          }
                            >
                                {item.options.map((option, i) => {
                                    if (typeof(option) === 'object') {
                                        const property = Object.keys(option)[0]
                                        return <option key={i + index} label={property}>{option[property]}</option>
                                    }
                                    return <option key={i + index}>{option}</option>
                                })}
                            </Form.Control>
                        </Form.Group>
                    }

                    // render checkbox
                    else if (fieldType === 'checkbox') {
                        return <React.Fragment key={index}>
                            <Form.Label>{item.label}</Form.Label>
                            <Form.Group className='col'>
                                <div className='row'>{item.options.map((chk, i) => {
                                    return <Form.Check className='col-sm-4' type='checkbox' key={i + index}
                                                       name={item.label}
                                                       defaultValue={chk.value}
                                                       onChange={() => this.props.model[chk.accessor] = chk.value}
                                                       label={chk.label}
                                    />
                                })}</div>
                            </Form.Group>
                        </React.Fragment>
                    }

                    // render radio
                    else if (fieldType === 'radio') {
                        return <React.Fragment key={index}>
                            <Form.Label>{item.label}</Form.Label>
                            <Form.Group className='col'>
                                <div className='row'>{item.options.map((chk, i) => {
                                    return <Form.Check className='col-sm-4' type='radio' key={i + index}
                                                       name={item.label}
                                                       defaultValue={chk.value}
                                                       onChange={() => this.props.model[item.accessor] = chk.value}
                                                       label={chk.label}
                                    />
                                })}</div>
                            </Form.Group>
                        </React.Fragment>
                    }

                    // render regular input
                    return <Form.Group className='row' key={index}>
                        <Form.Label className='col-sm-2'>{item.label}</Form.Label>
                        <Form.Control className='col-sm-10' type={fieldType}
                                      defaultValue={this.props.model[item.accessor]}
                                      onChange={
                                          (e) => {
                                              this.props.model[item.accessor] = e.target.value
                                          }
                                      }
                                      placeholder={typeof(item.placeholder) !== 'undefined' ? item.placeholder : ''}
                        />
                        <div id={'valid-' + item.accessor}
                             className='col valid-feedback'>Validation OK
                        </div>
                        <div id={'invalid-' + item.accessor}
                             className='col invalid-feedback'>Validation Error
                        </div>
                    </Form.Group>
                })}
            </Form>
        );
    }

}

export default InputForm;
