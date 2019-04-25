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
    @observable isShowAlert = false
    @observable alertTitle = 'Notification'
    @observable alertMsg = ''
    @observable tanggalPinjam = new Date()
    @observable tanggalKembali = new Date()

    formatDate(currentDT){
        return `${currentDT.getFullYear()}-${currentDT.getMonth()+1}-${currentDT.getDate()}`
    }


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
        this.buku.jumlahPinjam = 1
        this.showAddBuku = false
    }

    @action
    deleteBuku(row) {
        this.bukuList.splice(row.index, 1)
        this.bukuList = this.bukuList.slice() // This is a workaround with table that won't update
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

    @action
    saveSewa = () => {
        const data = {
            anggota: this.anggota,
            tanggalPinjam: this.formatDate(this.tanggalPinjam),
            tanggalKembali: this.formatDate(this.tanggalKembali),
            buku: this.bukuList
        }
        Axios.post('http://localhost:8008/api/test_perpus/saveSewa/', data)
            .then(response => {
                console.log('Save Sewa Response : ' + JSON.stringify(response.data))
            })
    }
}
