import React, {PureComponent} from 'react';
import {Button, FormFeedback, FormGroup, Input, Label} from 'reactstrap';
import SelectorTable from "../SelectorTable";
import ModalDialog from "../ModalDialog";
import {toTableFields} from "../../helpers/formdecorator";
import InputForm from './InputForm'
import {BuildQueryParam} from "../../helpers/network";
import Axios from "axios";

export default class InputModel extends PureComponent {

    state = {
        isShowMessage: false,
        isError: false,
        message: '',
        showPickModal: false,
        inputValue: '',
        queryParam: {},
    }

    constructor(props) {
        super(props)
        this.annotatedModel = props.model[props.item.accessor]
        this.endpoint = this.annotatedModel.endpoint
        this.tableFields = toTableFields(this.annotatedModel)
    }

    componentWillMount() {
        this.input = React.createRef()
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
        this.input.current.value = ''
        model[item.accessor] = ''
    }

    render() {
        const {item} = this.props
        const extraProps = this.state.isShowMessage ?
            (this.state.isError ? {invalid: true} : {valid: true})
            : {}
        const inputProps = {
            type: 'input',
            readOnly: true,
            value: this.state.inputValue,
            placeholder: item.placeholder !== undefined ? item.placeholder : '',
            onClick: () => {
                this.setState({showPickModal: true})
            },
            innerRef: this.input,
            ...extraProps
        }
        return <React.Fragment>
            <FormGroup className='row'>
                <Label className='col-sm-2'>{item.label}</Label>
                <Input className='col-sm-10' type='input' {...inputProps}/>
                {!this.state.isShowMessage && this.state.message == '' ? null :
                    this.state.isError ? <FormFeedback className='col'>{this.state.message}</FormFeedback>
                        : <FormFeedback className='col' valid>{this.state.message}</FormFeedback>
                }
            </FormGroup>
            <ModalDialog size='lg' title={'Choose: ' + item.label}
                         show={this.state.showPickModal}
                         onHide={() => this.setState({showPickModal: false})}
                         component={
                             <React.Fragment>
                                 <InputForm model={this.annotatedModel}/>
                                 <div className='buttonGroup' style={{marginBottom: '20px'}}>
                                     <Button onClick={() => {
                                         this.setState({queryParam: BuildQueryParam(this.annotatedModel)}, () => {
                                             this.refs.selector.fetchData()
                                         })
                                     }} className='btn-grp' size='sm'>Search</Button>
                                 </div>
                                 <SelectorTable url={this.endpoint}
                                                columns={this.tableFields}
                                                ref='selector'
                                                queryParam={this.state.queryParam}
                                                itemCallback={(modelCb) => {
                                                    Object.keys(modelCb).forEach(key => {
                                                        this.annotatedModel[key] = modelCb[key]
                                                    })
                                                    this.setState({
                                                        showPickModal: false,
                                                        inputValue: modelCb[item.model.display]
                                                    })

                                                }}/>
                             </React.Fragment>
                         }
            />
        </React.Fragment>
    }
}
