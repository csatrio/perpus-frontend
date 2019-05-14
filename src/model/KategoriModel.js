import {label, type} from '../helpers/formdecorator'

export default class KategoriModel {
    endpoint = 'http://localhost:8008/api/test_perpus/kategori/'

    @label('Nama')
    @type('input')
    nama_kategori = ''
}
