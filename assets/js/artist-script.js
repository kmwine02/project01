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
            var eventDate = moment(response[i].datetime).format("MM/DD/YYYY");
            var venueName = response[i].venue.name;
            var location = response[i].venue.location;

    
            
            var card = buildArtistCard(eventDate, venueName, location, i);
            $("#artist-container").append(card);
          }
        }
      });
    } else {
      alert("Error calling api");
    }
  });
}

function buildArtistCard(eventDate, venueName, location, i) {
 
var artistCard = $("<div class='card text-center' id='card" + i + "'></div>");
var dateEl = $("<div class='card-header' id='event-date'>" + eventDate + "</div>");
var cardBody = $("<div class='card-body'></div>");
var venueEl = $("<h5 class='card-title' id='venue'>" + venueName + "</h5>");
var locationEl = $("<p class='card-text' id='location'>" + location + "</p>");
var buttonEl = $("<a href='#' class='btn btn-primary'>Find a brewery</a>");

cardBody.append(venueEl);
cardBody.append(locationEl);
cardBody.append(buttonEl);
artistCard.append(dateEl);
artistCard.append(cardBody);
return artistCard;

}

// create function that adds artist to local storage

// create function that displays all artists in local storage

