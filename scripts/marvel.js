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