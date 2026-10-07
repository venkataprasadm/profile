const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

for (const file of ["index.html", "resume/index.html", "jira-resume/index.html"]) {
  const html = read(file);
  assert.match(html, /Senior Product Owner/);
  assert.match(html, /C#/);
  assert.match(html, /\.NET/);
  assert.match(html, /Venkat_Prasad_Technical_DotNet_Resume\.pdf/);
  assert.doesNotMatch(html, /40%|20%|NISM|IRDA|Spotlight|Olympiad|OSCAR/);
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
  assert.equal(schemas.find((s) => s["@type"] === "Person").jobTitle, "Senior Product Owner");
}
for (const slug of ["outlook-integration", "intelliflo-iq", "money-alive", "client-review", "financial-planning", "crm", "acats", "global-trade"]) {
  const html = read(`projects/${slug}/index.html`);
  assert.match(html, /Developed|Implemented|Implement|Develop/);
  assert.match(html, /C#/);
  assert.doesNotMatch(html, /40%|20%/);
}
assert.match(read("index.html"), /Development is my primary responsibility/);
assert.match(read("index.html"), /https:\/\/github\.com\/venkataprasadm/);
assert.match(read("assets/js/main.js"), /createTextNode/);
assert.doesNotMatch(read("assets/js/main.js"), /AI-centric|AI-fluent|p\.innerHTML/);
new vm.Script(read("assets/js/main.js"));
assert.ok(fs.statSync(path.join(root, "assets/resume/Venkat_Prasad_Technical_DotNet_Resume.pdf")).size > 1000);
console.log("Technical profile: 3 resume views, 8 projects, structured data, assistant safety and PDF checks passed.");
