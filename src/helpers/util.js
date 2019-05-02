const replaceAll = (text, search, replacement) => {
    if (typeof(text) !== 'undefined')
        return text.replace(`/${search}/g`, replacement);
    return text
};

const replaceDot = (text, replacement) => {
    if (typeof(text) !== 'undefined')
        return text.replace(/\./g, replacement);
    return text
};

const getNestedObject = (nestedObj, pathArr) => {
    return pathArr.reduce((obj, key) =>
        (obj && obj[key] !== 'undefined') ? obj[key] : undefined, nestedObj);
};

const sortAsc = (collection, comparators) => {
    collection.sort((a, b) => {
        if (getNestedObject(a, comparators) < getNestedObject(b, comparators)) {
            return -1;
        }
        if (getNestedObject(a, comparators) > getNestedObject(b, comparators)) {
            return 1;
        }
        return 0;
    })
};

const sortDesc = (collection, comparators) => {
    collection.sort((b, a) => {
        if (getNestedObject(a, comparators) < getNestedObject(b, comparators)) {
            return -1;
        }
        if (getNestedObject(a, comparators) > getNestedObject(b, comparators)) {
            return 1;
        }
        return 0;
    })
};

const notUndefined = (obj) => {
    return typeof(obj) !== 'undefined'
};

const formatDate = (currentDT) => {
    return `${currentDT.getFullYear()}-${currentDT.getMonth() + 1}-${currentDT.getDate()}`
};

const formatModelDates = (model) => {
    console.log('format model dates : ' + JSON.stringify(model));
    const modelCopy = {};
    Object.keys(model).forEach((key) => {
        if (notUndefined(model[key]) && notUndefined(model[key].getDate))
            modelCopy[key] = formatDate(model[key]);
        else
            modelCopy[key] = model[key]
    });
    return modelCopy
};

export {replaceAll, replaceDot, getNestedObject, sortAsc, sortDesc, formatDate, formatModelDates, notUndefined}
