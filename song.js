// jshint esversion:8

const puppeteer = require("puppeteer");
const inputValidate = require(__dirname + "/inputFilter");
const cheerio = require("cheerio");

/*
function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}
*/

let waitTime = 0;

async function autoScroll(page) {
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}

function doThis() {
    if (10 < 20) {
        waitTime = 5000;
    } else {
        waitTime = 10000;
    }
}

async function justClick() {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 250, // slow down by 250ms, for debugging
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

    await autoScroll(page);

    await page.evaluate(() => {
        let test = document.querySelector('input[id="flac"]');
        test.click();
    });

    // await page.waitFor(15000);

    /*
    const html2 = await page.content();
    const $2 = cheerio.load(html2);
    const iframeElement = $2("main");
    console.log(iframeElement.html());
    */

    // if (i === 0) {
    // await page.waitFor(5000); // if it is the first time, then wait for some time to solve the recaptcha for the user
    // }

    await page.evaluate(() => {
        let test = document.querySelector(".dl.btn.waves-effect.waves-light.blue.darken-4");
        test.click();
        console.log("download button clicked");
    });

    doThis();

    await page.waitFor(waitTime);

    await browser.close();
}

justClick();
