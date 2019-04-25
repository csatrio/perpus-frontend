const BuildQueryParam = (model)=>{
    const param = {}
    Object.keys(model).forEach((field)=>{
        if(model[field] !== '') param[field] = model[field]
    })
    return param
}

export {BuildQueryParam}
