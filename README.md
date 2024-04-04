# Web Crawler

This is a simple web crawler that generates an "internal links" report for arbitrary websites. It can be used for general SEO and web development purposes.

## Features

* Crawls a given website and extracts internal links
* Normalizes URLs to handle relative and absolute paths
* Handles common edge cases and errors gracefully
* Provides a report of the found internal links and their count

## Installation

1. Make sure you have Node.js installed on your machine.
2. Clone this repository or download the source code.
3. Open a terminal and navigate to the project directory.
4. Run `npm install` to install the required dependencies.

## Usage

1. Open a terminal and navigate to the project directory.
2. Run the following command, replacing `<website-url>` with the URL of the website you want to crawl:

```bash
node main.js <website-url>
```

For example:

```bash
node main.js https://example.com
```

3. The crawler will start crawling the specified website and display the progress in the console.
4. Once the crawling is complete, the script will generate an "internal links" report showing the found links and their count.

## Configuration

You can customize the behavior of the web crawler by modifying the code in the `crawl.js` file. Here are a few things you can adjust:

* `normalizeURL()` function: Modify how URLs are normalized and cleaned up.
* `getURLsFromHTML()` function: Customize how links are extracted from the HTML content.
* `crawlPage()` function: Adjust the crawling logic, error handling, and logging.

## Dependencies

This web crawler relies on the following dependencies:

* jsdom: A JavaScript implementation of the WHATWG DOM and HTML standards, used for parsing and manipulating HTML.
* node-fetch: A lightweight module that brings the `fetch` API to Node.js, used for making HTTP requests.
