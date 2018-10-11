$(document).ajaxComplete(function(event) {
  setTimeout(function() {
    $("#loading-wrapper").css({
      left: "-100%"
    });
  }, 3000);
});
