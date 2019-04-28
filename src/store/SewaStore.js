import {observable, action} from 'mobx';
import Axios from 'axios'
import {formatDate, notUndefined} from "../helpers/util";
import {CreateSnapshot, RestoreSnapshot, CloneDeep} from '../helpers/reflections'

export default class SewaStore {
    @observable
    buku = {
        judul: '',
        data: {},
        jumlahPinjam: 0,
    }

    @observable
    editBuku = {
        judul: '',
        data: {},
        jumlahPinjam: 0,
    }


    @observable anggota = {nama: ''}
    @observable bukuList = []
    @observable sewaDetails = []
    @observable showEditBuku = false
    @observable showAddBuku = false
    @observable showAddAnggota = false
    @observable isShowAlert = false
    @observable showDetail = false
    @observable alertTitle = 'Notification'
    @observable alertMsg = ''
    @observable tanggalPinjam = new Date()
    @observable tanggalKembali = new Date()
    @observable idSewa = null

    constructor() {
        CreateSnapshot(this)
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
    hideDetail = () => {
        this.showDetail = false
    }

    @action
    hideAddAnggota = () => {
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
        Axios.delete(`http://localhost:8008/api/test_perpus/detilsewa/${row.original.id_detilsewa}/`)
            .then(response => {
                console.log('delete detilsewa : ' + JSON.stringify(response.data))
                this.bukuList.splice(row.index, 1)
                this.bukuList = this.bukuList.slice() // This is a workaround with table that won't update
                window.alert('Detilsewa telah dihapus !')
            })
    }

    @action
    addBuku = () => {
        const buku = CloneDeep(this.buku.data)
        if (!isNaN(this.buku.jumlahPinjam) && this.buku.jumlahPinjam > 0) {
            buku.jumlahPinjam = this.buku.jumlahPinjam
            if(notUndefined(buku.nama)) buku.buku = buku.nama
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
    saveEditBuku = () =>{
        this.showEditBuku = false
    }

    @action
    saveSewa = () => {
        const data = {
            anggota: this.anggota,
            tanggalPinjam: formatDate(this.tanggalPinjam),
            tanggalKembali: formatDate(this.tanggalKembali),
            buku: this.bukuList,
        }
        if(this.idSewa !== null && this.isEdit){
            data.idSewa = this.idSewa
        }
        Axios.post('http://localhost:8008/api/test_perpus/saveSewa/', data)
            .then(response => {
                console.log('Save Sewa Response : ' + JSON.stringify(response.data))
                window.alert('Save Sewa Berhasil')
            })
    }

    @action
    deleteSewa = (row) =>{
        this.idSewa = row.original.id
        Axios.delete(`http://localhost:8008/api/test_perpus/sewa/${this.idSewa}/`)
            .then(response => {
                console.log('delete sewa : ' + JSON.stringify(response.data))
            })
    }

    @action
    fetchDetail = (row) => {
        this.idSewa = row.original.id
        Axios.get('http://localhost:8008/api/test_perpus/ds/', {
            params: {
                sewa_id: this.idSewa
            }
        })
            .then(response => {
                this.bukuList = response.data
            })
    }

    @action
    reset = () => {
        RestoreSnapshot(this)
    }
}


