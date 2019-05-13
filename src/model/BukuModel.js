import {label, placeholder, type, mode} from '../helpers/formdecorator'

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
}
