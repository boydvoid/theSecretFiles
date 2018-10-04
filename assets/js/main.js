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
  $("#display-images").empty();
  $.ajax({
    url:
      "https://gateway.marvel.com:443/v1/public/characters?ts=1&nameStartsWith=" +
      search +
      "&apikey=b13e13a4abc06dc9ba221862c9e4d24d&hash=d7d8f997d87b284626fc0dd41199055a",
    method: "GET"
  }).then(function(results) {
    console.log(results);

    console.log(results.data.results[0].thumbnail.path);
    for (let i = 0; i < results.data.results.length; i++) {
      extension = results.data.results[i].thumbnail.extension;

      let card = $('<div>');

      let imgTag = $("<img>");
      
      imgTag.attr("class", 'card-img-top');
      imgTag.attr("src", results.data.results[i].thumbnail.path + imageSize + extension);
      $("#display-images").append(imgTag);
    }
  });
});
