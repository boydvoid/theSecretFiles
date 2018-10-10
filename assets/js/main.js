$(document).ready(function () {
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
		function () {
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

let searchInput;
let characterID;

let characterFirstAppreance;
let firstIssue;
let characterCreators = [];

// API Calls

$("#search-btn").on("click", function (event) {

	event.preventDefault();
	searchInput = $("#search-box").val();
	getCharacterData();
	$("#results-div").css({
		display: "block"
	});
	//move dom elements on click
	$(".search-box-div").css({
		position: "absolute",
		width: "25%",
		top: "15px",
		right: "0px"

	});
});


$("#search-btn-nav").on("click", function (event) {

	event.preventDefault();
	searchInput = $("#search-box-nav").val();
	getCharacterData();

	//move dom elements on click
	$(".search-box-div").css({
		position: "absolute",
		width: "25%",
		top: "15px",
		right: "0px"
	});
});

// Loading Animations

$(document).ajaxStart(function () {
	$("#loading-wrapper").css({
		left: "0"
	});
});

$(document).ajaxComplete(function () {
	setTimeout(function () {
		$("#loading-wrapper").css({
			left: "-100%"
		});
		$("#homepage-div").css({
			display: "none"
		});

	}, 3000);
	$("#search-content-div").css({
		opacity: "1"
	});

});


//--------------------------------
// Marvel API Calls
//--------------------------------

$(document).on("click", ".image-container", function () {

	characterID = $(this).attr("character-id");
	getComicData();
	getEventData();
	getCharacterDetailData();
	$('#profile-container').css({
		display: "block"
	})
	$('#results-div').css({
		display: "none"
	})
});

function getCharacterData() {

	$("#results-row").empty();

	$.ajax({

		cache: true,
		url: marvelURL + "?ts=1&nameStartsWith=" + searchInput + "&limit=" + searchLimit + "&apikey=" + apiKey + "&hash=" + hash,
		method: "GET"

	}).then(function (character) {

		console.log(character);

		for (let i = 0; i < character.data.results.length; i++) {

			let typeWrapper = $("<div>");
			let typeName = $("<p>");
			let typeImage = $("<img>");

			extension = "." + character.data.results[i].thumbnail.extension;

			typeImage.attr("class", "image-container");
			typeImage.attr("src", character.data.results[i].thumbnail.path + extension);

			typeName.attr("class", "character-name");
			typeName.text(character.data.results[i].name);
			typeImage.attr("character-id", character.data.results[i].id);
			typeWrapper.append(typeName, typeImage);
			$("#results-row").append(typeWrapper);

		}
	})
}

function getComicData() {

	$.ajax({

		cache: true,
		url: marvelURL + "/" + characterID + "/comics?orderBy=onsaleDate&formatType=comic&noVariants=false&hasDigitalIssue=true&limit=" + searchLimit + "&apikey=" + apiKey + "&hash=" + hash,
		method: "GET"

	}).then(function (comic) {

		console.log("Comic");
		console.log(comic);

		for (let i = 0; i < comic.data.results.length; i++) {

			let typeWrapper = $("<div>");
			let typeName = $("<p>");
			let typeImage = $("<img>");

			extension = "." + comic.data.results[i].thumbnail.extension;

			typeImage.attr("class", "image-container");
			typeImage.attr("src", comic.data.results[i].thumbnail.path + extension);

			typeName.attr("class", "comic-name");
			typeName.text(comic.data.results[i].title);
			typeImage.attr("comic-id", comic.data.results[i].id);
			typeWrapper.append(typeName, typeImage);
			$("#comic-images").append(typeWrapper);

		}
	})
}

function getEventData() {

	$.ajax({

		cache: true,
		url: marvelURL + "/" + characterID + "/events?ts=1&limit=" + searchLimit + "&apikey=" + apiKey + "&hash=" + hash,
		method: "GET"

	}).then(function (event) {

		console.log(event);

		for (let i = 0; i < event.data.results.length; i++) {

			let typeWrapper = $("<div>");
			let typeName = $("<p>");
			let typeImage = $("<img>");

			extension = "." + event.data.results[i].thumbnail.extension;

			typeImage.attr("class", "image-container");
			typeImage.attr("src", event.data.results[i].thumbnail.path + extension);

			typeName.attr("class", "event-name");
			typeName.text(event.data.results[i].title);
			typeImage.attr("event-id", event.data.results[i].id);
			typeWrapper.append(typeName, typeImage);
			$("#event-images").append(typeWrapper);

		}
	})
}

function getCharacterDetailData() {

	$.ajax({
		cache: true,
		url: marvelURL + "/" + characterID + "/comics?ts=1&orderBy=onsaleDate&limit=" + searchLimit + "&apikey=" + apiKey + "&hash=" + hash,
		method: "GET"

	}).then(function (characterDetail) {

		console.log(characterDetail);

		for (let i = 0; i < characterDetail.data.results.length; i++) {

			if ((characterDetail.data.results[i].dates[0].date).indexOf("-0001")) {

				if (characterFirstAppreance === undefined) {

					characterFirstAppreance = characterDetail.data.results[i].dates[0].date;
					characterFirstAppreance = characterFirstAppreance.substring(0, 4);
					console.log(characterFirstAppreance);

					if (firstIssue === undefined) {

						firstIssue = i;

					}

				}

				for (let n = 0; n < characterDetail.data.results[firstIssue].creators.items.length; n++) {

					if (!characterCreators.includes(characterDetail.data.results[firstIssue].creators.items[n].name)) {

						characterCreators.push(characterDetail.data.results[firstIssue].creators.items[n].name);
						console.log(characterCreators);

					}

				}
			}
		}

	})
}