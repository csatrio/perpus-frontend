import {observable, computed} from 'mobx';
import SewaStore from './SewaStore'
import settings from '../configurations'

class RouterStore {
    constructor() {
        this.isLogin = !!this.hasToken
        this.sewaStore = this.sewaStore || new SewaStore()
        if (settings.DEBUG) window.store = this
    }

    @observable status = 200
    @observable isLogin = false
    @observable global = {}

    @computed
    get hasToken() {
        return window.localStorage.getItem('token') !== null
    }
}


let instance = instance || new RouterStore();
export default instance;
