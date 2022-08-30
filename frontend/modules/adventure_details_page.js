import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const id = new URLSearchParams(search);
  return id.get("adventure");
  // Place holder for functionality to work in the Stubs
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call

  try {
    let data = await fetch(
      `${config.backendEndpoint}/adventures/detail/?adventure=${adventureId}`
    );
    return await data.json();
  } catch {
    return null;
  }
  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  document.getElementById("adventure-name").textContent = adventure.name;
  document.getElementById("adventure-subtitle").textContent =
    adventure.subtitle;
  adventure.images.forEach((i) => {
    let img = document.createElement("img");
    img.setAttribute("src", i);
    img.classList.add("activity-card-image");
    document.getElementById("photo-gallery").append(img);
  });
  document.getElementById("adventure-content").textContent = adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let div = document.createElement("div");
  let carousel = `<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride = "carousel">
  <div class="carousel-indicators">
</div>
  <div class="carousel-inner">
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`;
  div.innerHTML = carousel;
  document.getElementById("photo-gallery").innerHTML = div.innerHTML;
  let inner = document.querySelector(".carousel-inner");
  images.forEach((i) => {
    let wrapper = document.createElement("div");
    let div = document.createElement("div");
    div.classList.add("carousel-item");
    let img = document.createElement("img");
    img.setAttribute("src", i);
    img.setAttribute("class", "activity-card-image");
    div.append(img);
    wrapper.append(div);
    inner.innerHTML = inner.innerHTML + wrapper.innerHTML;
  });
  document.getElementsByClassName("carousel-item")[0].classList.add("active");

  let indicator = document.querySelector(".carousel-indicators");
  images.forEach((i) => {
    let btn = document.createElement("button");
    btn.setAttribute("data-bs-target", "#carouselExampleIndicators");
    btn.setAttribute("data-bs-slide-to", `${images.indexOf(i)}`);
    btn.setAttribute("aria-label", `Slide ${images.indexOf(i) + 1}`);
    if (images.indexOf(i) === 0) {
      btn.classList.add("active");
      btn.setAttribute("aria-current", "true");
    }
    indicator.append(btn);
  });
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  let sold = document.getElementById("reservation-panel-sold-out");
  let available = document.getElementById("reservation-panel-available");
  if (adventure.available) {
    sold.style.display = "none";
    available.style.display = "block";
    let cost = document.getElementById("reservation-person-cost");
    cost.innerHTML = adventure.costPerHead;
  } else {
    available.style.display = "none";
    sold.style.display = "block";
  }
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let cost = document.getElementById("reservation-cost");
  cost.innerHTML = String(adventure.costPerHead * persons);
}

//Implementation of reservation form submission
async function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  let form = document.getElementById("myForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = {
      name: form.elements["name"].value,
      date: form.elements["date"].value,
      person: form.elements["person"].value,
      adventure: adventure.id,
    };
    let a = fetch(`${config.backendEndpoint}/reservations/new`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((resp) => resp.json());
    a.then((r) => {
      if (r.success === true) {
        alert("Success!");
        location.reload();
      } else {
        alert("Failed!" + "\n"+ r.message );
      }
    });
    // console.log(e.target.name.value)
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if ((adventure.reserved)) {
    document.getElementById("reserved-banner").style.display = "block";
  }
  else {
    document.getElementById("reserved-banner").style.display = "none";

  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
