/* V17 Collection: 44 collectible portrait variants; no modifications to saved data. */
const V17_ART = new Set(["doodle", "giggle", "wee", "tartan", "bara", "shamy", "cliffy", "bigapple", "jazzy", "surfy", "chilli", "maple", "moosey", "roo", "reefy", "kiwi", "safari", "tabla", "reggae", "tably", "bobby", "ravenny", "puffy", "hootie", "geysy", "orky", "wombo", "dingdong", "pumpko", "sparky", "gobble", "snowby", "hoggy", "lovey", "flippy", "clover", "jester", "bunbun", "sunny", "nessie", "draig", "unico", "selkie", "gryphon"]);
(function(){
 'use strict';
 function setup(){
  if(typeof openSpecies!=='function'||typeof S==='undefined')return;
  const old=openSpecies;
  openSpecies=function(id){
   old(id);
   if(!V17_ART.has(id)||S.dex[id]===undefined)return;
   const modal=document.getElementById('sheet');
   const container=modal&&modal.querySelector('.sp-card .big');
   if(container){
    const im=document.createElement('img'); im.src='assets/species-v17/'+encodeURIComponent(id)+'.webp';im.alt=SPX[id].n;
    im.className='v17-modal-portrait';container.replaceChildren(im);
   }
  };
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup,{once:true});else setup();
})();
