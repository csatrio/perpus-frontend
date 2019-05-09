import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem} from 'reactstrap';
import PropTypes from 'prop-types';

import {AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler} from '@coreui/react';
import logo from '../../assets/logo.svg';
import logo_coreui from '../../assets/logo-coreui.svg'

const propTypes = {
    children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
    render() {
        // eslint-disable-next-line
        const {children, ...attributes} = this.props;

        return (
            <React.Fragment>
                <AppSidebarToggler className="d-lg-none" display="md" mobile/>
                <AppNavbarBrand
                    full={{src: logo_coreui, width: 89, height: 25, alt: 'CoreUI Logo'}}
                    minimized={{src: logo_coreui, width: 30, height: 30, alt: 'CoreUI Logo'}}
                />
                {this.props.store.isLogin ? <AppSidebarToggler className="d-md-down-none" display="lg"/> : null}

                <Nav className="d-md-down-none" navbar>
                    <NavItem className="px-3">
                        {this.props.store.isLogin ?
                            <NavLink to="/logout" className="nav-link">Logout</NavLink>
                            : <NavLink to="/login" className="nav-link">Login</NavLink>
                        }
                    </NavItem>
                    {this.props.store.isLogin ?
                        <NavItem className="px-3">
                            <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
                        </NavItem> : null
                    }

                </Nav>

                {this.props.store.isLogin ?
                    <React.Fragment><Nav className="ml-auto" navbar>
                        <AppHeaderDropdown direction="down">
                            <DropdownToggle nav>
                                <img src={logo} className="img-avatar"
                                     alt="admin@bootstrapmaster.com"/>
                            </DropdownToggle>
                            <DropdownMenu right style={{right: 'auto'}}>
                                <DropdownItem header tag="div"
                                              className="text-center"><strong>Account</strong></DropdownItem>
                                <DropdownItem><i className="fa fa-bell-o"></i> Updates<Badge
                                    color="info">42</Badge></DropdownItem>
                                <DropdownItem><i className="fa fa-envelope-o"></i> Messages<Badge
                                    color="success">42</Badge></DropdownItem>
                                <DropdownItem><i className="fa fa-tasks"></i> Tasks<Badge
                                    color="danger">42</Badge></DropdownItem>
                                <DropdownItem><i className="fa fa-comments"></i> Comments<Badge
                                    color="warning">42</Badge></DropdownItem>
                                <DropdownItem header tag="div"
                                              className="text-center"><strong>Settings</strong></DropdownItem>
                                <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>
                                <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
                                <DropdownItem><i className="fa fa-usd"></i> Payments<Badge
                                    color="secondary">42</Badge></DropdownItem>
                                <DropdownItem><i className="fa fa-file"></i> Projects<Badge
                                    color="primary">42</Badge></DropdownItem>
                                <DropdownItem divider/>
                                <DropdownItem><i className="fa fa-shield"></i> Lock Account</DropdownItem>
                                <DropdownItem onClick={()=>this.props.history.push('/logout')}><i
                                    className="fa fa-lock"></i> Logout</DropdownItem>
                            </DropdownMenu>
                        </AppHeaderDropdown>
                    </Nav><AppAsideToggler className="d-md-down-none"/></React.Fragment> : null
                }

                {/*<AppAsideToggler className="d-lg-none" mobile />*/}
            </React.Fragment>
        );
    }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
