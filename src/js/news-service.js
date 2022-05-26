import axios from 'axios';
const API_KEY = '27612779-03056b38fcc0dd588e982ef22';
const BASE_URL = 'https://pixabay.com/api';
let pageNum = 1;

export default  async function fetchArticles(value) {
    const url = `${BASE_URL}/?key=${API_KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${pageNum}`;

    return await axios.get(url)
        .then(function (response)
        { return response });
    
}







//export default async function fetchArticles(value) {
  //  const url = `${BASE_URL}/?key=${API_KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`;
    
   //return await fetch(url).then(response => {
    //return response.json()}) }



 
