import {observable, action, decorate} from 'mobx';
import GlobalStore from './GlobalStore'

class RouterStore {
    getGlobal = (key) => {
        return GlobalStore.globals[key]
    }

    removeGlobal = (key) => {
        delete GlobalStore.globals[key]
    }

    setGlobal = (obj) => {
        Object.keys(obj).forEach((key) => {
            GlobalStore.globals[key] = obj[key]
        });
    }

    store = {getGlobal: this.getGlobal, setGlobal: this.setGlobal, removeGlobal: this.removeGlobal};
}

decorate(RouterStore, {
    store: observable,
    setGlobal: action,
    getGlobal: action,
    removeGlobal: action
})

export default RouterStore;
