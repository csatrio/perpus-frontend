import {action, observable} from 'mobx'
import SewaStore from './SewaStore'
import settings from '../configurations'
import jwt_decode from 'jsonwebtoken/decode'

class RouterStore {
    constructor() {
        this.isLogin = !!this.hasValidToken
        this.sewaStore = this.sewaStore || new SewaStore(this)
        if (settings.DEBUG) window.store = this
    }

    @observable status = 200
    @observable isLogin = false
    @observable global = {}
    @observable username = ''

    // Global Alert System
    @observable isShowAlert = false
    @observable alertMessage = ''
    @observable alertTitle = ''
    @observable isAlertError = false

    @action
    closeAlert = () => {
        this.isShowAlert = false
        this.alertMessage = ''
        this.alertTitle = ''
        this.isAlertError = false
    }

    @action
    showError = (title, message, hideAfter = 0) => {
        this.alertTitle = title
        this.alertMessage = message
        this.isAlertError = true
        this.isShowAlert = true
        if (hideAfter > 0)
            setTimeout(() => this.closeAlert(), hideAfter)
    }

    @action
    showSuccess = (title, message, hideAfter = 0) => {
        this.alertTitle = title
        this.alertMessage = message
        this.isAlertError = false
        this.isShowAlert = true
        if (hideAfter > 0)
            setTimeout(() => this.closeAlert(), hideAfter)
    }

    @action
    loginAction = (token) => {
        window.localStorage.setItem('token', token.access);
        window.localStorage.setItem('refreshToken', token.refresh);
        const decoded = jwt_decode(token.access)
        this.username = decoded.user
        this.isLogin = true
        this.showSuccess('Login Successful', 'You have logged in successfully!!', settings.AlertDismissTimeout);
    }

    @action
    logoutAction = () => {
        window.localStorage.removeItem('token');
        this.username = ''
        this.isLogin = false;
        this.showSuccess('Logout Successful', 'You have logged out successfully!!', settings.AlertDismissTimeout)
    }

    get hasValidToken() {
        const token = window.localStorage.getItem('token')
        if (token === null) {
            this.username = ''
            return false
        }
        const decoded = jwt_decode(token)
        this.username = decoded.user
        const isValid = Date.now() < (decoded.exp * 1000)
        if (!isValid) this.username = ''
        return isValid
    }
}


let instance = instance || new RouterStore()
export default instance
