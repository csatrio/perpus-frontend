import React from 'react'
import {Route} from 'react-router-dom';
import {observer} from 'mobx-react'
import RouterStore from './RouterStore'
import setting from '../configurations'

const RouteWrapper = (props) => {
    const Wrapped = observer(props.component)
    const _store = new RouterStore()
    const exact = typeof(props.exact !== 'undefined')

    const renderFunction = () => {
        return <Wrapped store={_store.store} settings={setting}/>
    }

    if (exact) return <Route exact path={props.path} render={renderFunction}/>
    return <Route path={props.path} render={renderFunction}/>
}

export default RouteWrapper
