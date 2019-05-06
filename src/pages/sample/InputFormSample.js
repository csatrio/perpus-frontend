import React, {Component} from 'react';
import InputForm from '../../components/InputForm'
import {Button} from 'reactstrap';

class InputFormSample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            page: 1,
            pages: 1,
            loading: true,
            model: {
                // nama: '',
                // umur: '',
                // alamat: '',
                // option: 3,
                // checkOption1: '',
                // radioOption1: ''
            },
            inputFields: [
                {label: 'Nama', accessor: 'nama', placeholder: 'input nama'},
                {label: 'Umur', accessor: 'umur'},
                {label: 'Alamat', accessor: 'alamat', placeholder: 'alamat anda'},
                {label: 'Options', accessor: 'option', type: 'select', options: [{'satu': 1}, 2, 3, 4]},
                {
                    label: 'Check Options', type: 'checkbox',
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


    btnClick = () => {
        console.log(JSON.stringify(this.state.model));
        this.refs.input.isShowAlert('nama', 'tidak pas', true)
    };


    render() {
        return (
            <div className='container'>
                <h3 style={{textAlign: 'center'}}>Anggota List</h3>
                <InputForm model={this.state.model} ref='input'
                           fields={this.state.inputFields}
                />
                <Button onClick={this.btnClick}>Test</Button>
            </div>
        );
    }
}

export default InputFormSample;
