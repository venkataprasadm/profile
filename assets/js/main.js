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
const toast=document.createElement("div");
toast.className="achievement-toast";
toast.setAttribute("role","status");
toast.setAttribute("aria-live","polite");
document.body.appendChild(toast);
let toastTimer;
function unlock(title,detail){toast.innerHTML="<strong>Achievement unlocked</strong><span>"+title+"</span><p>"+detail+"</p>";toast.classList.add("is-visible");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("is-visible"),4200)}
setTimeout(()=>unlock("Recruiter Detected","Welcome to the Product Owner Engine."),900);
setTimeout(()=>unlock("Curious Visitor","You stayed long enough to trigger the hidden signal."),30000);
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
questButtons.forEach((button)=>button.addEventListener("click",()=>{const q=quest[questIndex];const choice=Number(button.dataset.questChoice);questButtons.forEach((item)=>item.disabled=true);if(choice===q.answer){questScore+=100;questFeedback.textContent=q.win;unlock("Product Sense +100",q.win)}else{questScore+=25;questFeedback.textContent="Playable lesson: senior product ownership is about trade-offs, not reflexes.";unlock("Lesson Captured","You found a risky path and learned the better product move.")}questScoreEl.textContent=questScore;questIndex+=1;if(questIndex<quest.length){setTimeout(renderQuest,1100)}else{setTimeout(()=>{questFeedback.textContent="Mission complete. You survived stakeholders, architecture risk, and AI governance.";unlock("Sprint Survivor","You completed the Product Owner Quest.")},900)}}));
document.querySelector("[data-quest-reset]")?.addEventListener("click",()=>{questIndex=0;questScore=0;questScoreEl.textContent="0";renderQuest();unlock("Quest Reset","Product Owner Engine ready for another run.")});
renderQuest();
const canvas=document.querySelector("[data-neural-canvas]");
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
if(canvas&&!reduce){const ctx=canvas.getContext("2d");let width=0,height=0,points=[];const pointer={x:.5,y:.5};function resize(){width=canvas.width=canvas.offsetWidth*devicePixelRatio;height=canvas.height=canvas.offsetHeight*devicePixelRatio;points=Array.from({length:48},()=>({x:Math.random()*width,y:Math.random()*height,vx:(Math.random()-.5)*.35*devicePixelRatio,vy:(Math.random()-.5)*.35*devicePixelRatio}))}function draw(){ctx.clearRect(0,0,width,height);for(const p of points){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>width)p.vx*=-1;if(p.y<0||p.y>height)p.vy*=-1;const dx=p.x-pointer.x*width,dy=p.y-pointer.y*height;if(Math.hypot(dx,dy)<180*devicePixelRatio){p.x+=dx*.002;p.y+=dy*.002}}for(let i=0;i<points.length;i++){for(let j=i+1;j<points.length;j++){const a=points[i],b=points[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<150*devicePixelRatio){ctx.strokeStyle="rgba(79,209,197,"+(1-d/(150*devicePixelRatio))*.28+")";ctx.lineWidth=devicePixelRatio;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}}}for(const p of points){ctx.fillStyle="rgba(125,211,252,.72)";ctx.beginPath();ctx.arc(p.x,p.y,2.2*devicePixelRatio,0,Math.PI*2);ctx.fill()}requestAnimationFrame(draw)}resize();addEventListener("resize",resize);document.querySelector(".hero")?.addEventListener("pointermove",(event)=>{const rect=canvas.getBoundingClientRect();pointer.x=(event.clientX-rect.left)/rect.width;pointer.y=(event.clientY-rect.top)/rect.height});draw()}
addEventListener("keydown",(event)=>{if(event.ctrlKey&&event.shiftKey&&event.key.toLowerCase()==="a"){root.classList.toggle("cyber-mode");unlock("Theme Engine","Cyber mode toggled with Ctrl + Shift + A.")}});
console.log("Hello recruiter. You found developer mode. Try hire()");
globalThis.hire=()=>("Candidate Loaded: Senior Product Owner | AI Products | Enterprise SaaS | Wealth Management");
const observer=new IntersectionObserver((entries)=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target)}}},{threshold:.1});
document.querySelectorAll(".reveal").forEach((el)=>observer.observe(el));
