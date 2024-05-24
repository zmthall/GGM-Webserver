function handleize(string) {
    if(typeof string === 'string')
        return string.replace(/ /g, "-").toLowerCase()
    else {
        throw new Error("Handleization Error")
    }
}

function lengthof(object) {
    if(typeof object === 'object')
        return Object.keys(object).length
}

module.exports = {
    handleize: handleize,
    lengthof: lengthof
}