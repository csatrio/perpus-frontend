import React, {Component} from 'react';
import InputForm from '../../components/InputForm/InputForm'
import {Button} from 'reactstrap';
import {options, type, mode, toSearchFields} from "../../helpers/formdecorator";

class InputFormModel {

    selectionItem = [{'satu': 1}, 2, 3, 4]
    checkBoxOptions = [
        {label: 'Bla', accessor: 'checkOption1', value: 'chkOpt1'},
        {label: 'Bla2', accessor: 'checkOption2', value: 'chkOpt2'},
        {label: 'Bla3', accessor: 'checkOption3', value: 'chkOpt3'},
        {label: 'Bla4', accessor: 'checkOption4', value: 'chkOpt4'},
        {label: 'Bla5', accessor: 'checkOption5', value: 'chkOpt5'},
    ]
    radioOptions = [
        {label: 'Bla', value: 'chkOpt1'},
        {label: 'Bla2', value: 'chkOpt2'},
        {label: 'Bla3', value: 'chkOpt3'},
        {label: 'Bla4', value: 'chkOpt4'},
        {label: 'Bla5', value: 'chkOpt5'},
        {label: 'Bla6', value: 'chkOpt6'},
        {label: 'Bla7', value: 'chkOpt7'},
        {label: 'Bla8', value: 'chkOpt8'},
    ]

    @type('select')
    @options('selectionItem')
    selection = ''

    @type('input')
    nama = ''

    @type('input')
    umur = ''

    @type('input')
    alamat = ''

    @type('datepicker')
    datePickerNormal = ''

    @type('datepicker')
    @mode('range')
    datePickerRange = ''

    @type('checkbox')
    @options('checkBoxOptions')
    checkOptions = ''

    @type('radio')
    @options('radioOptions')
    radioOption = ''

}

class InputFormSample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            page: 1,
            pages: 1,
            loading: true,
        }
        this.model = new InputFormModel()
        this.inputFields = toSearchFields(this.model)
    }

    render() {
        return (
            <div className='container'>
                <h3 style={{textAlign: 'center'}}>Anggota List</h3>
                <InputForm model={this.model} ref='input'
                           fields={this.inputFields}
                />

                <div className='buttonGroup'>
                    <Button className='btn-grp' onClick={() => {
                        const elements = this.refs.input.elements
                        elements.nama.current.showSuccess('sudah betul');
                        elements.umur.current.showSuccess('sudah betul');
                        elements.alamat.current.showSuccess('sudah betul');
                        elements.datePickerNormal.current.showSuccess('there is an error on your option');
                        elements.datePickerRange.current.showError('there is an error on your option');
                        elements.checkOptions.current.showSuccess('validation OK');
                        elements.radioOption.current.showError('there is an error on your option');
                        elements.selection.current.showSuccess('Selection is okay')
                    }}>Test</Button>

                    <Button className='btn-grp' onClick={() => {
                        Object.keys(this.refs.input.elements).forEach(k => {
                            this.refs.input.elements[k].current.clearMsg()
                            this.refs.input.elements[k].current.clear()
                        })
                        console.log('After clear form: ' + JSON.stringify(this.state.model));
                    }}>ClearError</Button>

                    <Button className='btn-grp' onClick={() => {
                        console.log(this.model)
                    }}>Print Model</Button>
                </div>
            </div>
        );
    }
}

export default InputFormSample;
