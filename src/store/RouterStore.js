import {action, computed, observable} from 'mobx';
import SewaStore from './SewaStore'
import settings from '../configurations'
import jwt_decode from 'jsonwebtoken/decode'

class RouterStore {
    constructor() {
        this.isLogin = !!this.hasValidToken;
        this.sewaStore = this.sewaStore || new SewaStore();
        if (settings.DEBUG) window.store = this
    }

    @observable status = 200;
    @observable isLogin = false;
    @observable global = {};

    // Global Alert System
    @observable isShowAlert = false;
    @observable alertMessage = '';
    @observable alertTitle = '';
    @observable isAlertError = false;

    @action
    hideAlert = () => {
        this.isShowAlert = false;
        this.alertMessage = '';
        this.alertTitle = '';
        this.isAlertError = false
    };

    @action
    showAlert = (title = 'Message', message, isAlertError = false) => {
        this.isShowAlert = true;
        this.alertTitle = title;
        this.alertMessage = message;
        this.isAlertError = isAlertError
    };

    @computed
    get hasValidToken() {
        const token = window.localStorage.getItem('token');
        if (token === null) return false;
        return Date.now() < (jwt_decode(token).exp * 1000)
    }
}


let instance = instance || new RouterStore();
export default instance;
