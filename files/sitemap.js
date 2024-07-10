const cheerio = require('cheerio')
const axios = require("axios")
const path = require('path')
const { simpleSitemapAndIndex } = require('sitemap');

async function webCrawl() {
    var pageHTML = await axios.get("localhost")
    var $ = cheerio.load(pageHTML.data)
    const pageURLS = {}

    $("a:not([rel~='nofollow'])").each((index, element) => {
        var elInnerText = $(element).text().toLowerCase().replaceAll('-', '_').replaceAll(' ', '_')
        if(Object.values(pageURLS).length === 0 || Object.values(pageURLS).length != 0 && !Object.values(pageURLS).includes($(element).attr('href'))) {
            pageURLS[elInnerText] = $(element).attr('href')
        }
    })
    
    for(const idx in pageURLS) {
        pageHTML = await axios.get(`${pageURLS[idx]}`)   
        $ = cheerio.load(pageHTML.data)
        $("a:not([rel~='nofollow'])").each((index, element) => {
            var elInnerText = $(element).text().toLowerCase().replaceAll('-', '_').replaceAll(' ', '_')
            if(!Object.values(pageURLS).includes($(element).attr('href'))) {
                pageURLS[elInnerText] = $(element).attr('href')
            }
        })
    }

    return pageURLS 
}

async function configureSitemapData() {
    const urls = await webCrawl()
    var data = []

    var count = 0
    for(const idx in urls) {
        var temp = { url: urls[idx] }
        if(count < 10) {
            if(count === 0)
                temp.priority = 1.0
            else
                temp.priority = 0.8
        } else {
            temp.priority = 0.6
        }
        count++
        data.push(temp)
    }
    return data
}

async function generateSitemap() {
    try {
        const sitemapItems = await configureSitemapData()
        const dir = path.join(__dirname, '../sitemap/')

        await simpleSitemapAndIndex({
            hostname: 'https://goldengatemanor.com',
            destinationDir: dir,
            sitemapHostname: `https://goldengatemanor.com/sitemaps/`,
            sourceData: sitemapItems,
        });

    } catch(err) {
        throw new Error(err.message)
    }
}

generateSitemap()