$(document).ready(function() {
  let videos = [
    "antman.mp4",
    "Deadpool.mp4",
    "hulk.mp4",
    "panther.mp4",
    "strange.mp4",
    "scarlett.mp4",
    "spiderman.mp4",
    "thanos.mp4"
  ];

  let displayArray = shuffle(videos);
  let i = 0;

  $("#myVideo").attr("src", "./video/" + displayArray[i]);

  //finsihed
  document.getElementById("myVideo").addEventListener(
    "ended",
    function() {
      if (i >= displayArray.length) {
        console.log("reset");

        i = 0;
        displayArray = shuffle(videos);
        $("#myVideo").attr("src", "./video/" + displayArray[i]);
      } else {
        i++;
        $("#myVideo").attr("src", "./video/" + displayArray[i]);
      }
    },
    false
  );
});

//shuffle array
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Global Variables
let hash = "d7d8f997d87b284626fc0dd41199055a";
let apiKey = "b13e13a4abc06dc9ba221862c9e4d24d";
let marvelURL = "https://gateway.marvel.com:443/v1/public/characters";
let searchLimit = 50;
let extension;

let characterID;
let apiURL;
let urlType;

let comicsURL =
  marvelURL + characterID + "/comics?formatType=comic&noVariants=true&hasDigitalIssue=true&apikey=" + apiKey;

// API Calls

$("#search-btn").on("click", function(event) {
  event.preventDefault();
  let searchInput = $("#search-box").val();
  console.log($("#search-btn").val());

  //move dom elements on click
  $(".search-box-div").css({
    position: "absolute",
    width: "25%",
    top: "15px",
    right: "0px"
  });

  apiURL =
    marvelURL + "?ts=1&nameStartsWith=" + searchInput + "&limit=" + searchLimit + "&apikey=" + apiKey + "&hash=" + hash;
  urlType = "Character";
  $("#character-images").empty();
  getAPIData();
});

$(document).on("click", ".image-container", function() {
  characterID = $(this).attr("character-id");
  getEventData();
});

function getEventData() {
  apiURL = marvelURL + "/" + characterID + "/events?ts=1&limit=" + searchLimit + "&apikey=" + apiKey + "&hash=" + hash;
  urlType = "Event";
  $("#event-images").empty();
  getAPIData();
}

function getAPIData() {
  console.log(apiURL);
  console.log(urlType);

  $.ajax({
    async: true,
    cache: true,
    url: apiURL,
    method: "GET"
  }).then(function(results) {
    console.log(results);
    $("#results-row").empty();
    for (let i = 0; i < results.data.results.length; i++) {
      let typeWrapper = $("<div>");
      let typeName = $("<p>");
      let typeImage = $("<img>");

      extension = "." + results.data.results[i].thumbnail.extension;

      typeImage.attr("class", "image-container");
      typeImage.attr("src", results.data.results[i].thumbnail.path + extension);

      if (urlType === "Character") {
        typeName.attr("class", "character-name");
        typeName.text(results.data.results[i].name);
        typeImage.attr("character-id", results.data.results[i].id);
        typeWrapper.attr("class", "col-xl-3");
        typeWrapper.append(typeName, typeImage);
        $("#results-row").append(typeWrapper);
      }

      if (urlType === "Comic") {
        typeName.attr("class", "comic-name");
        typeName.text(results.data.results[i].title);
        typeImage.attr("comic-id", results.data.results[i].id);
        typeWrapper.append(typeName, typeImage);
        $("#comic-images").append(typeWrapper);
      }

      if (urlType === "Event") {
        typeName.attr("class", "event-name");
        typeName.text(results.data.results[i].title);
        typeImage.attr("event-id", results.data.results[i].id);
        typeWrapper.append(typeName, typeImage);
        $("#event-images").append(typeWrapper);
      }
    }
  });
}

$("#search-btn-nav").on("click", function(event) {
  event.preventDefault();
  let searchInput = $("#search-box-nav").val();
  console.log($("#search-btn").val());

  //move dom elements on click
  $(".search-box-div").css({
    position: "absolute",
    width: "25%",
    top: "15px",
    right: "0px"
  });

  apiURL =
    marvelURL + "?ts=1&nameStartsWith=" + searchInput + "&limit=" + searchLimit + "&apikey=" + apiKey + "&hash=" + hash;
  urlType = "Character";
  $("#character-images").empty();
  getAPIData();
});

$(document).on("click", ".image-container", function() {
  characterID = $(this).attr("character-id");
  getEventData();
});

function getEventData() {
  apiURL = marvelURL + "/" + characterID + "/events?ts=1&limit=" + searchLimit + "&apikey=" + apiKey + "&hash=" + hash;
  urlType = "Event";
  $("#event-images").empty();
  getAPIData();
}

function getAPIData() {
  console.log(apiURL);
  console.log(urlType);

  $.ajax({
    async: true,
    cache: true,
    url: apiURL,
    method: "GET"
  }).then(function(results) {
    console.log(results);
    $("#results-row").empty();
    for (let i = 0; i < results.data.results.length; i++) {
      let typeWrapper = $("<div>");
      let typeName = $("<p>");
      let typeImage = $("<img>");

      extension = "." + results.data.results[i].thumbnail.extension;

      typeImage.attr("class", "image-container");
      typeImage.attr("src", results.data.results[i].thumbnail.path + extension);

      if (urlType === "Character") {
        typeName.attr("class", "character-name");
        typeName.text(results.data.results[i].name);
        typeImage.attr("character-id", results.data.results[i].id);
        typeWrapper.attr("class", "col-xl-3");
        typeWrapper.append(typeName, typeImage);
        $("#results-row").append(typeWrapper);
      }

      if (urlType === "Comic") {
        typeName.attr("class", "comic-name");
        typeName.text(results.data.results[i].title);
        typeImage.attr("comic-id", results.data.results[i].id);
        typeWrapper.append(typeName, typeImage);
        $("#comic-images").append(typeWrapper);
      }

      if (urlType === "Event") {
        typeName.attr("class", "event-name");
        typeName.text(results.data.results[i].title);
        typeImage.attr("event-id", results.data.results[i].id);
        typeWrapper.append(typeName, typeImage);
        $("#event-images").append(typeWrapper);
      }
    }
  });
}

// Loading Animations

$(document).ajaxStart(function() {
  $("#loading-wrapper").css({
    opacity: "1",
    left: "0"
  });
});

$(document).ajaxComplete(function() {
  setTimeout(function() {
    $("#loading-wrapper").css({
      opacity: "0",
      left: "-100%"
    });

    $("#homepage-div").css({
      display: "none"
    });
    $("#results-div").css({
      display: "block"
    });
  }, 3000);
  $("#search-content-div").css({
    opacity: "1"
  });
});
