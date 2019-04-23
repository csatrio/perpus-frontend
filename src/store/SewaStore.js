import {observable, action} from 'mobx';

export default class SewaStore{
    @observable sewaList = []
    @observable anggota

    @action
    addSewa = (sewa) =>{
        this.sewaList.push(sewa)
    }
}
