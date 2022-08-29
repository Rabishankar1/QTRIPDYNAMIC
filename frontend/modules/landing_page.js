import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    let data = await fetch(`${config.backendEndpoint}/cities`);
    return data.json();
  } catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let col = document.createElement("div");
  let img = document.createElement("img");
  let tile = document.createElement("div");
  let a = document.createElement("a");
  let h1 = document.createElement("h5");
  let h2 = document.createElement("p");
  let tileText = document.createElement("div");

  a.setAttribute("href", `./pages/adventures/?city=${id}`);
  a.setAttribute("id", id);

  col.setAttribute("class", "col-md-6 col-lg-3 ");
  col.classList.add("py-2");

  tile.classList.add("tile");

  img.setAttribute("src", image);

  tileText.classList.add("tile-text");
  tileText.classList.add("text-center");

  h1.textContent = city;
  h2.textContent = description;

  tile.append(img);
  tileText.append(h1);
  tileText.append(h2);
  tile.append(tileText);
  a.append(tile);
  col.append(a);

  let elem = document.getElementById("data");
  elem.append(col);
}

export { init, fetchCities, addCityToDOM };
