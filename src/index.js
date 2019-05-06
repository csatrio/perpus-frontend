import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
import axios from 'axios';
import RouterStore from './store';
import './css/app.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@coreui/coreui/dist/css/coreui.min.css';


const jwt = require('jsonwebtoken');

// Add a request interceptor
axios.interceptors.request.use((config) => {
    // Do something before request is sent
    const token = window.localStorage.getItem('token');
    if (token !== null) config.headers.authorization = `Bearer ${token}`;
    return config;
}, (error) => {
    // Do something with request error
    return Promise.reject(error);
});


// Add a response interceptor
axios.interceptors.response.use((response) => {
    // Do something with response data
    RouterStore.status = response.status;
    RouterStore.isLogin = true;
    return response;
}, function (error) {
    // Do something with response error
    try {
        RouterStore.status = error.response.status;
        RouterStore.isLogin = false
        // if (error.response.status === 401)
        //     window.location.assign('/login')
    }
    catch (e) {
        alert('API BACKEND SEEMS DOWN !!')
    }
    return Promise.reject(error);
});


// Application render function
ReactDOM.render(
    <App store={RouterStore}/>,
    document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
