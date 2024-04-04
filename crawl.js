const { JSDOM } = require('jsdom')

function normalizeURL(urlString) {
    const url = new URL(urlString)
    const hostPath = `${url.hostname}${url.pathname}`
    return hostPath.endsWith('/') ? hostPath.slice(0, -1) : hostPath
}

function getURLsFromHTML(htmlBody, baseURL) {
    const urls = [];
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for (linkElement of linkElements) {
        if(linkElement.href.slice(0, 1) === '/') {
            // relative
            try {
                const urlObj = new URL(`${baseURL}${linkElement.href}`)
                urls.push(urlObj.href)
            } catch(err) {
                console.log('error with relative URL:', err.message)
            }
        } else {
            // absolute
            try {
                const urlObj = new URL(linkElement.href)
                urls.push(urlObj.href)
            } catch(err) {
                console.log('error with absolute URL:', err.message)
            }
        }
    }
    return urls
}

async function crawlPage(baseUrl, currentUrl, pages) {
    const baseUrlObj = new URL(baseUrl)
    const currentUrlObj = new URL(currentUrl)

    if (baseUrlObj.hostname !== currentUrlObj.hostname) {
        return pages
    }
    const normalizedCurrentUrl = normalizeURL(currentUrl)
    if (pages[normalizedCurrentUrl] > 0) {
        pages[normalizedCurrentUrl]++
        return pages
    }
    pages[normalizedCurrentUrl] = 1
    console.log(`Currently crawling: $currentUrl`)
    try {
        const resp = await fetch(currentUrl)
        if(resp.status > 399) {
            console.log('Error in fetching with status code: ', resp.status, ' on page: ', currentUrl)
            return pages
        }
        const contentType = resp.headers.get('content-type')
        if (!contentType.includes('text/html')) {
            console.log("Non HTML response content type: ", contentType, " on page: ", currentUrl)
            return pages
        }
        const htmlBody = await resp.text()
        const nextUrls = getURLsFromHTML(htmlBody, baseUrl)
        for (const nextUrl of nextUrls) {
            pages = await crawlPage(baseUrl, nextUrl, pages)
        }
    } catch(err) {
        console.log(`Error fetching from: `, currentUrl, err.message)
    }
    return pages
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}