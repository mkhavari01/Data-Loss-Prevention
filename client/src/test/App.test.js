import { test, expect } from "@playwright/test";

test("Create a Record", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.click("#changeUpdateMode");
  await page.click("#newSession");

  await page.getByPlaceholder("Name").fill("1234");
  await page.getByPlaceholder("Email").fill("sss");

  await expect(page).toHaveTitle("React App");
});

test("Check the Record", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.click("#changeLoginMode");

  await page.click("text=1234");

  await expect(page).toHaveTitle("React App");
});

test("Update the Record", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.click("#changeLoginMode");

  await page.click("text=sss");
  await page.getByPlaceholder("Name").fill("updated text");

  await expect(page).toHaveTitle("React App");
});

test("Check the Updated Record", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.click("#changeLoginMode");

  await page.click("text=sss");

  await expect(page).toHaveTitle("React App");
});
