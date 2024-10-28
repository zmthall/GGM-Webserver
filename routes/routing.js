const express = require('express');
const helper = require('../files/helper');
const methods = require('../files/methods')
const mailer = require('../files/mailer')
const axios = require('axios')
const google_handler = require('../files/google-handler')
const path = require('path')
require('dotenv').config()
var router = express.Router();
const multer  = require('multer');

const upload = multer();
const google = new google_handler.GoogleAPIHandler(process.env.SPREADSHEET_ID, process.env.FOLDER_ID)
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
            meta_description: "Golden Gate Manor offers reliable Medicaid-certified transportation, assisted living, and medical supplies in Pueblo. Improve your quality of life with our trusted services.",
            href: "/",
            page_type: "home-page"
        },
        layout: './layouts/main-layout'
    })
})

router.get('/accessible-vans', (request, response) => {
    response.render('accessible-vans', {
        config: json,
        helper: helper,
        page: {
            title: 'Accessible Transportation',
            meta_description: "Golden Gate Manor offers wheelchair-accessible vans for reliable, barrier-free transportation. Enjoy safe, inclusive rides for medical appointments, errands, and more.",
            href: '/accessible-vans',
            page_type: "page"
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
            meta_description: "Golden Gate Manor offers 24/7 care, medication management, and daily living assistance in Pueblo, CO. Schedule a tour today and explore our Medicaid-certified facilities.",
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
            meta_description: "Golden Gate Manor provides reliable non-medical transportation for Medicaid recipients in Pueblo and Otero Counties. Call today to schedule your ride.",
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
            meta_description: "Golden Gate Manor offers reliable NEMT services for Medicaid-approved appointments across Colorado. Call to schedule a ride today!",
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
            title: 'About Golden Gate Manor Inc.',
            meta_description: "Discover Golden Gate Manor, a family-owned facility in Pueblo, CO, offering compassionate assisted living, NEMT, and medical supplies. Your quality of life is our mission!",
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
            meta_description: "Find Golden Gate Manor at 648 S. Union Ave., Pueblo, CO. Contact us at (719) 544-3231 for personalized care in assisted living, NEMT, and medical supplies.",
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
                title: 'Community Outreach and Events',
                meta_description: "Discover Golden Gate Manor's commitment to enhancing lives through community outreach. Learn about our support for local initiatives, upcoming events, and how we foster independence in Pueblo, CO.",
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
            meta_description: "Join our dedicated team at Golden Gate Manor, where we value reliability, teamwork, and compassion. Explore job opportunities in transportation, assisted living, and medical supplies today!",
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
            title: 'Golden Gate Manor - Application Form',
            meta_description: "Apply to join our dedicated team at Golden Gate Manor! Complete our job application form for full-time or part-time positions and take the first step toward a rewarding career in compassionate care.",
            href: '/about-us/employment/apply',
            page_type: "page"
        },
        layout: './layouts/main-layout'
    })
})

router.post('/about-us/employment/apply', upload.any(), async (request, response) => {
    const data = request.body;
    const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_KEY}&response=${data.captcha}`
    const reCaptcha = await axios.get(verifyURL)
    
    if(reCaptcha.data.score > 0.5) {
        response.status(200).send(JSON.stringify({ msg: 'Authenticated'}));
        
        const sheetsMetaData = (await google.getSheetMetaData()).data.sheets
        let sheetTitle;
    
        for(const idx in sheetsMetaData) {
            const title = sheetsMetaData[idx].properties.title.toLowerCase().split(' ').join('_')
            if(data.position.includes(title)) {
                sheetTitle = sheetsMetaData[idx].properties.title
            }
        }
        const files = request.files
        const fileNames = google.getFileNames(files)

        const parsedData = await google.dataParse(data, files, fileNames)
        google.pushSheetsData(parsedData, sheetTitle)
    } else {
        response.status(401).send(JSON.stringify({ msg: 'Not Authenticated'}))
    }
})

router.get('/contact-us', (request, response) => {
    response.render('contact-us', {
        config: json,
        helper: helper,
        page: {
            title: 'Contact Us',
            meta_description: "Get in touch with Golden Gate Manor! Reach out for inquiries about our transportation, assisted living, or medical supply services. We're here to help!",
            href: '/contact-us',
            page_type: "page"
        },
        layout: './layouts/main-layout'
    })
})

router.post('/contact-us/send-email', upload.none(), async (request, response) => {
    const data = request.body
    const message = {
        from: process.env.EMAIL_USERNAME,
        to: process.env.EMAIL_USERNAME,
        cc: process.env.CC_EMAILS,
        subject: `Message From: ${data.first_name} ${data.last_name}`,
        text: `Reason: ${data.reason} Name: ${data.first_name} ${data.last_name} Email Address: ${data.email} Phone Number: ${data.phone} Preferred Contact Method: ${data.contact_method} Message: ${data.message}`,
        html: `<p>Reason: ${data.reason}</p>
        <p>Name: ${data.first_name} ${data.last_name}</p>
        <p>Email Address: <a href="mailto:${data.email}">${data.email}</a></p>
        <p>Phone Number: <a href="tel:${data.phone}">${data.phone}</a></p>
        <p>Preferred Contact Method: ${data.contact_method}</p>
        <p>Message: ${data.message}</p>`
    }

    const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_KEY}&response=${data.captcha}`
    const reCaptcha = await axios.get(verifyURL)

    if(reCaptcha.data.score > 0.5) {
        mailer.send_email(message).catch(console.error)
        response.status(200).send(JSON.stringify({ msg: 'Authenticated'}));
    } else {
        response.status(401).send(JSON.stringify({ msg: 'Not Authenticated'}))
    }
})

router.get('/contact-us/thank-you', (request, response) => {
    response.render('thank-you', {
        config: json,
        helper: helper,
        page: {
            title: 'Thank You',
            meta_description: "Thank you for your submission to Golden Gate Manor! If you have questions about your inquiry, please contact us at (719) 544-3231. We're here to help!",
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
            meta_description: "Schedule your ride with Golden Gate Manor! Fill out our simple form to request non-medical or NEMT transportation services. Please allow 24-48 hours for trip requests.",
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
            meta_description: "Learn how Golden Gate Manor protects your personal information. Our Privacy Policy outlines data collection, usage, and your rights regarding privacy. Last updated June 11, 2024.",
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
            meta_description: "Learn about Golden Gate Manor's commitment to digital accessibility, ensuring all users can easily access our services and information. Contact us for assistance.",
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
            meta_description: "Explore the Golden Gate Manor sitemap for easy navigation of our services, including Assisted Living, Non-Medical and NEMT Transportation, and more.",
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