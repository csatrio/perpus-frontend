import React from 'react'
import {Route} from 'react-router-dom';
import {Provider, observer, inject} from 'mobx-react'
import RouterStore from './RouterStore'
import setting from '../configurations'

const RouteWrapper = (props) => {
    const hasCustomStore = typeof(props.store) !== 'undefined'
    const storeName = hasCustomStore ? props.store.constructor.name.toLowerCase() : 'store'
    const Page = inject(storeName, 'settings')(observer(props.component))
    const providerProps = {'settings': setting}
    providerProps[storeName] = hasCustomStore ? props.store : RouterStore.store

    const renderFunction = () => {
        return <Provider {...providerProps}><Page/></Provider>
    }

    return typeof(props.exact !== 'undefined') ?
        <Route exact path={props.path} render={renderFunction}/>
        : <Route path={props.path} render={renderFunction}/>
}

export default RouteWrapper
