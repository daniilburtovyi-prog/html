const fs = require("fs");
const { JSDOM } = require("jsdom");

const html = fs.readFileSync("./index.html", "utf8");
const css = fs.readFileSync("./styles.css", "utf8");
const dom = new JSDOM(html);
const document = dom.window.document;

test("1.1: title має бути 'My Learning Journey'", () => {
  expect(document.querySelector("title").textContent.trim()).toBe("My Learning Journey");
});

test("1.2: header має h1 з правильним текстом", () => {
  const h1 = document.querySelector("header h1");
  expect(h1).not.toBeNull();
  expect(h1.textContent.trim()).toBe("Welcome to My Website");
});

test("1.3: section має p з 20+ символами", () => {
  const p = document.querySelector("#introduction p");
  expect(p).not.toBeNull();
  expect(p.textContent.length).toBeGreaterThanOrEqual(20);
});

test("2.1: body має background-color #f0f0f0", () => {
  expect(css).toMatch(/body\s*{[^}]*background-color:\s*#f0f0f0\s*;/);
});

test("2.2: h1 має color blue і text-align center", () => {
  expect(css).toMatch(/h1\s*{[^}]*color:\s*blue\s*;/);
  expect(css).toMatch(/h1\s*{[^}]*text-align:\s*center\s*;/);
});

test("2.3: p має padding 10px і margin 20px", () => {
  expect(css).toMatch(/p\s*{[^}]*padding:\s*10px\s*;/);
  expect(css).toMatch(/p\s*{[^}]*margin:\s*20px\s*;/);
});

test("3.1: nav має ul з 3 li, кожен має a", () => {
  const links = document.querySelectorAll("nav ul li a");
  expect(links.length).toBe(3);
});

test("3.2: у CSS nav ul і li правильно стилізовані", () => {
  expect(css).toMatch(/nav\s+ul\s*{[^}]*list-style-type:\s*none\s*;/);
  expect(css).toMatch(/nav\s+li\s*{[^}]*display:\s*inline-block\s*;/);
  expect(css).toMatch(/nav\s+li\s*{[^}]*margin-right:\s*15px\s*;/);
});

test("4.1: у gallery-grid є 6 зображень", () => {
  const imgs = document.querySelectorAll(".gallery-grid img");
  expect(imgs.length).toBe(6);
});

test("4.2: gallery-grid має display grid", () => {
  expect(css).toMatch(/\.gallery-grid\s*{[^}]*display:\s*grid\s*;/);
});
