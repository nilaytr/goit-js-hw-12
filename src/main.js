import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import axios from "axios";

import { API_KEY, BASE_URL } from "./config.js";

const form = document.getElementById('search-form');
const loadMoreBtn = document.getElementById('load-more');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

let page = 1;
let currentQuery = "";
const perPage = 40;

const searchParams = new URLSearchParams({
    key: API_KEY,
    q: "",
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
    per_page: perPage,
});

function showLoader() {
    loader.style.display = "block";
}

function hideLoader() {
    loader.style.display = "none";
}

async function searchImages() {
    const query = form.querySelector("input[name='query']").value.trim();
    
    if (!query) {
    iziToast.warning({
      title: "Warning",
      message: "Please enter a search query!",
      position: "topRight",
    });
    return;
    }
    
    if (query !== currentQuery || page === 1) {
    page = 1;
    currentQuery = query;
    gallery.innerHTML = "";
    loadMoreBtn.style.display = "none";
    }
    
    searchParams.set("q", currentQuery);
    searchParams.set("page", page);

    const url = `${BASE_URL}${searchParams.toString()}`;

    try {
    showLoader();

    const response = await axios.get(url);
    const data = response.data;

        if (data.hits.length === 0) {
        loadMoreBtn.style.display = 'none';
        iziToast.error({
        title: '',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
    } else {
      displayImages(data.hits);
      loadMoreBtn.style.display = "block";
      page++;
            
      const totalHits = data.totalHits;
      const maxPages = Math.ceil(totalHits / perPage);
      if (page > maxPages) {
        loadMoreBtn.style.display = "none";
        iziToast.info({
          title: "",
          message: "You have reached the end of the results.",
          position: "topRight",
        });
      }
    }
  } catch (error) {
    iziToast.error({
      title: '',
      message: `Sorry, ${error.message}! Please try again!`,
      position: 'topRight',
    });
    console.error(error);
  } finally {
        hideLoader();
  }
}
  
function displayImages(images) {
    const fragment = document.createDocumentFragment();
    images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        const listItem = document.createElement('li');
        listItem.className = "gallery-list";

        listItem.innerHTML = `
            <div class="gallery-div">
                <a class="gallery-link" href="${largeImageURL}">
                    <img src="${webformatURL}" alt="${tags}" class="gallery-image"/>
                </a>
            </div>
            <ul class="card-info">
                <li class="info-item">
                    <h3>Likes</h3>
                    <p>${likes}</p>
                </li>
                <li class="info-item">
                    <h3>Views</h3>
                    <p>${views}</p>
                </li>
                <li class="info-item">
                    <h3>Comments</h3>
                    <p>${comments}</p>
                </li>
                <li class="info-item">
                    <h3>Downloads</h3>
                    <p>${downloads}</p>
                </li>
            </ul>
        `;

        fragment.appendChild(listItem);
    });

    gallery.appendChild(fragment);
            
    const lightbox = new SimpleLightbox(".gallery a", {
        captionsData: "alt",
        captionDelay: 250,
    });
    lightbox.refresh();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchImages();
});

loadMoreBtn.addEventListener("click", () => {
  searchImages();
});