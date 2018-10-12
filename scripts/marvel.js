//--------------------------------
// Marvel API Calls
//------------------------------

// Get data for Results page.
function getCharacterData() {

	// Empty #results-row to remove previous search.
	$("#results-row").empty();

	$.ajax({

		cache: true,
		url: marvelURL + "?ts=1&nameStartsWith=" + searchInput + "&limit=" + searchLimit + "&apikey=" + apiKey + "&hash=" + hash,
		method: "GET",

		success: function () {
			setTimeout(function () {

				$("#loading-wrapper").css({
					left: "-100%"
				});

			}, 3000);
		}

	}).then(function (character) {

		console.log(character);

		// Build results listing.
		for (let i = 0; i < character.data.results.length; i++) {

			let typeWrapper = $("<div>");
			let typeName = $("<p>");
			let typeImage = $("<img>");

			extension = "." + character.data.results[i].thumbnail.extension;

			typeImage.attr("class", "image-container");
			typeImage.attr("src", character.data.results[i].thumbnail.path + extension);
			typeImage.attr("character-name", character.data.results[i].name);
			typeImage.attr("character-info", character.data.results[i].description);

			typeName.attr("class", "character-name");
			typeName.text(character.data.results[i].name);
			typeImage.attr("character-id", character.data.results[i].id);
			typeWrapper.append(typeImage, typeName);
			$("#results-row").append(typeWrapper);

		}
	});
}

// Get data for Portfolio page.
function getCharacterDetailData() {

	$.ajax({

		cache: true,
		url: marvelURL + "/" + sessionStorage.characterID + "/comics?ts=1&orderBy=onsaleDate&limit=" + searchLimit + "&apikey=" + apiKey + "&hash=" + hash,
		method: "GET",
		global: false

	}).then(function (characterDetail) {

		console.log("Getting Character Detail Data");
		console.log(characterDetail);

		$('#loading-text').text("Getting Character Details");

		// Because there isn't a "First Appearance" property, we'll search through our comic data starting with the oldest comics, filter
		// out any entry with an invalid date and return the first valid date and use that for First Appearance.
		for (let i = 0; i < characterDetail.data.results.length; i++) {

			if (characterDetail.data.results[i].dates[0].date.indexOf("-0001")) {

				if (characterFirstAppearance === undefined) {

					characterFirstAppearance = characterDetail.data.results[i].dates[0].date;
					characterFirstAppearance = characterFirstAppearance.substring(0, 4);

					$("#first-appearance").text(characterFirstAppearance);

					console.log(characterFirstAppearance);

					// Assign the index number we're using for First Appearance for use later.
					if (firstIssue === undefined) {

						firstIssue = i;

					}
				}

				// Using firstIssue, pull each creator and push their names to our characterCreators array.
				for (let n = 0; n < characterDetail.data.results[firstIssue].creators.items.length; n++) {

					if (!characterCreators.includes(characterDetail.data.results[firstIssue].creators.items[n].name)) {

						characterCreators.push(characterDetail.data.results[firstIssue].creators.items[n].name);

						$("#creators").text(characterCreators);
						console.log(characterCreators);

					}
				}
			}
		}

		// One done call getComicData to populate the characters comics.
		getComicData();

	});
}

// Get comic data for Portfolio page.
function getComicData() {

	$.ajax({

		cache: true,
		url: marvelURL + "/" + sessionStorage.characterID + "/comics?ts=1&orderBy=onsaleDate&formatType=comic&noVariants=false&hasDigitalIssue=true&limit=" + searchLimit + "&apikey=" + apiKey + "&hash=" + hash,
		method: "GET",
		global: false

	}).then(function (comic) {

		console.log("Getting Character Comic Data");
		console.log(comic);

		$('#loading-text').text("Getting Comics Data. This might take a minute.");

		// Check to make sure the associated character has comics attached to them, if they don't show a placeholder image.
		if (comic.data.results[0] === undefined) {

			banner = "assets/images/placeholder.jpg"

		} else {

			banner = comic.data.results[0].thumbnail.path + "." + comic.data.results[0].thumbnail.extension;

		}

		for (let i = 0; i < comic.data.results.length; i++) {

			// Check to see if the character has any comics associated with them.
			if (comic.data.results.length > 0) {

				$("#comics-missing").empty();

				let typeWrapper = $("<div>");
				let typeName = $("<p>");
				let typeImage = $("<img>");

				extension = "." + comic.data.results[i].thumbnail.extension;

				typeWrapper.attr("class", "comic-wrapper");
				typeImage.attr("class", "comic-container");
				typeImage.attr("src", comic.data.results[i].thumbnail.path + extension);

				typeName.attr("class", "comic-name");
				typeName.text(comic.data.results[i].title);
				typeImage.attr("comic-id", comic.data.results[i].id);
				typeWrapper.append(typeImage, typeName);

				$("#comic-images").append(typeWrapper);

			}
		}

		// One done call getEventData to populate the characters events.
		getEventData();

		$("#banner-info").css({

			'background-image': 'url(' + banner + ')',
			"position": "relative",
			"height": "100%",
			"align-items": "center",
			"text-align": "center",
			"background-size": "cover",
			"background-position": "center center"

		});
	});
}

// Get event data for Portfolio page.
function getEventData() {

	$.ajax({

		cache: true,
		url: marvelURL + "/" + sessionStorage.characterID + "/events?ts=1&limit=" + searchLimit + "&apikey=" + apiKey + "&hash=" + hash,
		method: "GET",
		start: function () {

			console.log('events started');

		},
		success: function () {
			setTimeout(function () {

				$("#loading-wrapper").css({
					left: "-100%"

				});
			}, 3000);
		}

	}).then(function (event) {

		console.log("Getting Character Event Data");
		console.log(event);

		$('#loading-text').text("Getting Event Data. This might take a minute.");

		// Check to see if the character has any events associated with them.
		if (event.data.results.length > 0) {

			for (let i = 0; i < event.data.results.length; i++) {

				$("#events-missing").empty();

				let typeWrapper = $("<div>");
				let typeName = $("<p>");
				let typeImage = $("<img>");

				extension = "." + event.data.results[i].thumbnail.extension;

				typeWrapper.attr("class", "event-wrapper");
				typeImage.attr("class", "event-container");
				typeImage.attr("src", event.data.results[i].thumbnail.path + extension);

				typeName.attr("class", "event-name");
				typeName.text(event.data.results[i].title);
				typeImage.attr("event-id", event.data.results[i].id);
				typeWrapper.append(typeImage, typeName);
				$("#event-images").append(typeWrapper);

			}
		}
	});
}