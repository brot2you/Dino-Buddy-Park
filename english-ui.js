/* Dino Buddy Park — English UI layer. Non-destructive: preserves game data and saves. */
(function(){
'use strict';
const exact = {
'L’aventure préhistorique en anglais':'The prehistoric English adventure',
'ÉDITION CAMP ILLUSTRÉ':'ILLUSTRATED CAMP EDITION',
'Camp des explorateurs':'Explorers’ Camp',
'Ton île, tes dinosaures, tes découvertes':'Your island, your dinosaurs, your discoveries',
'Les 6 héros':'Meet the 6 heroes',
'Explorer & décorer':'Explore & decorate',
'Ambiance : ON':'Ambience: ON','Ambiance : OFF':'Ambience: OFF',
'Un camp vivant • 6 héros illustrés • Anglais 6e / 5e':'A living camp • 6 illustrated heroes • English for Years 7–8',
'Humeur':'Mood','Évolution':'Evolution','Réglages':'Settings','Sa journée':'Daily routine',
'Remettre dans l’ordre':'Put in order','Quiz de l’heure':'Time quiz',
'Ton prénom':'Your first name','Ta classe':'Your class','Le nom de ton compagnon':'Your buddy’s name',
'C’est…':'My buddy is…','un garçon (he)':'a boy (he)','une fille (she)':'a girl (she)',
'Son espèce':'Species','Aide visuelle (pictogramme dans la bulle)':'Visual hints (icons in speech bubbles)',
'Ton compagnon parle à voix haute':'Your buddy speaks aloud','Petits sons':'Sound effects',
'Police plus lisible (Lexend)':'Easy-to-read font (Lexend)',
'Sauvegarde':'Save data','Exporter':'Export','Importer':'Import','Tout effacer':'Erase all data',
'Tout reste dans ce navigateur, sans compte. Pour changer d’appareil, exporte puis importe le fichier.':'Everything stays in this browser. No account needed. To switch devices, export and import your save file.',
'Comment ça marche':'How to play','Pour le professeur':'Teacher’s notes',
'Journal':'Journal','Mon journal':'My journal','Buddydex':'Buddydex',
'Boutique':'Shop','Décorer':'Decorate','Explorer':'Explore','Acheter':'Buy','Équiper':'Equip',
'Enlever':'Remove','Fermer':'Close','Retour':'Back','Continuer':'Continue',
'Annuler':'Cancel','Confirmer':'Confirm','Valider':'Check','Vérifier':'Check',
'Choisir':'Choose','Choisis':'Choose','Changer':'Change','Terminer':'Finish',
'Ajouter':'Add','Supprimer':'Delete','Utiliser':'Use','Voir':'View',
'Jouer':'Play','Manger':'Eat','Dormir':'Sleep','Nourrir':'Feed',
'Apprendre':'Learn','Écouter':'Listen','Parler':'Speak','Répondre':'Answer',
'Question':'Question','Questions':'Questions','Réponse':'Answer','Réponses':'Answers',
'Bonne réponse !':'Correct!','Bravo !':'Well done!','Essaie encore !':'Try again!',
'Jour':'Day','Matin':'Morning','Midi':'Noon','Après-midi':'Afternoon',
'Soir':'Evening','Nuit':'Night','Aujourd’hui':'Today','Demain':'Tomorrow',
'Mon compagnon':'My buddy','Mes compagnons':'My buddies','Mes œufs':'My eggs',
'Mes dinosaures':'My dinosaurs','Nouvel œuf':'New egg',
'Toutes':'All','Communes':'Common','Rares':'Rare','Épiques':'Epic','Légendaires':'Legendary',
'Commune':'Common','Rare':'Rare','Épique':'Epic','Légendaire':'Legendary',
'Bébé':'Baby','Petit':'Youngster','Ado':'Teen','Adulte':'Adult','Œuf':'Egg',
'Heureux':'Happy','Triste':'Sad','Surpris':'Surprised','Affamé':'Hungry','Endormi':'Asleep',
'Neutre':'Neutral','Excité':'Excited','Effrayé':'Scared',
'Découvertes':'Discovered','Espèces découvertes':'Species discovered',
'Prochaine étape':'Next stage','Prochain stade':'Next stage',
'Progression':'Progress','Récompenses':'Rewards','Objets':'Items',
'Aucune donnée':'No data','Chargement…':'Loading…',
'Activités':'Activities','Exercices':'Exercises',
'Camp':'Camp','Lagon':'Lagoon','Jungle':'Jungle','Laboratoire':'Laboratory','Volcan':'Volcano',
'Camp d’exploration':'Exploration camp','Lagon préhistorique':'Prehistoric lagoon',
'Jungle mystérieuse':'Mysterious jungle','Vallée volcanique':'Volcanic valley',
'Rechercher une espèce…':'Search for a species…','Rechercher…':'Search…',
'Voir les évolutions':'View evolutions','Voir les détails':'View details',
'Mes achats':'My purchases','Décoration':'Decoration','Tenues':'Outfits',
'Nouvelle découverte !':'New discovery!',
'Leçon':'Lesson','Suivant':'Next','Précédent':'Previous',
'Non découvert':'Undiscovered','À découvrir':'To discover',
'Plus tard':'Later','D’accord':'OK','Oui':'Yes','Non':'No',
};
const phrases = [
[/Ton compagnon vit en même temps que toi : le matin il se lève, à midi il déjeune, le soir il dîne, la nuit il dort\./g,'Your buddy follows your day: it wakes up in the morning, has lunch at noon, eats dinner in the evening and sleeps at night.'],
[/Il te dit en anglais ce dont il a besoin\. Comprends-le et donne-lui ce qu’il faut\./g,'Your buddy tells you what it needs in English. Listen and help it.'],
[/Il te pose des questions : réponds-lui correctement, en vérifiant que ta réponse va bien avec la question\./g,'Your buddy asks questions. Read or listen carefully and choose a suitable answer.'],
[/Aide-le à suivre sa journée, puis relis son journal\./g,'Help your buddy follow its daily routine, then read its journal.'],
[/Tout commence par un œuf : parle-lui, il éclôt\./g,'It all begins with an egg. Speak to it and watch it hatch.'],
[/Ensuite ton compagnon grandit : Bébé, Petit, Ado, Adulte\./g,'Your buddy grows through the baby, youngster, teen and adult stages.'],
[/Sa forme adulte dépend de la façon dont tu t’en occupes\./g,'Its adult form depends on how you look after it.'],
[/Un adulte qui a compris tous ses besoins, toutes ses questions et toute sa journée devient légendaire\./g,'An adult who has mastered its needs, questions and daily routine becomes legendary.'],
[/Tu peux alors adopter un nouvel œuf et le premier rejoint ton album\./g,'You can then adopt a new egg while your first buddy joins your collection.'],
[/Plus il grandit, plus c’est exigeant : écouter sans lire, construire ses phrases, écrire les mots, et même parler au micro\./g,'As your buddy grows, challenges become harder: listen, build sentences, write words and even speak.'],
[/Fêtes du monde anglophone \(Halloween, Bonfire Night, Christmas, Pancake Day…\) et une surprise chaque jour\./g,'Explore celebrations from English-speaking countries and discover a new surprise each day.'],
[/Chaque bonne réponse rapporte des livres sterling pour acheter des vêtements et des meubles au Shop, à condition de bien comprendre le prix !/g,'Earn pounds for correct answers and spend them on clothes and furniture in the shop.'],
[/50 espèces à collectionner, venues de tout le monde anglophone, chacune avec son caractère \(gourmand, bavard, timide, farceur…\), son plat préféré et sa vitesse de croissance\./g,'Collect 50 species inspired by the English-speaking world, each with its own personality, favourite food and growth rate.'],
[/Les œufs se gagnent en jouant\./g,'Earn eggs by playing.'],
[/Tu peux élever jusqu’à 8 monstres en même temps\./g,'You can raise up to eight buddies at once.'],
[/Touche leur visage au-dessus de la chambre pour passer de l’un à l’autre/g,'Tap their portraits above the habitat to switch buddies'],
[/indique celui qui t’attend\./g,'marks a buddy waiting for you.'],
[/Ton compagnon apprend à parler avec toi : d’abord des mots isolés, puis des phrases, puis des phrases avec because, so, le passé, les comparatifs, les conseils…/g,'Your buddy learns to speak with you: from single words to full sentences, reasons, past events, comparisons and advice.'],
[/Pour évoluer, il doit apprendre de nouvelles tournures \(onglet Évolution\), qu’il réutilise ensuite\./g,'To evolve, it must learn new language structures in the Evolution tab and practise them again.'],
[/S’il est trop triste, il grandit deux fois moins vite\./g,'If your buddy feels very sad, it grows more slowly.'],
[/Langue de la communication quotidienne \(A1 → A2\)/g,'Everyday communication (CEFR A1 → A2)'],
[/En 6e : consignes en français, phrases simples, journal au présent simple à la 3e personne\./g,'Year 7: simple phrases and a journal using third-person present simple.'],
[/En 5e : consignes en anglais, formulations indirectes, réponses courtes, journal au prétérit\./g,'Year 8: English instructions, indirect questions, short answers and a past-tense journal.'],
[/L’heure, le jour et la date viennent de l’horloge de l’appareil\./g,'The time and date come from the device clock.'],
[/Aucune donnée ne quitte l’appareil\./g,'No data leaves the device.'],
[/Progression linguistique jusqu’au niveau visé en fin de 5e \(A2\)/g,'Language progression towards CEFR A2'],
[/Les tournures apprises reviennent ensuite en révision espacée/g,'Language structures are revisited through spaced practice'],
[/Le compagnon parle d’abord par mots isolés \(Bébé\), puis en phrases simples/g,'The buddy begins with single words (Baby), then uses simple sentences'],
[/La difficulté monte avec le stade/g,'Difficulty increases with each stage'],
];

// V11: short labels and common dynamic messages, preserved entirely in presentation layer.
const additional = {
 'De fête':'Seasonal','De fête ':'Seasonal ', 'À faire':'To do','Déjà fait':'Completed',
 'Plus de détails':'More details','Non découvert':'Undiscovered','Mon album':'My collection',
 'Mes œufs':'My eggs','Ma journée':'My day','Le cerveau':'The learning lab',
 'Besoins compris':'Needs understood','Questions réussies':'Questions answered',
 'Tournures apprises':'Language structures learned','Pour devenir légendaire':'To become legendary',
 'Moments de sa journée d’école':'School-day activities',
 'Ce que':'What','sait dire':'can say','Ce que tu sais':'What you know',
 'Appris':'Learned','révisé':'revised','fois':'times',
 'Au stade':'At the','Réviser':'Practise','Pas encore découvert.':'Not discovered yet.',
 'Meilleur stade atteint':'Highest stage reached','Croissance':'Growth',
 'Préféré':'Favourite','À découvrir':'To discover','Rapide':'Fast','Lente':'Slow',
 'normale':'normal','rapide':'fast','lente':'slow','un peu lente':'slightly slow',
 'Écouter':'Listen','Nouvelle découverte':'New discovery',
 'Nouvel œuf':'New egg','Œuf rare':'Rare egg','Œuf commun':'Common egg',
 'Œuf épique':'Epic egg','Œuf spécial':'Special egg',
 'Choisis ton premier œuf':'Choose your first egg',
 'Choisis un œuf':'Choose an egg','Choisis ton compagnon':'Choose your buddy',
 'Un moment cosy ensemble':'A cosy moment together',
 'Fais grandir ton compagnon':'Help your buddy grow',
 'Explorer le parc':'Explore the park','Choisis une zone':'Choose an area',
 'Inconnu':'Unknown','Cacher':'Hide','Afficher':'Show','Acheter':'Buy',
 'Compris !':'Got it!','Recommencer':'Try again', 'Félicitations !':'Congratulations!',
 'Un nouvel œuf !':'A new egg!', 'Une surprise !':'A surprise!',
 'La journée':'The day','La boutique':'The shop',
 'Jour de classe':'School day','Fin de semaine':'Weekend',
};
Object.assign(exact, additional);
const dynamicRules = [
 [/Touche une ligne pour l’écouter\. Aide (.+?) au bon moment depuis l’écran d’accueil !/g, 'Tap a line to hear it. Help $1 at the right time on the home screen!'],
 [/Remets la journée de (.+?) dans l’ordre/g, 'Put $1’s day in order'],
 [/Que fait (.+?) en premier \? Touche les actions dans l’ordre\./g, 'What does $1 do first? Tap the actions in order.'],
 [/Rien d’écrit pour l’instant\. Parle avec (.+?) pour remplir son journal !/g,'Nothing here yet. Talk to $1 to fill the journal!'],
 [/écrit ce qui se passe, au présent\. Lis et écoute !/g,'writes about today in the present simple. Read and listen!'],
 [/espèces découvertes/g,'species discovered'],
 [/élevées? jusqu’au stade Adulte/g,'raised to the Adult stage'],
 [/pour le stade /g,'to reach '],
 [/encore (\d+) ⭐/g,'$1 more ⭐'],
 [/tournures? à lui apprendre/g,'language structures to teach'],
 [/a assez de ⭐ pour évoluer, mais il doit d’abord apprendre/g,'has enough ⭐ to evolve, but first needs to learn'],
 [/nouvelles? tournures? \(plus bas\)/g,'new language structures (below)'],
 [/Parle-lui souvent : il pose ses questions au hasard\./g,'Talk to your buddy often: questions appear in a random order.'],
 [/Apprends-lui toutes les tournures du Cerveau, plus bas\./g,'Teach every language structure in the learning lab below.'],
 [/Aide-le au bon moment, ou réussis le quiz de l’heure et le jeu de l’ordre en semaine\./g,'Help at the right time, or complete the time quiz and ordering game on school days.'],
 [/Chaque bonne réponse le fait grandir\. Sa forme adulte dépendra de ce que tu fais le plus avec lui : répondre à ses questions, t’occuper de ses besoins ou l’aider dans sa journée\./g,'Every correct answer helps your buddy grow. Its adult form reflects how you play: answering questions, caring for its needs or following its daily routine.'],
 [/Apprends-lui des tournures de plus en plus riches\. Il s’en servira ensuite pour te parler, et te les fera réviser\./g,'Teach new language structures. Your buddy will use them in conversation and help you revise them.'],
 [/Choisis l’œuf à faire éclore\. L’espèce reste une surprise !/g,'Choose an egg to hatch. Its species will be a surprise!'],
 [/Tu n’as pas d’œuf pour l’instant\. Pour en gagner :/g,'You have no eggs right now. Here’s how to earn one:'],
 [/termine les surprises du jour \(parfois un œuf caché\)/g,'complete daily surprises (you might find an egg)'],
 [/vis les fêtes du calendrier : chaque fête a son œuf spécial/g,'explore calendar celebrations to discover seasonal eggs'],
 [/fais grandir ton monstre jusqu’aux stades Ado et Adulte/g,'raise your buddy to the Teen and Adult stages'],
 [/joue 7 jours de suite/g,'play for seven days in a row'],
 [/rends un monstre légendaire, ou découvre 10, 20, 30 ou 40 espèces : œuf épique !/g,'raise a legendary buddy or discover 10, 20, 30 or 40 species to earn an epic egg!'],
 [/achète un œuf mystère au Shop \(£20\)/g,'buy a mystery egg in the Shop (£20)'],
 [/Pour gagner des œufs/g,'How to earn eggs'],
 [/L’espèce ne se change pas : adopte d’autres œufs pour en découvrir d’autres !/g,'You cannot change a species; hatch more eggs to discover others!'],
 [/Tout effacer/g,'Erase all data'],
 [/Sauvegarde exportée/g,'Save exported'],
 [/Sauvegarde importée/g,'Save imported'],
 [/Fichier non reconnu/g,'File not recognised'],
 [/Export impossible sur cet appareil/g,'Export is unavailable on this device'],
 [/Œuf spécial de la fête /g,'Special celebration egg: '],
 [/Œuf épique :/g,'Epic egg:'],
 [/Œuf rare :/g,'Rare egg:'],
 [/Œuf commun :/g,'Common egg:'],
 [/surprises du jour/g,'daily surprises'],
 [/stade Adulte/g,'Adult stage'],
 [/stade Ado/g,'Teen stage'],
 [/Une chance sur quatre/g,'One chance in four'],
];

const keys=Object.keys(exact).sort((a,b)=>b.length-a.length);
function convert(input){
 let s=input;
 for(const [re,v] of phrases) s=s.replace(re,v);
 for(const [re,v] of dynamicRules) s=s.replace(re,v);
 for(const k of keys){if(!s.includes(k))continue;
  if(s.trim()===k){s=s.replace(k,exact[k]);continue;}
  // Phrase labels in composite UI lines; avoid replacing substrings inside words.
  const e=k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  try{s=s.replace(new RegExp('(^|[\\s•:()\\[\\]—–,;.!?])'+e+'(?=$|[\\s•:()\\[\\]—–,;.!?])','g'),(_,pre)=>pre+exact[k]);}catch(err){}
 }
 return s;
}
function walk(node){
 if(node.nodeType===3){const p=node.parentElement;if(!p||p.closest('script,style,textarea,code,pre'))return;
 const old=node.nodeValue, updated=convert(old);if(updated!==old)node.nodeValue=updated;return;}
 if(node.nodeType!==1)return;
 if(node.matches('script,style,textarea,code,pre'))return;
 for(const attr of ['placeholder','title','aria-label']){
  if(node.hasAttribute(attr)){const v=node.getAttribute(attr), nv=convert(v);if(v!==nv)node.setAttribute(attr,nv);}}
 for(const c of Array.from(node.childNodes))walk(c);
}
let working=false;
const doTranslate=()=>{if(working)return;working=true;try{walk(document.body);}finally{working=false;}};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',doTranslate,{once:true});else doTranslate();
let pending=false;
const obs=new MutationObserver(()=>{if(working||pending)return;pending=true;queueMicrotask(()=>{pending=false;doTranslate();});});
obs.observe(document.documentElement,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['placeholder','title','aria-label']});
})();
