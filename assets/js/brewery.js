$(document).ready(function () {
    function getBreweryCard() {
        var savedBrewery = localStorage.getItem("brewery");

        // check if there is any in local storage
        if (savedBrewery === null) {
            return;
        }
        console.log(savedBrewery);

        var storedBrewery = JSON.parse(savedBrewery);
        for (i = 0; i < storedBrewery.length; i++) {
            var card = buildBreweryCard(storedBrewery[i]);
            $("#brewery-container").append(card);
        }
    }

    function buildBreweryCard(brewery) {
        var breweryCard = $(
            "<div class='p-3 mb-2 bg-dark opacity-25 text-white card text-center card-gradient' id='card'></div>"
        );
        var nameEl = $(
            "<div class='card-header' id='event-date'><div class='main-event'>" +
                brewery.name +
                "</div></div>"
        );
        var cardBody = $("<div class='card-body'></div>");
        var addressEl = $(
            "<h5 class='card-title' id='venue'>" + brewery.address + "</h5>"
        );
        var cityEl = $(
            "<p class='card-text' id='location'>" + brewery.city + "</p>"
        );
        var phoneEl = $(
            "<p class='card-text' id='location'>" + brewery.phone + "</p>"
        );
        var buttonEl = $(
            "<button class='btn btn-primary'><a href='" +
                brewery.site +
                "' target='_blank'><div class='main-event'>Visit the brewery's website <i class='fas fa-beer main-event' style='font-size:20px'></i></div></a></button>"
        );
        console.log(brewery.website_url);

        cardBody.append(addressEl);
        cardBody.append(cityEl);
        cardBody.append(phoneEl);
        cardBody.append(buttonEl);
        breweryCard.append(nameEl);
        breweryCard.append(cardBody);
        return breweryCard;
    }
    getBreweryCard();
});
