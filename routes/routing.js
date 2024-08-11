const express = require('express');
const helper = require('../files/helper.js');
const methods = require('../files/methods.js')
const mailer = require('../files/mailer.js')
const path = require('path')
var router = express.Router();


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

router.get('/nemt-transportation', (request, response) => {
    response.render('nemt-transportation', {
        config: json,
        helper: helper,
        page: {
            title: 'Non-Emergency Medical Transportation',
            href: '/nemt-transportation',
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

// router.get('/about-us/blog', (request, response) => {
//     response.render('about', {
//         title: 'Golden Gate Manor Blog',
//         layout: './layouts/main-layout'
//     })
// })

router.get('/about-us/community', (request, response) => {
    const filePath = '/images/community/'
    const dir = path.join(__dirname, '..', 'static' + filePath)
    const getImageUrls = async () => {
        let outreachImages = {
            fileName: [],
            description: [],
            url: []
        }
        const fileNames = await methods.getDirFileNames(dir)
        for(const idx in fileNames) {
            outreachImages.fileName.push(fileNames[idx])
            outreachImages.description.push(`Outreach content: ${fileNames[idx].split('.')[0]}`)
            outreachImages.url.push(filePath + fileNames[idx])
        }

        response.render('community', {
            config: json,
            helper: helper,
            page: {
                title: 'Community',
                href: '/about-us/community',
                page_type: "page"
            },
            outreachImages,
            layout: './layouts/main-layout'
        })
    }

    getImageUrls()
})

router.get('/about-us/employment', (request, response) => {
    response.render('employment', {
        config: json,
        helper: helper,
        page: {
            title: 'Employment Opportunities',
            href: '/about-us/employment',
            page_type: "page"
        },
        layout: './layouts/main-layout'
    })
})

router.get('/about-us/employment/apply', (request, response) => {
    response.render('application', {
        config: json,
        helper: helper,
        page: {
            title: 'Golden Gate Manor Inc Job Application',
            href: '/about-us/employment/apply',
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

router.post('/contact-us/send-email', (request, response) => {
    const data = {
        reason: request.body.reason,
        first_name: request.body.first_name,
        last_name: request.body.last_name,
        email: request.body.email,
        phone: request.body.phone,
        contact_method: request.body.contact_method,
        message: request.body.message
    }

    const message = {
        from: process.env.EMAIL_USERNAME,
        to: 'goldengatemedicalsupplies@gmail.com',
        subject: `Message From: ${data.first_name} ${data.last_name}`,
        text: `Reason: ${data.reason} Name: ${data.first_name} ${data.last_name} Email Address: ${data.email} Phone Number: ${data.phone} Preferred Contact Method: ${data.contact_method} Message: ${data.message}`,
        html: `<p>Reason: ${data.reason}</p>
        <p>Name: ${data.first_name} ${data.last_name}</p>
        <p>Email Address: <a href="mailto:${data.email}">${data.email}</a></p>
        <p>Phone Number: <a href="tel:${data.phone}">${data.phone}</a></p>
        <p>Preferred Contact Method: ${data.contact_method}</p>
        <p>Message: ${data.message}</p>`
    }

    mailer.send_email(message).catch(console.error)

    response.status(200).redirect('/contact-us/thank-you')
})

router.get('/contact-us/thank-you', (request, response) => {
    response.render('thank-you', {
        config: json,
        helper: helper,
        page: {
            title: 'Thank You',
            href: '/contact-us/thank-you',
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

router.get('/policy/privacy-policy', (request, response) => {
    response.render('privacy-policy', {
        config: json,
        helper: helper,
        page: {
            title: 'Privacy Policy',
            href: '/policy/privacy-policy',
            page_type: "policy-page"
        },
        layout: './layouts/main-layout'
    })
})

router.get('/policy/accessibility', (request, response) => {
    response.render('accessibility', {
        config: json,
        helper: helper,
        page: {
            title: 'Accessibility',
            href: '/policy/accessibility',
            page_type: "policy-page"
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

router.get('/sitemap-:int.xml.gz', (req, res) => {
    return res.sendFile(path.join(__dirname, '../sitemap', `sitemap-${req.params.int}.xml.gz`));
});

router.get('/robots.txt', (req, res) => {
    return res.sendFile(path.join(__dirname, '../sitemap', 'robots.txt'));
});

router.get('*', (request, response) => {
  response.render('404', {
    config: json,
    helper: helper,
    page: {
        title: 'Page not Found: 404',
        href: 'ERROR',
        page_type: "page"
    },
    layout: './layouts/main-layout'
  })
  response.status(404).end()
})

module.exports = router