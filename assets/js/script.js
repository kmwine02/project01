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
            var city = response[i].venue.city;
            var card = buildArtistCard(eventDate, venueName, location, city, i);
            $("#artist-container").append(card);
          }
        }
      });
    } else {
      alert("Error calling api");
    }
  });
}

function findBrewery(city) {
  var requestUrl = "https://api.openbrewerydb.org/breweries?by_city=" + city;

  fetch(requestUrl)
    .then(function (response) {
      // console.log(response)
      return response.json();
    })
    .then(function (data) {
      console.log("***breweries***", data);

      for (i = 0; i < data.length; i++) {


        // Store breweries
        var savedBrewery = localStorage.getItem("brewery");
        var breweryArray;

        if (savedBrewery === null) {
          breweryArray = [];
        } else {
          breweryArray = JSON.parse(savedBrewery)
        }

        var breweryDetail = {
          name: data[i].name,
          address: data[i].street,
          city: data[i].city,
          phone: data[i].phone,
          site: data[i].website_url
        };

        console.log(breweryDetail);
        breweryArray.push(breweryDetail);

        // Stringify array in order to store in local
        var breweryArrayString = JSON.stringify(breweryArray);
        window.localStorage.setItem("brewery", breweryArrayString);
      }

      window.location.href = "brewery-search.html";
      getBreweryCard();
    });

}

function buildArtistCard(eventDate, venueName, location, city, i) {

  var artistCard = $("<div class='card text-center' id='card" + i + "'></div>");
  var dateEl = $("<div class='card-header' id='event-date'>" + eventDate + "</div>");
  var cardBody = $("<div class='card-body'></div>");
  var venueEl = $("<h5 class='card-title' id='venue'>" + venueName + "</h5>");
  var locationEl = $("<p class='card-text' id='location'>" + location + "</p>");
  var buttonEl = $("<button class='btn btn-primary'>Find a brewery</button>");
  buttonEl.on("click", function () {
    findBrewery(city)
  });


  cardBody.append(venueEl);
  cardBody.append(locationEl);
  cardBody.append(buttonEl);
  artistCard.append(dateEl);
  artistCard.append(cardBody);
  return artistCard;

}

function getBreweryCard() {

  var savedBrewery = localStorage.getItem("brewery");

  // check if there is any in local storage
  if (savedBrewery === null) {
    return;
  }
  console.log(savedBrewery);

  var storedBrewery = JSON.parse(savedBrewery);
  for (i = 0; i < storedBrewery.length; i++) {
    var card = buildBreweryCard();
    $("#brewery-container").append(card);


  }
}

function buildBreweryCard() {
  var breweryCard = $("<div class='card text-center' id='card'></div>");
  var nameEl = $("<div class='card-header' id='event-date'>" + storedBrewery[i].name + "</div>");
  var cardBody = $("<div class='card-body'></div>");
  var addressEl = $("<h5 class='card-title' id='venue'>" + storedBrewery[i].address + "</h5>");
  var cityEl = $("<p class='card-text' id='location'>" + storedBrewery[i].city + "</p>");
  var phoneEl = $("<p class='card-text' id='location'>" + storedBrewery[i].phone + "</p>");
  var buttonEl = $("<button class='btn btn-primary'><a href='" + storedBrewery[i].website_url + "' target='_blank'>Visit the brewery's website</a></button>");


  cardBody.append(addressEl);
  cardBody.append(cityEl);
  cardBody.append(phoneEl);
  cardBody.append(buttonEl);
  breweryCard.append(nameEl);
  breweryCard.append(cardBody);
  return breweryCard;

}


