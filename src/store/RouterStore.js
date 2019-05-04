import {action, observable} from 'mobx'
import SewaStore from './SewaStore'
import settings from '../configurations'
import jwt_decode from 'jsonwebtoken/decode'

class RouterStore {
    constructor() {
        this.isLogin = !!this.hasValidToken
        this.sewaStore = this.sewaStore || new SewaStore()
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
    hideAlert = () => {
        this.isShowAlert = false
        this.alertMessage = ''
        this.alertTitle = ''
        this.isAlertError = false
    }

    @action
    showAlert = (title = 'Message', message, isAlertError = false, hideAfter = 0) => {
        this.isShowAlert = true
        this.alertTitle = title
        this.alertMessage = message
        this.isAlertError = isAlertError
        if (hideAfter > 0)
            setTimeout(() => this.hideAlert(), hideAfter)
    }

    get hasValidToken() {
        const token = window.localStorage.getItem('token')
        if (token === null) return false
        const decoded = jwt_decode(token)
        this.username = decoded.user
        return Date.now() < (decoded.exp * 1000)
    }
}


let instance = instance || new RouterStore()
export default instance
