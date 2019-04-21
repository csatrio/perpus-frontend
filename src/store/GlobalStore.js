import {observable, decorate} from 'mobx';

class GlobalStore {
    globals = {};
}

decorate(GlobalStore, {
    globals: observable,
})

let instance = null;

function getInstance() {
    if (instance === null) {
        instance = new GlobalStore()
    }
    return instance
}

export default getInstance();
