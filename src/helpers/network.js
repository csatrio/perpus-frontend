import {formatDate, notUndefined} from "./util";

const BuildQueryParam = (model) => {
    const param = {};
    Object.keys(model).forEach((field) => {
        if (model[field] !== '' && typeof(model[field]) !== 'function') {
            if (notUndefined(model[field].getDate))
                param[field] = formatDate(model[field]);
            else
                param[field] = model[field]
        }
    });
    return param
};

export {BuildQueryParam}
