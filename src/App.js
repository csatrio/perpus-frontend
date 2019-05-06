import React, {Component} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {observer, Provider} from 'mobx-react'
import DevTools from 'mobx-react-devtools';
import {Alert} from 'reactstrap';
import settings from './configurations'
import DefaultLayout from './containers/DefaultLayout'
import './App.scss'


@observer
class Navigation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: true
        }
    }

    toggleNavbar = () => {
        this.setState({collapsed: false})
    }

    render() {
        return <DefaultLayout/>

        // return <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        //     <NavbarBrand>
        //         <img
        //             src={logo}
        //             width="30"
        //             height="30"
        //             className="d-inline-block align-top spin"
        //             alt="React Bootstrap logo"
        //         />
        //         Perpus React
        //     </NavbarBrand>
        //     <NavbarToggler aria-controls="responsive-navbar-nav"/>
        //     <Collapse Collapse isOpen={!this.state.collapsed} navbar>
        //         <Nav className="mr-auto">
        //             {!this.props.store.isLogin ?
        //                 <React.Fragment><NavLink to={'/login'} className='nav-link'>Login</NavLink></React.Fragment>
        //                 : null
        //             }
        //             <NavLink to='/anggota' className='nav-link'>Anggota</NavLink>
        //             <NavLink to='/buku' className='nav-link'>Buku</NavLink>
        //             <NavLink to='/sewa' className='nav-link'>Sewa</NavLink>
        //         </Nav>
        //
        //         <Nav pullright="true">
        //             <NavItem>{this.props.store.username}</NavItem>
        //             {this.props.store.isLogin ?
        //                 <NavLink to='/logout' className='nav-link'>Logout</NavLink>
        //                 : null
        //             }
        //         </Nav>
        //
        //
        //     </Collapse>
        // </Navbar>
    }
}


@observer
class MessageDialog extends Component {
    render() {
        return (
            <Alert dismissible
                   style={{marginBottom: '0px'}}
                   isOpen={this.props.store.isShowAlert} toggle={this.props.store.closeAlert}
                   color={this.props.store.isAlertError ? 'danger' : 'success'}>
                <h4 className='d-flex justify-content-center'>{this.props.store.alertTitle}</h4>
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
                        <DefaultLayout {...this.props}/>
                        {/*{React.createElement(withRouter(DefaultLayout), this.props, null)}*/}
                        {/*<Navigation {...this.props}/>*/}
                        {/*<MessageDialog {...this.props}/>*/}
                        {/*<RoutePath {...this.props} settings={settings}/>*/}
                        {settings.DEBUG ? <DevTools/> : null}
                    </React.Fragment>
                </Provider>
            </Router>
        );
    }
}


export default App
