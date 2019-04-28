import {formatDate, notUndefined} from "./util";
import Axios from 'axios'

const BuildQueryParam = (model) => {
    const param = {}
    Object.keys(model).forEach((field) => {
        if (model[field] !== '') {
            if (notUndefined(model[field].getDate))
                param[field] = formatDate(model[field])
            else
                param[field] = model[field]
        }
    })
    return param
}

const DeleteEntity = (url, id) => {
    Axios.delete(`${url}id/`).then(response=>{
        console.log('Delete entity response : ' + response.data)
    }).catch(err=>{
        console.log('Delete entity error : ' + err)
    })
}

export {BuildQueryParam}
