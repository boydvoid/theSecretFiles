//search bar on focus
$("#search-box").focus(function() {
  //search box css
  //description text
  $("#search-box").css({
    left: "37vh",
    top: "-7vh"
  });
  //search-btn
  $("#search-btn").css({
    left: "37vh",
    top: "-7vh"
  });
  // THE SECRET FILES TITLE
  $("#files-text").css({
    left: "77vh",
    top: "-8.5vh"
  });
  $("#secret-text").css({
    left: "35vh"
  });

  //description text
  $("#description").css({
    left: "37vh",
    top: "-7vh"
  });
});

//search bar lose focus
$("#search-box").focusout(function() {
  //search box css
  $("#search-box").css({
    left: "0",
    top: "0"
  });
  //search box css
  $("#search-btn").css({
    left: "-3px",
    top: "-5px"
  });
  $("#files-text").css({
    left: "0",
    top: "0"
  });
  $("#secret-text").css({
    left: "0"
  });

  //description text
  $("#description").css({
    left: "0",
    top: "0"
  });
});
