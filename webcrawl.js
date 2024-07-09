const cheerio = require('cheerio')
const axios = require("axios"); 

// function containsValues(str, object) {
//     console.log(str.includes('\n') || /\d/.test(str) || object[str].includes('https://'))
// }

function objTest(key, newValue, object) {
    var keyTest = key.includes('\n') || /\d/.test(key)
    var valueTest = newValue.includes('https') || Object.values(object).includes(newValue)

    if(key === 'policy')
        console.log(object[key])
    
    return valueTest || keyTest
}

async function WebCrawl() {
    console.log('\n\n\n\n\n-------------------------------------------------------------------')
    var pageHTML = await axios.get("localhost")
    var $ = cheerio.load(pageHTML.data)
    const pageURLS = {}

    $("a").each((index, element) => {
        console.log($(element).attr('ref'))
    })

    // console.log(pageURLS)
    
    // for(const idx in pageURLS) {
    //     pageHTML = await axios.get(`${pageURLS[idx]}`)
    //     $ = cheerio.load(pageHTML.data)
    //     $("a").each((index, element) => {
    //         var elInnerText = $(element).text().toLowerCase().replaceAll('-', '_').replaceAll(' ', '_')
    //         if(!objTest(elInnerText, $(element).attr('href'), pageURLS)) {
    //             pageURLS[elInnerText] = $(element).attr('href')
    //         }
    //     })
    // }

    // console.log(pageURLS)
}

WebCrawl()
