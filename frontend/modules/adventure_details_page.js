import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  // console.log(search);
  // console.log(search.slice(11));
  return search.slice(11);
  // Place holder for functionality to work in the Stubs
  // return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call

  let adventureDetailsApi = config.backendEndpoint+`/adventures/detail/?adventure=${adventureId}`;
  try{
    let adventureDetailsFetch = await fetch(adventureDetailsApi);
    let adventureDetailsJson = await adventureDetailsFetch.json();
    return adventureDetailsJson;  
  }
  catch(error){
    return null;
  }

  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  console.log(adventure);
  document.getElementById("adventure-name").innerHTML = adventure.name;
  document.getElementById("adventure-subtitle").innerHTML = adventure.subtitle;
  let photoGallery = document.getElementById("photo-gallery")
  for(var i = 0;i<adventure.images.length;i++){
    let imageDiv = document.createElement("div");
    let image = document.createElement("img");
    image.setAttribute("src",adventure.images[i]);
    image.setAttribute("class","activity-card-image");
    imageDiv.append(image);
    photoGallery.append(imageDiv);
  }
  document.getElementById("adventure-content").innerHTML = adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let photoGallery = document.getElementById("photo-gallery");
  photoGallery.innerHTML = 
  `<div class="container">
  <br>
  <div id="myCarousel" class="carousel slide" data-ride="carousel">
    <ol class="carousel-indicators">
    </ol>

    <div class="carousel-inner" role="listbox">
    </div>

    <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
      <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
      <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
</div>`



for(var i = 0;i<images.length;i++){
  //indicators  // <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
  let indicatorItem = document.createElement("li");
  indicatorItem.setAttribute("data-target","#myCarousel");
  indicatorItem.setAttribute("data-slide-to",`${i}`);
  if(i===0){
    indicatorItem.setAttribute("class","active");
  }
  let carouselIndicators = document.querySelector("#myCarousel > ol") 
  carouselIndicators.append(indicatorItem);

  //images//   <div class="item active">//   <img src="img_chania.jpg" >// </div>
  let carouselItemDiv = document.createElement("div");
  if(i===0){
    carouselItemDiv.setAttribute("class","carousel-item active");
  }
  else {
    carouselItemDiv.setAttribute("class","carousel-item");
  }
  let image = document.createElement("img");
  image.setAttribute("src",images[i]);
  // image.setAttribute("class","activity-card-image");
  carouselItemDiv.append(image);
  let carouselinner = document.querySelector("#myCarousel > div")
  carouselinner.append(carouselItemDiv);
}

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't

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
