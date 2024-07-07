function handleize(string) {
    if(typeof string === 'string')
        return string.replace(/ /g, "-").toLowerCase()
    else {
        throw new Error("Handleization Error")
    }
}

function breadcrumbCheck(string) {
    var test = string.split('/').filter(Boolean)
    if(test.length > 1) return { test: true, title: test[0].replace('-', ' '), url: "/" + test[0] }
    else return { test: false }
}

function linkBreadcrumb(string) {

}

function lengthof(object) {
    if(typeof object === 'object')
        return Object.keys(object).length
}

module.exports = {
    handleize: handleize,
    linkBreadcrumb: linkBreadcrumb,
    breadcrumbCheck: breadcrumbCheck,
    lengthof: lengthof
}