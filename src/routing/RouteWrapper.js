import React from 'react'
import {Route} from 'react-router-dom';
import {observer, inject} from 'mobx-react'

const RouteWrapper = (props) => {
    const Page = inject('store', 'settings')(observer(props.component))
    return typeof(props.exact !== 'undefined') ?
        <Route exact path={props.path} render={() => {return <Page/>}}/>
        : <Route path={props.path} render={() => {return <Page/>}}/>
}

export default RouteWrapper
