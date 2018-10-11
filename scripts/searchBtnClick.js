define([], function() {
  //Homepage search button click
  $("#search-btn").on("click", function(event) {
    event.preventDefault();
    searchInput = $("#search-box").val();
    sessionStorage.searchVal = searchInput;

    window.location.href = "results.html";
  });

  //navbar search button click
  $("#search-btn-nav").on("click", function(event) {
    event.preventDefault();
    searchInput = $("#search-box-nav").val();
    sessionStorage.searchVal = searchInput;
    window.location.href = "results.html";
  });
});
