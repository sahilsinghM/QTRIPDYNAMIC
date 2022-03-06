import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  return search.slice(6);
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  let adventureApi = config.backendEndpoint+`/adventures?city=${city}`;
  try{
    let adventureFetch = await fetch(adventureApi);
    let adventureJson = await adventureFetch.json();
    return adventureJson;  
  }
  catch(error){
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  
  console.log("consoling adventures before adding to dom",adventures);
  
  //Updates the DOM with the cities
  adventures.forEach((key) => {
    addSingleAdventureToDOM(key.id, key.category, key.image, key.name,key.costPerHead,key.duration);
  });

}


//Add single adventure to DOM
function addSingleAdventureToDOM(id,category,image,name,costPerHead,duration) {
  let addTo = document.querySelector("#data");
  // addTo.innerHTML = "";
  addTo.setAttribute("class","row justify-content-start");
  let cardDiv = document.createElement("a");
  cardDiv.setAttribute("id",id);
  cardDiv.setAttribute("class","activity-card col-lg-3 col-md-6");
  cardDiv.setAttribute("href",`detail/?adventure=${id}`);
  let cardAdventureCategory = document.createElement("p");
  cardAdventureCategory.setAttribute("class","category-banner");
  cardAdventureCategory.innerHTML = name;
  let cardImg = document.createElement("img");
  cardImg.setAttribute("src",image);
  let cardTextDiv = document.createElement("div");
  cardTextDiv.setAttribute("class","row justify-content-between align-self-center");
  let cardAdventureName = document.createElement("h6");
  cardAdventureName.setAttribute("class"," col-6");
  cardAdventureName.innerHTML = name;
  let cardAdventureCost = document.createElement("h6");
  cardAdventureCost.setAttribute("class"," col-6 text-right");
  cardAdventureCost.innerHTML = "₹" +costPerHead;
  let cardAdventureDurationText = document.createElement("h6");
  cardAdventureDurationText.setAttribute("class","col-6");
  cardAdventureDurationText.innerText = "Duration";
  let cardAdventureDuration = document.createElement("h6");
  cardAdventureDuration.setAttribute("class"," col-6 text-right");
  cardAdventureDuration.innerHTML = duration+" Hours";
  cardDiv.append(cardImg);
  cardDiv.append(cardAdventureCategory);
  cardTextDiv.append(cardAdventureName);  
  cardTextDiv.append(cardAdventureCost);
  cardTextDiv.append(cardAdventureDurationText);
  cardTextDiv.append(cardAdventureDuration);
  cardDiv.append(cardTextDiv);
  addTo.append(cardDiv);
}


//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  return list.filter(value=>{
    if(value.duration>low && value.duration<=high){
      return true;
    }
  })
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  return list.filter(value=>{
    if(categoryList.includes(value.category)){
      return true;
    }
  })
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

  //no filter
  if(filters.category.length===0 && filters.duration.length===0){
    return list;
  }
  //both filtered
  else if(filters.category.length>0 && filters.duration.length>0){
    let list2 = filterByCategory(list,filters.category);
    let low = filters.duration.substring(0,filters.duration.indexOf("-"));
    let high = filters.duration.substring(filters.duration.indexOf("-")+1,filters.duration.length);
      return filterByDuration(list2,low,high)
  }
  //duration filtered
  else if(filters.category.length===0 && filters.duration.length>0){
    let low = filters.duration.substring(0,filters.duration.indexOf("-"));
    let high = filters.duration.substring(filters.duration.indexOf("-")+1,filters.duration.length);
    return  filterByDuration(list,low,high)
  }
  //category filtered
  return filterByCategory(list,filters.category);
  // Place holder for functionality to work in the Stubs
}

//Implementation of localStorage API to save filters to local storage.
//  This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters",JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  // window.selectDuration = selectDuration;
  // window.selectCategory = selectCategory;
  // window.clearDuration = clearDuration;
  // window.clearCategory = clearCategory;

  JSON.parse(localStorage.getItem("filters"));
  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let pillContent = document.getElementById("category-list");
  for(var i = 0;i<filters.category.length;i++){
    let pillItem = document.createElement("p");
    pillItem.setAttribute("class","category-filter");
    pillItem.innerText = filters.category[i];
    pillContent.append(pillItem);
  }
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
};
