const replaceAll = (text, search, replacement) => {
    if (typeof(text) !== 'undefined')
        return text.replace(`/${search}/g`, replacement)
    return text
}

const replaceDot = (text, replacement) => {
    if (typeof(text) !== 'undefined')
        return text.replace(/\./g, replacement)
    return text
}

const getNestedObject = (nestedObj, pathArr) => {
    return pathArr.reduce((obj, key) =>
        (obj && obj[key] !== 'undefined') ? obj[key] : undefined, nestedObj);
}

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
}

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
}


export {replaceAll, replaceDot, getNestedObject, sortAsc, sortDesc}
