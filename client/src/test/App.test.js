// const { firefox } = require("playwright");

// describe("z", () => {
//   test("should render the component", async () => {
//     const browser = await firefox.launch();
//     const page = await browser.newPage();
//     await page.goto("http://localhost:3000");
//     console.log("ffff");
//     await page.getByPlaceholder("Name").click();
//     await page.getByPlaceholder("Name").fill("test 2 rrrr");
//     await page.getByPlaceholder("Email").click();
//     await page.getByPlaceholder("Email").press("Control+a");
//     await page.getByPlaceholder("Email").fill("testGmail in real time4");
//     await page.click("#changeLoginMode");

//     await page.getByPlaceholder("Email").fill("testGmail in real time4");
//     await page.click("#changeLoginMode");
//     await page.click("text=testGmail in real time4");
//     await browser.close();
//   });
// });

import { test, expect } from "@playwright/test";

test("Create a Record", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.click("#newSession");

  await page.getByPlaceholder("Name").fill("1234");
  await page.getByPlaceholder("Email").fill("sss");

  // await page.click("#changeLoginMode");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("React App");
});

test("Check the Record", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.click("#changeLoginMode");

  // Click the get started link.
  // await page.getByRole("cell", { name: "Test123" }).click();
  await page.click("text=sss");
  // await page.getByRole("cell", { name: "23411111", exact: true }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveTitle("React App");
});

test("Update the Record", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.click("#changeLoginMode");

  // Click the get started link.
  // await page.getByRole("cell", { name: "Test123" }).click();
  await page.click("text=sss");
  await page.getByPlaceholder("Name").fill("updated text");

  // await page.getByRole("cell", { name: "23411111", exact: true }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveTitle("React App");
});

test("Check the Updated Record", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.click("#changeLoginMode");

  // Click the get started link.
  // await page.getByRole("cell", { name: "Test123" }).click();
  await page.click("text=sss");
  // await page.getByRole("cell", { name: "23411111", exact: true }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveTitle("React App");
});
