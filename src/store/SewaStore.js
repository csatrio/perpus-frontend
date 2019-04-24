import {observable, action} from 'mobx';
import Axios from 'axios'

export default class SewaStore {
    @observable
    anggota = {
        nama: '',
    }

    @observable
    buku = {
        judul: '',
        data: {},
        jumlahPinjam: 0,
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
    selectBuku = (buku) => {
        this.buku.data = buku
        this.buku.judul = buku.nama
        this.showAddBuku = false
    }

    @action
    addBuku = () => {
        const buku = Object.assign({}, this.buku.data)
        buku.jumlahPinjam = this.buku.jumlahPinjam
        this.bukuList.push(buku)
        this.buku.judul = ''
        this.buku.jumlahPinjam = 0
        this.buku.data = {}
    }
}
