// jshint esversion:8

const puppeteer = require("puppeteer");
const inputValidate = require(__dirname + "/inputFilter");
// const getSongs = require(__dirname + "/getSongs");
const cheerio = require("cheerio");
const fs = require("fs");

let songs = [];

/*
function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}
*/

async function autoScroll(page) {
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            let totalHeight = 0;
            let distance = 100;
            let timer = setInterval(() => {
                let scrollHeight = document.body.scrollHeight;
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

fs.readFile("inputSongs/songs.txt", "utf8", (err, data) => {
    if (err) throw err;
    sendText(data);
});

const sendText = (data) => {
    songs = data.split("\r\n");

    // console.log(`In module: ${songs}`);
};

function waitTimerFun() {
    if (10 < 20) {
        return 5000;
    } else {
        return 10000;
    }
}

async function justClick() {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 250, // slow down by 250ms, for debugging
    });

    let page = [];
    let search = [];
    let html = [];
    let $ = [];
    let htmlBody = [];
    let songID = [];
    let songUrl = [];
    let waitTime = [];

    for (let i in songs) {
        page[i] = await browser.newPage(); // make an array of pages/tabs

        await page[i].setViewport({ width: 1280, height: 800 });

        // inital setup

        // console.log(songs);

        search[i] = inputValidate.validate(songs[i]);

        await page[i].goto("https://free-mp3-download.net/?q=" + search);

        html[i] = await page[i].content();

        $[i] = cheerio.load(html[i]);

        htmlBody[i] = $[i]("#results_t").children().children().next().next().html();

        songID[i] = htmlBody[i].split(`"`);

        songUrl[i] = "https://free-mp3-download.net/" + songID[i][1];

        // console.log(songUrl[i]);

        await page[i].goto(songUrl[i]);

        await autoScroll(page[i]);

        await page[i].evaluate(() => {
            let test = document.querySelector('input[id="flac"]');
            test.click();
        });

        if (i === 0) {
            let howLong = 0;
            await page[i].evaluate(() => {
                howLong = parseInt(prompt("How long will you take to solve the capcha?"));
            });
            await page[i].waitFor(howLong); // if it is the first time, then wait for some time for the user to solve the recaptcha
        }

        await page[i].evaluate(() => {
            let test = document.querySelector(".dl.btn.waves-effect.waves-light.blue.darken-4");
            test.click();
            console.log("download button clicked");
        });

        waitTime[i] = waitTimerFun();

        await page[i].waitFor(waitTime[i]);
    }

    await browser.close();
}

justClick();
