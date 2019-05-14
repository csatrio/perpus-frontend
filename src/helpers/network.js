import {formatDate, notUndefined} from "./util";

const BuildQueryParam = (model) => {
    const param = {};
    Object.keys(model).forEach((field) => {
        if (field !== 'endpoint' && model[field] !== '' && typeof(model[field]) !== 'function'
            && typeof(model[field].constructor.annotatedFields) === 'undefined') {
            if (notUndefined(model[field].getDate))
                param[field] = formatDate(model[field]);
            else
                param[field] = model[field]
        }
    });
    return param
};

export {BuildQueryParam}
