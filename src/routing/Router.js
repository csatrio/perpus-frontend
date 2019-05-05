import React from 'react';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom'
import Sample from '../pages/sample/Sample';
import Anggota from '../pages/Anggota'
import Buku from '../pages/Buku'
import Sewa from '../pages/sewa/Sewa'
import SewaAddEdit from '../pages/sewa/SewaAddEdit'
import Login from '../pages/Login'
import {inject, observer} from 'mobx-react'
import RouterStore from '../store/RouterStore'

const doInject = (component) => withRouter(inject('store', 'settings')(observer(component)));

const ProtectedRoute = (props) => {
    if (RouterStore.hasValidToken) {
        const {path, exact, component} = props
        return <Route path={path} exact={exact}
                      render={() => React.createElement(doInject(component), props, null)}/>
    }
    return React.createElement(doInject(Login), props, null);
}

const RoutePath =
    (props) => {
        return (
            <Switch>
                <Route path='/' exact component={Sample}/>
                <Route path='/login' exact component={doInject(Login)}/>
                <Route path='/logout' render={() => {
                    props.store.logoutAction()
                    return <Redirect to='/login'/>
                }}/>
                <ProtectedRoute path='/anggota' component={Anggota}/>
                <ProtectedRoute path='/buku' component={Buku}/>
                <ProtectedRoute exact path='/sewa' component={Sewa}/>
                <ProtectedRoute path='/sewa/add' component={SewaAddEdit} title='Add Sewa'/>
                <ProtectedRoute path='/sewa/edit' component={SewaAddEdit} title='Edit Sewa' isEdit={true}/>
            </Switch>
        )
    };

export default RoutePath
