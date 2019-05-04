import React, {Component} from 'react'
import InputForm from '../components/InputForm'
import {Button} from 'react-bootstrap'
import Axios from 'axios'

export default class Login extends Component {

    static defaultProps = {
        title: 'Login'
    };

    constructor(props) {
        super(props);
        this.state = {
            model: {username: '', password: ''},
            inputFields: [
                {label: 'Username', accessor: 'username', placeholder: 'username'},
                {label: 'Password', accessor: 'password', placeholder: 'password', type: 'password'}
            ]
        }
    }

    doLogin = () => {
        const currentPath = window.location.href.replace(window.location.origin, '')
        Axios.post('http://localhost:8008/api/token/', this.state.model)
            .then(response => {
                window.localStorage.setItem('token', response.data.access);
                window.localStorage.setItem('refreshToken', response.data.refresh);
                try {
                    this.props.store.isLogin = true;
                    this.props.store.showAlert('Login Successful', 'You have logged in successfully!!',
                        false, this.props.settings.AlertDismissTimeout);
                    if (!currentPath.includes('login')) {
                        this.props.history.push(currentPath)
                    }
                    else {
                        this.props.history.push('/')
                    }

                } catch (e1) {
                    console.log(e1)
                }
            })
            .catch((e) => {
                try {
                    this.props.store.isLogin = false;
                    this.props.store.showAlert('Login Failure', 'Wrong username / password combination', true)
                } catch (e2) {
                }
            })
    };

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
