const express = require("express");
const router = express.Router();
const puppeteer = require("puppeteer");

async function scrape(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const data = await page.evaluate(() => {
    // Replace this with the actual data extraction logic
    return document.querySelector("h1").innerText;
  });

  return data;
}

router.post("/", async (req, res) => {
  const { url } = req.body;
  res.json({ data: await scrape(url) });
});

module.exports = router;
