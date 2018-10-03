//search bar on focus
$("#search-box").focus(function() {
  //search box css
  //description text
  $("#search-box").css({
    top: "-28vh"
  });

  // THE SECRET FILES TITLE
  $("#files-text").css({
    left: "42vh",
    top: "-29.5vh"
  });
  $("#secret-text").css({
    top: "-21vh"
  });

  //description text
  $("#description").css({
    top: "-30vh"
  });
});

//search bar lose focus
$("#search-box").focusout(function() {
  //search box css
  $("#search-box").css({
    top: "0"
  });

  $("#files-text").css({
    left: "0",
    top: "0"
  });
  $("#secret-text").css({
    top: "0"
  });

  //description text
  $("#description").css({
    top: "0"
  });
});
