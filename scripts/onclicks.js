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