const express = require('express')
const indexRouter = require('./routes/routing.js')
const { auth } = require('express-openid-connect');
require('dotenv').config()
const https = require('https')
const http = require('http')
const fs = require('fs')
const expressLayouts = require('express-ejs-layouts')
const webURL = new URL('https://www.zmtportfolio.com')

// Minification for js, css, and html
const csso = require('csso');
const UglifyJS = require("uglify-js");

// used to load the files within a directory as a text file. Returns the 
// file content and the file names as fileContent and fileNames respectively.
async function loadFiles(dir) {
    let fileContent = []
    const fileNames = await fs.promises.readdir(dir)
    if(fileNames.length != 0) {
        for(const idx in fileNames) {
            fileContent.push(await fs.promises.readFile(`${dir}/${fileNames[idx]}`, 'utf-8'))
        }
    
        return { fileContent: fileContent, fileNames: fileNames }
    } else return { fileContent: undefined, fileNames: undefined }
}

// function to minify all css in the unminified css folder and save the minified css
// to the public static folder
async function minifyCSS() {
    const dir = `${__dirname}/static/unminified-static/stylesheets/`
    const { fileContent, fileNames } = await loadFiles(dir)

    if(fileNames === undefined)
        return

    for(const idx in fileNames) {
        const minifiedCss = csso.minify(fileContent[idx]).css
        const minifiedDir = `${__dirname}/static/stylesheets/${fileNames[idx]}`

        const staticFiles = await fs.promises.readdir(`${__dirname}/static/stylesheets/`)

        if(!staticFiles.includes(fileNames[idx])) {
            console.log(`[csso] Saving minified ${fileNames[idx]} to public static directory...`)
            await fs.promises.writeFile(minifiedDir, minifiedCss)
        } else if(staticFiles.includes(fileNames[idx])) {
            const staticFileContent = await fs.promises.readFile(`${__dirname}/static/stylesheets/${fileNames[idx]}`, 'utf-8')
            if(minifiedCss != staticFileContent) {
                console.log(`[csso] Saving minified ${fileNames[idx]} to public static directory...`)
                await fs.promises.writeFile(minifiedDir, minifiedCss)
            }
        }
    }
}

// function to minify all js in the unminified css folder and save the minified js
// to the public static folder
async function minifyJS() {
    const dir = `${__dirname}/static/unminified-static/scripts`
    const { fileContent, fileNames } = await loadFiles(dir)

    if(fileNames === undefined)
        return

    for(const idx in fileNames) {
        const minifiedJS = UglifyJS.minify(fileContent[idx]).code
        const minifiedDir = `${__dirname}/static/scripts/${fileNames[idx]}`

        const staticFiles = await fs.promises.readdir(`${__dirname}/static/scripts`)

        if(!staticFiles.includes(fileNames[idx])) {
            console.log(`[UglifyJS] Saving minified ${fileNames[idx]} to public static directory...`)
            await fs.promises.writeFile(minifiedDir, minifiedJS)
        } else if(staticFiles.includes(fileNames[idx])) {
            const staticFileContent = await fs.promises.readFile(`${__dirname}/static/scripts/${fileNames[idx]}`, 'utf-8')
            if(minifiedJS != staticFileContent) {
                console.log(`[UglifyJS] Saving minified ${fileNames[idx]} to public static directory...`)
                await fs.promises.writeFile(minifiedDir, minifiedJS)
            }
        }
    }
}

minifyCSS()
minifyJS()

// Express server instantiation 
const app = express()

// set templating engine
app.use(expressLayouts)
app.set('layout', './layouts/main-layout')
app.set('views', 'views')
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Static files
app.use(express.static('static'))

// Separate the index routing to the indexRouter @ ./routes/routing.js
app.use('/', indexRouter)

const serverHTTP = http.createServer(app)
// const serverHTTPS = https.createServer(options, app) // create an https server (only necessary if running server idependent of a hosting service like plesk)
var port = 80
// var portHTTS = 443

serverHTTP.listen(port, () => console.log(`HTTP Server - Listening on port: ${port}`))

// server.listen(port, () => console.log(`HTTPS Server - Listening on port: ${portHTTPS}`)) // opens/listens on port for https server