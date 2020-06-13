// jshint esversion:8

const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  "Specify the country you want to see the confirmed cases. \n> ",
  (answer) => {
    // TODO: Log the answer in a database
    // console.log(`Thank you for your valuable feedback: ${answer}`);

    scrap(answer);

    rl.close();
  }
);

async function scrap(place) {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 250, // slow down by 250ms
  });

  // const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setViewport({ width: 1280, height: 800 });
  await page.goto("https://www.coronatracker.com/country/" + place + "/");

  // screenshot part
  // await page.screenshot({ path: "screenshot-puppeteer.png", fullPage: true });

  // page source part
  const html = await page.content();

  const $ = cheerio.load(html);

  const confirmed = $(".text-2xl.font-bold.text-red-600");
  const recovered = $(".text-2xl.font-bold.text-green-600");

  const confirmedData = confirmed.text();
  const recoveredData = recovered.text();

  if (confirmedData == "" || recoveredData == "") {
    console.log("Place doesnt exist");

    await browser.close();

    return false;
  }

  console.log(
    `Confirmed cases in ${place} is ${confirmedData.trim()} and ${recoveredData.trim()} have recovered in that country`
  );

  // console.log(urlElems.html());

  await browser.close();
}
