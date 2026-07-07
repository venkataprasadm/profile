const root=document.documentElement;
const saved=localStorage.getItem("theme");
if(saved){root.dataset.theme=saved}else if(matchMedia("(prefers-color-scheme: light)").matches){root.dataset.theme="light"}
document.querySelector("[data-theme-toggle]")?.addEventListener("click",()=>{const next=root.dataset.theme==="dark"?"light":"dark";root.dataset.theme=next;localStorage.setItem("theme",next)});
const nav=document.querySelector("[data-nav]");
document.querySelector("[data-nav-toggle]")?.addEventListener("click",(event)=>{const open=nav.classList.toggle("is-open");event.currentTarget.setAttribute("aria-expanded",String(open))});
nav?.addEventListener("click",(event)=>{if(event.target.matches("a")){nav.classList.remove("is-open");document.querySelector("[data-nav-toggle]")?.setAttribute("aria-expanded","false")}});
const aiCopy={advisor:"Advisor value: AI assistance reduces repetitive data entry and turns advisor effort toward client conversations, review prep, and advice quality.",enterprise:"Enterprise trust: AI capability is framed around permissions, data governance, measurable adoption, telemetry, and release confidence.",delivery:"Delivery model: MVP scope, epics, user stories, acceptance criteria, DoD discipline, and SAFe ceremonies connect strategy to working software."};
const aiOutput=document.querySelector("[data-ai-output]");
document.querySelectorAll("[data-ai-persona]").forEach((button)=>button.addEventListener("click",()=>{document.querySelectorAll("[data-ai-persona]").forEach((item)=>item.classList.remove("is-active"));button.classList.add("is-active");if(aiOutput){aiOutput.textContent=aiCopy[button.dataset.aiPersona]}}));
const observer=new IntersectionObserver((entries)=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target)}}},{threshold:.1});
document.querySelectorAll(".reveal").forEach((el)=>observer.observe(el));
