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

      //check for firebase user
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          // User is signed in.
          $('#username').text(user.email);
          console.log('user')
          $('#logout-btn').css({
            display: "block"
          })
          $('#modal-open').css({
            display: "none"
          })
        } else {
          // No user is signed in.
          console.log('no user');
          $('#logout-btn').css({
            display: "none"
          })
          $('#modal-open').css({
            display: "block"
          })
        }
      });
    });
  } else if (window.location.href.includes("results.html")) {
    $(document).ready(function () {

      //check for firebase user
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          // User is signed in.
          $('#username').text(user.email);
          $('#username').css({
            display: "block"
          })
          $('#logout-btn').css({
            display: "block"
          })
          $('#modal-open').css({
            display: "none"
          })
        } else {
          // No user is signed in.
          console.log('no user');

          $('#logout-btn').css({
            display: "none"
          })
          $('#modal-open').css({
            display: "block"
          })
        }
      });

    });
    //from marvel.js get marvel character data
    getCharacterData();
  } else if (window.location.href.includes("portfolio.html")) {
    console.log("portfolio");
    $(document).ready(function () {

      //check for firebase user
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          // User is signed in.
          $('#username').text(user.email);
          $('#username').css({
            display: "block"
          })
          $('#logout-btn').css({
            display: "block"
          })
          $('#modal-open').css({
            display: "none"
          })
        } else {
          // No user is signed in.
          console.log('no user');
          $('#username').css({
            display: "none"
          })
          $('#logout-btn').css({
            display: "none"
          })
          $('#modal-open').css({
            display: "block"
          })
        }
      });

    });

    //from marvel.js build the character page
    buildCharacterPage();
    getTMDBList();
  } else if (window.location.href.includes("actor.html")) {
    getActorId();
  }
});