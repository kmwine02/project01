var apiKey = "1ab7d181a431c2dbd1e28e6c42a134da";
var dateParam = "upcoming";
var artist = "";

$("#search").on("click", function () {
  artist = $(this).siblings("#artist-search").val();
  console.log(artist);
  searchArtistApi(artist);
});

function searchArtistApi(artist) {
  var apiUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + apiKey + "&date=" + dateParam;
  console.log(apiUrl);

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (response) {
        console.log(response);

        for (var i = 0; i < response.length; i++) {
          if (response[i].venue.country === "United States") {
            var eventDate = response[i].datetime;
            var venueName = response[i].venue.name;
            var location = response[i].venue.location;

            console.log(eventDate);
            console.log(venueName);
            console.log(location);
            
            displayArtistCard(i);

          }
        }
      });
    } else {
      alert("Error calling api");
    }
  });
}

function displayArtistCard(i) {
  // add child div to artist-container with class card text-center (artist-card)
  $("#artist-container").append("<div class='card text-center' id='card" + i + "'></div>");


  // add child to artist-card with class card-header 
  $("")
  // add child to artist-card with class-card body (card-info)

  // add child to card-info with class card-title
  // add child to card-info with class card-text
  // add child to card-info with class btn

}

// create function that adds artist to local storage

// create function that displays all artists in local storage

// create function to display the artist cards

// <div class="column col-8" id="artist-container">
//                 <div class="card text-center">
//                     <div class="card-header" id="event-date">Date</div>
//                     <div class="card-body" >
//                       <h5 class="card-title" id="venue">Venue</h5>
//                       <p class="card-text" id="location">City Name</p>
//                       <a href="#" class="btn btn-primary">Find a brewery</a>
//                     </div>
//                   </div>
//             </div>
