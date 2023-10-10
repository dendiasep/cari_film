//mengambil data dari API
const getMovie = async (movieName) => {
  try {
    const response = await fetch(`https://imdb8.p.rapidapi.com/auto-complete?q=${movieName}`, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'd79aa632f6mshc4b1c41901d26c8p152121jsn40266e05aabd',
      'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
    }

    })

  const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};

//data 1: menampilkan film yang dicari
const displayMovieName = (movieData) => {
  const movieNameDiv = document.getElementById("movieYear");
  const movieName = movieData.d[0].l;
  const movieRank = movieData.d[0].y;
  
  const element = `
  <h2>Hasil film yang anda cari: ${movieName}, ${movieRank}<h2>
  `;
  movieNameDiv.innerHTML = element;
};

//data ke 2: menampilkan data film yang dicari
const displayTargetMovie = (movieData) => {
  const targetMovieDIv = document.getElementById("movieInfo");
  const targetMovie = {
    image: movieData.d[0].i.imageUrl,
    name : movieData.d[0].l,
    category : movieData.d[0].qid,
    rank : movieData.d[0].rank,
    cast : movieData.d[0].s
  };
//cetak ke halaman
  const element = `
    <div class= "movie-container">
      <img style = "width: 300px;"  src="${targetMovie.image}" class="movie-image">
      <div class = "movie-info">
        <h2>Movie Detail</h2>
        <ul>
          <li>Title: ${targetMovie.name}</li>
          <li>Category : ${targetMovie.category}</li>
          <li>Actors : ${targetMovie.cast}</li>
          <li>Rank :${targetMovie.rank}</li>
        </ul>
      </div>
    </div>
  `;
  targetMovieDIv.innerHTML = element;
 
};

//data 3: menampilkan film-film yang dicari
// const displayTargetMovies = (weatherData) => {
//   const movies = document.getElementById("movies");
//   showMovies = movieData.d;

//   let listOfElement = "";

//   for (let z = 1; z < showMovies.lenght; z++) {
//     const showmoviesData = {
//       image: showMovies[z].i.imageUrl
//     }
//     const elements= `
//     <div class= "movies-container">
//     <img style = "width: 300px;"  src="${showmoviesData.image}" class="movie-image">
//     <div class = "movie-info">
//       <h2>Movie Detail</h2>
//       <ul>
//         <li>Title: </li>
//         <li>Category: </li>
//         <li>Rank :</li>
//       </ul>
//     </div>`;
//     listOfElement += elements;
      
//   }
  
//   movies.innerHTML += listOfElement;

// };
  



//fungsi button
const searchMovie = async () => {
  // Argument ini akan digantikan dengan kata dari formulir search
  const movieName = document.getElementById("movie-name").value;
  const movieData = await getMovie(movieName);
  displayMovieName(movieData);
  displayTargetMovie(movieData);
  //displayTargetMovies(movieData);
};
