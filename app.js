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

  if (movieData.d.length > 0 && movieData.d[0].l) {
    const judul = movieData.d[0].l;
    //cetak film yang dicari
    const element = `
      <h2>Hasil film yang anda cari: ${judul}<h2>
    `;
    movieNameDiv.innerHTML = element;
    movieNameDiv.style.color = "#005B4A"

  } else {
    movieNameDiv.innerHTML = "Film tidak ditemukan! Coba lagi.";
    movieNameDiv.style.color = "red"
    movieNameDiv.style.textAlign = "center"

  }
};


//data ke 2: menampilkan data film yang dicari
const displayTargetMovie = (movieData) => {
  const targetMovieDIv = document.getElementById("movieInfo");

  if (movieData.d[0] && movieData.d[0].i) {
    const targetMovie = {
      image: movieData.d[0].i.imageUrl || '', // Menyertakan nilai default jika 'imageUrl' tidak ada
      name: movieData.d[0].l || '-',
      category: movieData.d[0].qid || '-',
      rank: movieData.d[0].rank || '-',
      cast: movieData.d[0].s || '-',
      year : movieData.d[0].y || '-'
    };

    const element = `
      <div class="movie-container">
        <img style="width: 300px;" src="${targetMovie.image}" class="movie-image">
        <div class="movie-info">
          <h2>Detail Film</h2>
          <ul>
            <li>Judul : ${targetMovie.name}</li>
            <li>Kategori: ${targetMovie.category}</li>
            <li>Pemeran: ${targetMovie.cast}</li>
            <li>Ranking: ${targetMovie.rank}</li>
            <li>Tahun: ${targetMovie.year}</li>
          </ul>
        </div>
      </div>
    `;
    targetMovieDIv.innerHTML = element;
  } else {
    targetMovieDIv.innerHTML = '';
  }
};


//data 3: menampilkan film-film yang dicari
let displayTargetMovies = (movieData) => {
  const moviesDiv = document.getElementById("movies");
  moviesDiv.innerHTML = ''; // Bersihkan elemen "movies" sebelum menambahkan film baru

  for (let c = 0; c < movieData.d.length; c++) {
    const movie = movieData.d[c];
    if (movie && movie.i) {
      const TargetMovies = {
        image: movieData.d[c].i.imageUrl || '', // Menyertakan nilai default jika 'imageUrl' tidak ada
        name: movieData.d[c].l || '-',
        category: movieData.d[c].qid || '-',
        rank: movieData.d[c].rank || '-',
        cast: movieData.d[c].s || '-',
        year : movieData.d[c].y || '-'
      };

      moviesDiv.insertAdjacentHTML('beforeend', `
        <div class="movies-container">
          <img style="width: 200px;" src="${TargetMovies.image}" class="movie-image">
          <div class="movieInfo">
            <h2>Detail Film</h2>
            <ul>
            <li>Judul : ${TargetMovies.name}</li>
            <li>Kategori: ${TargetMovies.category}</li>
            <li>Pemeran: ${TargetMovies.cast}</li>
            <li>Ranking: ${TargetMovies.rank}</li>
            <li>Tahun: ${TargetMovies.year}</li>
            </ul>
          </div>
        </div>
      `);
    }
  }
};


  

//fungsi button
const searchMovie = async () => {
  // Argument ini akan digantikan dengan kata dari formulir search
  const movieName = document.getElementById("movie-name").value;
  if (!movieName) {
    return null;
  } else {
    let movieData = await getMovie(movieName);
  displayMovieName(movieData);
  displayTargetMovie(movieData);
  displayTargetMovies(movieData);
  };

};



