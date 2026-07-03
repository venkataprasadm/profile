const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const htmlFiles = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.name === ".git" || full.includes(`${path.sep}assets${path.sep}vendor${path.sep}`)) continue;
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith(".html")) htmlFiles.push(full);
  }
}

walk(root);

const badRefs = [];
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    let url = match[1];
    if (/^(https?:|mailto:|javascript:|#)/.test(url) || url.startsWith("data:")) continue;
    url = url.split("#")[0];
    if (!url) continue;
    let target = path.resolve(path.dirname(file), url);
    if (url.endsWith("/")) target = path.join(target, "index.html");
    if (!fs.existsSync(target)) badRefs.push(`${path.relative(root, file)} -> ${match[1]}`);
  }
}

const templateTerms = ["BootstrapMade", "Designer, Developer", "Introductiuon", "email@example.com", "testimonials"];
const leftovers = [];
for (const file of htmlFiles.concat([path.join(root, "assets/css/style.css"), path.join(root, "assets/js/main.js")])) {
  if (!fs.existsSync(file)) continue;
  const text = fs.readFileSync(file, "utf8");
  for (const term of templateTerms) {
    if (text.includes(term)) leftovers.push(`${path.relative(root, file)} contains ${term}`);
  }
}

console.log(`HTML files: ${htmlFiles.length}`);
console.log(`Broken local references: ${badRefs.length}`);
console.log(`Template leftovers: ${leftovers.length}`);

if (badRefs.length || leftovers.length) {
  console.log([...badRefs, ...leftovers].join("\n"));
  process.exit(1);
}
