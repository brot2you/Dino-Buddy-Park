/* Dino Buddy Park V16 — accessible browser-native English narration.
   No remote synthesis, API key, tracking or transmitted student text. */
(function () {
  'use strict';
  var synth = window.speechSynthesis;
  var supported = !!(synth && window.SpeechSynthesisUtterance);
  var prefKey = 'dino_buddy_voice_prefs_v8';
  var lastText = '';
  var lastUtterance = null;
  var voices = [];
  var status = null;
  function prefs() {
    try { return JSON.parse(localStorage.getItem(prefKey) || '{}') || {}; }
    catch (_) { return {}; }
  }
  function score(v) {
    var n = (v.name || '').toLowerCase();
    var score = /^en[-_]gb$/i.test(v.lang) ? 65 : /^en[-_]gb/i.test(v.lang) ? 60 : /^en/i.test(v.lang) ? 8 : -100;
    if (/natural|neural|enhanced|premium/i.test(n)) score += 40;
    if (/sonia|libby|ryan|oliver|aria|jenny/i.test(n)) score += 15;
    if (/microsoft|google/i.test(n)) score += 3;
    return score;
  }
  function refresh() { if (!supported) return; voices = synth.getVoices().filter(function (v) { return /^en([_-]|$)/i.test(v.lang); }).sort(function (a,b) {return score(b)-score(a);}); updateQuality(); }
  function selectedVoice() {
    var p = prefs(), v8 = window.DINO_VOICE_V8 || {};
    var name = p.name;
    return voices.find(function (v) {return v.voiceURI === name;}) || (v8.voice && voices.find(function (v) {return v.voiceURI === v8.voice.voiceURI;})) || voices[0] || null;
  }
  function normalizeText(text) {
    return String(text || '').replace(/’/g, "'").replace(/£\s*(\d+)/g, '$1 pounds').replace(/\s+/g, ' ').trim();
  }
  function updateQuality() {
    if (!status) return;
    if (!supported) {status.textContent = 'Speech is unavailable in this browser. Read the text on screen instead.';return;}
    var v = selectedVoice();
    status.textContent = v ? ('Selected: ' + v.name + ' (' + v.lang + '). ' + (/natural|neural|enhanced/i.test(v.name) ? 'Enhanced voice available.' : 'Voice quality depends on your system.')) : 'No English voice detected. Install a British English voice in your system settings.';
  }
  function say(text) {
    if (!supported) return false;
    var s = normalizeText(text);
    if (!s) return false;
    lastText = s;
    synth.cancel();
    var u = new SpeechSynthesisUtterance(s), v = selectedVoice(), p = prefs();
    if (v) {u.voice = v; u.lang = v.lang || 'en-GB';} else u.lang = 'en-GB';
    u.rate = Math.max(0.7,Math.min(1.15,Number(p.rate) || 0.9));
    u.pitch = 1; u.volume = 1;
    u.onerror = function () {if (status) status.textContent = 'Audio unavailable: try a different voice or use the on-screen text.';};
    lastUtterance = u;
    synth.speak(u);
    return true;
  }
  window.speak = say;
  window.DINO_NARRATION_V16 = {
    replay: function () { return say(lastText); },
    stop: function () {if(supported) synth.cancel();},
    getLastText: function () {return lastText;}
  };
  if (supported) {
    if (synth.addEventListener) synth.addEventListener('voiceschanged', refresh);
    refresh(); setTimeout(refresh,600);
  }
  function init() {
    var box = document.querySelector('.v8-voice-box');
    if (box) {
      var info = document.createElement('p');
      info.className = 'v16-voice-status'; info.setAttribute('role','status');
      info.style.cssText = 'font-size:13px;line-height:1.45;margin:12px 0;color:var(--soft)';
      box.appendChild(info);status=info;
      var actions = document.createElement('div'); actions.className='v8-voice-actions';
      var replay=document.createElement('button'); replay.type='button'; replay.textContent='↻ Replay last sentence'; replay.addEventListener('click', function(){if(lastText) say(lastText);else say('Welcome to Dino Buddy Park!');});
      actions.appendChild(replay);box.appendChild(actions);
      var sel=document.getElementById('v8Voice'); if(sel) sel.addEventListener('change', function(){setTimeout(updateQuality,50);});
      var speed=document.getElementById('v8Speed'); if(speed) speed.addEventListener('input',function(){setTimeout(updateQuality,50);});
      updateQuality();
    }
    var tools=document.querySelector('.bub-tools');
    if (tools) {
      var b=document.createElement('button'); b.type='button';b.setAttribute('aria-label','Repeat the last sentence');b.title='Repeat in English';b.textContent='↻';
      b.addEventListener('click',function(e){e.stopPropagation(); if(lastText) say(lastText);else {var c=document.getElementById('bubble');if(c)say(c.textContent);}});
      tools.appendChild(b);
    }
    if (!supported) {var preview=document.getElementById('v8Listen');if(preview){preview.disabled=true;preview.title='Speech unavailable';}}
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
