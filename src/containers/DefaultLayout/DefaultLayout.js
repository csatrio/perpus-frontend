import React, {Component, Suspense} from 'react';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import {Alert, Container} from 'reactstrap';

import {
    AppAside,
    AppFooter,
    AppHeader,
    AppSidebar,
    AppSidebarFooter,
    AppSidebarForm,
    AppSidebarHeader,
    AppSidebarMinimizer,
} from '@coreui/react';
// sidebar nav config
import sidebar from '../../routing/sidebar'
// routes config
import routes from '../../routing/routes';

import AppSidebarNav from './AppSidebarNav'
import {inject, observer} from "mobx-react";
import Login from "../../pages/Login";


const doInject = (component) => withRouter(inject('store', 'settings')(observer(component)));

const DefaultAside = doInject(React.lazy(() => import('./DefaultAside')));
const DefaultFooter = doInject(React.lazy(() => import('./DefaultFooter')));
const DefaultHeader = doInject(React.lazy(() => import('./DefaultHeader')));

class DefaultLayout extends Component {

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    signOut(e) {
        e.preventDefault()
        this.props.history.push('/login')
    }

    render() {
        return (
            <div className="app">
                <AppHeader fixed>
                    <Suspense fallback={this.loading()}>
                        <DefaultHeader onLogout={e => this.signOut(e)}/>
                    </Suspense>
                </AppHeader>
                <div className="app-body">
                    {this.props.store.hasValidToken ?
                        <AppSidebar fixed display="lg">
                            <AppSidebarHeader/>
                            <AppSidebarForm/>
                            <Suspense>
                                <AppSidebarNav navConfig={sidebar} {...this.props} />
                            </Suspense>
                            <AppSidebarFooter/>
                            <AppSidebarMinimizer/>
                        </AppSidebar> : null}
                    <main className="main">
                        {/*<AppBreadcrumb appRoutes={routes}/>*/}
                        <Container fluid>
                            <Alert dismissible="true" className='mainAlert'
                                   isOpen={this.props.store.isShowAlert} toggle={this.props.store.closeAlert}
                                   color={this.props.store.isAlertError ? 'danger' : 'success'}>
                                <h5 className='d-flex justify-content-center'>{this.props.store.alertTitle}</h5>
                                <p className='d-flex justify-content-center'>{this.props.store.alertMessage}</p>
                            </Alert>
                            <Suspense fallback={this.loading()}>
                                <Switch>
                                    {routes.map((route, idx) => {
                                        return route.component ? (
                                            <Route
                                                key={idx}
                                                path={route.path}
                                                exact={route.exact}
                                                name={route.name}
                                                render={props => {
                                                    if (!route.isProtected) {
                                                        if (this.props.store.hasValidToken) {
                                                            return React.createElement(doInject(route.component), {...route, ...props}, null);
                                                        }
                                                        return React.createElement(doInject(Login), props, null);
                                                    }
                                                    return React.createElement(doInject(route.component), props, null)
                                                }}/>
                                        ) : (null);
                                    })}
                                    <Redirect from="/" to="/dashboard"/>
                                </Switch>
                            </Suspense>
                        </Container>
                    </main>
                    <AppAside fixed>
                        <Suspense fallback={this.loading()}>
                            <DefaultAside/>
                        </Suspense>
                    </AppAside>
                </div>
                <AppFooter>
                    <Suspense fallback={this.loading()}>
                        <DefaultFooter/>
                    </Suspense>
                </AppFooter>
            </div>
        );
    }
}

export default doInject(DefaultLayout);
