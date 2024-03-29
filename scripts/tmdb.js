function getTMDBList() {
  $.ajax({
    cache: true,
    url: tmdbURL + "list/92826?api_key=" + tmdbAPIKey + "&language=en-US",
    method: "GET",
    global: false,
    error: function (request, status, error) {
      console.log("tmdblist" + request);
    }
  }).then(function (tmdbList) {
    for (let i = 0; i < tmdbList.items.length; i++) {
      if (tmdbList.items[i].media_type === "movie") {
        marvelMovieList.unshift(tmdbList.items[i].id);
      }

      if (tmdbList.items[i].media_type === "tv") {
        marvelTVList.unshift(tmdbList.items[i].id);
      }
    }
    setTimeout(function () {
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
      global: false,
      error: function (request, status, error) {
        console.log("tmdbtvinfo" + request);
      }
    }).then(function (tmdbTVList) {
      for (let i = 0; i < tmdbTVList.cast.length; i++) {
        if (tmdbTVList.cast[i].character.includes("/")) {
          splitNames = tmdbTVList.cast[i].character.split("/");

          if (splitNames[1].indexOf(sessionStorage.characterName) > -1) {
            let characterName = splitNames[0].trim();

            let actorName = tmdbTVList.cast[i].name;
            characterObject["character"] = characterName;
            if (characterObject["actor"].indexOf(actorName) === -1) {
              Object.values(characterObject).indexOf(actorName);
              characterObject["actor"].unshift(actorName);
            }
          } else if (splitNames[1].indexOf(sessionStorage.characterName) > -1) {
            let characterName = splitNames[1].trim();
            let actorName = tmdbTVList.cast[i].name;
            characterObject["character"] = characterName;
            if (characterObject["actor"].indexOf(actorName) === -1) {
              Object.values(characterObject).indexOf(actorName);
              characterObject["actor"].unshift(actorName);
            }
          }
        } else {
          if (tmdbTVList.cast[i].character.includes(sessionStorage.characterName)) {
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
      method: "GET",
      error: function (request, status, error) {
        console.log("tmdbmovieinfo" + request);
      }
    }).then(function (tmdbMovieList) {
      for (let i = 0; i < tmdbMovieList.cast.length; i++) {

        if (tmdbMovieList.cast[i].character.includes("/")) {
          splitNames = tmdbMovieList.cast[i].character.split("/");

          if (splitNames[0].indexOf(sessionStorage.characterName) > -1) {
            let characterName = splitNames[0].trim();

            let actorName = tmdbMovieList.cast[i].name;
            characterObject["character"] = characterName;

            if (characterObject["actor"].indexOf(actorName) === -1) {
              Object.values(characterObject).indexOf(actorName);
              characterObject["actor"].unshift(actorName);
            }
          } else if (splitNames[1].indexOf(sessionStorage.characterName) > -1) {
            let characterName = splitNames[1].trim();
            let actorName = tmdbMovieList.cast[i].name;
            characterObject["character"] = characterName;

            if (characterObject["actor"].indexOf(actorName) === -1) {
              Object.values(characterObject).indexOf(actorName);
              characterObject["actor"].unshift(actorName);
            }
          }
        } else {
          if (tmdbMovieList.cast[i].character.indexOf(sessionStorage.characterName) > -1) {
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


//get actor name
function getActorId() {
  $.ajax({
    cache: true,
    url: tmdbURL + "search/person?api_key=" + tmdbAPIKey + "&language=en-US" + "&query=" + selectedPerson + "&page=1",
    method: 'GET',
    error: function (request, status, error) {
      console.log("getactorid" + request);
    }

  }).then(function (result) {
    console.log(result)
    actorID = result.results[0].id;
    actorImgPoster = imageUrl + result.results[0].known_for[0].poster_path;

    for (let j = 0; j < result.results[0].known_for.length; j++) {
      let typeWrapper = $("<div class='comic-wrapper'>");
      let typeName = $("<p>");
      let typeImage = $("<img>");

      typeImage.attr("class", "comic-container");

      typeImage.attr("src", imageUrl + result.results[0].known_for[j].backdrop_path);

      typeName.attr("class", "comic-name");
      typeName.text(result.results[0].known_for[j].original_title);
      typeImage.attr("comic-id", result.results[0].known_for[j].original_title);
      typeWrapper.append(typeImage, typeName);
      $("#known-images").append(typeWrapper);
    }
    getActorInfo();
  });
}

function getActorInfo() {
  $.ajax({
    cache: true,
    url: tmdbURL + "person/" + actorID + "?api_key=" + tmdbAPIKey + "&language=en-US",
    method: 'GET',
    error: function (request, status, error) {
      console.log("actor-info" + JSON.stringify(error));
    },
    success: function () {
      setTimeout(function () {
        $("#loading-wrapper").css({
          left: "-100%"
        });
      }, 3000)
    }
  }).then(function (result) {
    birthday = result.birthday;
    bio = result.biography;
    placeOfBirth = result.place_of_birth;
    profileImage = imageUrl + result.profile_path;




    buildActorPage();
  });
}