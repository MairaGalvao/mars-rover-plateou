//FIXME= DOESNT WORK THE UNIT TEST YET 

const puppeteer = require("puppeteer");

const typeInput = async (page, selector, text) => {
  await page.waitForSelector(selector);
  await page.focus(selector);
  await page.keyboard.type(text);
};

const clickElement = async (page, selector) => {
  await page.waitForSelector(selector);
  await page.click(selector);
};

const runUnitTest = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    // Your local development URL
    const baseUrl = "http://localhost:3000/";

    await page.goto(baseUrl);
    await typeInput(page, "#x-plateau-size", "15");
    await typeInput(page, "#y-plateau-size", "15");
    await page.waitForTimeout(2000);
    await clickElement(page, "#btn-size-plateau");
    await page.waitForTimeout(2000);
    await typeInput(page, "#x-init-coord", "1");
    await typeInput(page, "#y-init-coord", "2");
    await page.waitForTimeout(2000);
    await typeInput(page, "#init-point", "N");

    await clickElement(page, "#btn-rover-init-position");

    await page.waitForFunction(() => {
      const button = document.querySelector("#btn-rover-init-position");
      return button ? button.disabled : false;
    });

    const resultAfterNext = await page.$eval("#result-element-after-next", (element) => {
      return element?.innerText || '';
    });

    console.log('Result after pressing "Next" button:', resultAfterNext);

    if (resultAfterNext.includes('ExpectedText')) {
      console.log('Test passed: UI reflects the expected state after pressing "Next".');
    } else {
      console.error('Test failed: UI does not reflect the expected state after pressing "Next".');
    }

    console.log("All tests completed.");
  } catch (error) {
    console.error("Error during unit test:", error);
  } finally {
    await browser.close();
  }
};

runUnitTest();
