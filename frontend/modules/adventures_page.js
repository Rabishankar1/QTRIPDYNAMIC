import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  // let temp= search.indexOf("=");
  // return search.slice(temp+1);
  let result;
  const searchQuery = search;
  const searchParams = new URLSearchParams(searchQuery);
  for (const p of searchParams) {
    result = p[1];
  }
  return result;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    let data = await fetch(`${config.backendEndpoint}/adventures?city=${city}`);
    return await data.json();
  } catch {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM

  adventures.forEach((i) => {
    let col = document.createElement("div");
    col.setAttribute("class", "col-md-6 col-lg-3");
    col.classList.add("position-relative");
    let card = document.createElement("div");
    card.classList.add("activity-card");
    // card.classList.add("col-3");
    let img = document.createElement("img");
    img.setAttribute("src", i.image);
    img.classList.add("activity-card-image");
    card.append(img);

    let texta = document.createElement("div");
    texta.setAttribute(
      "class",
      "w-100 d-flex justify-content-between px-3 pt-1"
    );
    let spanaa = document.createElement("p");
    spanaa.textContent = i.name;
    let spanab = document.createElement("p");
    spanab.textContent = `₹${i.costPerHead}`;
    texta.append(spanaa);
    texta.append(spanab);

    let textb = document.createElement("div");
    textb.setAttribute("class", "w-100 d-flex justify-content-between px-3");
    let spanba = document.createElement("p");
    spanba.textContent = "Duration";
    let spanbb = document.createElement("p");
    spanbb.textContent = `${i.duration} Hours`;
    textb.append(spanba);
    textb.append(spanbb);

    let banner = document.createElement("div");
    banner.classList.add("category-banner");
    banner.textContent = i.category;

    let a = document.createElement("a");
    a.setAttribute("href", `detail/?adventure=${i.id}`);
    a.setAttribute("id", i.id);
    a.append(card);
    col.append(banner);
    card.append(texta);
    card.append(textb);
    col.append(a);
    document.getElementById("data").append(col);
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  return list.filter((i) => {
    return i.duration >= low && i.duration <= high;
  });
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  return list.filter((i) => {
    return categoryList.includes(i.category);
  });
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  // Place holder for functionality to work in the Stubs

  if (filters.category.length !== 0 && filters.duration === "") {
    return filterByCategory(list, filters.category);
  }
  if (filters.duration !== "" && filters.category.length === 0) {
    let k = filters.duration.split("-");
    return filterByDuration(list, k[0], k[1]);
  }
  if (filters.category.length !== 0 && filters.duration !== "") {
    let categoryList = filterByCategory(list, filters.category);
    let durationList = filterByDuration(
      list,
      filters.duration.split("-")[0],
      filters.duration.split("-")[1]
    );
    let durationIds = durationList.map((i) => i.id);
    let categoryIds = categoryList.map((i) => i.id);

    let commonArr = durationList.filter((i) => categoryIds.includes(i.id));

    return commonArr;
  }

  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters", JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  // Place holder for functionality to work in the Stubs
  return JSON.parse(localStorage.getItem("filters"));
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  let categoryList = document.getElementById("category-list");
  filters.category.forEach((i) => {
    let wrap = document.createElement("div");
    wrap.setAttribute("class", "d-flex");
    let div = document.createElement("div");
    wrap.classList.add("category-filter");
    div.textContent = i;
    let x = document.createElement("button");
    x.classList.add("text-warning");
    x.classList.add("ms-2");
    x.classList.add("btn");
    x.classList.add("py-0");
    x.classList.add("pe-0");
    x.innerHTML = "x";
    let id= i.toLowerCase(i);
    x.setAttribute("id", id)
    x.setAttribute("onclick", "removeCategory(event)");
    wrap.append(div);
    wrap.append(x);
    categoryList.append(wrap);
  });

  let durationArr = ["", "0-2", "2-6", "6-12", "12-99"];
  document.getElementById("duration-select").selectedIndex =
    durationArr.indexOf(filters.duration);
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
}

async function addAdventure(city) {
  const btn = document.getElementById("add-adventure");
  btn.addEventListener("click", async () => {
    try {
      await fetch(`${config.backendEndpoint}/adventures/new`, {
        method: "POST",
        body: JSON.stringify({
          city: city,
        }),
        headers: { "Content-Type": "application/json" },
      });
      alert("Success!" + "\n" + "New Adventure Created");
      location.reload();
    } catch {
      alert("Failed!");
    }
  });
}



export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
  addAdventure,
};
