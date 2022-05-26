import axios from 'axios';
import Notiflix from 'notiflix';
import './css/styles';

const API_KEY = '27612779-03056b38fcc0dd588e982ef22';
const BASE_URL = 'https://pixabay.com/api';
let pageNum = 1;
let inputValue = '';
const searcForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const btnLoad = document.querySelector('.load-more');
btnLoad.classList.add('is-hidden');
searcForm.addEventListener('submit', onSearch);

btnLoad.addEventListener('click', onCklick);

function onSearch(e) {
  e.preventDefault();
  btnLoad.classList.add('is-hidden');
  inputValue = e.currentTarget.elements.searchQuery.value;
   pageNum = 1;
  fetchArticles(inputValue).then(imageCreate);
  
  gallery.innerHTML = '';
  searcForm.reset();
 
  
}
 async function onCklick() {
  //fetchArticles(inputValue).then(imageCreate)
  const galleryEl = await fetchArticles(inputValue);
  const galleryCadrPage = await imageCreate(galleryEl);
}
  

 function imageCreate(imgList) {
  const gallery = imgList.data.hits;
  if (imgList.data.totalHits === 0) {
    btnLoad.classList.add('is-hidden');
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  } if (pageNum >= imgList.data.totalHits/40 && imgList.data.totalHits!=0 ) {
     
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    btnLoad.classList.add('is-hidden');
    
  }
  gallery.map(x => {
    let { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = x;
    createImageCard(x);

   
  }).join('');
}
 function createImageCard(card) {

  const imageCard =`<div class="photo-card">
   <img src="${card.webformatURL}" alt="${card.tags}" loading="lazy"width=440 height=300 />
  <div class="info">
    <p class="info-item">
      <b>Likes </b>
      ${card.likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${card.views}
    </p>
    <p class="info-item">
      <b>Comments</b>
     ${card.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${card.downloads}
    </p>
  </div>
</div>`
  gallery.insertAdjacentHTML('beforeend',imageCard);
}
  async function fetchArticles(value) {
    const url = `${BASE_URL}/?key=${API_KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${pageNum}`;
  
    return await axios.get(url)
      .then(function (response) {
        pageNum += 1;
        btnLoad.classList.remove('is-hidden');
        return response
      });
    
  }

