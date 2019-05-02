import React, {Component} from 'react';
import {BrowserRouter as Router, NavLink} from 'react-router-dom';
import {observer, Provider} from 'mobx-react'
import DevTools from 'mobx-react-devtools';
import {Alert, Nav, Navbar, NavDropdown} from 'react-bootstrap'
import logo from './logo.svg';
import RoutePath from './routing/Router'
import settings from './configurations'
import Login from './pages/Login'

require('./css/app.css')
require('bootstrap/dist/css/bootstrap.min.css')


@observer
class Navigation extends Component {
    render() {
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
                    {!this.props.store.isLogin ?
                        <React.Fragment><NavLink to={'/login'} className='nav-link'>Login</NavLink></React.Fragment>
                        : null
                    }
                    <NavLink to='/anggota' className='nav-link'>Anggota</NavLink>
                    <NavLink to='/buku' className='nav-link'>Buku</NavLink>
                    <NavLink to='/sewa' className='nav-link'>Sewa</NavLink>
                    <NavDropdown title="Reports" id="collapsible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider/>
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                {this.props.store.isLogin ?
                    <Nav pullright="true">
                        <NavLink to='/logout' className='nav-link'>Logout</NavLink>
                    </Nav>
                    : null
                }
            </Navbar.Collapse>
        </Navbar>
    }
}


@observer
class MessageDialog extends Component {
    render() {
        return (
            <Alert dismissible
                   style={{marginBottom: '0px'}}
                   show={this.props.store.isShowAlert} onClose={this.props.store.hideAlert}
                   variant={this.props.store.isAlertError ? 'danger' : 'success'}>
                <Alert.Heading className='d-flex justify-content-center'>{this.props.store.alertTitle}</Alert.Heading>
                <p className='d-flex justify-content-center'>{this.props.store.alertMessage}</p>
            </Alert>
        )
    }
}


@observer
class App extends Component {
    render() {
        return (
            <Router>
                <Provider store={this.props.store} settings={settings}>
                    <React.Fragment>
                        <Navigation {...this.props}/>
                        <MessageDialog {...this.props}/>
                        {!this.props.store.isLogin ? <Login history={this.props.history}/> :
                            <RoutePath {...this.props}/>}
                        {settings.DEBUG ? <DevTools/> : null}
                    </React.Fragment>
                </Provider>
            </Router>
        );
    }
}


export default App
