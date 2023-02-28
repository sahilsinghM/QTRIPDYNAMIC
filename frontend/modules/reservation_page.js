import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them

  let reservationsApi = config.backendEndpoint + `/reservations`;
  try {
    let reservationsFetch = await fetch(reservationsApi);
    let reservationsJson = await reservationsFetch.json();
    return reservationsJson;
  } catch (error) {
    return null;
  }
  // Place holder for functionality to work in the Stubs
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  // console.log(JSON.parse(reservations));
  document.getElementById("reservation-table-parent").style.display =
    reservations[0] === undefined ? "none" : "block";
  document.getElementById("no-reservation-banner").style.display =
    reservations[0] !== undefined ? "none" : "block";

  if (reservations[0] !== undefined) {
    for (let i = 0; i < Object.keys(reservations).length; i++) {
      let tRow = document.createElement("tr");
      let tId = document.createElement("th");
      tId.innerHTML = reservations[i].id;
      tId.setAttribute("scope", "col");
      tRow.append(tId);
      let tName = document.createElement("th");
      tName.innerHTML = reservations[i].name;
      tName.setAttribute("scope", "col");
      tRow.append(tName);
      let tAd = document.createElement("th");
      tAd.innerHTML = reservations[i].adventureName;
      tAd.setAttribute("scope", "col");
      tRow.append(tAd);
      let tPerson = document.createElement("th");
      tPerson.innerHTML = reservations[i].person;
      tPerson.setAttribute("scope", "col");
      tRow.append(tPerson);
      let tDate = document.createElement("th");
      tDate.innerHTML = new Date(reservations[i].date).toLocaleDateString(
        "en-IN"
      );
      tDate.setAttribute("scope", "col");
      tRow.append(tDate);
      let tPrice = document.createElement("th");
      tPrice.innerHTML = reservations[i].price;
      tPrice.setAttribute("scope", "col");
      tRow.append(tPrice);
      let tTime = document.createElement("th");
      let timeTo = new Date(reservations[i].time);
      var hr = timeTo.getHours();
      var min = timeTo.getMinutes();
      if (min < 10) {
        min = "0" + min;
      }
      var sec = timeTo.getSeconds();
      var ampm = "am";
      if (hr > 12) {
        hr -= 12;
        ampm = "pm";
      }
      tTime.innerHTML =
        timeTo.toLocaleString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }) + ", "+ hr+":"+min+":"+sec+" "+ampm;
      tTime.setAttribute("scope", "col");
      tRow.append(tTime);
      let tAction = document.createElement("button");
      tAction.innerHTML = "View Adventure";
      tAction.setAttribute("id", reservations[i].id);
      tAction.setAttribute("class", "reservation-visit-table");
      let aLink = document.createElement("a");
      aLink.setAttribute(
        "href",
        `./detail/?adventure=${reservations[i].adventure}`
      );
      tAction.append(aLink);
      tRow.append(tAction);
      document.getElementById("reservation-table").append(tRow);
    }
  }
  //Conditionally render the no-reservation-banner and reservation-table-parent
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
}

export { fetchReservations, addReservationToTable };
