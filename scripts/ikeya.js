
 const apiKey = 'ed1593f807699c939df12d11821454db';
 const baseImageUrl = 'https://image.tmdb.org/t/p/w500';
 function fetchPosterCategory(endpointurl, gridSelector) {
 fetch(endpointurl)
 .then(response => response.json())
 .then(data => {
   const posterArray = data.results;
   let posterHTML ='';
   
 posterArray.forEach((poster) => {
   const movieImg = poster.poster_path ? `${baseImageUrl}${poster.poster_path}` : poster.image;
   const movieName = poster.title || poster.name;
   const movieDate = poster.release_date || poster.first_air_date || 'No Date';
   const movieId = poster.id || poster.id;
   posterHTML += `
      <div class="movie-div js-posterDiv" data-poster-id="${movieId}">
          <div class="moviepic-div">
             <img class="movie-pic" src="${movieImg}">
          </div>
          <div class="detail-Div">
            <p class="movie-name">
            ${movieName}
              <br>
              <span class="release-date">
                ${movieDate}
              </span>
            </p>
          </div>
      </div>
  `;
 })

const gridContainer = document.querySelector(gridSelector);
if(gridContainer) {
  gridContainer.innerHTML = posterHTML;
  document.querySelectorAll(`${gridSelector} .js-posterDiv`).forEach((posterDiv) => {
  posterDiv.addEventListener('click', (event) => {
    event.preventDefault();
    const posterId = posterDiv.getAttribute('data-poster-id');
    if(posterId) {
    window.location.href = `
    ikeyaSeeMore.html?id=${posterId}`;
    } else {
      console.error("Error: Clicked poster div does not have a data-poster-id attribute!");
    }
  });
});
}

 })
 .catch((error) => {
   console.log('Something went wrong get hung data:', error);
 });
 }
 
const trendingUrl = 'https://api.themoviedb.org/3/trending/all/day?api_key=ed1593f807699c939df12d11821454db';
fetchPosterCategory(trendingUrl, '.js-grid');


const nowPlayingUrl = 'https://api.themoviedb.org/3/movie/now_playing?api_key=ed1593f807699c939df12d11821454db';
fetchPosterCategory(nowPlayingUrl, '.nowPlaying-grid'); 


const topRatedUrl = 'https://api.themoviedb.org/3/movie/top_rated?api_key=ed1593f807699c939df12d11821454db';
fetchPosterCategory(topRatedUrl, '.topRated-grid');


const popularUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=ed1593f807699c939df12d11821454db';
fetchPosterCategory(popularUrl, '.popular-grid');
