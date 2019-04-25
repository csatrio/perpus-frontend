import {observable, action} from 'mobx';

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
    @observable isShowAlert = false
    @observable alertTitle = 'Notification'
    @observable alertMsg = ''

    @action
    showAlert = (msg) => {
        this.isShowAlert = true
        this.alertMsg = msg
    }

    @action
    closeAlert = () => {
        this.isShowAlert = false
    }

    @action
    hideAnggota = () => {
        this.showAddAnggota = false
    }

    @action
    hideAddBuku = () => {
        this.showAddBuku = false
    }

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
        if (!isNaN(this.buku.jumlahPinjam) && this.buku.jumlahPinjam > 0) {
            buku.jumlahPinjam = this.buku.jumlahPinjam
            this.bukuList.push(buku)
            this.buku.judul = ''
            this.buku.jumlahPinjam = 0
            this.buku.data = {}
            this.closeAlert()
        } else {
            this.showAlert('Jumlah pinjam harus berupa bilangan bulat > 0')
        }
    }
}
