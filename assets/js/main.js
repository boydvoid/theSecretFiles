//search bar on focus
$("#search-box").focus(function () {
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
$("#search-box").focusout(function () {
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

// Global Variables
let hash = "d7d8f997d87b284626fc0dd41199055a";
let apiKey = "b13e13a4abc06dc9ba221862c9e4d24d";
let marvelURL = "https://gateway.marvel.com:443/v1/public/characters";
let searchLimit = 50;
let extension;

let characterID;
let apiURL;
let urlType;

let comicsURL = marvelURL + characterID + "/comics?formatType=comic&noVariants=true&hasDigitalIssue=true&apikey=" + apiKey;

// API Calls

$("#search-box").change(function () {

	let searchInput = $("#search-box").val();

	apiURL = marvelURL + "?ts=1&nameStartsWith=" + searchInput + "&limit=" + searchLimit + "&apikey=" + apiKey + "&hash=" + hash;
	urlType = "Character";
	$("#character-images").empty();
	getAPIData();

});

$(document).on("click", ".image-container", function () {

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

	}).then(function (results) {

		console.log(results);

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
				typeWrapper.append(typeName, typeImage);
				$("#character-images").append(typeWrapper);

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
	})
}

// Loading Animations

$(document).ajaxStart(function(){

	if (urlType === "Character") {

		$("#character-images").text("Loading");

	}

	if (urlType === "Comic") {

		$("#comic-images").text("Loading");

	}

	if (urlType === "Event") {

		$("#event-images").text("Loading");

	}

});

$(document).ajaxComplete(function(){

	if (urlType === "Character") {

		$("#character-images").text("");

	}

	if (urlType === "Comic") {

		$("#comic-images").text("");

	}

	if (urlType === "Event") {

		$("#event-images").text("");

	}

});


