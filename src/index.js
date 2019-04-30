import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import App from './App'
import axios from 'axios'


// Add a request interceptor
axios.interceptors.request.use((config) => {
    console.log('request interceptor')
    // Do something before request is sent
    config.headers.authorization = `Bearer ${window.localStorage.getItem('token')}`
    return config;
}, (error) => {
    // Do something with request error
    this.props.history.push('/login')
    return Promise.reject(error);
});


// Add a response interceptor
axios.interceptors.response.use((response) => {
    // Do something with response data
    return response;
}, function (error) {
    // Do something with response error
    console.log('response error interceptor: ' + JSON.stringify(error))
    if (error.response.status === 401) window.location.assign('/login')
    return Promise.reject(error);
});


// Application render function
ReactDOM.render(
    <App/>,
    document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
