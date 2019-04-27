import {observable} from 'mobx';
import SewaStore from './SewaStore'
import settings from '../configurations'

class RouterStore {
    constructor() {
        this.sewaStore = this.sewaStore || new SewaStore()
        if (settings.DEBUG) window.store = this
    }

    @observable global = {}
}


let instance = instance || new RouterStore();
export default instance;
