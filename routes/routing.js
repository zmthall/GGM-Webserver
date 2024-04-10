var express = require('express')
var router = express.Router()

var fs = require("fs"), json;

function readJsonFileSync(filepath, encoding){
    if (typeof (encoding) == 'undefined'){
        encoding = 'utf8';
    }
    var file = fs.readFileSync(filepath, encoding);
    return JSON.parse(file);
}

function getConfig(file){
    var filepath = __dirname + '/' + file;
    return readJsonFileSync(filepath);
}

json = getConfig('data.json');

router.get('/', (request, response) => {
    response.render('index', {
        config: json,
        title: 'Medicaid Transportation',
        layout: './layouts/main-layout'
    })
})

router.get('/assisted-living', (request, response) => {
    response.render('assisted-living', {
        config: json,
        title: 'Assisted Living',
        layout: './layouts/main-layout'
    })
})

router.get('/non-medical-transportation', (request, response) => {
    response.render('non-medical-transportation', {
        config: json,
        title: 'Non-Medical Transportation',
        layout: './layouts/main-layout'
    })
})

router.get('/nemt', (request, response) => {
    response.render('nemt-transportation', {
        config: json,
        title: 'Non-Emergency Medical Transportation',
        layout: './layouts/main-layout'
    })
})

router.get('/about-us', (request, response) => {
    response.render('about-us', {
        config: json,
        title: 'About us',
        layout: './layouts/main-layout'
    })
})

router.get('/about-us/location', (request, response) => {
    response.render('location', {
        config: json,
        title: 'Location',
        layout: './layouts/main-layout'
    })
})

// router.get('/blogs', (request, response) => {
//     response.render('about', {
//         title: 'About us',
//         layout: './layouts/main-layout'
//     })
// })

router.get('/about-us/community', (request, response) => {
    response.render('community', {
        config: json,
        title: 'Community',
        layout: './layouts/main-layout'
    })
})

router.get('/contact-us', (request, response) => {
    response.render('contact-us', {
        config: json,
        title: 'contact-us',
        layout: './layouts/main-layout'
    })
})

router.get('/contact-us/schedule-a-ride', (request, response) => {
    response.render('schedule-a-ride', {
        config: json,
        title: 'Schedule A Ride',
        layout: './layouts/main-layout'
    })
})

router.get('*', (request, response) => {
  response.render('404', {
    config: json,
    title: 'Page not Found: 404',
    layout: './layouts/main-layout'
  })
})

module.exports = router