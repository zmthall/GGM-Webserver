var fs = require("fs")

async function getDirFileNames(dir) {
    return await fs.promises.readdir(dir)
}

module.exports = {
    getDirFileNames: getDirFileNames
}