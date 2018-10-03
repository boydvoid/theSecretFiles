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

//api testing

$("#search-box").change(function() {
  let search = $("#search-box").val();
  let imageSize = "/portrait_medium.";
  let extension;
  let imgTag = $("<img>");
  $.ajax({
    url:
      "https://gateway.marvel.com:443/v1/public/characters?ts=1&name=" +
      search +
      "&apikey=b13e13a4abc06dc9ba221862c9e4d24d&hash=d7d8f997d87b284626fc0dd41199055a",
    method: "GET"
  }).then(function(results) {
    console.log(results);

    console.log(results.data.results[0].thumbnail.path);
    extension = results.data.results[0].thumbnail.extension;

    imgTag.attr("src", results.data.results[0].thumbnail.path + imageSize + extension);
    $("#display-images").append(imgTag);
  });
});
