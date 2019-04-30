import React, {Component} from 'react'
import InputForm from '../components/InputForm'
import {Button} from 'react-bootstrap'
import Axios from 'axios'

export default class Login extends Component {

    static defaultProps = {
        title: 'Login'
    }

    constructor(props) {
        super(props)
        this.state = {
            model: {username: '', password: ''},
            inputFields: [
                {label: 'Username', accessor: 'username', placeholder: 'username'},
                {label: 'Password', accessor: 'password', placeholder: 'password', type:'password'}
            ]
        }
        this.store = this.props.store.global
    }

    doLogin = () => {
        Axios.post('http://localhost:8008/api/token/', this.state.model)
            .then(response => {
                window.localStorage.setItem('token', response.data.access)
            })
        this.props.history.push('/')
    }

    render() {
        return (
            <div className='container'>
                <div className='container-fluid'>
                    <h3 style={{textAlign: 'center'}}>{this.props.title}</h3>
                    <InputForm model={this.state.model} ref='input'
                               fields={this.state.inputFields}
                    />

                </div>
                <div className='buttonToolbar'>
                    <Button className='btn-grp' onClick={this.doLogin}>Submit</Button>
                </div>
            </div>
        )
    }
}
