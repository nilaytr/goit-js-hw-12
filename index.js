import{i as l,a as b,S as v}from"./assets/vendor-C_7oAj77.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();const S="48383034-506c7f8ffe99ad1c3f13eb63b",q="https://pixabay.com/api/?",m=document.getElementById("search-form"),n=document.getElementById("load-more"),f=document.querySelector(".gallery"),u=document.querySelector(".loader");let c=1,d="";const g=20,p=new URLSearchParams({key:S,q:"",image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:g});async function y(){const s=m.querySelector("input[name='query']").value.trim();if(!s){l.warning({title:"Warning",message:"Please enter a search query!",position:"topRight"});return}s!==d&&(c=1,d=s,f.innerHTML="",n.style.display="none"),p.set("q",d),p.set("page",c);const o=`${q}${p.toString()}`;try{u.classList.remove("hidden");const r=(await b.get(o)).data;if(r.hits.length===0)n.style.display="none",l.error({title:"",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});else{$(r.hits),n.style.display="block",c++;const e=r.totalHits,t=Math.ceil(e/g);c>t&&(n.style.display="none",l.info({title:"",message:"You have reached the end of the results.",position:"topRight"}))}}catch(i){l.error({title:"",message:`Sorry, ${i.message}! Please try again!`,position:"topRight"}),console.error(i)}finally{u.classList.add("hidden")}}function $(s){const o=s.map(({webformatURL:r,largeImageURL:e,tags:t,likes:a,views:h,comments:L,downloads:P})=>`<li class= "gallery-list">
                <div class="gallery-div">
                   <a class= "gallery-link" href="${e}">
                     <img src="${r}"  alt="${t}" class="gallery-image"/>
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
                   <p>${P}</p>
                </li>
                </ul>
                </li>`).join("");f.innerHTML+=o,new v(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}m.addEventListener("submit",s=>{s.preventDefault(),y()});n.addEventListener("click",()=>{y()});
//# sourceMappingURL=index.js.map
