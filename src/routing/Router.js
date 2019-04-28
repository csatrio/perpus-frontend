import React from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import Sample from '../pages/sample/Sample';
import Anggota from '../pages/Anggota'
import Buku from '../pages/Buku'
import Sewa from '../pages/sewa/Sewa'
import SewaAddEdit from '../pages/sewa/SewaAddEdit'
import {observer, inject} from 'mobx-react'

const doInject = (component) => withRouter(inject('store', 'settings')(observer(component)))

const RoutePath =
    () => (
        <Switch>
            <Route path='/' exact component={doInject(Sample)}/>
            <Route path='/anggota' component={doInject(Anggota)}/>
            <Route path='/buku' component={doInject(Buku)}/>

            <Route exact path='/sewa' component={doInject(Sewa)}/>
            <Route path='/sewa/add' render={() =>
                React.createElement(doInject(SewaAddEdit), {title: 'Add Sewa'}, null)
            }/>
            <Route path='/sewa/edit' render={() =>
                React.createElement(doInject(SewaAddEdit), {title: 'Edit Sewa', isEdit: true}, null)
            }/>
        </Switch>
    );

export default RoutePath
