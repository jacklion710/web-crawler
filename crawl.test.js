const { test, expect } = require('@jest/globals')
const { normalizeURL } = require('./crawl.js')

test('inputs a URL with https:// and a trailing / and normalizes it', () => {
  expect(normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path')
})

test('inputs a URL with https:// and normalizes it', () => {
  expect(normalizeURL('https://blog.boot.dev/path')).toBe('blog.boot.dev/path')
})

test('inputs a URL with http:// and a trailing / and normalizes it', () => {
  expect(normalizeURL('http://blog.boot.dev/path/')).toBe('blog.boot.dev/path')
})

test('inputs a URL with http:// and normalizes it', () => {
  expect(normalizeURL('http://blog.boot.dev/path')).toBe('blog.boot.dev/path')
})

test('inputs a URL with a token and normalizes it', () => {
  expect(normalizeURL('http://blog.boot.dev/path/?d=e')).toBe('blog.boot.dev/path')
})