define([], function () {
  //Homepage search button click
  $("#search-btn").on("click", function (event) {
    event.preventDefault();
    searchInput = $("#search-box").val();
    sessionStorage.searchVal = searchInput;

    window.location.href = "results.html";
  });

  //navbar search button click
  $("#search-btn-nav").on("click", function (event) {
    event.preventDefault();
    searchInput = $("#search-box-nav").val();
    sessionStorage.searchVal = searchInput;
    window.location.href = "results.html";
  });


  //actor name click
  $(document).on('click', '#actor-character-name', function (e) {
    sessionStorage.searchVal = $(e.target).text();
    window.location.href = "results.html"
  })
  //actor name click
  $(document).on('click', '.actor', function () {
    sessionStorage.actorName = this.id;
    window.location.href = "actor.html"
  })
  //onclick for the images
  $(document).on("click", ".image-container", function () {
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
});


//fav-button 
$(document).on("click", "#fav-btn", function () {
  if (user != null) {
    database.ref(user.id).append({
      characterName: sessionStorage.characterName,
      characterImage: sessionStorage.characterImage,
      characterID: sessionStorage.characterID,
      characterDescription: sessionStorage.characterDescription
    });
  }
})