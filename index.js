import{i as c,a as P,S}from"./assets/vendor-C_7oAj77.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();const q="48383034-506c7f8ffe99ad1c3f13eb63b",v="https://pixabay.com/api/?",u=document.getElementById("search-form"),l=document.getElementById("load-more"),y=document.querySelector(".gallery"),f=document.querySelector(".loader");let n=1,p="";const m=40,d=new URLSearchParams({key:q,q:"",image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:m});function $(){f.style.display="block"}function w(){f.style.display="none"}async function g(){const r=u.querySelector("input[name='query']").value.trim();if(!r){c.warning({title:"Warning",message:"Please enter a search query!",position:"topRight"});return}(r!==p||n===1)&&(n=1,p=r,y.innerHTML="",l.style.display="none"),d.set("q",p),d.set("page",n);const o=`${v}${d.toString()}`;try{$();const s=(await P.get(o)).data;if(s.hits.length===0)l.style.display="none",c.error({title:"",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});else{E(s.hits),l.style.display="block",n++;const e=s.totalHits,t=Math.ceil(e/m);n>t&&(l.style.display="none",c.info({title:"",message:"You have reached the end of the results.",position:"topRight"}))}}catch(i){c.error({title:"",message:`Sorry, ${i.message}! Please try again!`,position:"topRight"}),console.error(i)}finally{w(),u.reset()}}function E(r){const o=r.map(({webformatURL:s,largeImageURL:e,tags:t,likes:a,views:h,comments:L,downloads:b})=>`<li class= "gallery-list">
                <div class="gallery-div">
                   <a class= "gallery-link" href="${e}">
                     <img src="${s}"  alt="${t}" class="gallery-image"/>
                   </a>
                </div>
                <ul class="card-info">
                <li class="info-item">
                   <h3>Likes</h3>
                   <p>${a}</p>
                </li>
                <li class="info-item">
                  <h3>Views</h3>
                  <p>${h}</p>
                </li>
                <li class="info-item">
                  <h3>Comments</h3>
                  <p>${L}</p>
                </li>
                <li class="info-item">
                   <h3>Downloads</h3>
                   <p>${b}</p>
                </li>
                </ul>
                </li>`).join("");y.innerHTML+=o,new S(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}u.addEventListener("submit",r=>{r.preventDefault(),g()});l.addEventListener("click",()=>{g()});
//# sourceMappingURL=index.js.map
