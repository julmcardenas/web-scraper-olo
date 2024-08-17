const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');

async function scrape(url, tag, amt) {
  
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const data = await page.evaluate((selector, amt) => {
    // Replace this with the actual data extraction logic
    return Array.from(document.querySelectorAll(selector)).map(element => element.innerText).slice(0, amt);
  }, tag, amt);
  await browser.close()
  return data;
}
  

router.post('/', async (req, res) => {
    const { url, tag, amt } = req.body;
    res.json({data: await scrape(url, tag, amt)})
})

module.exports = router;