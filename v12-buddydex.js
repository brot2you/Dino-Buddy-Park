/* Dino Buddy Park V12 — Enhanced 50-species field guide.
   No mutations of existing pet data or saved-game structure. */
(function(){
'use strict';
const RARITY={c:'Common',r:'Rare',s:'Seasonal',e:'Epic'};
const FAMILY=['Forest','Rocky','Aquatic','Spiked','Highland','Mystic'];
const STATE={search:'',rarity:'all',family:'all',found:'all'};
let initialized=false;
function safe(s){return String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function family(x){return FAMILY[(x.no-1)%6];}
function name(x){return safe(x.n);}
function item(x,known){
 const last=known?Math.max(1,Math.min(4,Number(S.dex[x.id])||1)):2;
 const render=(known&&typeof V17_ART!=='undefined'&&V17_ART.has(x.id))?`<img class="v17-art" loading="lazy" src="assets/species-v17/${encodeURIComponent(x.id)}.webp" alt="${name(x)}">`:buddySVG(known?'happy':'neutral',{stage:last,sp:x.id,ghost:!known});
 return `<button type="button" class="v12-entry rarity-${safe(x.r)} ${known?'unlocked':'locked'}" data-act="spc" data-id="${safe(x.id)}" aria-label="${known?name(x):'Undiscovered species number '+x.no}">
 <span class="v12-entry-no">#${String(x.no).padStart(2,'0')}</span><span class="v12-rarity">${RARITY[x.r]||'Species'}</span>
 <span class="v12-portrait">${render}</span><strong>${known?name(x):'???'}</strong><small>${known?family(x):'Undiscovered'}</small></button>`;
}
function paint(){
 const panel=document.getElementById('dexPanel');if(!panel||typeof D==='undefined'||typeof S==='undefined')return;
 const n=D.species.length,found=D.species.filter(x=>S.dex[x.id]!==undefined).length;
 panel.innerHTML=`<section class="v12-field-guide">
 <div class="v12-guide-header"><div><span class="v12-eyebrow">FIELD GUIDE · DINOSAUR ISLAND</span><h2>🦕 The Buddydex</h2><p>Discover, collect and raise ${n} extraordinary companions.</p></div><div class="v12-progress"><strong>${found}<span> / ${n}</span></strong><span>Discovered</span></div></div>
 <div class="v12-progress-line" role="progressbar" aria-label="Species discovered" aria-valuemin="0" aria-valuemax="${n}" aria-valuenow="${found}"><span style="width:${100*found/n}%"></span></div>
 <div class="v12-controls"><label class="v12-search-label">Search the field guide<input id="v12-search" type="search" placeholder="Name, habitat, number…" autocomplete="off" value="${safe(STATE.search)}"></label>
 <label>Rarity<select id="v12-rarity"><option value="all">All rarities</option>${Object.keys(RARITY).map(x=>`<option value="${x}" ${STATE.rarity===x?'selected':''}>${RARITY[x]}</option>`).join('')}</select></label>
 <label>Family<select id="v12-family"><option value="all">All families</option>${FAMILY.map(x=>`<option ${STATE.family===x?'selected':''}>${x}</option>`).join('')}</select></label>
 <label>Collection<select id="v12-found"><option value="all">All species</option><option value="found" ${STATE.found==='found'?'selected':''}>Discovered</option><option value="missing" ${STATE.found==='missing'?'selected':''}>Undiscovered</option></select></label></div>
 <p id="v12-count" class="v12-count" role="status"></p><div id="v12-gallery" class="v12-gallery"></div>
 </section>`;
 const controls=[['v12-search','search','input'],['v12-rarity','rarity','change'],['v12-family','family','change'],['v12-found','found','change']];
 controls.forEach(([id,key,ev])=>document.getElementById(id).addEventListener(ev,e=>{STATE[key]=e.target.value;update();}));
 update();
}
function update(){
 const box=document.getElementById('v12-gallery');if(!box)return;
 const q=STATE.search.trim().toLocaleLowerCase('en');
 const visible=D.species.filter(x=>{
 const known=S.dex[x.id]!==undefined;
 if(STATE.rarity!=='all'&&STATE.rarity!==x.r)return false;
 if(STATE.family!=='all'&&STATE.family!==family(x))return false;
 if(STATE.found==='found'&&!known||STATE.found==='missing'&&known)return false;
 const hay=(x.no+' '+(known?x.n+' '+x.home+' '+x.fact:'')).toLocaleLowerCase('en');
 return !q||hay.includes(q);
 });
 box.innerHTML=visible.length?visible.map(x=>item(x,S.dex[x.id]!==undefined)).join(''):'<p class="v12-empty">No dinosaurs match these filters. Try another search.</p>';
 document.getElementById('v12-count').textContent=visible.length+' of '+D.species.length+' species shown · '+Object.keys(S.dex).length+' discovered';
}
function init(){
 if(initialized)return true;
 if(typeof renderDexTab!=='function'||typeof D==='undefined'||typeof buddySVG!=='function')return false;
 initialized=true;
 renderDexTab=paint;
 const formerOpen=openSpecies;
 openSpecies=function(id){
 formerOpen(id);
 const sheet=document.getElementById('sheet'), x=SPX[id];
 if(sheet&&x){const h=sheet.querySelector('.v7-detail-head h3');if(h)h.textContent='📖 Explorer’s field notes';}
 };
 if(document.getElementById('tab-dex')?.classList.contains('on'))paint();
 return true;
}
if(!init())document.addEventListener('DOMContentLoaded',init,{once:true});
})();
