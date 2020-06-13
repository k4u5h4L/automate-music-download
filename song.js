// jshint esversion:8

const puppeteer = require("puppeteer");
const inputValidate = require(__dirname + "/inputFilter");

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

    // await page.type(".input", "inside jagsy");

    // await page.click("#snd");

    // now wait for it to load

    // await delay(5000);

    /*
  await page.mouse.move(0, 0);
  await page.mouse.down();
  */

    // await page.keyboard.press("Tab");

    // await page.keyboard.press("Enter");

    /*
  let selector = 'input[id="flac"]';

  await page.evaluate(
    (selector) => document.querySelector(selector).click(),
    selector
  );
  */

    // await page.evaluate(() => {
    //     var test = document.querySelector('#flac > div:nth-child(2) > input[type="radio"]');
    //     test.click();
    // });

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

    //await browser.close();
}

justClick();
