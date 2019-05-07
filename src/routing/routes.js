import Anggota from '../pages/Anggota'
import Buku from '../pages/Buku'
import Sewa from '../pages/sewa/Sewa'
import SewaAddEdit from '../pages/sewa/SewaAddEdit'
import Login from '../pages/Login'
import Dashboard from '../pages/dashboard/Dashboard'
import {Redirect} from 'react-router-dom'
import React from "react";

const Logout = (props) => {
    props.store.logoutAction()
    return <Redirect to='/login'/>
}

const routes = [
    {path: '/', exact: true, name: 'Home', component: Dashboard},
    {path: '/login', isProtected: false, name: 'Login', component: Login},
    {path: '/logout', name: 'Logout', component: Logout},
    {path: '/dashboard', name: 'Dashboard', component: Dashboard},
    {path: '/anggota', name: 'Anggota', component: Anggota},
    {path: '/buku', name: 'Buku', component: Buku},
    {path: '/sewa', exact: true, name: 'Sewa', component: Sewa},
    {path: '/sewa/add', title: 'Add Sewa', name: 'SewaAddEdit', component: SewaAddEdit},
    {path: '/sewa/edit', title: 'Edit Sewa', name: 'SewaAddEdit', component: SewaAddEdit},
];

export default routes;
