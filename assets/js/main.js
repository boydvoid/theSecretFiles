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

  //search content div

  $("#search-content-div").css({
    right: "0vh"
  });
});

//search bar lose focus
$("#search-box").focusout(function() {
  console.log($("#search-box").val());
  if ($("#search-box").val() === "") {
    //search box css
    $("#search-box").css({
      top: "0"
    });

    //THE SECRET FILES TITLE
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

    //search content
    $("#search-content-div").css({
      right: "-200vh"
    });
  }
});
