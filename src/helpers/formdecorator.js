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

export function model(value) {
    return function (target, key, descriptor) {
        return annotationHelper('model', value, target, key, descriptor)
    }
}

export function options(value) {
    return function (target, key, descriptor) {
        return annotationHelper('options', value, target, key, descriptor)
    }
}

export function toSearchFields(formModel) {
    const searchFields = []

    formModel.constructor.annotatedFields.forEach(key => {
        const {label, type, placeholder, mode, model, options} = formModel.constructor[key]
        const isOptionString = typeof(options) === 'string'
        if (isOptionString && typeof(formModel[options]) === 'undefined')
            throw new Error('either you are referring to static field or you mention the wrong property !')

        // for ranged date picker add these properties into model
        if (type === 'datepicker' && mode === 'range') {
            formModel[key + '__gte'] = ''
            formModel[key + '__lte'] = ''
            formModel[key] = () => [formModel[key + '__gte'], formModel[key + '__lte']]
        }

        searchFields.push({
            'accessor': key,
            'label': typeof(label) === 'undefined' ? key : label,
            'type': type,
            'placeholder': typeof(placeholder) === 'undefined' ? key : placeholder,
            'mode': mode,
            'model': model,
            'options': isOptionString ? formModel[options] : options
        })
    })
    return searchFields
}

export function toInputFields(formModel) {
    const inputFields = []

    formModel.constructor.annotatedFields.forEach(key => {
        const {label, type, placeholder, options, model} = formModel.constructor[key]
        const isOptionString = typeof(options) === 'string'
        if (isOptionString && typeof(formModel[options]) === 'undefined')
            throw new Error('either you are referring to static field or you mention the wrong property !')
        if(typeof(model) === 'undefined') {
            inputFields.push({
                'accessor': key,
                'label': typeof(label) === 'undefined' ? key : label,
                'type': type,
                'placeholder': typeof(placeholder) === 'undefined' ? key : placeholder,
                'options': isOptionString ? formModel[options] : options
            })
        }
    })

    formModel.copyFromRow = (row) => {
        formModel.index = row.index
        Object.keys(row.row._original).forEach(key => {
            const data = row.row._original[key]
            if (typeof(data) !== 'undefined') {
                formModel[key] = data
            }
        })
        return formModel
    }

    formModel.copyToRow = (row) => {
        formModel.constructor.annotatedFields.forEach(key => {
            const data = formModel[key]
            if (typeof(data) !== 'undefined') {
                row[key] = data
            }
        })
        return formModel
    }
    return inputFields
}


export function toTableFields(formModel) {
    const tableFields = []
    formModel.constructor.annotatedFields.forEach(key => {
        const {label, model} = formModel.constructor[key]

        tableFields.push({
            'Header': typeof(label) === 'undefined' ? key : label,
            'accessor': typeof(model) !== 'undefined' ? key + '.' + model.display : key,
        })
    })
    return tableFields
}
