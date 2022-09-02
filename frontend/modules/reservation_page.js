import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    let response = await fetch(`${config.backendEndpoint}/reservations/`);
    return await response.json();
  } catch {
    return null;
  }
  // Place holder for functionality to work in the Stubs
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  //Conditionally render the no-reservation-banner and reservation-table-parent
  if (reservations.length) {
    document.getElementById("reservation-table-parent").style.display = "block";
    document.getElementById("no-reservation-banner").style.display = "none";
  } else {
    document.getElementById("reservation-table-parent").style.display = "none";
    document.getElementById("no-reservation-banner").style.display = "block";
  }
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
  let table = document.getElementById("reservation-table");
  let t = reservations.sort((a, b) => {
    let c = new Date(a.time);
    let d = new Date(b.time);
    return d - c;
  })
  t.forEach(i => {
    let row = document.createElement("tr");
    let id = document.createElement("td");
    id.innerHTML = i.id;
    row.append(id);

    let name = document.createElement("td");
    name.innerHTML = i.name;
    row.append(name);

    let adventureName = document.createElement("td");
    adventureName.innerHTML = i.adventureName;
    row.append(adventureName);

    let person = document.createElement("td");
    person.innerHTML = i.person;
    row.append(person);

    let date = document.createElement("td");
    let d = new Date(i.date)
    date.innerHTML = d.toLocaleDateString('en-IN');
    row.append(date);

    let price = document.createElement("td");
    price.innerHTML = i.price;
    row.append(price);


    let time = document.createElement("td");
    let t = new Date(i.time)
    const optionsa = { year: 'numeric', month: 'long', day: 'numeric' };
    time.innerHTML = t.toLocaleDateString('en-IN', optionsa) + ',' + ' ' + t.toLocaleTimeString('en-IN');
    row.append(time);


    let btn = document.createElement("a");
    let div = document.createElement("div");
    div.setAttribute("id", i.id);
    btn.classList.add("reservation-visit-button");
    btn.classList.add("mt-2");
    btn.classList.add("text-light");
    btn.setAttribute("type", "button");
    btn.setAttribute("href", `../detail/?adventure=${i.adventure}`);
    btn.innerHTML = "Visit Adventure";
    div.append(btn);
    
    row.append(div);
    table.append(row)
  })
}

export { fetchReservations, addReservationToTable };
