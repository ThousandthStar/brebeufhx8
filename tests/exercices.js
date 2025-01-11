import { JSDOM } from "jsdom";
import { ZenRows } from "zenrows";
import dotenv from 'dotenv';
import puppeteer from 'puppeteer-core';
dotenv.config();

(async () => {
    const url = "https://www.google.com/search?q=logarithm+worksheet+pdf";

    
    const connectionURL = `wss://browser.zenrows.com?apikey=${process.env.ZENROWS_KEY}`;

    (async () => {
        const browser = await puppeteer.connect({ browserWSEndpoint: connectionURL });
        const page = await browser.newPage();
        await page.goto(url);
        const body = await page.$('#search')
        const content = await body.evaluate(e => e.innerHTML)
        console.log(getFirstTwoNonVideoLinks(content))
        await browser.close()
    })();
})();

function getFirstTwoNonVideoLinks(htmlString) {
    // 1. Parse the HTML into a DOM Document
    const dom = new JSDOM(htmlString);
    const { document } = dom.window;
    
    // Query all anchors that typically represent Google search results
    // Adjust selectors as needed for your structure
    const allResultAnchors = document.querySelectorAll('.tF2Cxc .yuRUbf a');

    // Convert the NodeList to an array and filter out “video”-type links
    const nonVideoAnchors = Array.from(allResultAnchors).filter(a => {
        const hrefLower = a.href.toLowerCase();
        return !hrefLower.includes('youtube.com') && !hrefLower.includes('video');
    });

    // Return the first two URLs from the filtered list
    return nonVideoAnchors.slice(0, 2).map(a => a.href);
  }