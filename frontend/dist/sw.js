if(!self.define){let s,e={};const i=(i,l)=>(i=new URL(i+".js",l).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(l,n)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let u={};const t=s=>i(s,r),o={module:{uri:r},exports:u,require:t};e[r]=Promise.all(l.map((s=>o[s]||t(s)))).then((s=>(n(...s),u)))}}define(["./workbox-3e911b1d"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/focus-visible-legacy-CdO5cX4I.js",revision:null},{url:"assets/focus-visible-supuXXMI.js",revision:null},{url:"assets/index-CMRvxXYs.js",revision:null},{url:"assets/index-Dzt2z-jP.css",revision:null},{url:"assets/index-legacy-DIaqvauY.js",revision:null},{url:"assets/index8-CJ4j4ymn.js",revision:null},{url:"assets/index8-legacy-BQdMP9XX.js",revision:null},{url:"assets/index9-4A7cGXf7.js",revision:null},{url:"assets/index9-legacy-ChAMoHeJ.js",revision:null},{url:"assets/input-shims-BHmxVkHA.js",revision:null},{url:"assets/input-shims-legacy-9E-M3UsZ.js",revision:null},{url:"assets/ios.transition-Dt8gGi3W.js",revision:null},{url:"assets/ios.transition-legacy-CSqVIau7.js",revision:null},{url:"assets/keyboard2-Ie8WvXHW.js",revision:null},{url:"assets/keyboard2-legacy-1y8hWNwS.js",revision:null},{url:"assets/md.transition-0_VuA4Ys.js",revision:null},{url:"assets/md.transition-legacy-CN5AH-AU.js",revision:null},{url:"assets/polyfills-legacy-iJ_btOJW.js",revision:null},{url:"assets/status-tap-legacy-CXqiRXiD.js",revision:null},{url:"assets/status-tap-mQNK9h5H.js",revision:null},{url:"assets/swipe-back-ClbOs-fQ.js",revision:null},{url:"assets/swipe-back-legacy-CaZUUcZx.js",revision:null},{url:"assets/web-BwcryW1U.js",revision:null},{url:"assets/web-legacy-_gQWMB84.js",revision:null},{url:"index.html",revision:"a698ba285fe70a2db6ee9d243bc572eb"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"manifest.webmanifest",revision:"c4175bf35fd0725bc239f3f5b693a806"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));