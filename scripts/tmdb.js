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
      for (let i = 0; i < tmdbTVList.cast.length; i++) {
        if (tmdbTVList.cast[i].character.includes("/")) {
          splitNames = tmdbTVList.cast[i].character.split("/");

          if (selectedCharacter === splitNames[0].trim()) {
            let characterName = splitNames[0].trim();

            let actorName = tmdbTVList.cast[i].name;
            characterObject["character"] = characterName;
            if (characterObject["actor"].indexOf(actorName) === -1) {
              Object.values(characterObject).indexOf(actorName);
              characterObject["actor"].push(actorName);
            }
          } else if (selectedCharacter === splitNames[1].trim()) {
            let characterName = splitNames[1].trim();
            let actorName = tmdbTVList.cast[i].name;
            characterObject["character"] = characterName;
            if (characterObject["actor"].indexOf(actorName) === -1) {
              Object.values(characterObject).indexOf(actorName);
              characterObject["actor"].push(actorName);
            }
          }
        } else {
          if (selectedCharacter === tmdbTVList.cast[i].character) {
            let characterName = tmdbTVList.cast[i].character;
            let actorName = tmdbTVList.cast[i].name;

            characterObject["character"] = characterName;

            if (characterObject["actor"].indexOf(actorName) === -1) {
              console.log(Object.values(characterObject).indexOf(actorName));
              characterObject["actor"].push(actorName);
            }
          }
        }
        console.log(characterObject);
      }
    });
  }
}
