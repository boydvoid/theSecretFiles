//search bar on focus
$("#search-box").focus(function() {
  //search box css
  //description text
  $("#search-box").css({
    top: "-28vh"
  });

  // THE SECRET FILES TITLE
  $("#files-text").css({
    left: "42vh",
    top: "-29.5vh"
  });
  $("#secret-text").css({
    top: "-21vh"
  });

  //description text
  $("#description").css({
    top: "-30vh"
  });

  //search content div

  $("#search-content-div").css({
    right: "0vh"
  });
});

//search bar lose focus
$("#search-box").focusout(function() {
  console.log($("#search-box").val());
  if ($("#search-box").val() === "") {
    //search box css
    $("#search-box").css({
      top: "0"
    });

    //THE SECRET FILES TITLE
    $("#files-text").css({
      left: "0",
      top: "0"
    });
    $("#secret-text").css({
      top: "0"
    });

    //description text
    $("#description").css({
      top: "0"
    });

    //search content
    $("#search-content-div").css({
      right: "-200vh"
    });
  }
});

//api testing

$("#search-box").change(function() {
  let searchInput = $("#search-box").val();
  let imageSize = "/portrait_medium.";
  let extension;
  let hash = "d7d8f997d87b284626fc0dd41199055a";
  let apiKey = "b13e13a4abc06dc9ba221862c9e4d24d";
  let marvelURL = "https://gateway.marvel.com:443/v1/public/characters?ts=1";
  let characterURL = marvelURL + "&nameStartsWith=" + searchInput + "&apikey=" + apiKey + "&hash=" + hash;
  let comicsURL =
    marvelURL + searchInput + "/comics?formatType=comic&noVariants=true&hasDigitalIssue=true&apikey=" + apiKey;
  let eventsURL = marvelURL + searchInput + "/events?limit=28&apikey=" + apiKey;

  $("#display-images").empty();
  $.ajax({
    url: characterURL,
    method: "GET"
  }).then(function(results) {

    console.log(results);

    for (let i = 0; i < results.data.results.length; i++) {
      let characterWrapper = $("<div>");
      let characterName = $("<p>");
      let characterImg = $("<img>");

      extension = "." + results.data.results[i].thumbnail.extension;

      characterName.attr("class", "results-character-name");
      characterName.text(results.data.results[i].name);

      characterImg.attr("class", "image-container");
      characterImg.attr("src", results.data.results[i].thumbnail.path + extension);

      characterWrapper.append(characterName, characterImg);
      $("#display-images").append(characterWrapper);
    }
  });
});
