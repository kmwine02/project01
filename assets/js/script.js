var apiKey = "1ab7d181a431c2dbd1e28e6c42a134da";
var dateParam = "upcoming";
var artist = "";

$("#search").on("click", function () {
    artist = $(this).siblings("#artist-search").val();
    console.log(artist);
    searchArtistApi(artist);
});

function searchArtistApi(artist) {
    var apiUrl =
        "https://rest.bandsintown.com/artists/" +
        artist +
        "/events?app_id=" +
        apiKey +
        "&date=" +
        dateParam;
    console.log(apiUrl);

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (response) {
                console.log(response);

                for (var i = 0; i < response.length; i++) {
                    if (response[i].venue.country === "United States") {
                        var eventDate = moment(response[i].datetime).format(
                            "MM/DD/YYYY"
                        );
                        var venueName = response[i].venue.name;
                        var location = response[i].venue.location;
                        var city = response[i].venue.city;
                        var card = buildArtistCard(
                            eventDate,
                            venueName,
                            location,
                            city,
                            i
                        );
                        $("#artist-container").append(card);
                    }
                }
            });
        } else {
            alert("Enter an artist that is currently on");
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
            // Store breweries
            var breweryArray = [];

            for (i = 0; i < data.length; i++) {
                var breweryDetail = {
                    name: data[i].name,
                    address: data[i].street,
                    city: data[i].city,
                    phone: data[i].phone,
                    site: data[i].website_url,
                };

                console.log(breweryDetail);
                breweryArray.push(breweryDetail);
            }
            // Stringify array in order to store in local
            var breweryArrayString = JSON.stringify(breweryArray);
            window.localStorage.setItem("brewery", breweryArrayString);

            window.location.href = "brewery-search.html";
        });
}

function buildArtistCard(eventDate, venueName, location, city, i) {
    var artistCard = $(
        "<div class='p-3 mb-2 bg-dark opacity-25 card text-white text-center card-gradient' id='card" +
            i +
            "'></div>"
    );
    var dateEl = $(
        "<div class='card-header' id='event-date'>" + eventDate + "</div>"
    );
    var cardBody = $("<div class='card-body'></div>");
    var venueEl = $(
        "<h5 class='card-title main-event' id='venue'>" + venueName + "</h5>"
    );
    var locationEl = $(
        "<p class='card-text' id='location'>" + location + "</p>"
    );
    var buttonEl = $(
        "<button class='btn btn-primary'><div class='main-event'>Find a brewery</div</button>"
    );
    buttonEl.on("click", function () {
        findBrewery(city);
    });

    cardBody.append(venueEl);
    cardBody.append(locationEl);
    cardBody.append(buttonEl);
    artistCard.append(dateEl);
    artistCard.append(cardBody);
    return artistCard;
}

// var goBack = window.document.getElementById("goBackBtn");
// goBack.on("click", "load", function() {
//   // window.location.href = "artist-search.html";
//   window.history.back();
// });
