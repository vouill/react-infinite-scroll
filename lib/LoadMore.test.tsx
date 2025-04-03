import puppeteer, { Browser, Page } from "puppeteer"
import { expect, describe, beforeAll, test, afterAll } from "vitest"

describe("Loadmore", () => {
  let browser: Browser
  let page: Page

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox"],
    })
    page = await browser.newPage()
  })

  afterAll(() => browser.close())

  test("Should correctly load more upon scroll down", async () => {
    await page.goto("http://localhost:3000")
    await page.waitForFunction(
      'document.querySelector("body").innerText.includes("lorem")'
    )
    const itemCount = await page.$$eval(".item", (e) => e.length)
    expect(itemCount).toBe(100)

    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight)
    })
    await page.waitForFunction(
      'document.querySelectorAll(".item").length > 100'
    )
    const itemCountAfterIntersection = await page.$$eval(
      ".item",
      (e) => e.length
    )
    expect(itemCountAfterIntersection).toBe(200)
  })
})
