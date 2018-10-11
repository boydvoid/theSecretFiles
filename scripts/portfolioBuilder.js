//build the portfolio page

function buildCharacterPage() {
  $("#profile-image").attr("src", sessionStorage.characterImage);
  $("#character-name").text(sessionStorage.characterName);
  $("#character-bio").text(sessionStorage.characterDescription);

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
    option.attr('class', "actor");
    option.text(characterObject.actor[i]);
    option.val(characterObject.actor[i]);

    $(".info-panel").append(option);
  }
}

//build the actor page 
function buildActorPage() {

  $("#character-name").text(sessionStorage.characterName);
  $("#actor-name").text(sessionStorage.actorName);
  $("#birthday").text(birthday);
  $("#place-of-birth").text(placeOfBirth);
  $("#actor-bio").text(bio);
  $("#actor-profile-image").css('background-image', 'url(' + profileImage + ')');
  $("#profile-banner").css('background-image', 'url(' + actorImgPoster + ')');

  //get the actor info from tmdb

}