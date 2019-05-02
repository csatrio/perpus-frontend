import React from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import Sample from '../pages/sample/Sample';
import Anggota from '../pages/Anggota'
import Buku from '../pages/Buku'
import Sewa from '../pages/sewa/Sewa'
import SewaAddEdit from '../pages/sewa/SewaAddEdit'
import Login from '../pages/Login'
import {observer, inject} from 'mobx-react'

const doInject = (component) => withRouter(inject('store', 'settings')(observer(component)))
const ProtectedRoute = (props) => <Route exact={props.exact} path={props.path} component={doInject(props.component)}/>

const RoutePath =
    (props) => {
        if (!props.store.hasValidToken) props.history.push('/login')
        return (
            <Switch>
                <ProtectedRoute path='/' exact component={Sample}/>
                <ProtectedRoute path='/login' exact component={Login}/>
                <Route path='/logout' render={() => {
                    window.localStorage.removeItem('token')
                    props.store.isLogin = false
                    props.store.showAlert('Logout Successful', 'You have logged out successfully!!')
                    return React.createElement(doInject(Login), null, null)
                }}/>
                <ProtectedRoute path='/anggota' component={Anggota}/>
                <ProtectedRoute path='/buku' component={Buku}/>
                <ProtectedRoute exact path='/sewa' component={Sewa}/>
                <Route path='/sewa/add' render={() =>
                    React.createElement(doInject(SewaAddEdit), {title: 'Add Sewa'}, null)
                }/>
                <Route path='/sewa/edit' render={() =>
                    React.createElement(doInject(SewaAddEdit), {title: 'Edit Sewa', isEdit: true}, null)
                }/>
            </Switch>
        )
    };

export default RoutePath
