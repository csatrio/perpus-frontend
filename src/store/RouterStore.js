import {observable, action, computed, decorate} from 'mobx';
import GlobalStore from './GlobalStore'

const keyMap = {
    'getGlobal': true,
    'setGlobal': true,
    'removeGlobal': true,
    'getComputed': true,
    'setComputed': true
}

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

    getComputed = (key) => {
        const computedValue = this.store[key]
        return typeof (computedValue) !== 'undefined' && typeof (computedValue.get) !== 'undefined' ?
            computedValue.get() : computedValue
    }

    setComputed = (key, _function) => {
        this.store[key] = computed(_function)
    }

    store = {
        getGlobal: this.getGlobal,
        setGlobal: this.setGlobal,
        removeGlobal: this.removeGlobal,
        getComputed: this.getComputed,
        setComputed: this.setComputed,
    };
}

decorate(RouterStore, {
    store: observable,
    setGlobal: action,
    getGlobal: action,
    removeGlobal: action,
    getComputed: action,
    setComputed: action
})

let instance = null;

const getInstance = () => {
    if (instance === null) {
        instance = new RouterStore()
    }
    Object.keys(instance.store).forEach(key => {
        if (keyMap[key] !== true ) delete instance.store[key]
    })
    return instance
}

export default getInstance();
