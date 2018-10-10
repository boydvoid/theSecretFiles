$(document).ajaxComplete(function() {
  setTimeout(function() {
    $("#loading-wrapper").css({
      left: "-100%"
    });
    $("#homepage-div").css({
      display: "none"
    });
  }, 3000);
  $("#search-content-div").css({
    opacity: "1"
  });
});
