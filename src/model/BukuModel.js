import {label, placeholder, type, mode, model} from '../helpers/formdecorator'
import KategoriModel from './KategoriModel'

export default class BukuModel {
    @label('Nama')
    @placeholder('nama')
    @type('input')
    nama = ''

    @label('Penerbit')
    @placeholder('penerbit')
    @type('input')
    penerbit = ''

    @label('Tanggal Terbit')
    @placeholder('tanggal_terbit')
    @type('datepicker')
    @mode('range')
    tanggal_terbit = ''

    @label('Kategori')
    @model({display: 'nama_kategori'})
    kategori = new KategoriModel()
}
