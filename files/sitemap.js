const cheerio = require('cheerio')
const axios = require("axios")

async function webCrawl() {
    console.log('\n\n\n\n\n-------------------------------------------------------------------')
    var pageHTML = await axios.get("localhost")
    var $ = cheerio.load(pageHTML.data)
    const pageURLS = {}

    $("a:not([rel~='nofollow'])").each((index, element) => {
        var elInnerText = $(element).text().toLowerCase().replaceAll('-', '_').replaceAll(' ', '_')
        if(Object.values(pageURLS).length === 0 || Object.values(pageURLS).length != 0 && !Object.values(pageURLS).includes($(element).attr('href'))) {
            pageURLS[elInnerText] = $(element).attr('href')
        }
    })
    
    var page = []
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
}

module.exports = {
    
}
