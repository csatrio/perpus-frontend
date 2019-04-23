import {observable} from 'mobx';
import SewaStore from './SewaStore'

class RouterStore {
    constructor(){
        this.sewaStore = this.sewaStore || new SewaStore()
    }
    @observable global = {}
}


let instance = instance || new RouterStore();
export default instance;
