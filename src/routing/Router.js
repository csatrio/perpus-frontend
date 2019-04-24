import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Sample from '../pages/sample/Sample';
import Anggota from '../pages/Anggota'
import Buku from '../pages/Buku'
import Sewa from '../pages/sewa/Sewa'
import SewaAdd from '../pages/sewa/SewaAdd'
import InputForm from '../components/InputForm'
import {observer, inject} from 'mobx-react'

const doInject = (component) => inject('store', 'settings')(observer(component))

const RoutePath =
    () => (
        <Switch>
            <Route path='/' exact component={doInject(Sample)}/>
            <Route path='/anggota' component={doInject(Anggota)}/>
            <Route path='/buku' component={doInject(Buku)}/>
            <Route exact path='/sewa' component={doInject(Sewa)}/>
            <Route path='/sewa/add' component={doInject(SewaAdd)}/>
            <Route path='/input' component={InputForm}/>
        </Switch>
    );

export default RoutePath
