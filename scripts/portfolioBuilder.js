//build the portfolio page

function buildCharacterPage() {
  $("#profile-image").attr("src", sessionStorage.characterImage);
  if (sessionStorage.characterName.match(/[()]+/) !== null) {
    //get the two names
    let namesArray = sessionStorage.characterName.split(/[()]+/).filter(function (e) {
      return e;
    });

    sessionStorage.characterName = namesArray[0];
    sessionStorage.alias = namesArray[1];
    $("#character-name").text(sessionStorage.characterName);
    $("#alias").text(sessionStorage.alias);

  } else {

    $("#character-name").text(sessionStorage.characterName);
  }
  if (sessionStorage.characterDescription !== "") {

    $("#character-bio").text(sessionStorage.characterDescription);
  }

  getCharacterDetailData();

}

//run after tmdb is done
function actorDropdown() {
  if (characterObject.actor.length > 0) {
    $("#actor-select").empty();
  }
  for (let i = 0; i < characterObject.actor.length; i++) {
    let option = $("<p>");
    option.attr("id", characterObject.actor[i]);
    option.attr('class', "actor red-link");
    option.text(characterObject.actor[i]);
    option.val(characterObject.actor[i]);

    $("#actor-select").append(option);
  }
}

//build the actor page 
function buildActorPage() {

  $("#actor-character-name").text(sessionStorage.characterName);
  $("#actor-name").text(sessionStorage.actorName);
  $("#birthday").text(birthday);
  $("#place-of-birth").text(placeOfBirth);
  $("#actor-bio").text(bio);
  $("#actor-profile-image").css('background-image', 'url(' + profileImage + ')');
  $("#profile-banner").css('background-image', 'url(' + actorImgPoster + ')');

}