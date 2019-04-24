import {observable, action} from 'mobx';
import Axios from 'axios'

export default class SewaStore {
    @observable anggota = {
        nama: '',
    }
    @observable bukuList = []
    @observable showAddBuku = false
    @observable showAddAnggota = false

    @action
    addAnggota = (anggota) => {
        this.anggota = anggota
        this.showAddAnggota = false
    }

    @action
    addBuku = (buku) => {
        this.bukuList.push(buku)
        this.showAddBuku = false
    }
}
