var requestUrl = 'https://api.openbrewerydb.org/breweries';

fetch(requestUrl)
  .then(function (response) {
    // console.log(response)
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });
  
  // var requestUrl2 = 'https://rest.bandsintown.com/artists/pink/events';

  // fetch(requestUrl2, {mode:"no-cors"})
  //   .then(function (response) {
  //     return response.json();
  //   })
  //   .then(function (data) {
  //     console.log(data);
  //   });