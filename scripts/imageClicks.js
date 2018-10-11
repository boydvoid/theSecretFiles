//onclick for the images
$(document).on("click", ".image-container", function() {
  characterID = $(this).attr("character-id");
  characterName = $(this).attr("character-name");
  characterImage = $(this).attr("src");
  characterDescription = $(this).attr("character-info");

  sessionStorage.characterID = characterID;
  sessionStorage.characterName = characterName;
  sessionStorage.characterImage = characterImage;
  sessionStorage.characterDescription = characterDescription;

  //load the portfolio page
  window.location.href = "portfolio.html";
});
