const { firefox } = require("playwright");

describe("z", () => {
  test("should render the component", async () => {
    // increase the timeout to 10 seconds
    // jest.setTimeout(10000);
    const browser = await firefox.launch();
    const page = await browser.newPage();
    await page.goto("http://localhost:3000");
    await page.waitForSelector("#test2");
    console.log("ffff");
    // await page.click("#test3");

    // const [response] = await Promise.all([
    //   page.waitForEvent("websocket", {
    //     predicate: ({ request }) =>
    //       request.url().startsWith("http://localhost:3000"),
    //   }),
    //   page.fill("#test2", "Hello, World2222!"),
    // ]);
    // console.log("here we r");
    // console.log(response.frame().url());
    // console.log(await response.text());
    // const component = await page.$("#test2");
    // expect(component).not.toBeNull();
    await page.fill("#test2", "Hello, World2222222!");
    await browser.close();
  });
});
