define(["shuffle"], function(a) {
  $(document).ready(function() {
    // load the homepage html

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
});
