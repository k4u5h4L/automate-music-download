/*
const puppeteer = require("puppeteer");
const PuppeteerBlocker = require("@cliqz/adblocker-puppeteer");
const fetch = require("fetch"); // required 'fetch'

// import puppeteer from "puppeteer";
// import { PuppeteerBlocker } from "@cliqz/adblocker-puppeteer";
// import fetch from "cross-fetch"; // required 'fetch'

async function launchBrowser() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    PuppeteerBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
        blocker.enableBlockingInPage(page);
    });
}

launchBrowser();

*/

// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality
const puppeteer = require("puppeteer-extra");

// Add adblocker plugin, which will transparently block ads in all pages you
// create using puppeteer.
const AdblockerPlugin = require("puppeteer-extra-plugin-adblocker");
puppeteer.use(AdblockerPlugin());

// puppeteer usage as normal
puppeteer.launch({ headless: false, slowMo: 250 }).then(async (browser) => {
    const page = await browser.newPage();
    // Visit a page, ads are blocked automatically!
    await page.goto("https://www.google.com/search?q=rent%20a%20car");

    await page.waitFor(5 * 1000);
    // await page.screenshot({ path: "response.png", fullPage: true });

    console.log(`All done, check the screenshots. ✨`);
    await browser.close();
});
