import config from "../conf/index.js";

async function init() {
  console.log("From init()");
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  console.log(cities);
  
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  let citiesApi = config.backendEndpoint+"/cities";
  try{
    let citiesFetch = await fetch(citiesApi);
    let citiesJson = await citiesFetch.json();
    return citiesJson;  
  }
  catch(error){
    return null;
  }
}


//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  //select element in which to add this
  let addTo = document.querySelector("#data");
  let cardDiv = document.createElement("a");
  cardDiv.setAttribute("id",id);
  cardDiv.setAttribute("href",`/frontend/pages/adventures/?city=${id}`);
  let cardImg = document.createElement("img");
  cardImg.setAttribute("src",image);
  let cardTextDiv = document.createElement("div");
  let cardCityName = document.createElement("h3");
  cardCityName.innerHTML = city;
  let cardCityDesc = document.createElement("h3");
  cardCityDesc.innerHTML = description;
  cardDiv.append(cardImg);
  cardTextDiv.append(cardCityName);  
  cardTextDiv.append(cardCityDesc);
  cardDiv.append(cardTextDiv);
  addTo.append(cardDiv);
}

export { init, fetchCities, addCityToDOM };
