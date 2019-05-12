import React, {Component} from 'react';
import InputForm from '../../components/InputForm/InputForm'
import {Button} from 'reactstrap';

class InputFormSample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            page: 1,
            pages: 1,
            loading: true,
            model: {},
            inputFields: [
                {label: 'Nama', accessor: 'nama', placeholder: 'input nama'},
                {label: 'Umur', accessor: 'umur'},
                {label: 'Alamat', accessor: 'alamat', placeholder: 'alamat anda'},
                {label: 'Options', accessor: 'option', type: 'select', options: [{'satu': 1}, 2, 3, 4]},
                {label: 'DatePickerNormal', accessor: 'datepickernormal', type: 'datepicker'},
                {label: 'DatePickerRange', accessor: 'datepickerrange', type: 'datepicker', mode: 'range'},
                {
                    label: 'Check Options', type: 'checkbox', accessor: 'checkoptions',
                    options: [
                        {label: 'Bla', accessor: 'checkOption1', value: 'chkOpt1'},
                        {label: 'Bla2', accessor: 'checkOption2', value: 'chkOpt2'},
                        {label: 'Bla3', accessor: 'checkOption3', value: 'chkOpt3'},
                        {label: 'Bla4', accessor: 'checkOption4', value: 'chkOpt4'},
                        {label: 'Bla5', accessor: 'checkOption5', value: 'chkOpt5'},
                    ]
                },
                {
                    label: 'Radio Options', type: 'radio', accessor: 'radioOption1',
                    options: [
                        {label: 'Bla', value: 'chkOpt1'},
                        {label: 'Bla2', value: 'chkOpt2'},
                        {label: 'Bla3', value: 'chkOpt3'},
                        {label: 'Bla4', value: 'chkOpt4'},
                        {label: 'Bla5', value: 'chkOpt5'},
                        {label: 'Bla6', value: 'chkOpt6'},
                        {label: 'Bla7', value: 'chkOpt7'},
                        {label: 'Bla8', value: 'chkOpt8'},
                    ]
                },
            ]
        }
    }

    render() {
        return (
            <div className='container'>
                <h3 style={{textAlign: 'center'}}>Anggota List</h3>
                <InputForm model={this.state.model} ref='input'
                           fields={this.state.inputFields}
                />

                <div className='buttonGroup'>
                    <Button className='btn-grp' onClick={() => {
                        const elements = this.refs.input.elements
                        console.log('STATE MODEL: ' + JSON.stringify(this.state.model));
                        elements.nama.current.showSuccess('sudah betul');
                        elements.umur.current.showSuccess('sudah betul');
                        elements.alamat.current.showSuccess('sudah betul');
                        elements.option.current.showError('there is an error on your option');
                        elements.datepickernormal.current.showSuccess('there is an error on your option');
                        elements.datepickerrange.current.showError('there is an error on your option');
                        elements.checkoptions.current.showSuccess('validation OK');
                        elements.radioOption1.current.showError('there is an error on your option');
                    }}>Test</Button>

                    <Button className='btn-grp' onClick={() => {
                        Object.keys(this.refs.input.elements).forEach(k=>{
                            this.refs.input.elements[k].current.clearMsg()
                            this.refs.input.elements[k].current.clear()
                        })
                        console.log('After clear form: ' + JSON.stringify(this.state.model));
                    }}>ClearError</Button>
                </div>
            </div>
        );
    }
}

export default InputFormSample;
