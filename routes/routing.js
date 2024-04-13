const express = require('express')
const helper = require('../files/helper.js')
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
        helper: helper,
        page: {
            title: 'Medicaid Transportation',
            href: "/",
            page_type: "home-page"
        },
        layout: './layouts/main-layout'
    })
})

router.get('/assisted-living', (request, response) => {
    response.render('assisted-living', {
        config: json,
        helper: helper,
        page: {
            title: 'Assisted Living',
            href: '/assisted-living',
            page_type: "page"
        },
        layout: './layouts/main-layout'
    })
})

router.get('/non-medical-transportation', (request, response) => {
    response.render('non-medical-transportation', {
        config: json,
        helper: helper,
        page: {
            title: 'Non-Medical Transportation',
            href: '/non-medical-transportation',
            page_type: "page"
        },
        layout: './layouts/main-layout'
    })
})

router.get('/nemt', (request, response) => {
    response.render('nemt-transportation', {
        config: json,
        helper: helper,
        page: {
            title: 'Non-Emergency Medical Transportation',
            href: '/nemt',
            page_type: "page"
        },
        layout: './layouts/main-layout'
    })
})

router.get('/about-us', (request, response) => {
    response.render('about-us', {
        config: json,
        helper: helper,
        page: {
            title: 'About us',
            href: '/about-us',
            page_type: "page"
        },
        layout: './layouts/main-layout'
    })
})

router.get('/about-us/location', (request, response) => {
    response.render('location', {
        config: json,
        helper: helper,
        page: {
            title: 'Location',
            href: '/about-us/location',
            page_type: "page"
        },
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
        helper: helper,
        page: {
            title: 'Community',
            href: '/about-us/community',
            page_type: "page"
        },
        layout: './layouts/main-layout'
    })
})

router.get('/contact-us', (request, response) => {
    response.render('contact-us', {
        config: json,
        helper: helper,
        page: {
            title: 'Contact Us',
            href: '/contact-us',
            page_type: "page"
        },
        layout: './layouts/main-layout'
    })
})

router.get('/contact-us/schedule-a-ride', (request, response) => {
    response.render('schedule-a-ride', {
        config: json,
        helper: helper,
        page: {
            title: 'Schedule a Ride',
            href: '/contact-us',
            page_type: "page"
        },
        layout: './layouts/main-layout'
    })
})

router.get('/privacy-policy', (request, response) => {
    response.render('privacy-policy', {
        config: json,
        helper: helper,
        page: {
            title: 'Privacy Policy',
            href: '/privacy-policy',
            page_type: "page"
        },
        layout: './layouts/main-layout'
    })
})

router.get('/accessibility', (request, response) => {
    response.render('accessibility', {
        config: json,
        helper: helper,
        page: {
            title: 'Accessibility',
            href: '/accessibility',
            page_type: "page"
        },
        layout: './layouts/main-layout'
    })
})

router.get('/site-map', (request, response) => {
    response.render('site-map', {
        config: json,
        helper: helper,
        page: {
            title: 'Site Map',
            href: '/site-map',
            page_type: "page"
        },
        layout: './layouts/main-layout'
    })
})

router.get('*', (request, response) => {
  response.render('404', {
    config: json,
    helper: helper,
    page: {
        title: 'Page not Found: 404',
        href: 'ERROR',
        page_type: "error-page"
    },
    layout: './layouts/main-layout'
  })
})

module.exports = router