function getTMDBList() {
  $.ajax({
    cache: true,
    url: tmdbURL + "list/92826?api_key=" + tmdbAPIKey + "&language=en-US",
    method: "GET"
  }).then(function(tmdbList) {
    for (let i = 0; i < tmdbList.items.length; i++) {
      if (tmdbList.items[i].media_type === "movie") {
        marvelMovieList.push(tmdbList.items[i].id);
      }

      if (tmdbList.items[i].media_type === "tv") {
        marvelTVList.push(tmdbList.items[i].id);
      }
    }

    getTMDBTVInfo();
  });
}

function getTMDBTVInfo() {
  for (let tvNumber = 0; tvNumber < marvelTVList.length; tvNumber++) {
    let tvID = marvelTVList[tvNumber];

    $.ajax({
      cache: true,
      url: tmdbURL + "tv/" + tvID + "/credits?api_key=" + tmdbAPIKey + "&language=en-US",
      method: "GET"
    }).then(function(tmdbTVList) {
      console.log(tmdbTVList);

      for (let i = 0; i < tmdbTVList.cast.length; i++) {
        let characterName = tmdbTVList.cast[i].character;
        let actorName = tmdbTVList.cast[i].name;

        characterList = {
          [characterName]: actorName
        };
      }
    });
  }
}

function callMe() {
  console.log(characterList);
}
