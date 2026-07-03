const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const siteUrl = "https://venkataprasadm.github.io/profile";
const author = "Venkata Prasad Muraharisetty";
const email = "venkataprasadm@outlook.com";
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
    problem: "Enterprise users needed faster ways to understand client, workflow, and practice insights without adding another reporting surface.",
    need: "Bring AI-assisted intelligence into advisor workflows while keeping trust, explainability, governance, and adoption at the center.",
    role: "Translated product opportunities into scoped capabilities, clarified success metrics, and partnered with technical teams on responsible AI delivery.",
    architecture: "AI-assisted experience layered over governed product data, permissions, service APIs, telemetry, and feedback loops.",
    technologies: ["AI products", "LLMs", "Product analytics", "APIs", "Cloud", "Observability"],
    outcome: "Helped shape a premium intelligence experience aligned to enterprise SaaS expectations and wealth management controls.",
    learnings: "AI features win when they are narrow, auditable, measurable, and integrated into a real decision or workflow."
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
    outcome: "Improved the path from client education to advisor action while preserving clean ownership between systems.",
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
    </div>
  </footer>
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
@media (max-width:900px){.nav-toggle{display:flex}.site-nav{position:absolute;left:1rem;right:1rem;top:68px;display:none;flex-direction:column;align-items:stretch;background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:.5rem}.site-nav.is-open{display:flex}.hero,.split,.tech-radar,.resume-layout{grid-template-columns:1fr}.hero{min-height:auto;padding-top:4rem}.hero-stats,.highlight-grid,.product-grid,.blog-grid,.skill-columns,.case-grid{grid-template-columns:1fr 1fr}.section-heading{display:block}.contact-band,.site-footer{display:block}.footer-links{margin-top:1rem}}
@media (max-width:620px){.brand small{display:none}.hero-stats,.highlight-grid,.product-grid,.blog-grid,.skill-columns,.case-grid{grid-template-columns:1fr}.hero h1,.page-hero h1{font-size:2.65rem}.section,.hero,.page-hero,.article,.case-study{padding-left:1rem;padding-right:1rem}.site-header{padding:.7rem 1rem}.orbit-grid{grid-template-columns:1fr}.cover-large{min-height:180px}}
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
  const urls = ["", "blog/", "resume/", ...products.map((p) => `projects/${p.slug}/`), ...posts.map((p) => `blog/${p.slug}/`)];
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
- \`assets/resume/\` - published PDF resume
- \`resume/\` - resume preview and supporting SEO page
- \`assets/css/style.css\` and \`assets/js/main.js\` - lightweight frontend
- \`sitemap.xml\`, \`robots.txt\`, \`rss.xml\` - SEO assets

Run \`node scripts/generate-site.js\` to regenerate the static pages from structured content.`;
}

function main() {
  ["blog", "projects", "resume", "assets/css", "assets/js", "assets/img", "scripts"].forEach(ensure);
  write("index.html", homePage());
  write("blog/index.html", blogIndex());
  posts.forEach((p) => write(`blog/${p.slug}/index.html`, articlePage(p)));
  products.forEach((p) => write(`projects/${p.slug}/index.html`, projectPage(p)));
  write("resume/index.html", resumePage());
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
