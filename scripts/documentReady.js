define(["shuffle"], function (a) {
  if (window.location.href.includes("index.html")) {
    console.log("home");
    $(document).ready(function () {
      //clear the sessions storage on the homepage
      sessionStorage.clear();

      let videos = [
        "antman.mp4",
        "Deadpool.mp4",
        "hulk.mp4",
        "panther.mp4",
        "strange.mp4",
        "scarlett.mp4",
        "spiderman.mp4",
        "thanos.mp4"
      ];

      let displayArray = a.shuffle(videos);
      let i = 0;

      $("#myVideo").attr("src", "./video/" + displayArray[i]);

      //finsihed
      document.getElementById("myVideo").addEventListener(
        "ended",
        function () {
          if (i === displayArray.length - 1) {
            console.log("reset");

            i = 0;
            let displayArray = a.shuffle(videos);
            $("#myVideo").attr("src", "./video/" + displayArray[i]);
          } else {
            i++;
            $("#myVideo").attr("src", "./video/" + displayArray[i]);
          }
        },
        false
      );
    });
  } else if (window.location.href.includes("results.html")) {
    $(document).ready(function () {

      //call ajax for search results
      $("#slideshow > div:gt(0)").hide();

      setInterval(function () {
        $('#slideshow > div:first')
          .fadeOut(1000)
          .next()
          .fadeIn(1000)
          .end()
          .appendTo('#slideshow');
      }, 3000);
    });
    //from marvel.js get marvel character data
    getCharacterData();
  } else if (window.location.href.includes("portfolio.html")) {
    console.log("portfolio");
    $("#slideshow > div:gt(0)").hide();

    setInterval(function () {
      $('#slideshow > div:first')
        .fadeOut(1000)
        .next()
        .fadeIn(1000)
        .end()
        .appendTo('#slideshow');
    }, 3000);
    //from marvel.js build the character page
    buildCharacterPage();
    getTMDBList();
  }
});