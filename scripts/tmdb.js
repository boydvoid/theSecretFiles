function getTMDBList() {
  $.ajax({
    cache: true,
    url: tmdbURL + "list/92826?api_key=" + tmdbAPIKey + "&language=en-US",
    method: "GET",
    global: false
  }).then(function(tmdbList) {
    for (let i = 0; i < tmdbList.items.length; i++) {
      if (tmdbList.items[i].media_type === "movie") {
        marvelMovieList.unshift(tmdbList.items[i].id);
      }

      if (tmdbList.items[i].media_type === "tv") {
        marvelTVList.unshift(tmdbList.items[i].id);
      }
    }
    setTimeout(function() {
      getTMDBTVInfo();
    }, 1000);
  });
}

function getTMDBTVInfo() {
  for (let tvNumber = 0; tvNumber < marvelTVList.length; tvNumber++) {
    let tvID = marvelTVList[tvNumber];

    $.ajax({
      cache: true,
      url: tmdbURL + "tv/" + tvID + "/credits?api_key=" + tmdbAPIKey + "&language=en-US",
      method: "GET",
      global: false
    }).then(function(tmdbTVList) {
      for (let i = 0; i < tmdbTVList.cast.length; i++) {
        if (tmdbTVList.cast[i].character.includes("/")) {
          splitNames = tmdbTVList.cast[i].character.split("/");

          if (splitNames[0].includes(selectedCharacter)) {
            let characterName = splitNames[0].trim();

            let actorName = tmdbTVList.cast[i].name;
            characterObject["character"] = characterName;
            if (characterObject["actor"].indexOf(actorName) === -1) {
              Object.values(characterObject).indexOf(actorName);
              characterObject["actor"].unshift(actorName);
            }
          } else if (splitNames[1].includes(selectedCharacter)) {
            let characterName = splitNames[1].trim();
            let actorName = tmdbTVList.cast[i].name;
            characterObject["character"] = characterName;
            if (characterObject["actor"].indexOf(actorName) === -1) {
              Object.values(characterObject).indexOf(actorName);
              characterObject["actor"].unshift(actorName);
            }
          }
        } else {
          if (tmdbTVList.cast[i].character.includes(selectedCharacter)) {
            let characterName = tmdbTVList.cast[i].character;
            let actorName = tmdbTVList.cast[i].name;

            characterObject["character"] = characterName;

            if (characterObject["actor"].indexOf(actorName) === -1) {
              characterObject["actor"].unshift(actorName);
            }
          }
        }
      }
    });
    if (tvNumber === marvelTVList.length - 1) {
      getTMDBMovieInfo();
    }
  }
}

function getTMDBMovieInfo() {
  for (let movieNumber = 0; movieNumber < marvelMovieList.length; movieNumber++) {
    let movieID = marvelMovieList[movieNumber];

    $.ajax({
      cache: true,
      url: tmdbURL + "movie/" + movieID + "/credits?api_key=" + tmdbAPIKey + "&language=en-US",
      method: "GET"
    }).then(function(tmdbMovieList) {
      for (let i = 0; i < tmdbMovieList.cast.length; i++) {
        if (tmdbMovieList.cast[i].character.includes("/")) {
          splitNames = tmdbMovieList.cast[i].character.split("/");

          if (splitNames[0].indexOf(selectedCharacter) > -1) {
            let characterName = splitNames[0].trim();

            let actorName = tmdbMovieList.cast[i].name;
            characterObject["character"] = characterName;

            if (characterObject["actor"].indexOf(actorName) === -1) {
              Object.values(characterObject).indexOf(actorName);
              characterObject["actor"].unshift(actorName);
            }
          } else if (splitNames[1].indexOf(selectedCharacter) > -1) {
            let characterName = splitNames[1].trim();
            let actorName = tmdbMovieList.cast[i].name;
            characterObject["character"] = characterName;

            if (characterObject["actor"].indexOf(actorName) === -1) {
              Object.values(characterObject).indexOf(actorName);
              characterObject["actor"].unshift(actorName);
            }
          }
        } else {
          if (tmdbMovieList.cast[i].character.indexOf(selectedCharacter) > -1) {
            let characterName = tmdbMovieList.cast[i].character;
            let actorName = tmdbMovieList.cast[i].name;

            characterObject["character"] = characterName;

            if (characterObject["actor"].indexOf(actorName) === -1) {
              characterObject["actor"].unshift(actorName);
            }
          }
        }
      }
      if (movieNumber === marvelMovieList.length - 1) {
        //only call when main for loop is finished
        actorDropdown();
      }
    });
  }
}
