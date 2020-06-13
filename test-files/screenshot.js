// jshint esversion:8

const puppeteer = require("puppeteer");

async function takeScreenshot() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 250, // slow down by 250ms
  });
  const page = await browser.newPage();

  await page.setViewport({ width: 1280, height: 800 });
  await page.goto("https://theparanoidscripts.github.io");

  // screenshot part
  await page.screenshot({
    path: "screenshots/screenshot-puppeteer.png",
    fullPage: true,
  });

  console.log("Screenshot taken");

  await browser.close();
}

takeScreenshot();
