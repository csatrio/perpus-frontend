import CloneDeep from 'lodash/cloneDeep';

function CreateSnapshot(instance) {
    instance.snapshot = {};
    Object.getOwnPropertyNames(instance.__proto__).forEach(key => {
        if (key !== 'constructor')
            instance.snapshot[key] = CloneDeep(instance[key])
    })
}

function RestoreSnapshot(instance) {
    if (typeof(instance.snapshot) !== 'undefined') {
        Object.keys(instance.snapshot).forEach(key => {
            instance[key] = instance.snapshot[key]
        })
    } else {
        throw new Error('Snapshot did not exist, cannot restore !!')
    }
}

export {CreateSnapshot, RestoreSnapshot, CloneDeep}
