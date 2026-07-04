const apiKey = 'ed1593f807699c939df12d11821454db';
console.log(new URLSearchParams);
const urlParams = new URLSearchParams(window.location.search);
console.log(urlParams);
const movieId = urlParams.get('id');
console.log(movieId);

if (movieId) {
  const playerIframe = document.querySelector('.video-player');
  if (playerIframe) {
    playerIframe.src = `https://vidsrc.to/embed/movie/${movieId}`;
  }


  const detailUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
  fetch(detailUrl)
    .then(response => response.json())
    .then(movie => {
      const videoNameEle = document.querySelector('.js-vidName');
      const videoOverviewEle = document.querySelector('.js-vidSummary');
      const videoReleaseEle = document.querySelector('.js-vidDate');
      const videoRatingEle = document.querySelector('.js-vidRating');
      
      if(videoNameEle) {
        videoNameEle.innerText = movie.title || movie.name;
      }
      if(videoOverviewEle) {
        videoOverviewEle.innerText = movie.overview;
      }
      if(videoReleaseEle) {
        videoReleaseEle.innerText = 
        movie.release_date ? 
        movie.release_date.split('-')[0] : '2026';
      }
      if(videoRatingEle) {
        videoRatingEle.innerText = 
        movie.vote_average? 
        movie.vote_average.toFixed(1) : '0.0';
      }

        })
    .catch(error => console.error("Error loading movie details:", error));
} else {
  console.log("No Movie ID passed in URL!");
}
