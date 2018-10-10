//build the portfolio page

function buildCharacterPage() {
  $("#profile-image").attr("src", sessionStorage.characterImage);
  $("#character-name").text(sessionStorage.characterName);
  $("#character-bio").text(sessionStorage.characterDescription);

  getCharacterDetailData();
  getComicData();
  getEventData();
}

//run after tmdb is done
function actorDropdown() {
  if (characterObject.actor.length > 0) {
    $("#actor-select").empty();
  }
  for (let i = 0; i < characterObject.actor.length; i++) {
    let option = $("<option>");
    option.attr("id", characterObject.actor[i]);
    option.text(characterObject.actor[i]);
    option.val(characterObject.actor[i]);

    $("#actor-select").prepend(option);
    characterObject.actor[i].split(i, 1);
  }
}
