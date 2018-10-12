$(document).on('click', '#register-btn', function () {

  email = $('#email').val();
  password = $('#password').val();
  //register a user
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
    console.log(email + password);
  });
});


//login
$(document).on('click', '#login-btn', function () {
  event.preventDefault();
  $('#myModal').modal('hide');
  email = $('#email').val();
  password = $('#password').val();
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    console.log('logged in')
  });
})


//sign out
$(document).on('click', '#logout-btn', function () {
  firebase.auth().signOut().then(function () {
    // Sign-out successful.
  }).catch(function (error) {
    // An error happened.
  });
});