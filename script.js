const content = document.querySelector("#content");
let title = document.querySelectorAll(".text");
let image = document.querySelectorAll(".image");
let overview = document.querySelectorAll(".overview");
let search = document.getElementById("search");
let searchBtn = document.querySelector(".btn")

const img_path = "https://image.tmdb.org/t/p/w500";

// Search for movies
searchBtn.addEventListener("click", function () {
  let searchValue = search.value;
  function searchMovies() {
    // fetching searchquery API
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=c7f513b2266e5b9b5412d498ab989318&query=${searchValue}`
    )
      .then((result) => result.json())
      .then((data) => {
        showMovies(data.results);
      });
  }

  if (searchValue != "") {
    searchMovies();
    search.value = '';
  } else {
    window.location.reload();
  }
});

// fetching movie api
async function movieData() {
  let movie = await fetch(
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=c7f513b2266e5b9b5412d498ab989318&page=1"
  )
    .then((result) => result.json())
    .then((data) => {
      showMovies(data.results);
    });
}

// creating movies element
function showMovies(movies) {
  content.innerHTML = "";

  movies.forEach((movie) => {
    const { title, poster_path, overview } = movie;

    // Creating an element
    let movieEl = document.createElement("div");

    // Adding a class "box" to element
    movieEl.classList.add("box");

    movieEl.innerHTML = `
    <div class="box-content">
      <img src="${img_path + poster_path}" class="image" />
      <div class="text"><h3>${title}</h3></div>
      <div class="overlay">
        <h2>OverView</h2>
        <p>
          ${overview};
        </p>
    </div>
  </div>`;
  
    content.appendChild(movieEl);
  });
}
movieData();