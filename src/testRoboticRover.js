const puppeteer = require("puppeteer");
const assert = require('assert');

const typeInput = async (page, selector, text) => {
  await page.waitForSelector(selector);
  await page.focus(selector);
  await page.keyboard.type(text);
};

const clickElement = async (page, selector) => {
  await page.waitForSelector(selector);
  await page.click(selector);
};

// happy flow test
(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    await page.goto("http://localhost:3000/");

    // Plateau size's flow
    await typeInput(page, "#plateau-size", "15 15");

    await clickElement(page, "#btn-size-plateau");

    await typeInput(page, "#landing-rover", "3 3 E");
    await typeInput(page, "#instructions", "MRRMMRMRRM");

    await clickElement(page, "#add-rover");


    await clickElement(page, "#run-rover");

    // Expected output: Rover's final-position | 1 3
    const expected_result = "2 3 S";

    const resultsSelector = '#final-position-rover'
    await page.waitForSelector(resultsSelector)
    let element = await page.$(resultsSelector)
    let value = await page.evaluate(el => el.textContent, element)

    assert.equal(value, expected_result)

  } catch (error) {
    console.error("\nError during script execution:", error);
  } finally {
    await browser.close();
  }
})();


// assert cannot insert illegal plateau size
(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    await page.goto("http://localhost:3000/");

    // bad input
    await typeInput(page, "#plateau-size", "15 maira");

    // is button disabled?
    const is_disabled = await page.evaluate(() => document.querySelector('#btn-size-plateau[disabled]') !== null);
    
    // expect button to be disabled
    assert.equal(is_disabled, true)

  } catch (error) {
    console.error("\nError during script execution:", error);
  } finally {
    await browser.close();
  }
})();


// assert initial Rover location cant be greater than the actual Plateau size
(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    await page.goto("http://localhost:3000/");

    await typeInput(page, "#plateau-size", "1 1");

    await clickElement(page, "#btn-size-plateau");

    await typeInput(page, "#landing-rover", "3 3 E");
    await typeInput(page, "#instructions", "MRRMMRMRRM");


    // is button disabled?
    const is_disabled = await page.evaluate(() => document.querySelector('#add-rover[disabled]') !== null);
    
    // expect button to be disabled
    assert.equal(is_disabled, true)

  } catch (error) {
    console.error("\nError during script execution:", error);
  } finally {
    await browser.close();
  }
})();
