import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Sample from './pages/sample/Sample';
import Anggota from './pages/Anggota'
import Buku from './pages/Buku'
import Sewa from './pages/sewa/Sewa'
import InputForm from './components/InputForm'
import {RouteWrapper} from './store'

const RoutePath =
    () => (
        <Switch>
            <RouteWrapper path='/' exact component={Sample}/>
            <RouteWrapper path='/anggota' component={Anggota}/>
            <RouteWrapper path='/buku' component={Buku}/>
            <RouteWrapper path='/sewa' component={Sewa}/>
            <Route path='/input' component={InputForm}/>
        </Switch>
    );

export default RoutePath
