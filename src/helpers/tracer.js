const GetStackTrace = () => {
    try {
        throw new Error();
    }
    catch (e) {
        try {
            return e.stack.split('at ')
        }
        catch (ex) {
            return []
        }
    }
}

const CleanStackTrace = (stack) => {
    return stack.slice(0, stack.indexOf('(')).trim().replace('new ', '[Constructor]')
}

const GetCaller = () => {
    try {
        throw new Error();
    }
    catch (e) {
        try {
            const stack = e.stack.split('at ', 4)[3]
            return stack.slice(0, stack.indexOf('(')).trim().replace('new ', '[Constructor]')
        }
        catch (ex) {
            return 'GetCaller:Parse Error'
        }
    }
}

export {GetStackTrace, CleanStackTrace, GetCaller}
