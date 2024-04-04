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

module.exports = {
    normalizeURL,
    getURLsFromHTML
}