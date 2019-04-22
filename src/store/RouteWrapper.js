import React from 'react'
import {Route} from 'react-router-dom';
import {Provider, observer, inject} from 'mobx-react'
import RouterStore from './RouterStore'
import setting from '../configurations'

const RouteWrapper = (props) => {
    const Wrapped = inject('store')(observer(props.component))
    const _store = new RouterStore()

    const renderFunction = () => {
        return <Provider store={_store.store}><Wrapped settings={setting}/></Provider>
    }

    return typeof(props.exact !== 'undefined') ?
        <Route exact path={props.path} render={renderFunction}/>
        : <Route path={props.path} render={renderFunction}/>
}

export default RouteWrapper
