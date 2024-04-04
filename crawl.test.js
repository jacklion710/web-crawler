const { test, expect } = require('@jest/globals')
const { normalizeURL, getURLsFromHTML } = require('./crawl.js')

// Tests for normalizeURL()
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

// Tests for getURLsFromHTML()

test('gets multiple anchor tags from an HTML document', () => {
  const html = `
    <html>
      <body>
        <a href="http://blog.boot.dev/path1">Link 1</a>
        <p>Some text</p>
        <a href="http://blog.boot.dev/path2">Link 2</a>
        <a href="http://blog.boot.dev/path3">Link 3</a>
      </body>
    </html>
  `;
  expect(getURLsFromHTML(html)).toEqual([
    'http://blog.boot.dev/path1',
    'http://blog.boot.dev/path2',
    'http://blog.boot.dev/path3',
  ]);
});

test('handles nested anchor tags', () => {
  const html = `
    <html>
      <body>
        <div>
          <a href="http://blog.boot.dev/path1">
            <span>Link 1</span>
          </a>
        </div>
        <a href="http://blog.boot.dev/path2">Link 2</a>
      </body>
    </html>
  `;
  expect(getURLsFromHTML(html)).toEqual([
    'http://blog.boot.dev/path1',
    'http://blog.boot.dev/path2',
  ]);
});

test('ignores anchor tags without href attribute', () => {
  const html = `
    <html>
      <body>
        <a>Link without href</a>
        <a href="http://blog.boot.dev/path">Link with href</a>
      </body>
    </html>
  `;
  expect(getURLsFromHTML(html)).toEqual(['http://blog.boot.dev/path']);
});

test('handles self-closing anchor tags', () => {
  const html = `
    <html>
      <body>
        <a href="http://blog.boot.dev/path1" />
        <a href="http://blog.boot.dev/path2"></a>
      </body>
    </html>
  `;
  expect(getURLsFromHTML(html)).toEqual([
    'http://blog.boot.dev/path1',
    'http://blog.boot.dev/path2',
  ]);
});

test('returns an empty array when no anchor tags are found', () => {
  const html = `
    <html>
      <body>
        <p>Some text</p>
        <div>More text</div>
      </body>
    </html>
  `;
  expect(getURLsFromHTML(html)).toEqual([]);
});