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
  // console.log(adventure);
  document.getElementById("adventure-name").innerHTML = adventure.name;
  document.getElementById("adventure-subtitle").innerHTML = adventure.subtitle;
  let photoGallery = document.getElementById("photo-gallery");
  for(var i = 0;i<adventure.images.length;i++){
    let image = document.createElement("img");
    image.setAttribute("src",adventure.images[i]);
    image.setAttribute("class","activity-card-image");
    photoGallery.append(image);
  }
  document.getElementById("adventure-content").innerHTML = adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let photoGallery = document.getElementById("photo-gallery");
  photoGallery.innerHTML = 
  `<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
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




let carouselInnerDiv = document.getElementsByClassName("carousel-inner")[0];
for(var i = 0;i<images.length;i++){
  let imageDiv = document.createElement("div")
  imageDiv.setAttribute("class","carousel-item")
  if(i===0){
    imageDiv.setAttribute("class","carousel-item active");
  }
  let imag = document.createElement("img");
  imag.setAttribute("src",images[i]);
  imag.setAttribute("class","d-block w-100")
  imageDiv.append(imag);
  carouselInnerDiv.append(imageDiv);
}
// console.log(carouselInnerDiv);
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available===true){
    document.getElementById("reservation-panel-sold-out").style.display="none";
    document.getElementById("reservation-panel-available").style.display="block";
    document.getElementById("reservation-person-cost").innerHTML = adventure.costPerHead;
  }
  else if(adventure.available===false){
    document.getElementById("reservation-panel-available").style.display="none";
    document.getElementById("reservation-panel-sold-out").style.display="block";
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  document.getElementById("reservation-cost").innerHTML = persons*adventure.costPerHead;

}

//Implementation of reservation form submission
async function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  //capture query
  let submitButton = document.getElementById("myForm");
  //handle submit
  //make post call
  let reservationApi = config.backendEndpoint+`/reservations`;
  try{
    const update = {
      title: 'A blog post by Kingsley',
      body: 'Brilliant post on fetch API',
      userId: 1,
      };
      
      const options = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(update),
      };
    let reservationFetch = await fetch(reservationApi);
    let adventureDetailsJson = await adventureDetailsFetch.json();
    return adventureDetailsJson;  
  }
  catch(error){
    return null;
  }
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  if(post=="successful"){
    alert("Success!");
    //refresh page
  }
  else{
    alert("Failed!");
  }
  

  
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
