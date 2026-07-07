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
const loader=document.querySelector("[data-jarvis-loader]");
const loaderLine=document.querySelector("[data-loader-line]");
const loaderBar=document.querySelector("[data-loader-bar]");
const loaderStages=[...document.querySelectorAll("[data-loader-stages] li")];
const missionPopup=document.querySelector("[data-mission-popup]");
function hideLoader(){loader?.classList.add("is-hidden");sessionStorage.setItem("jarvis_intro_seen","1");setTimeout(()=>{if(missionPopup&&!sessionStorage.getItem("mission_popup_seen"))missionPopup.hidden=false},650)}
if(loader&&sessionStorage.getItem("jarvis_intro_seen")){loader.hidden=true}else if(loader){const lines=["Epic created","Stories created","Sprint planning aligned","Acceptance criteria locked","Deployed to production"];let step=0;const tick=()=>{if(step<lines.length){if(loaderLine)loaderLine.textContent=lines[step]+"...";if(loaderBar)loaderBar.style.width=((step+1)/lines.length*100)+"%";loaderStages.forEach((item,index)=>{item.classList.toggle("is-active",index===step);item.classList.toggle("is-done",index<step)});step+=1;setTimeout(tick,520)}else{if(loaderLine)loaderLine.textContent="100% complete. Portfolio deployed.";loaderStages.forEach((item)=>item.classList.add("is-done"));setTimeout(hideLoader,650)}};setTimeout(tick,350)}
document.querySelector("[data-loader-skip]")?.addEventListener("click",hideLoader);
document.querySelector("[data-mission-close]")?.addEventListener("click",()=>{sessionStorage.setItem("mission_popup_seen","1");if(missionPopup)missionPopup.hidden=true});
document.querySelector("[data-mission-start]")?.addEventListener("click",(event)=>{sessionStorage.setItem("mission_popup_seen","1");if(missionPopup)missionPopup.hidden=true;const game=document.querySelector("#planning-game");if(game){game.scrollIntoView({behavior:"smooth",block:"start"});if(location.protocol!=="file:")history.replaceState(null,"","#planning-game");return}const url=event.currentTarget?.dataset.homeUrl;if(url)location.assign(url)});
const toast=document.createElement("div");
toast.className="achievement-toast";
toast.setAttribute("role","status");
toast.setAttribute("aria-live","polite");
document.body.appendChild(toast);
let toastTimer;
function unlock(title,detail){toast.innerHTML="<strong>Achievement unlocked</strong><span>"+title+"</span><p>"+detail+"</p>";toast.classList.add("is-visible");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("is-visible"),4200)}
const levels=[["Lv1 Visitor",0],["Lv2 Stakeholder",50],["Lv3 Collaborator",120],["Lv4 Sprint Ally",220],["Lv5 Product Legend",350]];
const storageKey="po_game_state_v1";
const state=JSON.parse(localStorage.getItem(storageKey)||"{\"xp\":0,\"achievements\":[],\"recruiter\":false}");
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
terminalInput?.addEventListener("keydown",(event)=>{if(event.key!=="Enter")return;const command=terminalInput.value.trim().toLowerCase();terminalInput.value="";const lines={help:"Commands: whoami, skills, projects, contact, sudo hire-me, clear, exit",whoami:"Venkata Prasad Muraharisetty - Senior Product Owner for AI-centric Enterprise SaaS and WealthTech.",skills:"Product strategy, SAFe Agile, AI products, REST APIs, microservices, CRM, Azure, AWS, Splunk.",projects:"Intelliflo IQ, Outlook Integration, Money Alive, Client Review, Financial Planning, CRM, ACATS, Global Trade.",contact:"Email: venkataprasadmcareer@outlook.com",["sudo hire-me"]:"Candidate Loaded. Opening email channel..."};if(command==="clear"){terminalOutput.textContent="";return}if(command==="exit"){closeTerminal();return}terminalOutput.textContent+="\n> "+command+"\n"+(lines[command]||"Unknown command. Type help.")+"\n";if(command==="sudo hire-me"){location.href="mailto:venkataprasadmcareer@outlook.com?subject=Product%20Role%20Conversation"}});
const chat=document.querySelector("[data-chat]"),chatLog=document.querySelector("[data-chat-log]"),chatInput=document.querySelector("[data-chat-input]");
function openChat(){if(chat){chat.hidden=false;chatInput?.focus();award("AI_WHISPERER",20)}}
function closeChat(){if(chat)chat.hidden=true}
function jarvisAnswer(text){const q=text.toLowerCase();if(q.includes("iq")||q.includes("ai"))return"Intelliflo IQ is the strongest AI signal: Venkat led delivery of AI-powered Engagement and Advice Assistants that automated 190+ fields and reduced advisor admin from hours to minutes.";if(q.includes("hire")||q.includes("why"))return"Hire Venkat if you need a Senior Product Owner who can translate strategy into shippable SaaS outcomes, speak architecture with engineering, and keep enterprise stakeholders aligned.";if(q.includes("api")||q.includes("architecture"))return"Architecture signal: REST APIs, microservices, IBM MQ, Azure/AWS, SQL Server, .NET, integrations, observability, and enough engineering depth to reduce delivery risk early.";if(q.includes("safe")||q.includes("agile")||q.includes("planning"))return"SAFe signal: PI planning, sprint planning, backlog refinement, epics, user stories, acceptance criteria, release planning, and Definition of Done discipline.";return"JARVIS summary: Venkat is an AI-fluent Senior Product Owner for enterprise SaaS and WealthTech, with engineering depth, measurable product outcomes, and strong delivery discipline."}
function addChatLine(who,text){if(chatLog){const p=document.createElement("p");p.innerHTML="<strong>"+who+":</strong> "+text;chatLog.appendChild(p);chatLog.scrollTop=chatLog.scrollHeight}}
document.querySelector("[data-chat-open]")?.addEventListener("click",openChat);
document.querySelector("[data-chat-close]")?.addEventListener("click",closeChat);
document.querySelectorAll("[data-chat-prompt]").forEach((button)=>button.addEventListener("click",()=>{const prompt=button.textContent.trim();addChatLine("You",prompt);addChatLine("JARVIS",jarvisAnswer(button.dataset.chatPrompt+" "+prompt));openChat()}));
document.querySelector("[data-chat-form]")?.addEventListener("submit",(event)=>{event.preventDefault();const text=chatInput?.value.trim();if(!text)return;chatInput.value="";addChatLine("You",text);addChatLine("JARVIS",jarvisAnswer(text))});
console.log("Hello recruiter. You found developer mode. Try hire()");
globalThis.hire=()=>("Candidate Loaded: Senior Product Owner | AI Products | Enterprise SaaS | Wealth Management");
const seenSections=new Set();
const observer=new IntersectionObserver((entries)=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add("is-visible");const section=entry.target.closest("section")?.id;if(section&&!seenSections.has(section)){seenSections.add(section);award("SECTION_SCANNER",15)}observer.unobserve(entry.target)}}},{threshold:.1});
document.querySelectorAll(".reveal").forEach((el)=>observer.observe(el));
