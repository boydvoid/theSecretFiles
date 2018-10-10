define(["shuffle"], function(a) {
  if (window.location.href.includes("index.html")) {
    console.log("home");
    $(document).ready(function() {
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
        function() {
          if (i >= displayArray.length) {
            console.log("reset");

            i = 0;
            displayArray = shuffle(videos);
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
    //call ajax for search results

    //get marvel character data
    getCharacterData();
  } else if (window.location.href.includes("portfolio.html")) {
    console.log("portfolio");
  }
});
