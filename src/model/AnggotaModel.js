import {label, type} from '../helpers/formdecorator'

export default class AnggotaModel {
    @label('Nama')
    @type('input')
    nama = ''

    @label('Umur')
    @type('input')
    umur = ''

    @label('Alamat')
    @type('input')
    alamat = ''
}
