function normalizeURL(urlString) {
    const url = new URL(urlString)
    const hostPath = `${url.hostname}${url.pathname}`
    return hostPath.endsWith('/') ? hostPath.slice(0, -1) : hostPath
}

module.exports = {
    normalizeURL
}