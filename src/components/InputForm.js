import React, {PureComponent} from 'react';
import {Card, CardBody, CardHeader, FormGroup, Input, Label} from 'reactstrap';
import DatePicker from '../components/DatePicker'

export default class InputForm extends PureComponent {
    static defaultProps = {
        fields: [],
        model: {},
        title: 'InputForm'
    };

    constructor(props) {
        super(props);
        this.elements = {}
    }

    showAlert(_id, msg, valid) {
        const id = valid ? 'valid-' + _id : 'invalid-' + _id;
        const element = document.getElementById(id);
        element.innerHTML = msg;
        element.setAttribute('style', 'display:block')
    }

    dismissAlert(id) {
        document.getElementById('valid-' + id).setAttribute('style', 'display:none');
        document.getElementById('invalid-' + id).setAttribute('style', 'display:none')
    }

    getElements() {
        return this.elements
    }

    clearValues() {
        Object.keys(this.elements).forEach((key) => {
            this.elements[key].current.value = '';
            this.props.model[key] = ''
        })
    }

    render() {
        return (
            <Card>
                <CardHeader>{this.props.title}</CardHeader>
                <CardBody>
                {this.props.fields.map((item, index) => {
                    this.elements[item.accessor] = React.createRef();
                    const elementReference = this.elements[item.accessor];
                    const fieldType = typeof(item.type) !== 'undefined' ? item.type : 'input';

                    // render select box
                    if (fieldType === 'select') {
                        return <FormGroup className='row' key={index}>
                            <Label className='col-sm-2'>{item.label}</Label>
                            <Input className='col-sm-10' type={fieldType}
                                          defaultValue={this.props.model[item.accessor]}
                                          onChange={
                                              (e) => {
                                                  this.props.model[item.accessor] = e.target.value
                                              }
                                          }
                                          ref={elementReference}
                            >
                                {item.options.map((option, i) => {
                                    if (typeof(option) === 'object') {
                                        const property = Object.keys(option)[0];
                                        return <option key={i + index} label={property}>{option[property]}</option>
                                    }
                                    return <option key={i + index}>{option}</option>
                                })}
                            </Input>
                        </FormGroup>
                    }

                    // render checkbox
                    else if (fieldType === 'checkbox') {
                        return <React.Fragment key={index}>
                            <Label>{item.label}</Label>
                            <FormGroup className='col' ref={elementReference}>
                                <div className='row'>{item.options.map((chk, i) => {
                                    return <Input className='col-sm-4' type='checkbox' key={i + index}
                                                       name={item.label}
                                                       defaultValue={chk.value}
                                                       onChange={() => this.props.model[chk.accessor] = chk.value}
                                                       label={chk.label}
                                    />
                                })}</div>
                            </FormGroup>
                        </React.Fragment>
                    }

                    // render radio
                    else if (fieldType === 'radio') {
                        return <React.Fragment key={index}>
                            <Label>{item.label}</Label>
                            <FormGroup className='col' ref={elementReference}>
                                <div className='row'>{item.options.map((chk, i) => {
                                    return <Input className='col-sm-4' type='radio' key={i + index}
                                                       name={item.label}
                                                       defaultValue={chk.value}
                                                       onChange={() => this.props.model[item.accessor] = chk.value}
                                                       label={chk.label}
                                    />
                                })}</div>
                            </FormGroup>
                        </React.Fragment>
                    }

                    // render datepicker
                    else if (fieldType === 'datepicker') {
                        return <FormGroup className='row' key={index}>
                            <Label className='col-sm-2'>{item.label}</Label>
                            <DatePicker className='col-sm-10'
                                        onChangeFormatted={(e)=>{
                                            this.props.model[item.accessor] = e
                                        }}
                                        ref={elementReference}
                                        placeholderText='click to select date'
                            />
                        </FormGroup>
                    }

                    // render regular input
                    return <FormGroup className='row' key={index}>

                        <Label className='col-sm-2'>{item.label}</Label>
                        <Input className='col-sm-10' type={fieldType}
                                      defaultValue={this.props.model[item.accessor]}
                                      onChange={
                                          (e) => {
                                              this.props.model[item.accessor] = e.target.value
                                          }
                                      }
                                      readOnly={!!item.readonly}
                                      placeholder={typeof(item.placeholder) !== 'undefined' ? item.placeholder : ''}
                                      ref={elementReference}
                        />
                        <div id={'valid-' + item.accessor}
                             className='col valid-feedback'>Validation OK
                        </div>
                        <div id={'invalid-' + item.accessor}
                             className='col invalid-feedback'>Validation Error
                        </div>
                    </FormGroup>
                })}
                </CardBody>
            </Card>
        );
    }

}
