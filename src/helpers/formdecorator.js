function annotationHelper(annotationField, annotationValue, target, key, descriptor) {

    // Set value to constructor metadata as per annotation
    if (typeof(target.constructor[key]) !== 'undefined') {
        target.constructor[key][annotationField] = annotationValue
    } else {
        const obj = {}
        obj[annotationField] = annotationValue
        target.constructor[key] = obj
    }

    // Create annotatedFields as required
    if (typeof(target.constructor.annotatedFields) === 'undefined') {
        target.constructor.annotatedFields = new Set()
    }

    target.constructor.annotatedFields.add(key)
    return descriptor
}

export function label(value) {
    return function (target, key, descriptor) {
        return annotationHelper('label', value, target, key, descriptor)
    }
}

export function type(value) {
    return function (target, key, descriptor) {
        return annotationHelper('type', value, target, key, descriptor)
    }
}

export function placeholder(value) {
    return function (target, key, descriptor) {
        return annotationHelper('placeholder', value, target, key, descriptor)
    }
}

export function mode(value) {
    return function (target, key, descriptor) {
        return annotationHelper('mode', value, target, key, descriptor)
    }
}

export function options(value) {
    return function (target, key, descriptor) {
        return annotationHelper('options', value, target, key, descriptor)
    }
}

export function toSearchFields(model) {
    const inputFields = []
    model.constructor.annotatedFields.forEach(key => {
        const {label, type, placeholder, mode, options} = model.constructor[key]

        // for ranged date picker add these properties into model
        if (type === 'datepicker' && mode === 'range') {
            model[key + '__gte'] = ''
            model[key + '__lte'] = ''
            model[key] = () => [model[key + '__gte'], model[key + '__lte']]
        }

        inputFields.push({
            'accessor': key,
            'label': typeof(label) === 'undefined' ? key : label,
            'type': type,
            'placeholder': typeof(placeholder) === 'undefined' ? key : placeholder,
            'mode': mode,
            'options': options
        })
    })
    return inputFields
}

export function toInputFields(model) {
    const inputFields = []
    model.constructor.annotatedFields.forEach(key => {
        const {label, type, placeholder, options} = model.constructor[key]
        inputFields.push({
            'accessor': key,
            'label': typeof(label) === 'undefined' ? key : label,
            'type': type,
            'placeholder': typeof(placeholder) === 'undefined' ? key : placeholder,
            'options': options
        })
    })

    model.copyFromRow = (row) => {
        model.index = row.index
        Object.keys(row.row._original).forEach(key => {
            const data = row.row._original[key]
            if (typeof(data) !== 'undefined') {
                model[key] = data
            }
        })
        return model
    }

    model.copyToRow = (row) => {
        model.constructor.annotatedFields.forEach(key => {
            const data = model[key]
            if (typeof(data) !== 'undefined') {
                row[key] = data
            }
        })
        return model
    }
    return inputFields
}


export function toTableFields(model) {
    const tableFields = []
    model.constructor.annotatedFields.forEach(key => {
        const {label} = model.constructor[key]

        tableFields.push({
            'Header': typeof(label) === 'undefined' ? key : label,
            'accessor': key,
        })
    })
    return tableFields
}
