import React, {Component} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {observer, Provider} from 'mobx-react'
import DevTools from 'mobx-react-devtools';
import settings from './configurations'
import DefaultLayout from './containers/DefaultLayout'
import './App.scss'

@observer
class App extends Component {
    render() {
        return (
            <Router>
                <Provider store={this.props.store} settings={settings}>
                    <React.Fragment>
                        <DefaultLayout {...this.props}/>
                        {settings.DEBUG ? <DevTools/> : null}
                    </React.Fragment>
                </Provider>
            </Router>
        );
    }
}
export default App
