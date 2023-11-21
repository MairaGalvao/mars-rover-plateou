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

const waitForElement = async (page, selector) => {
  await page.waitForSelector(selector);
};

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    await page.goto("http://localhost:3000/");

    // Plateau size's flow
    await typeInput(page, "#x-plateau-size", "15");
    await typeInput(page, "#y-plateau-size", "15");
    await page.waitForTimeout(2000);
    await clickElement(page, "#btn-size-plateau");
    await page.waitForTimeout(2000);

    await typeInput(page, "#x-init-coord", "1");
    await typeInput(page, "#y-init-coord", "2");
    await typeInput(page, "#init-point", "N");
    await page.waitForTimeout(2000);
    await clickElement(page, "#btn-rover-init-position");
    await page.waitForTimeout(2000);

    await typeInput(page, "#instructions-user", "LMLMLMLMM");
    await clickElement(page, "#btn-instructions");
    await waitForElement(page, "#final-position-rover");

    // Expected output: Rover's final-position | 1 3
    const expected_result = "1 3 N";
    await page.waitForTimeout(3000);

    const finalPosition = await page.$eval("#final-position-rover", (el) => el.innerText.trim());

    if (!finalPosition.includes(expected_result)) {
      console.error(`Unexpected final position: ${finalPosition}`);
    } else {
      console.log('Test Robotic Rover passed');
    }

    await page.waitForTimeout(5000);

    await page.screenshot({ path: "./screenshot.png", fullPage: true });
  } catch (error) {
    console.error("Error during script execution:", error);
  } finally {
    await browser.close();
  }
})();
