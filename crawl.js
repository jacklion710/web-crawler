const myURL = new URL('https://example.org')
function normalizeURL(url) {
    console.log('myURL.href')
}

normalizeURL(myURL)

module.exports = {
    normalizeURL
}