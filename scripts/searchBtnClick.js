define([], function() {
  $("#search-btn").on("click", function(event) {
    console.log("teset");
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

  $("#search-btn-nav").on("click", function(event) {
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
});
