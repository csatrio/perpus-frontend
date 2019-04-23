import React, {Component} from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import {Provider} from 'mobx-react'
import DevTools from 'mobx-react-devtools';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import logo from './logo.svg';

import RoutePath from './routing/Router'
import RouterStore from './store'
import settings from './configurations'

require('./css/app.css')
require('bootstrap/dist/css/bootstrap.min.css')

const Navigation = () => {
    return <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>
            <img
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top spin"
                alt="React Bootstrap logo"
            />
            Perpus React
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
                <Link to='/anggota' className='nav-link'>Anggota</Link>
                <Link to='/buku' className='nav-link'>Buku</Link>
                <Link to='/sewa' className='nav-link'>Sewa</Link>
                <NavDropdown title="Reports" id="collapsible-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider/>
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
}

export default class App extends Component {
    render() {
        return (
            <Router>
                <Provider store={RouterStore} settings={settings}>
                    <React.Fragment>
                        <Navigation/>
                        <RoutePath/>
                        {settings.DEBUG ? <DevTools/> : null}
                    </React.Fragment>
                </Provider>
            </Router>
        );
    }
}
