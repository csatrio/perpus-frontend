import {action, observable} from 'mobx';
import Axios from 'axios'
import {formatDate} from "../helpers/util";
import {CloneDeep, CreateSnapshot, RestoreSnapshot} from '../helpers/reflections'

export default class SewaStore {
    @observable
    buku = {
        judul: '',
        data: {},
        jumlahPinjam: 0,
    };

    @observable
    editBuku = {
        judul: '',
        data: {},
        jumlahPinjam: 0,
    };


    @observable anggota = {nama: ''};
    @observable bukuList = [];
    @observable sewaDetails = [];
    @observable showEditBuku = false;
    @observable showAddBuku = false;
    @observable showAddAnggota = false;
    @observable showDetail = false;
    @observable alertTitle = 'Notification';
    @observable alertMsg = '';
    @observable tanggalPinjam = formatDate(new Date());
    @observable tanggalKembali = formatDate(new Date());
    @observable idSewa = null;

    constructor(rootStore) {
        CreateSnapshot(this)
        this.rootStore = rootStore
    }

    @action
    hideDetail = () => {
        this.showDetail = false
    };

    @action
    hideAddAnggota = () => {
        this.showAddAnggota = false
    };

    @action
    hideAddBuku = () => {
        this.showAddBuku = false
    };

    @action
    addAnggota = (anggota) => {
        this.anggota = anggota;
        this.showAddAnggota = false
    };

    @action
    selectBuku = (buku) => {
        this.buku.data = buku;
        this.buku.data.judul = buku.nama;
        this.buku.judul = buku.nama;
        this.buku.jumlahPinjam = 1;
        this.showAddBuku = false
    };

    @action
    deleteBuku(row) {
        Axios.delete(`http://localhost:8008/api/test_perpus/detilsewa/${row.original.id_detilsewa}/`)
            .then(response => {
                console.log('delete detilsewa : ' + JSON.stringify(response.data));
                this.bukuList.splice(row.index, 1);
                this.bukuList = this.bukuList.slice() // This is a workaround with table that won't update
            })
    }

    @action
    addBuku = () => {
        const buku = CloneDeep(this.buku.data);
        if (!isNaN(this.buku.jumlahPinjam) && this.buku.jumlahPinjam > 0) {
            buku.jumlahPinjam = this.buku.jumlahPinjam;
            this.bukuList.push(buku);
            this.buku.judul = '';
            this.buku.jumlahPinjam = 0;
            this.buku.data = {};
            this.rootStore.closeAlert();
        } else {
            this.rootStore.showError('Error', 'Jumlah pinjam harus berupa bilangan bulat > 0')
        }
    };

    @action
    saveEditBuku = () => {
        this.showEditBuku = false
    };

    @action
    saveSewa = () => {
        const data = {
            anggota: this.anggota,
            tanggalPinjam: this.tanggalPinjam,
            tanggalKembali: this.tanggalKembali,
            buku: this.bukuList,
        };
        if (this.idSewa !== null && this.isEdit) {
            data.idSewa = this.idSewa
        }
        Axios.post('http://localhost:8008/api/test_perpus/saveSewa/', data)
            .then(response => {
                console.log('Save Sewa Response : ' + JSON.stringify(response.data));
                this.reset()
            })
    };

    @action
    deleteSewa = (row) => {
        this.idSewa = row.original.id;
        Axios.delete(`http://localhost:8008/api/test_perpus/sewa/${this.idSewa}/`)
            .then(response => {
                console.log('delete sewa : ' + JSON.stringify(response.data))
            })
    };

    @action
    fetchDetail = (row) => {
        console.log('fetch detail : ' + JSON.stringify(row));
        this.idSewa = row.original.id;
        Axios.get('http://localhost:8008/api/test_perpus/ds/', {
            params: {
                sewa_id: this.idSewa
            }
        })
            .then(response => {
                this.bukuList = response.data;
                console.log('fetch detail response: ' + JSON.stringify(response.data))
            })
    };

    @action
    reset = () => {
        RestoreSnapshot(this)
    }
}


