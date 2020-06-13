// jshint esversion:8

const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Specify the place you want the tempetature of. \n> ", (answer) => {
  // TODO: Log the answer in a database
  // console.log(`Thank you for your valuable feedback: ${answer}`);

  scrap(answer);

  rl.close();
});

async function scrap(place) {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 250, // slow down by 250ms
  });
  const page = await browser.newPage();

  await page.setViewport({ width: 1280, height: 800 });
  await page.goto("https://openweathermap.org/find?q=" + place);

  // screenshot part
  // await page.screenshot({
  //   path: "screenshots/screenshot-puppeteer.png",
  //   fullPage: true,
  // });

  // page source part
  const html = await page.content();

  const $ = cheerio.load(html);

  const urlElems = $(".badge.badge-info");

  const data = urlElems.html();

  if (data == null) {
    console.log("Place doesnt exist");

    await browser.close();

    return false;
  }

  console.log(`Temperature in ${place} is ${data.slice(0, 2)}°C`);

  // console.log(urlElems.html());

  await browser.close();
}
