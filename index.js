import{i as c,a as S,S as q}from"./assets/vendor-C_7oAj77.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();const v="48383034-506c7f8ffe99ad1c3f13eb63b",$="https://pixabay.com/api/?",u=document.getElementById("search-form"),l=document.getElementById("load-more"),f=document.querySelector(".gallery"),y=document.querySelector(".loader");let n=1,p="";const g=40,m=new URLSearchParams({key:v,q:"",image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:g});function w(){y.style.display="block"}function E(){y.style.display="none"}async function h(){const r=u.querySelector("input[name='query']").value.trim();if(!r){c.warning({title:"Warning",message:"Please enter a search query!",position:"topRight"});return}(r!==p||n===1)&&(n=1,p=r,f.innerHTML="",l.style.display="none"),m.set("q",p),m.set("page",n);const s=`${$}${m.toString()}`;try{w();const o=(await S.get(s)).data;if(o.hits.length===0)l.style.display="none",c.error({title:"",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});else{I(o.hits),l.style.display="block",n++;const e=o.totalHits,t=Math.ceil(e/g);n>t&&(l.style.display="none",c.info({title:"",message:"You have reached the end of the results.",position:"topRight"}))}}catch(i){c.error({title:"",message:`Sorry, ${i.message}! Please try again!`,position:"topRight"}),console.error(i)}finally{E()}}function I(r){const s=document.createDocumentFragment();r.map(({webformatURL:o,largeImageURL:e,tags:t,likes:a,views:L,comments:b,downloads:P})=>{const d=document.createElement("li");d.className="gallery-list",d.innerHTML=`
            <div class="gallery-div">
                <a class="gallery-link" href="${e}">
                    <img src="${o}" alt="${t}" class="gallery-image"/>
                </a>
            </div>
            <ul class="card-info">
                <li class="info-item">
                    <h3>Likes</h3>
                    <p>${a}</p>
                </li>
                <li class="info-item">
                    <h3>Views</h3>
                    <p>${L}</p>
                </li>
                <li class="info-item">
                    <h3>Comments</h3>
                    <p>${b}</p>
                </li>
                <li class="info-item">
                    <h3>Downloads</h3>
                    <p>${P}</p>
                </li>
            </ul>
        `,s.appendChild(d)}),f.appendChild(s),new q(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}u.addEventListener("submit",r=>{r.preventDefault(),h()});l.addEventListener("click",()=>{h()});
//# sourceMappingURL=index.js.map
