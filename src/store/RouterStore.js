import {observable, action, decorate} from 'mobx';
import GlobalStore from './GlobalStore'
import {GetCaller} from "../helpers/tracer";
import settings from '../configurations'

class RouterStore {
    getGlobal = (key) => {
        if (settings.DEBUG_STORE) {
            console.log(`${GetCaller()}: GET PROPS {${key}:${GlobalStore.globals[key]}}`)
        }
        return GlobalStore.globals[key]
    }

    removeGlobal = (key) => {
        if (settings.DEBUG_STORE) {
            console.log(`${GetCaller()}: DELETE {${key}:${GlobalStore.globals[key]}}`)
        }
        delete GlobalStore.globals[key]
    }

    setGlobal = (obj) => {
        const actionString = settings.DEBUG_STORE ? GetCaller() : ''

        Object.keys(obj).forEach((key) => {
            if (settings.DEBUG_STORE) {
                const value = obj[key]
                GlobalStore.globals[key] = value
                console.log(`${actionString}: SET GLOBAL {${key}:${obj[key]}}`)
            }
            GlobalStore.globals[key] = obj[key]
        });
    }

    store = {getGlobal: this.getGlobal, setGlobal: this.setGlobal, removeGlobal: this.removeGlobal};
}

decorate(RouterStore, {
    store: observable,
    // setGlobal: action,
    // getGlobal: action,
    // removeGlobal: action
})

export default RouterStore;
