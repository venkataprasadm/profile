# Venkata Prasad Muraharisetty Portfolio

Static GitHub Pages portfolio for a hands-on C#/.NET developer with additional product ownership responsibilities. Current role: Senior Product Owner. Focus: enterprise applications, ASP.NET Core, REST APIs, SQL Server and integrations.

## Structure

- `index.html` - premium portfolio homepage
- `projects/` - engineering implementation case studies
- `blog/` - 45 technical blog posts plus index
- `jira-resume/` - interactive Jira-board resume mode
- `assets/resume/` - published PDF resume
- `resume/` - resume preview and supporting SEO page
- `assets/css/style.css` and `assets/js/main.js` - lightweight frontend
- `sitemap.xml`, `robots.txt`, `rss.xml` - SEO assets

Run `node scripts/generate-site.js` to regenerate the static pages from structured content.

Validate with `node scripts/check-site.js` and `node scripts/check-technical-profile.js`.
Preview locally with `node scripts/serve-static.js` (default port 4173).
Pushes to main deploy through the existing GitHub Pages workflow.