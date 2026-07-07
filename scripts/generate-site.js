const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const siteUrl = "https://venkataprasadm.com";
const author = "Venkata Prasad Muraharisetty";
const email = "venkataprasadmcareer@outlook.com";
const phone = "+91 8106884134";
const location = "Hyderabad, India";
const resumePdf = "assets/resume/Venkat_Prasad_Senior_Product_Owner_Resume.pdf";

const ensure = (dir) => fs.mkdirSync(path.join(root, dir), { recursive: true });
const write = (file, body) => {
  const out = path.join(root, file);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, body.trimStart(), "utf8");
};
const slugify = (text) => text.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const escapeHtml = (text) => String(text).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const absolute = (url) => `${siteUrl}/${url.replace(/^\/+/, "")}`;

const nav = [
  ["About", "/#about"],
  ["Experience", "/#experience"],
  ["Products", "/#products"],
  ["Skills", "/#skills"],
  ["Blog", "/blog/"],
  ["Jira Resume", "/jira-resume/index.html"],
  ["Resume", `/${resumePdf}`],
  ["Contact", "/#contact"],
];

const products = [
  {
    title: "Outlook Integration",
    slug: "outlook-integration",
    label: "Advisor productivity",
    problem: "Advisors were managing client communication in Outlook while CRM activity, follow-ups, and compliance context lived in a separate enterprise workflow.",
    need: "Reduce context switching, improve activity capture, and make client communication traceable inside the wealth management operating model.",
    role: "Owned discovery, backlog shaping, stakeholder alignment, and delivery trade-offs across product, engineering, QA, support, and client-facing teams.",
    architecture: "API-led integration between Microsoft 365, CRM services, authentication, activity capture, and audit-friendly synchronization flows.",
    technologies: ["Microsoft Graph", "REST APIs", "OAuth", "CRM", "Event-driven sync", "Azure"],
    outcome: "Created a cleaner advisor workflow that linked daily communication to client records and improved confidence in captured engagement history.",
    learnings: "Product value came from workflow fit as much as integration depth; reliability, permissions, and clear error recovery mattered most."
  },
  {
    title: "Intelliflo IQ",
    slug: "intelliflo-iq",
    label: "AI product capability",
    problem: "Advisors were spending hours manually populating client and advice data across a large enterprise wealth platform.",
    need: "Bring AI-powered assistance into advisor workflows while preserving trust, explainability, governance, and enterprise adoption controls.",
    role: "Led Agile delivery for AI-powered Engagement and Advice Assistants, turning strategic objectives into MVP scope, epics, stories, acceptance criteria, and release-ready increments.",
    architecture: "AI-assisted advisor experience layered over governed platform data, 190+ target fields, permissions, service APIs, telemetry, and feedback loops.",
    technologies: ["AI products", "LLMs", "SAFe Agile", "Product analytics", "APIs", "Cloud", "Observability"],
    outcome: "Automated data population across 190+ platform fields, reducing manual administrative effort from hours to minutes and improving advisor productivity.",
    learnings: "AI products win when they are embedded in real workflow moments, measured with adoption signals, and delivered with quality gates that enterprise teams can trust."
  },
  {
    title: "Money Alive Integration",
    slug: "money-alive",
    label: "Financial education",
    problem: "Firms needed a smoother way to connect financial education journeys with client engagement and advice workflows.",
    need: "Integrate education content into the client lifecycle so advisors could support informed decisions with less operational friction.",
    role: "Managed business requirements, partner coordination, backlog refinement, integration scope, and release readiness.",
    architecture: "Partner-service integration connecting client context, secure launch points, engagement state, and CRM follow-up actions.",
    technologies: ["Partner APIs", "SSO", "CRM", "REST", "WealthTech", "Secure integrations"],
    outcome: "Improved the path from client education to advisor action and supported a 20% increase in active client engagement metrics for pilot advisory firms.",
    learnings: "External integrations need crisp contracts, fallback states, and shared definitions of completion and value."
  },
  {
    title: "Client Review",
    slug: "client-review",
    label: "Advice workflow",
    problem: "Client review preparation required advisors to assemble information across CRM, planning, reporting, and communication tools.",
    need: "Create a structured workflow for preparing, conducting, and following up on recurring client review meetings.",
    role: "Drove product discovery, workflow mapping, prioritization, release sequencing, and stakeholder communication.",
    architecture: "Workflow capability spanning client data, task orchestration, document context, review notes, and post-meeting actions.",
    technologies: ["Workflow design", "CRM", "APIs", "Reporting", "Agile delivery", "Product discovery"],
    outcome: "Reduced manual preparation effort and improved consistency across client service journeys.",
    learnings: "The best workflow products respect how professionals already think, then remove the operational drag around that work."
  },
  {
    title: "Financial Planning",
    slug: "financial-planning",
    label: "Core advice capability",
    problem: "Planning workflows needed to connect fact find data, assumptions, advice models, and client-facing outputs more coherently.",
    need: "Support advisors with reliable planning journeys that make data capture, scenario thinking, and recommendations easier to manage.",
    role: "Balanced roadmap priorities, regulated-domain constraints, engineering complexity, and advisor experience across releases.",
    architecture: "Domain-led planning services connected to client profiles, calculations, validations, documents, and reporting.",
    technologies: ["Financial planning", "Domain modeling", "Microservices", "REST APIs", "Data validation", "Cloud"],
    outcome: "Strengthened a business-critical advice workflow and improved product clarity across planning-adjacent features.",
    learnings: "Financial planning demands precise domain language, careful edge-case handling, and excellent change communication."
  },
  {
    title: "CRM Enhancements",
    slug: "crm",
    label: "Enterprise CRM",
    problem: "Advisory firms needed CRM workflows that could reflect different operating models without fragmenting the product experience.",
    need: "Improve client, household, activity, task, and relationship management across enterprise use cases.",
    role: "Owned backlog definition, discovery synthesis, user story quality, acceptance criteria, and dependency management.",
    architecture: "Configurable CRM capabilities built on shared client domain services, permissions, integrations, and analytics signals.",
    technologies: ["CRM", "SaaS configuration", "REST", "Role-based access", "Product metrics", "Agile"],
    outcome: "Delivered practical workflow improvements while protecting platform consistency and long-term maintainability.",
    learnings: "Enterprise configurability must be designed with boundaries; every option creates support and analytics consequences."
  },
  {
    title: "ACATS",
    slug: "acats",
    label: "Account transfers",
    problem: "Account transfer journeys are operationally sensitive, exception-heavy, and dependent on reliable status visibility.",
    need: "Improve transfer workflow clarity for users managing brokerage-account movement and related operational events.",
    role: "Converted business process complexity into product flows, acceptance criteria, integration scenarios, and release plans.",
    architecture: "Transfer workflow connected to account data, status events, operational queues, audit trails, and integration touchpoints.",
    technologies: ["Financial services", "Event workflows", "APIs", "Operations", "Auditability", "Reporting"],
    outcome: "Supported more transparent account-transfer handling with clearer process states and operational follow-up.",
    learnings: "Status modeling is the product; users need to know what happened, what is blocked, and what action comes next."
  },
  {
    title: "Global Trade Management",
    slug: "global-trade",
    label: "Enterprise integration",
    problem: "Trade workflows required dependable integration across enterprise systems, message queues, and operational data flows.",
    need: "Deliver scalable integration behavior for global trade processes while reducing manual intervention and ambiguity.",
    role: "Contributed as an engineer and later used that architecture background to shape product decisions with technical depth.",
    architecture: "Enterprise integration patterns using IBM MQ, service boundaries, data transformation, monitoring, and exception handling.",
    technologies: ["IBM MQ", "Global trade", "Enterprise integrations", "SQL", "Services", "Monitoring"],
    outcome: "Built a strong foundation in complex enterprise delivery that now informs technical product management decisions.",
    learnings: "The product manager with architecture fluency can ask better questions earlier and reduce delivery risk."
  }
];

const posts = [
  ["technical-product-management-in-enterprise-saas", "Technical Product Management in Enterprise SaaS", "How senior product owners bridge strategy, architecture, and delivery in complex SaaS platforms.", ["Technical Product Management", "Enterprise SaaS", "Leadership"]],
  ["wealth-management-product-strategy", "Wealth Management Product Strategy for Modern Advisory Firms", "A practical strategy model for CRM, planning, reporting, and advisor productivity products.", ["Wealth Management", "Product Strategy", "FinTech"]],
  ["product-discovery-for-regulated-saas", "Product Discovery in Regulated SaaS Environments", "Discovery techniques that work when compliance, risk, and enterprise buyers shape the roadmap.", ["Product Discovery", "SaaS", "Stakeholders"]],
  ["roadmapping-with-outcomes", "Roadmapping With Outcomes Instead of Feature Lists", "How to build roadmaps that communicate intent, trade-offs, and measurable product value.", ["Roadmapping", "OKRs", "Product Strategy"]],
  ["prioritization-frameworks-for-product-owners", "Prioritization Frameworks for Senior Product Owners", "A senior-level guide to RICE, opportunity scoring, cost of delay, and judgment-led prioritization.", ["Prioritization", "Product Owner", "Agile"]],
  ["stakeholder-management-without-theater", "Stakeholder Management Without Theater", "How to create trust with executives, engineering, sales, support, and enterprise clients.", ["Stakeholder Management", "Leadership", "Communication"]],
  ["agile-delivery-for-enterprise-platforms", "Agile Delivery for Enterprise Platforms", "Adapting Scrum and agile delivery to dependencies, architecture, governance, and release trains.", ["Agile", "Scrum", "Enterprise SaaS"]],
  ["backlog-management-that-scales", "Backlog Management That Scales", "How to keep a backlog useful when the product, teams, and customer base become complex.", ["Backlog", "Product Owner", "Delivery"]],
  ["api-design-for-product-managers", "API Design for Product Managers", "The product questions every PM should ask before committing to an API contract.", ["API Design", "REST APIs", "Technical PM"]],
  ["microservices-product-thinking", "Microservices Require Product Thinking", "Why service boundaries, team ownership, and product outcomes belong in the same conversation.", ["Microservices", "Architecture", "SaaS"]],
  ["event-driven-architecture-for-product-leaders", "Event-Driven Architecture for Product Leaders", "A plain-English guide to events, streams, queues, and why they change product trade-offs.", ["Event Driven Architecture", "System Design", "Product"]],
  ["cqrs-for-product-managers", "CQRS Explained for Product Managers", "When separating commands and queries improves user experience, scale, and release confidence.", ["CQRS", "Architecture", "Technical PM"]],
  ["domain-driven-design-for-saas-products", "Domain-Driven Design for SaaS Products", "How ubiquitous language and bounded contexts improve roadmap quality and engineering alignment.", ["Domain Driven Design", "SaaS", "Architecture"]],
  ["observability-as-a-product-capability", "Observability as a Product Capability", "Why logs, metrics, traces, and alerts affect customer trust and product adoption.", ["Observability", "Monitoring", "SRE"]],
  ["product-metrics-okrs-and-kpis", "Product Metrics, OKRs, and KPIs That Matter", "A practical model for connecting product work to business outcomes and customer behavior.", ["Product Metrics", "OKRs", "KPIs"]],
  ["ai-products-for-enterprise-saas", "Building AI Products for Enterprise SaaS", "How to design AI features with adoption, governance, and measurable workflow value.", ["AI Products", "Enterprise SaaS", "LLMs"]],
  ["openai-for-product-managers", "OpenAI for Product Managers", "How PMs can use LLMs for discovery, synthesis, prototyping, and product operations.", ["OpenAI", "AI for PMs", "Productivity"]],
  ["llm-product-requirements", "Writing Product Requirements for LLM Features", "How prompts, evaluation, feedback, and safety constraints change PRDs for AI products.", ["LLMs", "PRD", "AI Products"]],
  ["cloud-platform-decisions-for-pms", "Cloud Platform Decisions Product Managers Should Understand", "A PM-friendly guide to cloud trade-offs across cost, reliability, security, and speed.", ["Cloud", "Azure", "AWS"]],
  ["azure-vs-aws-product-tradeoffs", "Azure vs AWS: Product Trade-Offs Beyond the Checklist", "How enterprise context, identity, data, and team skill influence cloud platform choices.", ["Azure", "AWS", "Cloud"]],
  ["platform-engineering-product-management", "Platform Engineering Needs Product Management", "Why internal platforms need discovery, adoption metrics, roadmaps, and customer empathy.", ["Platform Engineering", "Internal Products", "Product"]],
  ["enterprise-integrations-playbook", "An Enterprise Integrations Playbook for Product Owners", "How to plan integrations across APIs, queues, partners, authentication, and support.", ["Enterprise Integrations", "APIs", "SaaS"]],
  ["crm-product-management-in-wealthtech", "CRM Product Management in WealthTech", "The product decisions behind client records, activities, households, permissions, and workflows.", ["CRM", "WealthTech", "Product"]],
  ["financial-planning-software-product-lessons", "Product Lessons From Financial Planning Software", "What planning products teach us about domain language, assumptions, data quality, and trust.", ["Financial Planning", "Wealth Management", "Product"]],
  ["client-review-workflows", "Designing Client Review Workflows for Advisors", "How to reduce preparation effort and improve consistency across recurring client meetings.", ["Client Review", "Workflow", "Wealth Management"]],
  ["reporting-products-enterprise-saas", "Reporting Products in Enterprise SaaS", "How to design reporting experiences that support decisions instead of exporting chaos.", ["Reporting", "Analytics", "SaaS"]],
  ["product-analytics-for-b2b-saas", "Product Analytics for B2B SaaS", "What adoption, engagement, retention, and workflow analytics mean in enterprise software.", ["Product Analytics", "B2B SaaS", "Metrics"]],
  ["customer-discovery-with-enterprise-clients", "Customer Discovery With Enterprise Clients", "How to learn from buyers, admins, champions, and end users without mistaking one voice for all.", ["Customer Discovery", "Enterprise", "Research"]],
  ["system-design-for-product-managers", "System Design for Product Managers", "A practical guide to scale, reliability, data flow, and trade-offs for product leaders.", ["System Design", "Technical PM", "Architecture"]],
  ["technical-debt-and-product-roadmaps", "Technical Debt Belongs on the Product Roadmap", "How to make technical debt visible, measurable, and connected to customer outcomes.", ["Technical Debt", "Roadmapping", "Engineering"]],
  ["release-readiness-for-enterprise-saas", "Release Readiness for Enterprise SaaS", "A checklist-driven approach to launch confidence across product, engineering, support, and clients.", ["Release Management", "Enterprise SaaS", "Delivery"]],
  ["writing-better-user-stories", "Writing Better User Stories for Complex Products", "How to write stories that carry intent, context, acceptance criteria, and edge cases.", ["User Stories", "Product Owner", "Agile"]],
  ["acceptance-criteria-for-api-products", "Acceptance Criteria for API Products", "Examples and patterns for specifying API behavior, errors, permissions, and observability.", ["API Design", "Acceptance Criteria", "REST"]],
  ["scrum-in-large-product-organizations", "Scrum in Large Product Organizations", "How to preserve agility when dependencies, governance, and shared platforms enter the room.", ["Scrum", "Agile", "Leadership"]],
  ["engineering-management-for-product-owners", "What Product Owners Should Know About Engineering Management", "How team health, flow, quality, and architecture influence product outcomes.", ["Engineering Management", "Leadership", "Delivery"]],
  ["career-growth-from-engineer-to-product-owner", "Career Growth: Engineer to Product Owner", "How engineering experience becomes an advantage in product strategy and delivery leadership.", ["Career Growth", "Technical PM", "Leadership"]],
  ["senior-product-owner-interview-preparation", "Senior Product Owner Interview Preparation", "How to tell credible stories about strategy, discovery, delivery, metrics, and leadership.", ["Interview Preparation", "Career", "Product Owner"]],
  ["technical-product-manager-interview-questions", "Technical Product Manager Interview Questions", "A practical question bank for APIs, systems, metrics, trade-offs, and stakeholder scenarios.", ["Interview Preparation", "Technical PM", "System Design"]],
  ["leadership-through-product-clarity", "Leadership Through Product Clarity", "How clear decisions, language, and operating cadence create leverage for product teams.", ["Leadership", "Product Strategy", "Communication"]],
  ["wealth-management-integrations", "Wealth Management Integrations: CRM, Planning, Reporting, and Custody", "How to think about connected advisor workflows across the wealth management stack.", ["Wealth Management", "Integrations", "FinTech"]],
  ["monitoring-ai-products", "Monitoring AI Products After Launch", "What PMs should track across quality, drift, trust, cost, latency, and user feedback.", ["AI Products", "Monitoring", "LLMs"]],
  ["rest-api-versioning-strategy", "REST API Versioning Strategy for SaaS Platforms", "A product-minded approach to compatibility, migration, documentation, and adoption.", ["REST APIs", "API Design", "SaaS"]],
  ["enterprise-architecture-background-for-pms", "Why Enterprise Architecture Background Helps Product Managers", "How architecture fluency improves discovery, estimation, trade-off conversations, and roadmap quality.", ["Enterprise Architecture", "Technical PM", "Leadership"]],
  ["designing-products-for-advisor-productivity", "Designing Products for Advisor Productivity", "How to improve focus, reduce rekeying, and make advisor workflows feel professionally calm.", ["Advisor Productivity", "UX", "WealthTech"]],
  ["okrs-for-ai-and-platform-products", "OKRs for AI and Platform Products", "How to define measurable outcomes for capabilities where value is indirect or emergent.", ["OKRs", "AI Products", "Platform Engineering"]]
].map(([slug, title, summary, tags], index) => ({
  slug, title, summary, tags, minutes: 10 + (index % 6), date: new Date(Date.UTC(2026, 0, 6 + index)).toISOString().slice(0, 10)
}));

const postBySlug = new Map(posts.map((p) => [p.slug, p]));

function relPrefix(file) {
  const depth = file.split("/").length - 1;
  return depth ? "../".repeat(depth) : "";
}

function pageShell({ file = "index.html", title, description, body, canonical, type = "website", jsonLd = [], extraHead = "" }) {
  const prefix = relPrefix(file);
  const canonicalUrl = canonical || absolute(file.replace(/index\.html$/, ""));
  const image = absolute("assets/img/og-portfolio.svg");
  const localHref = (href) => href.startsWith("/#") ? `${prefix}index.html${href.slice(1)}` : href.startsWith("/") ? prefix + href.slice(1) : href;
  const navHtml = nav.map(([label, href]) => `<a href="${localHref(href)}">${label}</a>`).join("");
  const schemas = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
  return `<!doctype html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="author" content="${author}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${canonicalUrl}">
  <link rel="icon" href="${prefix}assets/img/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="${prefix}assets/img/apple-touch-icon.png">
  <link rel="preload" href="${prefix}assets/css/style.css" as="style">
  <link rel="stylesheet" href="${prefix}assets/css/style.css">
  <meta property="og:type" content="${type}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:image" content="${image}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${image}">
  ${extraHead}
  ${schemas.map((schema) => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`).join("\n  ")}
</head>
<body>
  <div class="jarvis-loader" data-jarvis-loader>
    <div class="jarvis-core" aria-hidden="true"><span></span><span></span><span></span></div>
    <p class="eyebrow">JARVIS Product OS</p>
    <h1>Buckle up, recruiter.</h1>
    <p data-loader-line>Initializing Product Owner Engine...</p>
    <div class="loader-track"><span data-loader-bar></span></div>
    <ol class="loader-stages" data-loader-stages>
      <li>Epic created</li>
      <li>User stories sliced</li>
      <li>Sprint planning aligned</li>
      <li>Acceptance criteria locked</li>
      <li>Deployed to production</li>
    </ol>
    <button type="button" class="button secondary" data-loader-skip>Skip intro</button>
  </div>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header" data-header>
    <a class="brand" href="${prefix}index.html" aria-label="${author} home">
      <span class="brand-mark">VP</span>
      <span><strong>Venkata Prasad</strong><small>Senior Product Owner</small></span>
    </a>
    <button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" data-nav-toggle>
      <span></span><span></span><span></span>
    </button>
    <nav class="site-nav" aria-label="Primary navigation" data-nav>${navHtml}</nav>
    <button class="theme-toggle" type="button" aria-label="Toggle dark mode" data-theme-toggle>
      <span aria-hidden="true">◐</span>
    </button>
  </header>
  <aside class="game-hud" data-hud aria-label="Portfolio game progress">
    <button class="hud-main" type="button" data-hud-toggle aria-expanded="false">
      <span class="hud-level" data-level-label>Lv1 Visitor</span>
      <span class="hud-xp"><span data-xp-bar></span></span>
      <span data-xp-text>0 XP</span>
    </button>
    <div class="hud-drawer" data-hud-drawer>
      <strong>Product Quest HUD</strong>
      <p><span data-achievement-count>0</span>/8 achievements unlocked</p>
      <label class="focus-switch"><input type="checkbox" data-recruiter-mode> Recruiter / focus mode</label>
      <p class="hud-hint">Open terminal from the footer button. Keyboard fans can also press <kbd>~</kbd>.</p>
    </div>
  </aside>
  <main id="main">${body}</main>
  <footer class="site-footer">
    <div>
      <strong>${author}</strong>
      <p>Senior Product Owner for enterprise SaaS, wealth management, AI products, and technically complex delivery.</p>
    </div>
    <div class="footer-links">
      <a href="mailto:${email}">${email}</a>
      <a href="${prefix}sitemap.xml">Sitemap</a>
      <a href="${prefix}rss.xml">RSS</a>
      <button class="terminal-cursor" type="button" data-terminal-open aria-label="Open hidden terminal">_</button>
    </div>
  </footer>
  <div class="terminal-modal" data-terminal hidden>
    <div class="terminal-panel" role="dialog" aria-modal="true" aria-label="Hidden portfolio terminal">
      <div class="terminal-head"><strong>venkat@product-owner-engine</strong><button type="button" data-terminal-close>Close</button></div>
      <pre data-terminal-output>Type help to list commands.</pre>
      <label><span class="sr-only">Terminal command</span><input data-terminal-input autocomplete="off" spellcheck="false" placeholder="help"></label>
    </div>
  </div>
  <div class="mission-popup" data-mission-popup hidden>
    <div class="mission-card" role="dialog" aria-modal="true" aria-label="Play a product planning game">
      <p class="eyebrow">JARVIS detected a curious visitor</p>
      <h2>Want to play a planning game with Venkat?</h2>
      <p>Match product lifecycle artifacts to the right stage and unlock the Product Strategist badge.</p>
      <div class="hero-actions">
        <button class="button primary" type="button" data-mission-start data-home-url="${prefix}index.html#planning-game">Start game</button>
        <button class="button secondary" type="button" data-mission-close>Maybe later</button>
      </div>
    </div>
  </div>
  <button class="jarvis-agent" type="button" data-chat-open aria-label="Open JARVIS AI helper"><span>J</span><strong>Ask JARVIS</strong></button>
  <div class="chat-panel" data-chat hidden>
    <div class="chat-card" role="dialog" aria-modal="true" aria-label="JARVIS portfolio assistant">
      <div class="chat-head"><strong>JARVIS - Venkat's AI agent</strong><button type="button" data-chat-close>Close</button></div>
      <div class="chat-log" data-chat-log>
        <p><strong>JARVIS:</strong> Ask about Intelliflo IQ, product strategy, APIs, SAFe Agile, or why Venkat is a strong hire.</p>
      </div>
      <div class="chat-prompts">
        <button type="button" data-chat-prompt="ai">Explain Intelliflo IQ</button>
        <button type="button" data-chat-prompt="hire">Why hire Venkat?</button>
        <button type="button" data-chat-prompt="api">Show architecture skills</button>
      </div>
      <form data-chat-form>
        <label><span class="sr-only">Ask JARVIS</span><input data-chat-input placeholder="Ask JARVIS anything about Venkat"></label>
        <button type="submit">Send</button>
      </form>
    </div>
  </div>
  <script src="${prefix}assets/js/main.js" defer></script>
</body>
</html>`;
}

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: author,
  jobTitle: "Senior Product Owner",
  email,
  url: siteUrl,
  knowsAbout: ["Enterprise SaaS", "Wealth Management", "Technical Product Management", "AI Products", "REST APIs", "Microservices", "Product Strategy"],
  worksFor: { "@type": "Organization", name: "Intelliflo" }
};

function homePage() {
  const productCards = products.map((p) => `<article class="product-card reveal">
    <div class="card-kicker">${p.label}</div>
    <h3>${p.title}</h3>
    <p>${p.problem}</p>
    <a class="text-link" href="projects/${p.slug}/">Read case study</a>
  </article>`).join("");
  const blogCards = posts.slice(0, 6).map((p) => postCard(p, "")).join("");
  const body = `
  <section class="hero">
    <div class="hero-copy reveal">
      <p class="eyebrow">Senior Product Owner · Enterprise SaaS · Wealth Management</p>
      <h1>Product leadership for complex financial technology platforms.</h1>
      <p class="hero-lede">I help enterprise teams turn regulated-domain complexity, architecture constraints, and customer workflow friction into clear product strategy and reliable delivery.</p>
      <div class="hero-actions">
        <a class="button primary" href="#products">View product deliveries</a>
        <a class="button secondary" href="${resumePdf}">View resume</a>
      </div>
      <dl class="hero-stats" aria-label="Profile highlights">
        <div><dt>8+</dt><dd>years across engineering and product</dd></div>
        <div><dt>Enterprise</dt><dd>SaaS, CRM, integrations, AI products</dd></div>
        <div><dt>Wealth</dt><dd>financial planning and advisor workflows</dd></div>
      </dl>
    </div>
    <div class="hero-panel reveal" aria-label="Product leadership focus">
      <div class="signal-card">
        <span>Current focus</span>
        <strong>Senior Product Owner at Intelliflo</strong>
        <p>Owning product outcomes across enterprise SaaS capabilities for wealth management firms.</p>
      </div>
      <div class="orbit-grid" aria-hidden="true">
        <span>Strategy</span><span>Discovery</span><span>APIs</span><span>AI</span><span>CRM</span><span>Delivery</span>
      </div>
    </div>
  </section>

  <section id="about" class="section split">
    <div>
      <p class="eyebrow">About me</p>
      <h2>Technical product manager with an enterprise architecture backbone.</h2>
    </div>
    <div class="content-stack">
      <p>I am Venkata Prasad Muraharisetty, a Senior Product Owner with 8+ years of progression from associate developer to senior software engineer and product leadership. My work sits at the intersection of advisor experience, enterprise integrations, SaaS platform design, and delivery discipline.</p>
      <p>Because I have shipped as an engineer and as a product owner, I can move comfortably from customer discovery and roadmap trade-offs to API behavior, service boundaries, data flows, release risk, and adoption metrics.</p>
    </div>
  </section>

  <section id="highlights" class="section">
    <div class="section-heading">
      <p class="eyebrow">Career highlights</p>
      <h2>Built for senior product conversations.</h2>
    </div>
    <div class="highlight-grid">
      ${["Enterprise SaaS product ownership in wealth management", "AI product capability shaping with governance and adoption focus", "CRM, financial planning, reporting, and advisor workflow delivery", "REST APIs, microservices, cloud, IBM MQ, and integration fluency", "Backlog, roadmap, discovery, stakeholder, and agile delivery leadership", "Career progression across Intelliflo, Broadridge, and GTKonnect / EY"].map((x) => `<div class="highlight-card reveal">${x}</div>`).join("")}
    </div>
  </section>

  <section id="experience" class="section split">
    <div>
      <p class="eyebrow">Experience</p>
      <h2>Progression from engineering depth to product leadership.</h2>
    </div>
    <div class="timeline">
      ${[
        ["Intelliflo", "Advanced Software Engineer · Senior Software Engineer · Product Owner · Senior Product Owner", "Enterprise SaaS and wealth management product delivery across advisor workflows, CRM, financial planning, integrations, reporting, and AI capabilities."],
        ["Broadridge Financial Solutions", "Senior Software Engineer", "Built financial-services technology experience across enterprise delivery, technical analysis, and production-grade engineering practices."],
        ["GTKonnect, acquired by EY", "Associate Software Developer", "Developed global trade management capabilities and integration experience across enterprise systems and IBM MQ-driven workflows."]
      ].map(([company, role, desc]) => `<article class="timeline-item reveal"><span></span><h3>${company}</h3><p class="muted">${role}</p><p>${desc}</p></article>`).join("")}
    </div>
  </section>

  <section id="products" class="section">
    <div class="section-heading">
      <p class="eyebrow">Featured product deliveries</p>
      <h2>Case studies across enterprise SaaS, WealthTech, AI, CRM, and integrations.</h2>
    </div>
    <div class="product-grid">${productCards}</div>
  </section>

  <section id="skills" class="section skill-section">
    <div class="section-heading">
      <p class="eyebrow">Skills</p>
      <h2>Product leadership with technical credibility.</h2>
    </div>
    <div class="skill-columns">
      ${skillBlock("Product", ["Product strategy", "Roadmapping", "Product discovery", "Prioritization", "Backlog management", "OKRs and KPIs"])}
      ${skillBlock("Domain", ["Enterprise SaaS", "Wealth management", "Financial planning", "CRM", "Reporting", "Client review workflows"])}
      ${skillBlock("Technical", ["REST APIs", "Microservices", "Cloud", "Azure", "AWS", "IBM MQ", "Observability", "AI products"])}
      ${skillBlock("Leadership", ["Stakeholder management", "Agile delivery", "Scrum", "Release readiness", "Cross-functional alignment", "Technical storytelling"])}
    </div>
  </section>

  <section class="section tech-radar">
    <div>
      <p class="eyebrow">Technology stack</p>
      <h2>Comfortable in the architecture room and the roadmap room.</h2>
    </div>
    <div class="tag-cloud">
      ${["REST", "OpenAPI", "Microservices", "Domain-driven design", "CQRS", "Event-driven architecture", "Azure", "AWS", "SQL", "Observability", "OAuth", "Microsoft Graph", "LLMs", "Product analytics", "GitHub"].map((x) => `<span>${x}</span>`).join("")}
    </div>
  </section>

  <section id="education" class="section split">
    <div>
      <p class="eyebrow">Education</p>
      <h2>Engineering foundation for product decisions.</h2>
    </div>
    <div class="content-card reveal">
      <h3>B.Tech</h3>
      <p>Engineering education paired with hands-on software delivery, enterprise integrations, and modern product ownership experience.</p>
    </div>
  </section>

  <section id="blog" class="section">
    <div class="section-heading">
      <p class="eyebrow">Technical blog</p>
      <h2>Writing on product management, WealthTech, SaaS architecture, AI, and career growth.</h2>
      <a class="button secondary" href="blog/">Explore all posts</a>
    </div>
    <div class="blog-grid">${blogCards}</div>
  </section>

  <section id="contact" class="section contact-band">
    <div>
      <p class="eyebrow">Contact</p>
      <h2>Let’s talk about senior product ownership, enterprise SaaS, or wealth management platforms.</h2>
      <p>Best fit: Senior Product Owner, Technical Product Manager, AI Product Manager, or Enterprise SaaS Product roles.</p>
    </div>
    <div class="contact-actions">
      <a class="button primary" href="mailto:${email}">Email me</a>
      <a class="button secondary" href="${resumePdf}">View resume</a>
    </div>
  </section>`;
  return pageShell({
    file: "index.html",
    title: `${author} | Senior Product Owner, Enterprise SaaS & Wealth Management`,
    description: "Senior Product Owner and Technical Product Manager specializing in enterprise SaaS, wealth management, CRM, integrations, AI products, and product delivery.",
    body,
    jsonLd: [personSchema, breadcrumbSchema([{ name: "Home", url: siteUrl }])]
  });
}

function skillBlock(title, items) {
  return `<article class="skill-card reveal"><h3>${title}</h3><ul>${items.map((x) => `<li>${x}</li>`).join("")}</ul></article>`;
}

function postCard(p, prefix = "../") {
  return `<article class="post-card reveal">
    <div class="cover-thumb"><span>${p.tags[0]}</span></div>
    <p class="meta">${formatDate(p.date)} · ${p.minutes} min read</p>
    <h3><a href="${prefix}blog/${p.slug}/">${p.title}</a></h3>
    <p>${p.summary}</p>
    <div class="tag-row">${p.tags.map((t) => `<span>${t}</span>`).join("")}</div>
  </article>`;
}

function formatDate(date) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
}

function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: item.url }))
  };
}

function blogIndex() {
  const body = `<section class="page-hero">
    <p class="eyebrow">Technical blog</p>
    <h1>Product, architecture, AI, and WealthTech writing.</h1>
    <p>Original articles for product managers, product owners, engineering leaders, and SaaS teams building serious enterprise software.</p>
  </section>
  <section class="section blog-index">
    <div class="filter-bar" aria-label="Blog topics">
      ${["Product Management", "Technical PM", "WealthTech", "SaaS", "Architecture", "AI", "Career"].map((x) => `<span>${x}</span>`).join("")}
    </div>
    <div class="blog-grid">${posts.map((p) => postCard(p, "../")).join("")}</div>
  </section>`;
  return pageShell({
    file: "blog/index.html",
    title: `Technical Blog | ${author}`,
    description: "Technical blog covering product management, enterprise SaaS, wealth management, AI products, APIs, architecture, metrics, and career growth.",
    body,
    canonical: absolute("blog/"),
    jsonLd: [personSchema, breadcrumbSchema([{ name: "Home", url: siteUrl }, { name: "Blog", url: absolute("blog/") }])]
  });
}

function articlePage(p) {
  const related = posts.filter((x) => x.slug !== p.slug && x.tags.some((t) => p.tags.includes(t))).slice(0, 3);
  const code = p.tags.join(" ").match(/API|REST|CQRS|Architecture|Microservices|Cloud|Observability|AI|LLM|OpenAI/)
    ? `<pre><code>// Product acceptance criteria example
Given an authenticated enterprise user
When the platform receives a valid ${escapeHtml(p.tags[0])} request
Then the service validates permissions, records telemetry,
And returns an auditable response with clear error states.</code></pre>`
    : `<pre><code>Outcome = CustomerProblem x StrategicFit x DeliveryConfidence
Priority = Outcome / Effort
Review cadence: weekly for learning, monthly for roadmap decisions.</code></pre>`;
  const body = `<article class="article">
    <header class="article-header">
      <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="../../index.html">Home</a><span>/</span><a href="../">Blog</a><span>/</span><span>${p.title}</span></nav>
      <div class="cover-large"><span>${p.tags[0]}</span></div>
      <p class="meta">${formatDate(p.date)} · ${p.minutes} minute read</p>
      <h1>${p.title}</h1>
      <p>${p.summary}</p>
      <div class="tag-row">${p.tags.map((t) => `<span>${t}</span>`).join("")}</div>
    </header>
    <div class="article-body">
      ${articleContent(p, code)}
    </div>
    <aside class="related">
      <h2>Related posts</h2>
      <div class="blog-grid">${related.map((x) => postCard(x, "../../")).join("")}</div>
    </aside>
  </article>`;
  return pageShell({
    file: `blog/${p.slug}/index.html`,
    title: `${p.title} | ${author}`,
    description: p.summary,
    body,
    type: "article",
    canonical: absolute(`blog/${p.slug}/`),
    jsonLd: [
      personSchema,
      breadcrumbSchema([{ name: "Home", url: siteUrl }, { name: "Blog", url: absolute("blog/") }, { name: p.title, url: absolute(`blog/${p.slug}/`) }]),
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: p.title,
        description: p.summary,
        author: { "@type": "Person", name: author },
        datePublished: p.date,
        dateModified: p.date,
        mainEntityOfPage: absolute(`blog/${p.slug}/`),
        keywords: p.tags.join(", ")
      }
    ]
  });
}

function articleContent(p, code) {
  const primary = p.tags[0];
  return `
    <h2>Why this matters</h2>
    <p>${p.title} is not a theoretical topic for enterprise product teams. In complex SaaS and wealth management environments, the best product decisions are made when customer workflow, commercial strategy, architecture, compliance, and delivery capacity are considered together.</p>
    <p>Senior product ownership requires more than managing tickets. It requires translating ambiguity into decisions that engineering can build, stakeholders can support, and customers can feel in their daily work.</p>
    <h2>The product leadership lens</h2>
    <p>For ${primary.toLowerCase()}, I start with the operating problem: who is blocked, what decision is delayed, what manual work is being repeated, and what risk appears when the workflow scales. From there, the roadmap can separate visible features from the platform capabilities required to make those features reliable.</p>
    <ul>
      <li><strong>Customer value:</strong> the workflow should remove friction, increase confidence, or improve decision quality.</li>
      <li><strong>Business value:</strong> the capability should support adoption, retention, expansion, operational efficiency, or strategic differentiation.</li>
      <li><strong>Technical value:</strong> the implementation should improve service boundaries, data quality, observability, or integration reliability.</li>
    </ul>
    <h2>Questions I would ask</h2>
    <p>A strong product conversation usually starts with better questions. What does success look like in production? Which user segment feels the pain most sharply? What data is needed for decision-making? What dependencies or permissions could block rollout? Which metric will tell us whether the work changed behavior?</p>
    ${code}
    <h2>Common trade-offs</h2>
    <p>Enterprise products rarely fail because teams cannot imagine features. They struggle because every feature creates consequences across onboarding, support, security, performance, analytics, documentation, and release management. Senior product leaders keep these trade-offs visible without slowing the team into analysis paralysis.</p>
    <blockquote>Good product strategy is the discipline of choosing which complexity belongs in the product, which belongs in the platform, and which should be removed entirely.</blockquote>
    <h2>A practical delivery model</h2>
    <p>I prefer a delivery model that starts with a concise opportunity brief, moves into thin-slice validation, and then creates implementation stories with explicit acceptance criteria. This keeps discovery connected to delivery and prevents roadmap language from becoming detached from engineering reality.</p>
    <ol>
      <li>Define the customer problem and the business outcome.</li>
      <li>Map the workflow, systems, data, permissions, and operational exceptions.</li>
      <li>Agree on measurable adoption, quality, and reliability signals.</li>
      <li>Deliver in increments that reduce the largest uncertainty first.</li>
      <li>Review telemetry and customer feedback after launch.</li>
    </ol>
    <h2>How I apply it</h2>
    <p>My background across engineering, enterprise integrations, CRM, financial planning, and AI product work helps me connect product intent to implementation consequences. That is especially useful in wealth management SaaS, where the user experience, regulatory context, and architecture are tightly connected.</p>
    <p>The goal is not to make product management more technical for its own sake. The goal is to make product decisions more credible, delivery more predictable, and customer outcomes easier to prove.</p>`;
}

function projectPage(p) {
  const body = `<article class="case-study">
    <header class="page-hero">
      <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="../../index.html">Home</a><span>/</span><a href="../../#products">Projects</a><span>/</span><span>${p.title}</span></nav>
      <p class="eyebrow">${p.label}</p>
      <h1>${p.title}</h1>
      <p>${p.problem}</p>
    </header>
    <section class="section case-grid">
      ${caseBlock("Problem", p.problem)}
      ${caseBlock("Business need", p.need)}
      ${caseBlock("My role", p.role)}
      ${caseBlock("Architecture", p.architecture)}
      ${caseBlock("Outcome", p.outcome)}
      ${caseBlock("Key learnings", p.learnings)}
    </section>
    <section class="section">
      <div class="section-heading"><p class="eyebrow">Technologies</p><h2>Capabilities involved</h2></div>
      <div class="tag-cloud">${p.technologies.map((t) => `<span>${t}</span>`).join("")}</div>
    </section>
  </article>`;
  return pageShell({
    file: `projects/${p.slug}/index.html`,
    title: `${p.title} Case Study | ${author}`,
    description: `${p.title} product delivery case study covering problem, business need, role, architecture, technologies, outcome, and learnings.`,
    body,
    canonical: absolute(`projects/${p.slug}/`),
    jsonLd: [personSchema, breadcrumbSchema([{ name: "Home", url: siteUrl }, { name: "Projects", url: `${siteUrl}/#products` }, { name: p.title, url: absolute(`projects/${p.slug}/`) }])]
  });
}

function caseBlock(title, text) {
  return `<article class="content-card reveal"><h2>${title}</h2><p>${text}</p></article>`;
}

function resumePage() {
  const body = `<section class="page-hero">
    <p class="eyebrow">Resume showcase</p>
    <h1>${author}</h1>
    <p>Senior Product Owner specializing in enterprise SaaS, wealth management, technical product management, AI products, CRM, financial planning, and integrations.</p>
    <div class="hero-actions"><a class="button primary" href="../${resumePdf}">Open PDF resume</a><a class="button secondary" href="../${resumePdf}" download>Download resume</a><a class="button secondary" href="mailto:${email}">Contact</a></div>
  </section>
  <section class="section resume-viewer" aria-label="Resume PDF preview">
    <object data="../${resumePdf}" type="application/pdf">
      <p>Your browser could not display the resume preview. <a href="../${resumePdf}">Open the PDF resume</a>.</p>
    </object>
  </section>
  <section class="section resume-layout">
    <aside class="resume-sidebar">
      <h2>Profile</h2>
      <p>8+ years across software engineering and product ownership with hands-on credibility in APIs, microservices, cloud, enterprise integrations, and wealth management workflows.</p>
      <h2>Core skills</h2>
      <div class="tag-cloud compact">${["Product strategy", "Roadmapping", "Discovery", "Agile", "Backlog", "Stakeholders", "REST APIs", "Microservices", "AI products", "CRM", "Financial planning", "Cloud"].map((x) => `<span>${x}</span>`).join("")}</div>
    </aside>
    <div class="resume-main">
      <h2>Experience</h2>
      <article><h3>Intelliflo</h3><p class="muted">Advanced Software Engineer · Senior Software Engineer · Product Owner · Senior Product Owner</p><p>Led and delivered enterprise SaaS capabilities across wealth management, CRM, advisor productivity, financial planning, integrations, reporting, and AI-oriented product experiences.</p></article>
      <article><h3>Broadridge Financial Solutions</h3><p class="muted">Senior Software Engineer</p><p>Delivered financial-services software with production engineering rigor and enterprise delivery discipline.</p></article>
      <article><h3>GTKonnect, acquired by EY</h3><p class="muted">Associate Software Developer</p><p>Built global trade management and enterprise integration experience using service-oriented systems and IBM MQ patterns.</p></article>
      <h2>Selected product deliveries</h2>
      <p>Outlook Integration, Intelliflo IQ, Money Alive Integration, Client Review, CRM Enhancements, Financial Planning, Fact Find, Reporting, ACATS, IBM MQ Integrations, Global Trade Management.</p>
    </div>
  </section>`;
  return pageShell({
    file: "resume/index.html",
    title: `Resume | ${author}`,
    description: "Resume showcase for Venkata Prasad Muraharisetty, Senior Product Owner and Technical Product Manager in enterprise SaaS and wealth management.",
    body,
    canonical: absolute("resume/"),
    jsonLd: [personSchema, breadcrumbSchema([{ name: "Home", url: siteUrl }, { name: "Resume", url: absolute("resume/") }])]
  });
}

function legacyPage(target, label) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${label}</title><meta http-equiv="refresh" content="0; url=${target}"><link rel="canonical" href="${absolute(target)}"></head><body><p><a href="${target}">Continue to ${label}</a></p></body></html>`;
}

function css() {
  return `
:root{color-scheme:dark;--bg:#08111f;--surface:#0f1b2d;--surface-2:#142238;--text:#eff6ff;--muted:#9fb1c7;--line:rgba(255,255,255,.12);--brand:#4fd1c5;--brand-2:#8b5cf6;--accent:#f7c948;--shadow:0 24px 70px rgba(0,0,0,.32);--radius:8px;--max:1180px}
[data-theme=light]{color-scheme:light;--bg:#f7fafc;--surface:#ffffff;--surface-2:#edf2f7;--text:#122033;--muted:#506176;--line:rgba(18,32,51,.14);--shadow:0 22px 55px rgba(38,53,78,.14)}
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:radial-gradient(circle at 10% 0%,rgba(79,209,197,.16),transparent 34%),radial-gradient(circle at 90% 8%,rgba(139,92,246,.16),transparent 30%),var(--bg);color:var(--text);line-height:1.6}a{color:inherit}img{max-width:100%;height:auto}.skip-link{position:absolute;left:-999px;top:1rem;background:var(--brand);color:#07111f;padding:.7rem 1rem;z-index:20}.skip-link:focus{left:1rem}.site-header{position:sticky;top:0;z-index:10;display:flex;align-items:center;gap:1rem;justify-content:space-between;padding:.85rem clamp(1rem,4vw,3rem);backdrop-filter:blur(18px);background:color-mix(in srgb,var(--bg) 84%,transparent);border-bottom:1px solid var(--line)}.brand{display:flex;align-items:center;gap:.75rem;text-decoration:none}.brand-mark{display:grid;place-items:center;width:42px;height:42px;border-radius:8px;background:linear-gradient(135deg,var(--brand),var(--brand-2));color:#07111f;font-weight:900}.brand small{display:block;color:var(--muted);font-size:.78rem}.site-nav{display:flex;align-items:center;gap:.25rem}.site-nav a{padding:.55rem .75rem;text-decoration:none;color:var(--muted);border-radius:8px;font-size:.94rem}.site-nav a:hover,.site-nav a:focus-visible{background:var(--surface-2);color:var(--text)}.theme-toggle,.nav-toggle{border:1px solid var(--line);background:var(--surface);color:var(--text);border-radius:8px;min-width:42px;height:42px}.nav-toggle{display:none;flex-direction:column;justify-content:center;gap:4px}.nav-toggle span{display:block;width:18px;height:2px;background:currentColor;margin:auto}.hero,.section,.page-hero,.article,.case-study{max-width:var(--max);margin:auto;padding:clamp(4rem,8vw,7rem) clamp(1rem,4vw,2rem)}.hero{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(300px,.85fr);gap:clamp(2rem,5vw,5rem);align-items:center;min-height:86vh}.eyebrow{margin:0 0 1rem;color:var(--brand);font-size:.78rem;font-weight:800;text-transform:uppercase;letter-spacing:.14em}.hero h1,.page-hero h1{font-size:clamp(2.75rem,7vw,6rem);line-height:.94;margin:.2rem 0 1.25rem;letter-spacing:0}.hero-lede,.page-hero p{font-size:clamp(1.08rem,2vw,1.35rem);color:var(--muted);max-width:760px}.hero-actions,.contact-actions{display:flex;gap:.75rem;flex-wrap:wrap;margin-top:1.5rem}.button{display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:.75rem 1rem;border-radius:8px;text-decoration:none;font-weight:800;border:1px solid var(--line)}.button.primary{background:linear-gradient(135deg,var(--brand),#7dd3fc);color:#07111f;border:0}.button.secondary{background:var(--surface);color:var(--text)}.hero-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:.75rem;margin:2rem 0 0}.hero-stats div,.signal-card,.content-card,.product-card,.post-card,.skill-card,.highlight-card{background:linear-gradient(180deg,color-mix(in srgb,var(--surface) 92%,white 8%),var(--surface));border:1px solid var(--line);border-radius:var(--radius);box-shadow:var(--shadow)}.hero-stats div{padding:1rem}.hero-stats dt{font-size:1.35rem;font-weight:900;color:var(--text)}.hero-stats dd{margin:0;color:var(--muted);font-size:.9rem}.hero-panel{display:grid;gap:1rem}.signal-card{padding:1.3rem}.signal-card span,.card-kicker,.meta{color:var(--muted);font-size:.86rem}.signal-card strong{display:block;font-size:1.55rem;line-height:1.15;margin:.45rem 0}.orbit-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:.75rem}.orbit-grid span{padding:1.1rem;border:1px solid var(--line);border-radius:8px;background:rgba(255,255,255,.045);font-weight:800;text-align:center}.split{display:grid;grid-template-columns:minmax(240px,.8fr) minmax(0,1.2fr);gap:clamp(2rem,5vw,5rem)}h2{font-size:clamp(1.85rem,4vw,3.2rem);line-height:1.05;margin:.1rem 0 1.25rem}h3{line-height:1.2}.content-stack p,.content-card p,.product-card p,.post-card p,.timeline p{color:var(--muted)}.section-heading{display:flex;align-items:end;justify-content:space-between;gap:1.5rem;margin-bottom:2rem}.section-heading h2{max-width:820px}.highlight-grid,.product-grid,.blog-grid,.skill-columns,.case-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem}.highlight-card,.product-card,.post-card,.skill-card,.content-card{padding:1.2rem}.product-card,.post-card{min-height:250px;display:flex;flex-direction:column}.text-link{margin-top:auto;color:var(--brand);font-weight:800;text-decoration:none}.timeline{position:relative;display:grid;gap:1rem}.timeline:before{content:"";position:absolute;left:10px;top:0;bottom:0;width:1px;background:var(--line)}.timeline-item{position:relative;padding-left:2.5rem}.timeline-item span{position:absolute;left:3px;top:.35rem;width:15px;height:15px;border-radius:50%;background:var(--brand)}.muted{color:var(--muted)}.skill-columns{grid-template-columns:repeat(4,1fr)}.skill-card ul{padding-left:1.1rem;margin-bottom:0}.tech-radar{display:grid;grid-template-columns:.8fr 1.2fr;gap:3rem}.tag-cloud,.tag-row,.filter-bar{display:flex;gap:.55rem;flex-wrap:wrap}.tag-cloud span,.tag-row span,.filter-bar span{border:1px solid var(--line);background:var(--surface);border-radius:999px;padding:.45rem .7rem;color:var(--muted);font-size:.88rem}.cover-thumb,.cover-large{display:grid;place-items:end start;min-height:130px;border-radius:8px;background:linear-gradient(135deg,rgba(79,209,197,.82),rgba(139,92,246,.82)),linear-gradient(45deg,var(--surface),var(--surface-2));padding:1rem;color:#07111f;font-weight:900}.cover-large{min-height:260px;margin:1rem 0 1.5rem}.article{max-width:980px}.article-header h1{font-size:clamp(2.4rem,6vw,4.9rem);line-height:1;margin:.5rem 0 1rem}.article-body{font-size:1.08rem}.article-body h2{font-size:clamp(1.6rem,3vw,2.3rem);margin-top:2.6rem}.article-body p,.article-body li{color:var(--muted)}blockquote{border-left:4px solid var(--brand);margin:2rem 0;padding:1rem 1.25rem;background:var(--surface);border-radius:0 8px 8px 0;font-weight:800}pre{overflow:auto;border:1px solid var(--line);border-radius:8px;background:#050b14;color:#d7f9ff;padding:1rem}.breadcrumbs{display:flex;gap:.5rem;flex-wrap:wrap;color:var(--muted);font-size:.9rem;margin-bottom:1rem}.breadcrumbs a{color:var(--brand);text-decoration:none}.related{margin-top:4rem}.case-grid{grid-template-columns:repeat(2,1fr)}.resume-viewer{padding-top:0}.resume-viewer object{display:block;width:100%;height:min(92vh,980px);border:1px solid var(--line);border-radius:8px;background:var(--surface)}.resume-layout{display:grid;grid-template-columns:330px 1fr;gap:2rem}.resume-sidebar,.resume-main{background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:1.4rem}.contact-band{display:flex;justify-content:space-between;align-items:center;gap:2rem;background:linear-gradient(135deg,rgba(79,209,197,.12),rgba(139,92,246,.12));border:1px solid var(--line);border-radius:8px;margin-bottom:4rem}.site-footer{display:flex;justify-content:space-between;gap:2rem;padding:2rem clamp(1rem,4vw,3rem);border-top:1px solid var(--line);color:var(--muted)}.footer-links{display:flex;gap:1rem;flex-wrap:wrap}.footer-links a{color:var(--muted)}.reveal{opacity:0;transform:translateY(18px);transition:opacity .6s ease,transform .6s ease}.reveal.is-visible{opacity:1;transform:none}
@media (prefers-reduced-motion:reduce){*,*:before,*:after{scroll-behavior:auto!important;transition:none!important}.reveal{opacity:1;transform:none}}
.ai-console{padding:1.25rem;border:1px solid var(--line);border-radius:8px;background:linear-gradient(180deg,rgba(79,209,197,.12),rgba(139,92,246,.08)),var(--surface);box-shadow:var(--shadow)}.console-topline{display:flex;align-items:center;justify-content:space-between;gap:1rem;margin-bottom:1rem}.console-topline span{color:var(--brand);font-size:.78rem;font-weight:900;text-transform:uppercase;letter-spacing:.12em}.console-topline strong{font-size:1.15rem}.ai-console p{min-height:5.5rem;color:var(--muted);font-size:1.05rem}.console-metrics{display:grid;grid-template-columns:repeat(3,1fr);gap:.65rem;margin:1rem 0}.console-metrics span{padding:.8rem;border:1px solid var(--line);border-radius:8px;background:rgba(255,255,255,.045);color:var(--muted);font-size:.83rem}.console-metrics strong{display:block;color:var(--text);font-size:1.1rem}.console-actions{display:grid;grid-template-columns:repeat(3,1fr);gap:.5rem}.console-actions button{min-height:42px;border:1px solid var(--line);border-radius:8px;background:var(--surface-2);color:var(--muted);font-weight:800}.console-actions button:hover,.console-actions button:focus-visible,.console-actions button.is-active{background:var(--brand);color:#07111f}.impact-strip{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem}.hero{position:relative;overflow:hidden}.hero>*:not(.neural-canvas){position:relative;z-index:1}.neural-canvas{position:absolute;inset:0;width:100%;height:100%;opacity:.58;filter:saturate(1.3);pointer-events:none}.quest-section{padding-top:0}.quest-board{display:grid;grid-template-columns:minmax(0,1.25fr) 280px;gap:1rem;align-items:stretch}.quest-stage,.quest-score{border:1px solid var(--line);border-radius:8px;background:linear-gradient(180deg,rgba(79,209,197,.08),rgba(255,255,255,.03)),var(--surface);box-shadow:var(--shadow);padding:1.25rem}.quest-stage h3{font-size:clamp(1.4rem,3vw,2.25rem);margin:.2rem 0 .75rem}.quest-stage p:not(.meta),.quest-score p{color:var(--muted)}.quest-options{display:grid;gap:.7rem;margin-top:1rem}.quest-options button{min-height:48px;text-align:left;border:1px solid var(--line);border-radius:8px;background:var(--surface-2);color:var(--text);font-weight:800;padding:.85rem 1rem}.quest-options button:hover,.quest-options button:focus-visible{border-color:var(--brand);transform:translateY(-1px)}.quest-score{display:grid;align-content:center;text-align:center}.quest-score span{color:var(--brand);font-weight:900;text-transform:uppercase;font-size:.78rem;letter-spacing:.12em}.quest-score strong{font-size:4rem;line-height:1;margin:.5rem 0}.achievement-toast{position:fixed;right:1rem;bottom:1rem;z-index:30;max-width:330px;padding:1rem;border:1px solid var(--line);border-radius:8px;background:linear-gradient(135deg,rgba(79,209,197,.94),rgba(139,92,246,.94));color:#07111f;box-shadow:var(--shadow);transform:translateY(130%);transition:transform .4s ease}.achievement-toast.is-visible{transform:translateY(0)}.achievement-toast strong{display:block}.achievement-toast span{font-weight:800}.cyber-mode{--bg:#04070d;--surface:#07111f;--surface-2:#0c1f33;--brand:#00f5ff;--brand-2:#ff3df2;--accent:#faff00}.cyber-mode body{background:linear-gradient(180deg,#04070d,#10122a)}
.game-hud{position:fixed;right:1rem;top:82px;z-index:25;width:min(330px,calc(100vw - 2rem))}.hud-main{display:grid;grid-template-columns:auto 1fr auto;gap:.65rem;align-items:center;width:100%;min-height:46px;border:1px solid var(--line);border-radius:999px;background:color-mix(in srgb,var(--surface) 90%,transparent);color:var(--text);padding:.55rem .75rem;box-shadow:var(--shadow);backdrop-filter:blur(14px)}.hud-level{font-weight:900;color:var(--brand);font-size:.82rem}.hud-xp{height:8px;border-radius:999px;background:var(--surface-2);overflow:hidden}.hud-xp span{display:block;height:100%;width:0;background:linear-gradient(90deg,var(--brand),var(--accent));transition:width .35s ease}.hud-main [data-xp-text]{font-size:.78rem;color:var(--muted);font-weight:800}.hud-drawer{display:none;margin-top:.5rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);padding:1rem;box-shadow:var(--shadow)}.game-hud.is-open .hud-drawer{display:block}.focus-switch{display:flex;align-items:center;gap:.5rem;margin:.75rem 0;color:var(--muted)}.hud-hint{margin:0;color:var(--muted);font-size:.86rem}.terminal-cursor{border:0;background:transparent;color:var(--brand);font-weight:900;font-size:1.1rem}.terminal-modal{position:fixed;inset:0;z-index:40;display:grid;place-items:center;background:rgba(0,0,0,.58);padding:1rem}.terminal-modal[hidden]{display:none}.terminal-panel{width:min(720px,100%);border:1px solid var(--brand);border-radius:8px;background:#050b14;color:#d7f9ff;box-shadow:var(--shadow);padding:1rem}.terminal-head{display:flex;justify-content:space-between;gap:1rem;border-bottom:1px solid rgba(255,255,255,.14);padding-bottom:.75rem;margin-bottom:.75rem}.terminal-head button{border:1px solid var(--line);border-radius:8px;background:transparent;color:#d7f9ff;padding:.35rem .65rem}.terminal-panel pre{min-height:240px;max-height:50vh;margin:0 0 .75rem;white-space:pre-wrap}.terminal-panel input{width:100%;border:1px solid rgba(255,255,255,.18);border-radius:8px;background:#08111f;color:#d7f9ff;padding:.75rem}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}.recruiter-mode .neural-canvas,.recruiter-mode .achievement-toast{display:none}.recruiter-mode .reveal{opacity:1;transform:none}.recruiter-mode .hero{min-height:auto}.konami-mode{filter:contrast(1.15) saturate(1.45)}.konami-mode:before{content:"";position:fixed;inset:0;z-index:100;pointer-events:none;background:repeating-linear-gradient(0deg,rgba(255,255,255,.08),rgba(255,255,255,.08) 1px,transparent 1px,transparent 4px);mix-blend-mode:overlay}
.jarvis-loader{position:fixed;inset:0;z-index:80;display:grid;place-items:center;text-align:center;padding:2rem;background:radial-gradient(circle at 50% 35%,rgba(79,209,197,.2),transparent 24%),#050b14;color:var(--text);transition:opacity .45s ease,visibility .45s ease}.jarvis-loader.is-hidden{opacity:0;visibility:hidden;pointer-events:none}.jarvis-loader h1{font-size:clamp(2.4rem,7vw,5.5rem);line-height:.95;margin:.4rem 0}.jarvis-loader>p:not(.eyebrow){color:var(--muted);font-size:1.1rem}.jarvis-core{position:relative;width:170px;height:170px;display:grid;place-items:center}.jarvis-core span{position:absolute;inset:0;border:1px solid rgba(79,209,197,.55);border-radius:50%;animation:jarvis-spin 4s linear infinite}.jarvis-core span:nth-child(2){inset:24px;border-color:rgba(139,92,246,.62);animation-duration:2.8s;animation-direction:reverse}.jarvis-core span:nth-child(3){inset:52px;border-color:rgba(247,201,72,.7);animation-duration:1.8s}.loader-track{width:min(520px,90vw);height:10px;border:1px solid var(--line);border-radius:999px;overflow:hidden;background:var(--surface);margin:1rem auto}.loader-track span{display:block;height:100%;width:0;background:linear-gradient(90deg,var(--brand),var(--accent),var(--brand-2));transition:width .25s ease}.loader-stages{list-style:none;padding:0;margin:1rem 0 0;display:grid;gap:.35rem;color:var(--muted)}.loader-stages li.is-active{color:var(--brand);font-weight:900}.loader-stages li.is-done{color:var(--accent)}@keyframes jarvis-spin{to{transform:rotate(360deg)}}.mission-popup,.chat-panel{position:fixed;inset:0;z-index:50;display:grid;place-items:center;background:rgba(0,0,0,.58);padding:1rem}.mission-popup[hidden],.chat-panel[hidden]{display:none}.mission-card,.chat-card{width:min(620px,100%);border:1px solid var(--line);border-radius:8px;background:linear-gradient(180deg,rgba(79,209,197,.12),rgba(139,92,246,.08)),var(--surface);box-shadow:var(--shadow);padding:1.25rem}.mission-card h2{margin-top:.2rem}.jarvis-agent{position:fixed;right:1rem;bottom:1rem;z-index:24;display:flex;align-items:center;gap:.55rem;border:1px solid var(--line);border-radius:999px;background:linear-gradient(135deg,var(--brand),var(--brand-2));color:#07111f;padding:.55rem .8rem;font-weight:900;box-shadow:var(--shadow)}.jarvis-agent span{display:grid;place-items:center;width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.75)}.chat-head{display:flex;justify-content:space-between;gap:1rem;align-items:center;border-bottom:1px solid var(--line);padding-bottom:.75rem;margin-bottom:.75rem}.chat-head button,.chat-prompts button,.chat-card form button{border:1px solid var(--line);border-radius:8px;background:var(--surface-2);color:var(--text);padding:.55rem .75rem;font-weight:800}.chat-log{display:grid;gap:.65rem;max-height:330px;overflow:auto;color:var(--muted);margin-bottom:.75rem}.chat-log p{margin:0;padding:.7rem;border:1px solid var(--line);border-radius:8px;background:rgba(255,255,255,.04)}.chat-prompts{display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:.75rem}.chat-card form{display:grid;grid-template-columns:1fr auto;gap:.5rem}.chat-card input{width:100%;border:1px solid var(--line);border-radius:8px;background:#08111f;color:var(--text);padding:.75rem}.planning-game{padding-top:0}.match-game{display:grid;grid-template-columns:1fr 1fr 280px;gap:1rem}.match-column,.match-status{border:1px solid var(--line);border-radius:8px;background:var(--surface);padding:1.25rem;box-shadow:var(--shadow)}.match-column{display:grid;gap:.65rem;align-content:start}.match-column h3{margin:0 0 .4rem}.match-column button{min-height:46px;border:1px solid var(--line);border-radius:8px;background:var(--surface-2);color:var(--text);font-weight:800}.match-column button.is-selected{border-color:var(--accent);box-shadow:0 0 0 2px rgba(34,228,172,.18)}.match-column button.is-matched{background:rgba(34,228,172,.16);border-color:var(--accent);color:var(--accent)}.match-column button.is-wrong{background:rgba(255,84,112,.14);border-color:#ff5470}.match-status{text-align:center;display:grid;align-content:center}.match-status span{color:var(--brand);font-weight:900;text-transform:uppercase;font-size:.78rem;letter-spacing:.12em}.match-status strong{font-size:3rem}.match-status p{color:var(--muted)}.jira-hero{background:radial-gradient(circle at 18% 25%,rgba(0,82,204,.22),transparent 30%),radial-gradient(circle at 88% 10%,rgba(34,228,172,.16),transparent 28%)}.jira-summary{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1rem}.jira-summary div,.jira-controls,.jira-column,.jira-card,.retro-grid .content-card{border:1px solid var(--line);border-radius:8px;background:var(--surface);box-shadow:var(--shadow)}.jira-summary div{padding:1rem}.jira-summary span{display:block;color:var(--muted);font-size:.78rem;text-transform:uppercase;font-weight:900;letter-spacing:.1em}.jira-summary strong{display:block;margin-top:.25rem;font-size:1.05rem}.jira-controls{display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:1rem}.jira-filter-group{display:flex;gap:.5rem;flex-wrap:wrap}.jira-filter-group button{border:1px solid var(--line);border-radius:999px;background:var(--surface-2);color:var(--muted);padding:.55rem .85rem;font-weight:900}.jira-filter-group button.is-active,.jira-filter-group button:hover,.jira-filter-group button:focus-visible{background:var(--brand);color:#07111f}.jira-search input{width:min(360px,70vw);border:1px solid var(--line);border-radius:8px;background:#08111f;color:var(--text);padding:.75rem}.jira-board-section{padding-top:0}.jira-board{display:grid;grid-template-columns:repeat(4,minmax(250px,1fr));gap:1rem;align-items:start;overflow-x:auto;padding-bottom:.5rem}.jira-column{min-width:250px;padding:.85rem;background:color-mix(in srgb,var(--surface) 88%,#0052cc 12%)}.jira-column-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:.75rem}.jira-column-head h2{font-size:1rem;margin:0}.jira-column-head span{display:grid;place-items:center;width:28px;height:28px;border-radius:999px;background:var(--surface-2);color:var(--brand);font-weight:900}.jira-card{padding:1rem;margin-bottom:.85rem;background:linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.02)),var(--surface-2);transition:transform .2s ease,border-color .2s ease,opacity .2s ease}.jira-card:hover{transform:translateY(-3px);border-color:var(--brand)}.jira-card[hidden]{display:none}.jira-card-top{display:flex;justify-content:space-between;gap:.75rem;margin-bottom:.65rem}.jira-key{color:#7dd3fc;font-weight:900}.jira-type{border:1px solid var(--line);border-radius:999px;color:var(--muted);font-size:.72rem;padding:.2rem .5rem;text-transform:uppercase;font-weight:900}.jira-card h3{font-size:1rem;margin:.25rem 0}.jira-card p,.jira-card li{color:var(--muted);font-size:.92rem}.jira-meta{display:grid;grid-template-columns:1fr 1fr;gap:.55rem;margin:.85rem 0}.jira-meta div{border:1px solid var(--line);border-radius:8px;padding:.55rem}.jira-meta dt{color:var(--muted);font-size:.72rem;text-transform:uppercase;font-weight:900}.jira-meta dd{margin:0;color:var(--text);font-weight:900}.jira-card details{border-top:1px solid var(--line);padding-top:.65rem}.jira-card summary{cursor:pointer;font-weight:900}.retro-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem}.jira-empty{padding:1rem;border:1px dashed var(--line);border-radius:8px;color:var(--muted);text-align:center}
@media (max-width:900px){.nav-toggle{display:flex}.site-nav{position:absolute;left:1rem;right:1rem;top:68px;display:none;flex-direction:column;align-items:stretch;background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:.5rem}.site-nav.is-open{display:flex}.hero,.split,.tech-radar,.resume-layout,.quest-board,.match-game,.jira-summary,.retro-grid{grid-template-columns:1fr}.jira-controls{display:grid}.hero{min-height:auto;padding-top:4rem}.hero-stats,.highlight-grid,.product-grid,.blog-grid,.skill-columns,.case-grid{grid-template-columns:1fr 1fr}.section-heading{display:block}.contact-band,.site-footer{display:block}.footer-links{margin-top:1rem}.game-hud{top:auto;bottom:4.8rem}.jarvis-agent strong{display:none}}
@media (max-width:620px){.brand small{display:none}.hero-stats,.highlight-grid,.product-grid,.blog-grid,.skill-columns,.case-grid,.console-metrics,.console-actions{grid-template-columns:1fr}.hero h1,.page-hero h1{font-size:2.65rem}.section,.hero,.page-hero,.article,.case-study{padding-left:1rem;padding-right:1rem}.site-header{padding:.7rem 1rem}.orbit-grid{grid-template-columns:1fr}.cover-large{min-height:180px}.ai-console p{min-height:auto}.jira-board{grid-template-columns:repeat(4,82vw)}.jira-search input{width:100%}}
@media print{.site-header,.site-footer,.theme-toggle,.nav-toggle,.hero-actions{display:none}.page-hero,.section{padding:1rem 0}body{background:#fff;color:#111}.resume-sidebar,.resume-main,.content-card{box-shadow:none}}
`;
}

function js() {
  return `
const root=document.documentElement;
const saved=localStorage.getItem("theme");
if(saved){root.dataset.theme=saved}else if(matchMedia("(prefers-color-scheme: light)").matches){root.dataset.theme="light"}
document.querySelector("[data-theme-toggle]")?.addEventListener("click",()=>{const next=root.dataset.theme==="dark"?"light":"dark";root.dataset.theme=next;localStorage.setItem("theme",next)});
const nav=document.querySelector("[data-nav]");
document.querySelector("[data-nav-toggle]")?.addEventListener("click",(event)=>{const open=nav.classList.toggle("is-open");event.currentTarget.setAttribute("aria-expanded",String(open))});
nav?.addEventListener("click",(event)=>{if(event.target.matches("a")){nav.classList.remove("is-open");document.querySelector("[data-nav-toggle]")?.setAttribute("aria-expanded","false")}});
const observer=new IntersectionObserver((entries)=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target)}}},{threshold:.1});
document.querySelectorAll(".reveal").forEach((el)=>observer.observe(el));
`;
}

function svg(name, initials, c1, c2) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="${name}"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs><rect width="1200" height="630" fill="#08111f"/><rect x="70" y="70" width="1060" height="490" rx="28" fill="url(#g)" opacity=".95"/><circle cx="980" cy="150" r="96" fill="#fff" opacity=".16"/><circle cx="170" cy="500" r="140" fill="#fff" opacity=".10"/><text x="110" y="210" fill="#07111f" font-family="Arial, sans-serif" font-size="72" font-weight="800">${initials}</text><text x="110" y="320" fill="#07111f" font-family="Arial, sans-serif" font-size="44" font-weight="700">${name}</text><text x="110" y="392" fill="#07111f" font-family="Arial, sans-serif" font-size="28">Enterprise SaaS · Wealth Management · Product Leadership</text></svg>`;
}

function sitemap() {
  const urls = ["", "blog/", "resume/", "jira-resume/", ...products.map((p) => `projects/${p.slug}/`), ...posts.map((p) => `blog/${p.slug}/`)];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${absolute(u)}</loc><lastmod>2026-07-03</lastmod><changefreq>${u.includes("blog/") ? "monthly" : "weekly"}</changefreq></url>`).join("\n")}
</urlset>`;
}

function rss() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel><title>${author} Technical Blog</title><link>${siteUrl}/blog/</link><description>Product management, enterprise SaaS, WealthTech, architecture, and AI writing.</description>
${posts.map((p) => `<item><title>${escapeHtml(p.title)}</title><link>${absolute(`blog/${p.slug}/`)}</link><guid>${absolute(`blog/${p.slug}/`)}</guid><pubDate>${new Date(`${p.date}T00:00:00Z`).toUTCString()}</pubDate><description>${escapeHtml(p.summary)}</description></item>`).join("\n")}
</channel></rss>`;
}

function robots() {
  return `User-agent: *
Allow: /
Sitemap: ${siteUrl}/sitemap.xml`;
}

function readme() {
  return `# Venkata Prasad Muraharisetty Portfolio

Static GitHub Pages portfolio for a Senior Product Owner / Technical Product Manager focused on enterprise SaaS, wealth management, AI products, integrations, and technical product leadership.

## Structure

- \`index.html\` - premium portfolio homepage
- \`projects/\` - product delivery case studies
- \`blog/\` - 45 technical blog posts plus index
- \`jira-resume/\` - interactive Jira-board resume mode
- \`assets/resume/\` - published PDF resume
- \`resume/\` - resume preview and supporting SEO page
- \`assets/css/style.css\` and \`assets/js/main.js\` - lightweight frontend
- \`sitemap.xml\`, \`robots.txt\`, \`rss.xml\` - SEO assets

Run \`node scripts/generate-site.js\` to regenerate the static pages from structured content.`;
}

function homePage() {
  const productCards = products.map((p) => `<article class="product-card reveal">
    <div class="card-kicker">${p.label}</div>
    <h3>${p.title}</h3>
    <p>${p.problem}</p>
    <a class="text-link" href="projects/${p.slug}/">Read case study</a>
  </article>`).join("");
  const blogCards = posts.slice(0, 6).map((p) => postCard(p, "")).join("");
  const body = `
  <section class="hero">
    <canvas class="neural-canvas" data-neural-canvas aria-hidden="true"></canvas>
    <div class="hero-copy reveal">
      <p class="eyebrow">Senior Product Owner - AI Products - Enterprise SaaS - Wealth Management</p>
      <h1>AI-centric product leadership for wealth management SaaS.</h1>
      <p class="hero-lede">I turn regulated financial workflows, enterprise architecture, and advisor productivity pain into AI-powered product capabilities that teams can ship, measure, and trust.</p>
      <div class="hero-actions">
        <a class="button primary" href="#ai-impact">See AI impact</a>
        <a class="button secondary" href="jira-resume/index.html">Switch to Jira Resume</a>
        <a class="button secondary" href="${resumePdf}">View resume</a>
      </div>
      <dl class="hero-stats" aria-label="Profile highlights">
        <div><dt>8+</dt><dd>years in enterprise SaaS and financial services</dd></div>
        <div><dt>5</dt><dd>years as Product Owner / Senior Product Owner</dd></div>
        <div><dt>SAFe</dt><dd>PI planning, discovery, backlog, release confidence</dd></div>
      </dl>
    </div>
    <div class="hero-panel reveal" aria-label="AI product leadership console">
      <div class="ai-console" id="ai-impact">
        <div class="console-topline"><span>AI product signal</span><strong>Intelliflo IQ</strong></div>
        <p data-ai-output>Led AI-powered Engagement and Advice Assistants that automated data population across 190+ platform fields.</p>
        <div class="console-metrics">
          <span><strong>190+</strong> fields automated</span>
          <span><strong>Hours</strong> to minutes</span>
          <span><strong>40%</strong> fewer defect/rework loops</span>
        </div>
        <div class="console-actions" role="group" aria-label="AI product highlights">
          <button type="button" class="is-active" data-ai-persona="advisor">Advisor value</button>
          <button type="button" data-ai-persona="enterprise">Enterprise trust</button>
          <button type="button" data-ai-persona="delivery">Delivery model</button>
        </div>
      </div>
      <div class="orbit-grid" aria-hidden="true">
        <span>AI Assistants</span><span>Product Strategy</span><span>APIs</span><span>SAFe</span><span>CRM</span><span>WealthTech</span>
      </div>
    </div>
  </section>

  <section class="section quest-section" id="quest">
    <div class="section-heading">
      <div>
        <p class="eyebrow">Interactive product quest</p>
        <h2>Play Senior Product Owner for 45 seconds.</h2>
      </div>
      <button class="button primary" type="button" data-quest-reset>Restart quest</button>
    </div>
    <div class="quest-board reveal" data-quest>
      <div class="quest-stage">
        <p class="meta">Scenario</p>
        <h3 data-quest-title>Customer escalation lands during PI planning.</h3>
        <p data-quest-copy>A strategic client wants an AI-assisted workflow shipped immediately. Engineering sees risk, UX needs discovery, and leadership wants confidence. What do you do first?</p>
        <div class="quest-options">
          <button type="button" data-quest-choice="0">Promise the date and push the team</button>
          <button type="button" data-quest-choice="1">Define MVP scope, risks, success metric, and decision path</button>
          <button type="button" data-quest-choice="2">Move everything into backlog and wait</button>
        </div>
      </div>
      <aside class="quest-score" aria-live="polite">
        <span>Product Sense</span>
        <strong data-quest-score>0</strong>
        <p data-quest-feedback>Choose like a product leader. Good trade-offs unlock achievements.</p>
      </aside>
    </div>
  </section>

  <section class="section planning-game" id="planning-game">
    <div class="section-heading">
      <div>
        <p class="eyebrow">Product planning match game</p>
        <h2>Match the artifact to the product lifecycle stage.</h2>
      </div>
      <button class="button secondary" type="button" data-match-reset>Reset board</button>
    </div>
    <div class="match-game reveal" data-match-game>
      <div class="match-column">
        <h3>Artifacts</h3>
        <button type="button" data-match-card="epic">Epic</button>
        <button type="button" data-match-card="story">User Story</button>
        <button type="button" data-match-card="acceptance">Acceptance Criteria</button>
        <button type="button" data-match-card="release">Release Note</button>
      </div>
      <div class="match-column">
        <h3>Lifecycle stages</h3>
        <button type="button" data-match-slot="discovery">Discovery</button>
        <button type="button" data-match-slot="refinement">Backlog refinement</button>
        <button type="button" data-match-slot="validation">Validation</button>
        <button type="button" data-match-slot="launch">Production launch</button>
      </div>
      <aside class="match-status" aria-live="polite">
        <span>Planning score</span>
        <strong data-match-score>0/4</strong>
        <p data-match-feedback>Select an artifact, then choose the lifecycle stage where it creates the most value.</p>
      </aside>
    </div>
  </section>

  <section id="about" class="section split">
    <div>
      <p class="eyebrow">About me</p>
      <h2>Technical product manager with AI delivery and engineering depth.</h2>
    </div>
    <div class="content-stack">
      <p>I am Venkata Prasad Muraharisetty, a Senior Product Owner based in ${location}, with 8+ years delivering enterprise SaaS products across wealth management, financial services, CRM, integrations, and AI-powered advisor workflows.</p>
      <p>My background spans software engineering, product ownership, SAFe Agile delivery, API integrations, cloud platforms, microservices, and product discovery. I partner with Product Managers, Engineering, UX, Architecture, QA, and business stakeholders to translate strategy into scalable software outcomes.</p>
    </div>
  </section>

  <section id="highlights" class="section">
    <div class="section-heading">
      <p class="eyebrow">Career highlights</p>
      <h2>Proof points that make the story credible quickly.</h2>
    </div>
    <div class="highlight-grid">
      ${["AI-powered Intelliflo IQ delivery with 190+ field automation", "Manual advisor admin reduced from hours to minutes", "40% reduction in post-release defects and rework loops", "20% increase in active client engagement for Money Alive pilot firms", "Nearly 5 years as Product Owner / Senior Product Owner in SAFe Agile", "Career progression across Intelliflo, Broadridge, and GTKonnect / EY"].map((x) => `<div class="highlight-card reveal">${x}</div>`).join("")}
    </div>
  </section>

  <section id="experience" class="section split">
    <div>
      <p class="eyebrow">Experience</p>
      <h2>Progression from engineering depth to product leadership.</h2>
    </div>
    <div class="timeline">
      ${[
        ["Intelliflo", "Senior Product Owner - Oct 2021 to Present", "Own and prioritize enterprise product backlogs across multiple Agile teams, lead PI planning and SAFe ceremonies, define epics, stories, MVP scope, acceptance criteria, and release-ready product increments for WealthTech SaaS."],
        ["Broadridge Financial Solutions", "Senior Software Engineer - Apr 2020 to Oct 2021", "Developed ACATS account transfer capabilities and IBM MQ-based secure enterprise messaging for regulated wealth management platforms."],
        ["GTKonnect, acquired by EY", "Associate Software Developer - Apr 2018 to Apr 2020", "Built Global Trade Management, CBP/ABI integrations, ISF and FTZ processing services, REST APIs, and microservices for international trade workflows."]
      ].map(([company, role, desc]) => `<article class="timeline-item reveal"><span></span><h3>${company}</h3><p class="muted">${role}</p><p>${desc}</p></article>`).join("")}
    </div>
  </section>

  <section id="products" class="section">
    <div class="section-heading">
      <p class="eyebrow">Featured product deliveries</p>
      <h2>Case studies across enterprise SaaS, WealthTech, AI, CRM, and integrations.</h2>
    </div>
    <div class="product-grid">${productCards}</div>
  </section>

  <section id="skills" class="section skill-section">
    <div class="section-heading">
      <p class="eyebrow">Skills</p>
      <h2>Product leadership with technical credibility.</h2>
    </div>
    <div class="skill-columns">
      ${skillBlock("Product", ["Product strategy", "Roadmapping", "Product discovery", "Backlog management", "Feature prioritization", "User story mapping", "Acceptance criteria", "UAT"])}
      ${skillBlock("Domain", ["Enterprise SaaS", "Wealth management", "Financial planning", "CRM", "Reporting", "Client review workflows"])}
      ${skillBlock("Technical", ["REST APIs", "Microservices", "Azure", "AWS", "SQL Server", "C#", ".NET", "IBM MQ", "AI products"])}
      ${skillBlock("Leadership", ["SAFe Agile", "Scrum", "PI planning", "Sprint planning", "Release planning", "Stakeholder management", "Cross-functional alignment"])}
    </div>
  </section>

  <section class="section tech-radar">
    <div>
      <p class="eyebrow">Technology stack</p>
      <h2>Comfortable in the architecture room and the roadmap room.</h2>
    </div>
    <div class="tag-cloud">
      ${["Azure DevOps", "Jira", "Confluence", "Postman", "Splunk", "REST", "OpenAPI", "Microservices", "Azure", "AWS", "SQL Server", "C#", ".NET", "IBM MQ", "Microsoft Graph", "LLMs", "Product analytics", "Git"].map((x) => `<span>${x}</span>`).join("")}
    </div>
  </section>

  <section id="education" class="section split">
    <div>
      <p class="eyebrow">Education</p>
      <h2>Engineering foundation for product decisions.</h2>
    </div>
    <div class="content-card reveal">
      <h3>B.Tech</h3>
      <p>Bachelor of Technology, Godavari Institute of Engineering & Technology. CGPA: 9.1/10.</p>
    </div>
  </section>

  <section id="blog" class="section">
    <div class="section-heading">
      <p class="eyebrow">Technical blog</p>
      <h2>Writing on product management, WealthTech, SaaS architecture, AI, and career growth.</h2>
      <a class="button secondary" href="blog/">Explore all posts</a>
    </div>
    <div class="blog-grid">${blogCards}</div>
  </section>

  <section id="contact" class="section contact-band">
    <div>
      <p class="eyebrow">Contact</p>
      <h2>Let's talk about AI product delivery, enterprise SaaS, or wealth management platforms.</h2>
      <p>${location} - ${phone}. Best fit: Senior Product Owner, Technical Product Manager, AI Product Manager, or Enterprise SaaS Product roles.</p>
    </div>
    <div class="contact-actions">
      <a class="button primary" href="mailto:${email}">Email me</a>
      <a class="button secondary" href="${resumePdf}">View resume</a>
    </div>
  </section>`;
  return pageShell({
    file: "index.html",
    title: `${author} | AI Product Owner for Enterprise SaaS & Wealth Management`,
    description: "Senior Product Owner and Technical Product Manager specializing in AI products, enterprise SaaS, wealth management, SAFe Agile delivery, APIs, CRM, and integrations.",
    body,
    jsonLd: [personSchema, breadcrumbSchema([{ name: "Home", url: siteUrl }])]
  });
}

function resumePage() {
  const body = `<section class="page-hero">
    <p class="eyebrow">Resume showcase</p>
    <h1>${author}</h1>
    <p>Senior Product Owner specializing in AI-powered enterprise SaaS, wealth management, SAFe Agile delivery, product strategy, CRM, APIs, cloud platforms, microservices, and integrations.</p>
    <div class="hero-actions"><a class="button primary" href="../${resumePdf}">Open PDF resume</a><a class="button secondary" href="../${resumePdf}" download>Download resume</a><a class="button secondary" href="mailto:${email}">Contact</a></div>
  </section>
  <section class="section resume-viewer" aria-label="Resume PDF preview">
    <object data="../${resumePdf}" type="application/pdf">
      <p>Your browser could not display the resume preview. <a href="../${resumePdf}">Open the PDF resume</a>.</p>
    </object>
  </section>
  <section class="section resume-layout">
    <aside class="resume-sidebar">
      <h2>Profile</h2>
      <p>8+ years across software engineering and product ownership, including nearly 5 years as Product Owner / Senior Product Owner delivering enterprise SaaS products in SAFe Agile environments.</p>
      <h2>Core skills</h2>
      <div class="tag-cloud compact">${["Product strategy", "Roadmapping", "Discovery", "Backlog", "Prioritization", "SAFe Agile", "PI planning", "REST APIs", "Microservices", "AI products", "CRM", "Azure", "AWS"].map((x) => `<span>${x}</span>`).join("")}</div>
    </aside>
    <div class="resume-main">
      <h2>Experience</h2>
      <article><h3>Intelliflo</h3><p class="muted">Senior Product Owner - Oct 2021 to Present</p><p>Led product delivery across AI-powered advisor capabilities, Outlook Integration, Money Alive Integration, Client Review workflows, CRM, financial planning, reporting, and enterprise integrations.</p></article>
      <article><h3>Broadridge Financial Solutions</h3><p class="muted">Senior Software Engineer - Apr 2020 to Oct 2021</p><p>Delivered ACATS account transfer capabilities and secure IBM MQ-based integration patterns for regulated financial applications.</p></article>
      <article><h3>GTKonnect, acquired by EY</h3><p class="muted">Associate Software Developer - Apr 2018 to Apr 2020</p><p>Built Global Trade Management capabilities, CBP/ABI integrations, ISF and FTZ processing services, REST APIs, and microservices.</p></article>
      <h2>Selected product outcomes</h2>
      <p>Intelliflo IQ automated 190+ platform fields and reduced advisor administrative effort from hours to minutes. Money Alive supported a 20% increase in active client engagement metrics for pilot advisory firms. Improved story quality and Definition of Done practices supported a 40% reduction in post-release defects and rework loops.</p>
    </div>
  </section>`;
  return pageShell({
    file: "resume/index.html",
    title: `Resume | ${author}`,
    description: "Resume showcase for Venkata Prasad Muraharisetty, Senior Product Owner and AI-focused Technical Product Manager in enterprise SaaS and wealth management.",
    body,
    canonical: absolute("resume/"),
    jsonLd: [personSchema, breadcrumbSchema([{ name: "Home", url: siteUrl }, { name: "Resume", url: absolute("resume/") }])]
  });
}

function jiraResumePage() {
  const issues = [
    {
      key: "VP-101",
      column: "Backlog",
      type: "Epic",
      category: "strategy",
      title: "AI product leadership for enterprise wealth platforms",
      points: 13,
      priority: "Highest",
      summary: "Define and deliver AI-assisted advisor workflows that save time while preserving enterprise trust.",
      criteria: ["MVP scope connects to measurable advisor productivity", "Governance, telemetry, and quality gates are part of the release plan", "Business, engineering, and UX understand the trade-offs"],
      evidence: "Intelliflo IQ automated data population across 190+ platform fields and reduced advisor administration from hours to minutes."
    },
    {
      key: "VP-124",
      column: "Backlog",
      type: "Story",
      category: "strategy",
      title: "As an executive stakeholder, I need a roadmap that explains outcomes",
      points: 8,
      priority: "High",
      summary: "Roadmap decisions are framed around customer value, business impact, technical risk, and release sequencing.",
      criteria: ["Epics map to outcomes, not just features", "Dependencies and risks are visible before sprint commitment", "Stakeholders know what changed and why"],
      evidence: "Delivered across CRM, financial planning, reporting, client review, and advisor productivity initiatives."
    },
    {
      key: "VP-207",
      column: "Ready for Sprint",
      type: "Story",
      category: "delivery",
      title: "As an engineering squad, we need crisp stories and acceptance criteria",
      points: 5,
      priority: "High",
      summary: "Translate discovery and strategy into backlog items teams can estimate, build, test, and release.",
      criteria: ["Stories include user intent, workflow context, edge cases, and non-functional needs", "Acceptance criteria are testable and implementation-aware", "Definition of Done reduces release ambiguity"],
      evidence: "Improved story quality and delivery discipline, supporting fewer post-release defect and rework loops."
    },
    {
      key: "VP-238",
      column: "Ready for Sprint",
      type: "Task",
      category: "technical",
      title: "Map API, microservice, and integration trade-offs before build",
      points: 5,
      priority: "Medium",
      summary: "Use engineering background to identify service boundaries, data contracts, authentication, monitoring, and fallback behavior early.",
      criteria: ["API behavior and error paths are clear", "Integration dependencies have owners", "Observability and support needs are known before launch"],
      evidence: "Hands-on background across REST APIs, microservices, IBM MQ integrations, SQL Server, Azure, AWS, and enterprise systems."
    },
    {
      key: "VP-302",
      column: "In Progress",
      type: "Story",
      category: "wealth",
      title: "As an advisor, I need client workflows that reduce context switching",
      points: 8,
      priority: "High",
      summary: "Design advisor journeys across Outlook, CRM, client reviews, financial planning, reporting, and client engagement.",
      criteria: ["Workflow starts from real advisor behavior", "Client context moves between systems with less rekeying", "Auditability and permissions are handled"],
      evidence: "Delivered Outlook Integration, Client Review, CRM enhancements, Financial Planning, Fact Find, Reporting, and Money Alive Integration."
    },
    {
      key: "VP-327",
      column: "In Progress",
      type: "Spike",
      category: "technical",
      title: "Investigate regulated SaaS launch readiness",
      points: 3,
      priority: "Medium",
      summary: "Make releases boring in the best way: tested, observable, communicated, and supportable.",
      criteria: ["Release notes explain user impact", "Support and client-facing teams have context", "Metrics exist for adoption, quality, and issues"],
      evidence: "SAFe Agile delivery across PI planning, sprint planning, refinement, reviews, retrospectives, and production releases."
    },
    {
      key: "VP-401",
      column: "Done",
      type: "Outcome",
      category: "delivery",
      title: "Ship complex product increments across enterprise SaaS",
      points: 13,
      priority: "Done",
      summary: "Convert ambiguity into shipped capabilities across multi-team, regulated, technically complex environments.",
      criteria: ["Discovery informs roadmap", "Delivery teams understand value and scope", "Launch outcomes are measurable"],
      evidence: "8+ years across Intelliflo, Broadridge Financial Solutions, and GTKonnect acquired by EY."
    },
    {
      key: "VP-418",
      column: "Done",
      type: "Outcome",
      category: "career",
      title: "Progress from engineer to Senior Product Owner",
      points: 8,
      priority: "Done",
      summary: "A rare blend of product leadership, platform thinking, architecture fluency, and delivery ownership.",
      criteria: ["Can speak business value with leaders", "Can speak technical trade-offs with engineers", "Can keep teams moving through ambiguity"],
      evidence: "Career path: Associate Software Developer, Senior Software Engineer, Product Owner, Senior Product Owner."
    }
  ];
  const columns = ["Backlog", "Ready for Sprint", "In Progress", "Done"];
  const board = columns.map((column) => `<section class="jira-column" aria-labelledby="jira-${slugify(column)}">
    <div class="jira-column-head">
      <h2 id="jira-${slugify(column)}">${column}</h2>
      <span>${issues.filter((issue) => issue.column === column).length}</span>
    </div>
    ${issues.filter((issue) => issue.column === column).map((issue) => `<article class="jira-card reveal" data-jira-card data-jira-category="${issue.category}" data-jira-text="${escapeHtml(`${issue.key} ${issue.title} ${issue.summary} ${issue.evidence}`.toLowerCase())}">
      <div class="jira-card-top"><span class="jira-key">${issue.key}</span><span class="jira-type">${issue.type}</span></div>
      <h3>${issue.title}</h3>
      <p>${issue.summary}</p>
      <dl class="jira-meta">
        <div><dt>SP</dt><dd>${issue.points}</dd></div>
        <div><dt>Priority</dt><dd>${issue.priority}</dd></div>
      </dl>
      <details>
        <summary>Acceptance criteria and evidence</summary>
        <ul>${issue.criteria.map((item) => `<li>${item}</li>`).join("")}</ul>
        <p><strong>Evidence:</strong> ${issue.evidence}</p>
      </details>
    </article>`).join("")}
  </section>`).join("");
  const body = `<section class="page-hero jira-hero">
    <p class="eyebrow">Jira Resume Mode</p>
    <h1>Venkat's resume, rebuilt as a product delivery board.</h1>
    <p>Scan my strengths like a Jira project: strategy epics, sprint-ready product ownership, technical stories, wealth management outcomes, and shipped evidence.</p>
    <div class="hero-actions">
      <a class="button primary" href="../index.html">Switch to cinematic portfolio</a>
      <a class="button secondary" href="../resume/">Classic resume page</a>
      <a class="button secondary" href="../${resumePdf}">Open PDF</a>
    </div>
  </section>

  <section class="section jira-dashboard" aria-label="Jira resume controls">
    <div class="jira-summary reveal">
      <div><span>Candidate</span><strong>Senior Product Owner</strong></div>
      <div><span>Domain</span><strong>Enterprise SaaS + WealthTech</strong></div>
      <div><span>Delivery</span><strong>SAFe Agile + AI Products</strong></div>
      <div><span>Signal</span><strong>Engineer to Product Leader</strong></div>
    </div>
    <div class="jira-controls reveal">
      <div class="jira-filter-group" role="group" aria-label="Filter Jira resume stories">
        <button type="button" class="is-active" data-jira-filter="all">All</button>
        <button type="button" data-jira-filter="strategy">Strategy</button>
        <button type="button" data-jira-filter="delivery">Delivery</button>
        <button type="button" data-jira-filter="technical">Technical</button>
        <button type="button" data-jira-filter="wealth">Wealth</button>
        <button type="button" data-jira-filter="career">Career</button>
      </div>
      <label class="jira-search"><span class="sr-only">Search Jira resume</span><input data-jira-search placeholder="Search stories, outcomes, APIs, AI, CRM"></label>
    </div>
  </section>

  <section class="section jira-board-section" aria-label="Jira resume board">
    <div class="jira-board" data-jira-board>${board}</div>
  </section>

  <section class="section jira-retro">
    <div class="section-heading">
      <div>
        <p class="eyebrow">Sprint review</p>
        <h2>Why this board matters to recruiters.</h2>
      </div>
      <a class="button primary" href="mailto:${email}">Start conversation</a>
    </div>
    <div class="retro-grid">
      <article class="content-card reveal"><h3>What went well</h3><p>Product strategy is backed by delivery discipline, technical fluency, and shipped outcomes in regulated enterprise SaaS.</p></article>
      <article class="content-card reveal"><h3>Risks reduced</h3><p>Engineering background helps uncover integration, API, cloud, observability, and data-quality concerns before they become sprint surprises.</p></article>
      <article class="content-card reveal"><h3>Next sprint</h3><p>Best-fit roles: Senior Product Owner, Technical Product Manager, AI Product Manager, Enterprise SaaS Product Owner, or WealthTech Product Lead.</p></article>
    </div>
  </section>`;
  return pageShell({
    file: "jira-resume/index.html",
    title: `Jira Resume | ${author}`,
    description: "A Jira-board version of Venkata Prasad Muraharisetty's resume, highlighting product strategy, AI products, enterprise SaaS, wealth management, technical product management, and delivery outcomes.",
    body,
    canonical: absolute("jira-resume/"),
    jsonLd: [personSchema, breadcrumbSchema([{ name: "Home", url: siteUrl }, { name: "Jira Resume", url: absolute("jira-resume/") }])]
  });
}

function js() {
  return `
const root=document.documentElement;
const saved=localStorage.getItem("theme");
if(saved){root.dataset.theme=saved}else if(matchMedia("(prefers-color-scheme: light)").matches){root.dataset.theme="light"}
document.querySelector("[data-theme-toggle]")?.addEventListener("click",()=>{const next=root.dataset.theme==="dark"?"light":"dark";root.dataset.theme=next;localStorage.setItem("theme",next)});
const nav=document.querySelector("[data-nav]");
document.querySelector("[data-nav-toggle]")?.addEventListener("click",(event)=>{const open=nav.classList.toggle("is-open");event.currentTarget.setAttribute("aria-expanded",String(open))});
nav?.addEventListener("click",(event)=>{if(event.target.matches("a")){nav.classList.remove("is-open");document.querySelector("[data-nav-toggle]")?.setAttribute("aria-expanded","false")}});
document.addEventListener("click",(event)=>{const link=event.target.closest?.("a[href]");if(!link||location.protocol!=="file:")return;const target=new URL(link.getAttribute("href"),location.href);if(target.protocol==="file:"&&target.pathname===location.pathname&&target.hash){event.preventDefault();document.querySelector(target.hash)?.scrollIntoView({behavior:"smooth",block:"start"});}});
const aiCopy={advisor:"Advisor value: AI assistance reduces repetitive data entry and turns advisor effort toward client conversations, review prep, and advice quality.",enterprise:"Enterprise trust: AI capability is framed around permissions, data governance, measurable adoption, telemetry, and release confidence.",delivery:"Delivery model: MVP scope, epics, user stories, acceptance criteria, DoD discipline, and SAFe ceremonies connect strategy to working software."};
const aiOutput=document.querySelector("[data-ai-output]");
document.querySelectorAll("[data-ai-persona]").forEach((button)=>button.addEventListener("click",()=>{document.querySelectorAll("[data-ai-persona]").forEach((item)=>item.classList.remove("is-active"));button.classList.add("is-active");if(aiOutput){aiOutput.textContent=aiCopy[button.dataset.aiPersona]}}));
const loader=document.querySelector("[data-jarvis-loader]");
const loaderLine=document.querySelector("[data-loader-line]");
const loaderBar=document.querySelector("[data-loader-bar]");
const loaderStages=[...document.querySelectorAll("[data-loader-stages] li")];
const missionPopup=document.querySelector("[data-mission-popup]");
function closeLoader(showMission=true){if(loader){loader.classList.add("is-hidden");setTimeout(()=>{loader.hidden=true},500)}sessionStorage.setItem("jarvis_intro_seen","1");if(showMission){setTimeout(()=>{if(missionPopup&&!sessionStorage.getItem("mission_popup_seen"))missionPopup.hidden=false},650)}}
function hideLoader(){closeLoader(true)}
addEventListener("pageshow",(event)=>{if(event.persisted||sessionStorage.getItem("jarvis_intro_seen")){if(loader){loader.classList.add("is-hidden");loader.hidden=true}}});
if(loader&&sessionStorage.getItem("jarvis_intro_seen")){loader.hidden=true}else if(loader){const lines=["Epic created","Stories created","Sprint planning aligned","Acceptance criteria locked","Deployed to production"];let step=0;const tick=()=>{if(step<lines.length){if(loaderLine)loaderLine.textContent=lines[step]+"...";if(loaderBar)loaderBar.style.width=((step+1)/lines.length*100)+"%";loaderStages.forEach((item,index)=>{item.classList.toggle("is-active",index===step);item.classList.toggle("is-done",index<step)});step+=1;setTimeout(tick,520)}else{if(loaderLine)loaderLine.textContent="100% complete. Portfolio deployed.";loaderStages.forEach((item)=>item.classList.add("is-done"));setTimeout(hideLoader,650)}};setTimeout(tick,350)}
document.querySelector("[data-loader-skip]")?.addEventListener("click",hideLoader);
document.querySelector("[data-mission-close]")?.addEventListener("click",()=>{sessionStorage.setItem("mission_popup_seen","1");if(missionPopup)missionPopup.hidden=true});
document.querySelector("[data-mission-start]")?.addEventListener("click",(event)=>{sessionStorage.setItem("mission_popup_seen","1");if(missionPopup)missionPopup.hidden=true;const game=document.querySelector("#planning-game");if(game){game.scrollIntoView({behavior:"smooth",block:"start"});if(location.protocol!=="file:")history.replaceState(null,"","#planning-game");return}const url=event.currentTarget?.dataset.homeUrl;if(url&&location.protocol!=="file:")location.assign(url)});
const toast=document.createElement("div");
toast.className="achievement-toast";
toast.setAttribute("role","status");
toast.setAttribute("aria-live","polite");
document.body.appendChild(toast);
let toastTimer;
function unlock(title,detail){toast.innerHTML="<strong>Achievement unlocked</strong><span>"+title+"</span><p>"+detail+"</p>";toast.classList.add("is-visible");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("is-visible"),4200)}
const levels=[["Lv1 Visitor",0],["Lv2 Stakeholder",50],["Lv3 Collaborator",120],["Lv4 Sprint Ally",220],["Lv5 Product Legend",350]];
const storageKey="po_game_state_v1";
const state=JSON.parse(localStorage.getItem(storageKey)||"{\\"xp\\":0,\\"achievements\\":[],\\"recruiter\\":false}");
const achievementText={FIRST_CONTACT:["First Contact","Product Owner Engine initialized."],SECTION_SCANNER:["Section Scanner","You started unlocking the narrative."],QUEST_COMPLETE:["Sprint Survivor","You completed the Product Owner Quest."],SKILL_SCANNER:["Product Strategist","You matched the planning board."],AI_WHISPERER:["AI Whisperer","You spoke with JARVIS."],RESUME_DOWNLOAD:["Headhunter Signal","Resume opened or downloaded."],CONTACT_CLICK:["Join My Party","Contact intent detected."],TERMINAL_HACKER:["Terminal Hacker","Hidden command line discovered."],KONAMI_CODE:["Retro Strategist","Konami mode unlocked."],THEME_ENGINE:["Theme Engine","You toggled the experience layer."]};
const levelLabel=document.querySelector("[data-level-label]"),xpText=document.querySelector("[data-xp-text]"),xpBar=document.querySelector("[data-xp-bar]"),achievementCount=document.querySelector("[data-achievement-count]");
function save(){localStorage.setItem(storageKey,JSON.stringify(state))}
function levelFor(xp){return levels.reduce((found,item)=>xp>=item[1]?item:found,levels[0])}
function renderHud(){const level=levelFor(state.xp);if(levelLabel)levelLabel.textContent=level[0];if(xpText)xpText.textContent=state.xp+" XP";if(xpBar)xpBar.style.width=Math.min(100,(state.xp/350)*100)+"%";if(achievementCount)achievementCount.textContent=state.achievements.length}
function addXp(amount){state.xp=Math.max(0,state.xp+amount);save();renderHud()}
function award(id,xp=0){if(!state.achievements.includes(id)){state.achievements.push(id);addXp(xp);const text=achievementText[id]||[id,"Achievement unlocked."];unlock(text[0],text[1])}else if(xp){addXp(xp)}}
renderHud();
setTimeout(()=>award("FIRST_CONTACT",10),900);
setTimeout(()=>unlock("Curious Visitor","You stayed long enough to trigger the hidden signal."),30000);
document.querySelector("[data-hud-toggle]")?.addEventListener("click",(event)=>{const hud=document.querySelector("[data-hud]");const open=hud?.classList.toggle("is-open");event.currentTarget.setAttribute("aria-expanded",String(open))});
const recruiterToggle=document.querySelector("[data-recruiter-mode]");
function applyRecruiterMode(){root.classList.toggle("recruiter-mode",!!state.recruiter);if(recruiterToggle)recruiterToggle.checked=!!state.recruiter}
recruiterToggle?.addEventListener("change",()=>{state.recruiter=recruiterToggle.checked;save();applyRecruiterMode();if(state.recruiter){unlock("Recruiter mode","Focus layout enabled. Animations and game noise reduced.")}});
applyRecruiterMode();
document.querySelectorAll('a[href*="resume"],a[href^="mailto:"]').forEach((link)=>link.addEventListener("click",()=>{if(link.href.includes("resume"))award("RESUME_DOWNLOAD",40);if(link.href.startsWith("mailto:"))award("CONTACT_CLICK",25)}));
const quest=[
{title:"Customer escalation lands during PI planning.",copy:"A strategic client wants an AI-assisted workflow shipped immediately. Engineering sees risk, UX needs discovery, and leadership wants confidence. What do you do first?",choices:["Promise the date and push the team","Define MVP scope, risks, success metric, and decision path","Move everything into backlog and wait"],answer:1,win:"Correct. You turned pressure into scope, risk, metrics, and a decision path."},
{title:"Engineering says the integration will take 8 months.",copy:"The business needs movement this quarter. How do you create progress without pretending complexity is small?",choices:["Split the partner journey into a thin API-led pilot","Ask for a full rewrite first","Skip architecture review"],answer:0,win:"Strong. Thin-slice delivery creates learning while protecting architecture."},
{title:"An AI feature works in demo but needs enterprise trust.",copy:"What makes it shippable for regulated wealth management users?",choices:["More animation","Permissions, telemetry, feedback loops, and quality gates","A louder launch email"],answer:1,win:"Exactly. Enterprise AI needs trust, measurement, and operational control."}
];
let questIndex=0,questScore=0;
const questTitle=document.querySelector("[data-quest-title]");
const questCopy=document.querySelector("[data-quest-copy]");
const questScoreEl=document.querySelector("[data-quest-score]");
const questFeedback=document.querySelector("[data-quest-feedback]");
const questButtons=[...document.querySelectorAll("[data-quest-choice]")];
function renderQuest(){const q=quest[questIndex];if(!q||!questTitle)return;questTitle.textContent=q.title;questCopy.textContent=q.copy;questButtons.forEach((button,index)=>{button.textContent=q.choices[index];button.disabled=false});questFeedback.textContent="Choose like a product leader. Good trade-offs unlock achievements."}
questButtons.forEach((button)=>button.addEventListener("click",()=>{const q=quest[questIndex];const choice=Number(button.dataset.questChoice);questButtons.forEach((item)=>item.disabled=true);if(choice===q.answer){questScore+=100;questFeedback.textContent=q.win;addXp(15);unlock("Product Sense +15 XP",q.win)}else{questScore+=25;questFeedback.textContent="Playable lesson: senior product ownership is about trade-offs, not reflexes.";addXp(5);unlock("Lesson Captured","You found a risky path and learned the better product move.")}questScoreEl.textContent=questScore;questIndex+=1;if(questIndex<quest.length){setTimeout(renderQuest,1100)}else{setTimeout(()=>{questFeedback.textContent="Mission complete. You survived stakeholders, architecture risk, and AI governance.";award("QUEST_COMPLETE",30)},900)}}));
document.querySelector("[data-quest-reset]")?.addEventListener("click",()=>{questIndex=0;questScore=0;questScoreEl.textContent="0";renderQuest();unlock("Quest Reset","Product Owner Engine ready for another run.")});
renderQuest();
let selectedCard=null,matchScore=0;
const matchMap={epic:"discovery",story:"refinement",acceptance:"validation",release:"launch"};
const matchScoreEl=document.querySelector("[data-match-score]"),matchFeedback=document.querySelector("[data-match-feedback]");
function resetMatch(){selectedCard=null;matchScore=0;if(matchScoreEl)matchScoreEl.textContent="0/4";if(matchFeedback)matchFeedback.textContent="Select an artifact, then choose the lifecycle stage where it creates the most value.";document.querySelectorAll("[data-match-card],[data-match-slot]").forEach((button)=>{button.disabled=false;button.classList.remove("is-selected","is-matched","is-wrong")})}
document.querySelectorAll("[data-match-card]").forEach((button)=>button.addEventListener("click",()=>{selectedCard=button.dataset.matchCard;document.querySelectorAll("[data-match-card]").forEach((item)=>item.classList.remove("is-selected"));button.classList.add("is-selected")}));
document.querySelectorAll("[data-match-slot]").forEach((slot)=>slot.addEventListener("click",()=>{if(!selectedCard){if(matchFeedback)matchFeedback.textContent="Pick an artifact first. Product planning needs an input.";return}const card=document.querySelector('[data-match-card="'+selectedCard+'"]');if(matchMap[selectedCard]===slot.dataset.matchSlot){card?.classList.add("is-matched");slot.classList.add("is-matched");card.disabled=true;slot.disabled=true;matchScore+=1;if(matchScoreEl)matchScoreEl.textContent=matchScore+"/4";if(matchFeedback)matchFeedback.textContent="Matched. That is product planning with intent.";addXp(10);if(matchScore===4){award("SKILL_SCANNER",30);unlock("Product Strategist","You matched the planning board.")}}else{slot.classList.add("is-wrong");setTimeout(()=>slot.classList.remove("is-wrong"),650);if(matchFeedback)matchFeedback.textContent="Close, but not the best stage. Try another product move."}selectedCard=null;document.querySelectorAll("[data-match-card]").forEach((item)=>item.classList.remove("is-selected"))}));
document.querySelector("[data-match-reset]")?.addEventListener("click",resetMatch);
const canvas=document.querySelector("[data-neural-canvas]");
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
if(canvas&&!reduce){const ctx=canvas.getContext("2d");let width=0,height=0,points=[];const pointer={x:.5,y:.5};function resize(){width=canvas.width=canvas.offsetWidth*devicePixelRatio;height=canvas.height=canvas.offsetHeight*devicePixelRatio;points=Array.from({length:48},()=>({x:Math.random()*width,y:Math.random()*height,vx:(Math.random()-.5)*.35*devicePixelRatio,vy:(Math.random()-.5)*.35*devicePixelRatio}))}function draw(){ctx.clearRect(0,0,width,height);for(const p of points){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>width)p.vx*=-1;if(p.y<0||p.y>height)p.vy*=-1;const dx=p.x-pointer.x*width,dy=p.y-pointer.y*height;if(Math.hypot(dx,dy)<180*devicePixelRatio){p.x+=dx*.002;p.y+=dy*.002}}for(let i=0;i<points.length;i++){for(let j=i+1;j<points.length;j++){const a=points[i],b=points[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<150*devicePixelRatio){ctx.strokeStyle="rgba(79,209,197,"+(1-d/(150*devicePixelRatio))*.28+")";ctx.lineWidth=devicePixelRatio;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}}}for(const p of points){ctx.fillStyle="rgba(125,211,252,.72)";ctx.beginPath();ctx.arc(p.x,p.y,2.2*devicePixelRatio,0,Math.PI*2);ctx.fill()}requestAnimationFrame(draw)}resize();addEventListener("resize",resize);document.querySelector(".hero")?.addEventListener("pointermove",(event)=>{const rect=canvas.getBoundingClientRect();pointer.x=(event.clientX-rect.left)/rect.width;pointer.y=(event.clientY-rect.top)/rect.height});draw()}
addEventListener("keydown",(event)=>{if(event.ctrlKey&&event.shiftKey&&event.key.toLowerCase()==="a"){root.classList.toggle("cyber-mode");award("THEME_ENGINE",5)}});
let konami=[];
const konamiCode=["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
addEventListener("keydown",(event)=>{konami.push(event.key);konami=konami.slice(-10);if(konami.join("|").toLowerCase()===konamiCode.join("|").toLowerCase()){root.classList.add("konami-mode");award("KONAMI_CODE",50);setTimeout(()=>root.classList.remove("konami-mode"),10000)}});
const terminal=document.querySelector("[data-terminal]"),terminalInput=document.querySelector("[data-terminal-input]"),terminalOutput=document.querySelector("[data-terminal-output]");
function openTerminal(){if(!terminal)return;terminal.hidden=false;terminalInput?.focus();award("TERMINAL_HACKER",50)}
function closeTerminal(){if(terminal)terminal.hidden=true}
document.querySelector("[data-terminal-open]")?.addEventListener("click",openTerminal);
document.querySelector("[data-terminal-close]")?.addEventListener("click",closeTerminal);
addEventListener("keydown",(event)=>{if(event.key==="~"){event.preventDefault();openTerminal()}if(event.key==="Escape")closeTerminal()});
terminalInput?.addEventListener("keydown",(event)=>{if(event.key!=="Enter")return;const command=terminalInput.value.trim().toLowerCase();terminalInput.value="";const lines={help:"Commands: whoami, skills, projects, contact, sudo hire-me, clear, exit",whoami:"Venkata Prasad Muraharisetty - Senior Product Owner for AI-centric Enterprise SaaS and WealthTech.",skills:"Product strategy, SAFe Agile, AI products, REST APIs, microservices, CRM, Azure, AWS, Splunk.",projects:"Intelliflo IQ, Outlook Integration, Money Alive, Client Review, Financial Planning, CRM, ACATS, Global Trade.",contact:"Email: ${email}",["sudo hire-me"]:"Candidate Loaded. Opening email channel..."};if(command==="clear"){terminalOutput.textContent="";return}if(command==="exit"){closeTerminal();return}terminalOutput.textContent+="\\n> "+command+"\\n"+(lines[command]||"Unknown command. Type help.")+"\\n";if(command==="sudo hire-me"){location.href="mailto:${email}?subject=Product%20Role%20Conversation"}});
const chat=document.querySelector("[data-chat]"),chatLog=document.querySelector("[data-chat-log]"),chatInput=document.querySelector("[data-chat-input]");
function openChat(){if(chat){chat.hidden=false;chatInput?.focus();award("AI_WHISPERER",20)}}
function closeChat(){if(chat)chat.hidden=true}
function jarvisAnswer(text){const q=text.toLowerCase();if(q.includes("iq")||q.includes("ai"))return"Intelliflo IQ is the strongest AI signal: Venkat led delivery of AI-powered Engagement and Advice Assistants that automated 190+ fields and reduced advisor admin from hours to minutes.";if(q.includes("hire")||q.includes("why"))return"Hire Venkat if you need a Senior Product Owner who can translate strategy into shippable SaaS outcomes, speak architecture with engineering, and keep enterprise stakeholders aligned.";if(q.includes("api")||q.includes("architecture"))return"Architecture signal: REST APIs, microservices, IBM MQ, Azure/AWS, SQL Server, .NET, integrations, observability, and enough engineering depth to reduce delivery risk early.";if(q.includes("safe")||q.includes("agile")||q.includes("planning"))return"SAFe signal: PI planning, sprint planning, backlog refinement, epics, user stories, acceptance criteria, release planning, and Definition of Done discipline.";return"JARVIS summary: Venkat is an AI-fluent Senior Product Owner for enterprise SaaS and WealthTech, with engineering depth, measurable product outcomes, and strong delivery discipline."}
function addChatLine(who,text){if(chatLog){const p=document.createElement("p");p.innerHTML="<strong>"+who+":</strong> "+text;chatLog.appendChild(p);chatLog.scrollTop=chatLog.scrollHeight}}
document.querySelector("[data-chat-open]")?.addEventListener("click",openChat);
document.querySelector("[data-chat-close]")?.addEventListener("click",closeChat);
document.querySelectorAll("[data-chat-prompt]").forEach((button)=>button.addEventListener("click",()=>{const prompt=button.textContent.trim();addChatLine("You",prompt);addChatLine("JARVIS",jarvisAnswer(button.dataset.chatPrompt+" "+prompt));openChat()}));
document.querySelector("[data-chat-form]")?.addEventListener("submit",(event)=>{event.preventDefault();const text=chatInput?.value.trim();if(!text)return;chatInput.value="";addChatLine("You",text);addChatLine("JARVIS",jarvisAnswer(text))});
const jiraCards=[...document.querySelectorAll("[data-jira-card]")];
const jiraSearch=document.querySelector("[data-jira-search]");
let jiraFilter="all";
function applyJiraFilters(){const query=(jiraSearch?.value||"").trim().toLowerCase();jiraCards.forEach((card)=>{const category=card.dataset.jiraCategory;const text=card.dataset.jiraText||card.textContent.toLowerCase();const visible=(jiraFilter==="all"||category===jiraFilter)&&(!query||text.includes(query));card.hidden=!visible})}
document.querySelectorAll("[data-jira-filter]").forEach((button)=>button.addEventListener("click",()=>{jiraFilter=button.dataset.jiraFilter;document.querySelectorAll("[data-jira-filter]").forEach((item)=>item.classList.toggle("is-active",item===button));applyJiraFilters();award("SECTION_SCANNER",5)}));
jiraSearch?.addEventListener("input",applyJiraFilters);
console.log("Hello recruiter. You found developer mode. Try hire()");
globalThis.hire=()=>("Candidate Loaded: Senior Product Owner | AI Products | Enterprise SaaS | Wealth Management");
const seenSections=new Set();
const observer=new IntersectionObserver((entries)=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add("is-visible");const section=entry.target.closest("section")?.id;if(section&&!seenSections.has(section)){seenSections.add(section);award("SECTION_SCANNER",15)}observer.unobserve(entry.target)}}},{threshold:.1});
document.querySelectorAll(".reveal").forEach((el)=>observer.observe(el));
`;
}

function main() {
  ["blog", "projects", "resume", "jira-resume", "assets/css", "assets/js", "assets/img", "scripts"].forEach(ensure);
  write("index.html", homePage());
  write("blog/index.html", blogIndex());
  posts.forEach((p) => write(`blog/${p.slug}/index.html`, articlePage(p)));
  products.forEach((p) => write(`projects/${p.slug}/index.html`, projectPage(p)));
  write("resume/index.html", resumePage());
  write("jira-resume/index.html", jiraResumePage());
  write("assets/css/style.css", css());
  write("assets/js/main.js", js());
  write("assets/img/favicon.svg", svg("VP", "VP", "#4fd1c5", "#8b5cf6"));
  write("assets/img/og-portfolio.svg", svg(author, "VP", "#4fd1c5", "#8b5cf6"));
  write("inner-page.html", legacyPage("blog/", "Technical blog"));
  write("portfolio-details.html", legacyPage("projects/outlook-integration/", "Project case study"));
  write("sitemap.xml", sitemap());
  write("rss.xml", rss());
  write("robots.txt", robots());
  write("README.md", readme());
}

main();
