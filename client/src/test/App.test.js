const { firefox } = require("playwright");

describe("z", () => {
  test("should render the component", async () => {
    const browser = await firefox.launch();
    const page = await browser.newPage();
    await page.goto("http://localhost:3000");
    console.log("ffff");
    await page.click("#changeLoginMode");
    await page.click("#changeLoginMode");
    await page.getByPlaceholder("Name").click();
    await page.getByPlaceholder("Name").fill("test 2 rrrr");
    await page.getByPlaceholder("Email").click();
    await page.getByPlaceholder("Email").press("Control+a");
    await page.getByPlaceholder("Email").fill("testGmail in real time");

    await browser.close();
  });
});
