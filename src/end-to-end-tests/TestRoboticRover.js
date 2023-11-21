// TODO: remove timeouts 

const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    await page.goto("http://localhost:3000/");

    // Plateau size's flow
    await page.waitForSelector("#x-plateau-size");
    await page.focus("#x-plateau-size");
    await page.keyboard.type("15");
    await page.waitForSelector("#y-plateau-size");
    await page.focus("#y-plateau-size");
    await page.keyboard.type("15");
    await page.waitForTimeout(5000);

    await page.waitForSelector("#btn-size-plateau");
    await page.click("#btn-size-plateau");
    await page.waitForTimeout(2000);

    // Flow Rover's initial coordination
    await page.waitForSelector("#x-init-coord");
    await page.focus("#x-init-coord");
    await page.keyboard.type("1");

    await page.waitForSelector("#y-init-coord");
    await page.focus("#y-init-coord");
    await page.keyboard.type("2");
    await page.waitForSelector("#init-point");
    await page.focus("#init-point");
    await page.keyboard.type("N");

    await page.waitForTimeout(2000);
    await page.waitForSelector("#btn-rover-init-position");
    await page.click("#btn-rover-init-position");
    await page.waitForTimeout(2000);

    // Flow instructions user to the Rover
    await page.waitForSelector("#instructions-user");
    await page.focus("#instructions-user");

    await page.keyboard.type("LMLMLMLMM");
    await page.waitForSelector("#btn-instructions");
    await page.click("#btn-instructions");

    await page.waitForSelector("#final-position-rover");

    // Expected output: Rover's final-position | 1 3
    const expected_result = "1 3 N";
    await page.waitForTimeout(3000);

    const finalPosition = await page.$eval("#final-position-rover", (el) => el.innerText.trim());

    if (!finalPosition.includes(expected_result)) {
      console.error(`Unexpected final position: ${finalPosition}`);
    }
    else{
        console.log('TEST OK')
    }

    await page.waitForTimeout(5000);

    await page.screenshot({ path: "./screenshot.png", fullPage: true });
  } catch (error) {
    console.error("Error during script execution:", error);
  } finally {
    await browser.close();
  }
})();
