// jshint esversion:8

const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const fs = require("fs");

let songs = [];

fs.readFile("test.txt", "utf8", (err, data) => {
    if (err) throw err;
    sendText(data);
});

const sendText = (data) => {
    songs = data.split("\r\n");

    // console.log(songs);
};

async function justClick() {
    //const browser = await puppeteer.launch();
    /* to make it headless for speed and consistency, but first time download needs recaptcha. */

    // const pathToExtension = require("path").join(
    //   __dirname,
    //   "test-extensions/uBlock/platform/chromium/"
    // );

    const browser = await puppeteer.launch({
        headless: false,
        // args: [
        //   `--disable-extensions-except=${pathToExtension}`,
        //   `--load-extension=${pathToExtension}`,
        // ],

        // slowMo: 250, // slow down by 250ms, for debugging
    });

    let page = [];

    for (const i in songs) {
        page[i] = await browser.newPage(); // make an array of pages

        await page[i].setViewport({ width: 1280, height: 800 });

        // await page.goto("http://127.0.0.1:5500");
        await page[i].goto("https://free-mp3-download.net/");

        await page[i].type(".input", songs[i]);

        await page[i].click("#snd");

        // now wait for it to load

        /*
    const html = await page[i].content();

    const $ = cheerio.load(html);

    const pageSource = $("html");

    console.log(pageSource.html());
    */

        /*
    for (let i1 = 0; i1 < 4; i1++) {
      await page[i].keyboard.press("Tab");
    }

    await page[i].keyboard.press("Enter");

    */

        //let selector = ".btn.waves-effect.waves-light.blue.darken-4";

        // await page[i].click(".btn.waves-effect.waves-light.blue.darken-4");

        // await page[i].evaluate(
        //   (selector) => document.querySelector(selector).click(),
        //   selector
        // );
    }

    await browser.close();
}

justClick();
