// jshint esversion:8

const puppeteer = require("puppeteer");
const inputValidate = require(__dirname + "/inputFilter");
const cheerio = require("cheerio");

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}

async function justClick() {
    const browser = await puppeteer.launch({
        headless: false,
        //slowMo: 250, // slow down by 250ms, for debugging
    });

    const page = await browser.newPage(); // make an array of pages/tabs

    await page.setViewport({ width: 1280, height: 800 });

    let search = inputValidate.validate("sunrise rubika");

    await page.goto("https://free-mp3-download.net/?q=" + search);

    const html = await page.content();

    const $ = cheerio.load(html);

    const htmlBody = $("#results_t").children().children().next().next().html();

    const songID = htmlBody.split(`"`);

    const songUrl = "https://free-mp3-download.net/" + songID[1];

    // console.log(songUrl);

    await page.goto(songUrl);

    await page.evaluate(() => {
        let test = document.querySelector('input[id="flac"]');
        test.click();
    });

    const html2 = await page.content();
    const $2 = cheerio.load(html2);
    const iframeElement = $2("iframe");
    console.log(iframeElement.html());

    await delay(15000);

    await page.click(".dl.btn.waves-effect.waves-light.blue.darken-4");

    console.log("download button clicked ");

    // await browser.close();
}

justClick();
