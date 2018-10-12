// Marvel API
let hash = "d7d8f997d87b284626fc0dd41199055a";
let apiKey = "b13e13a4abc06dc9ba221862c9e4d24d";
let marvelURL = "https://gateway.marvel.com:443/v1/public/characters";
let searchLimit = 50;
let extension;

//get the search value from session storage
let searchInput = sessionStorage.searchVal;
let characterID;
let characterName;
let characterImage;
let banner;
let characterDescription;
let characterFirstAppearance;
let firstIssue;
let characterCreators = [];
let selectedCharacter = sessionStorage.characterName;
let splitNames;
let tmdbAPIKey = "3433c648bbd9030f976ba13594b4aacb";
let tmdbURL = "https://api.themoviedb.org/3/";
let marvelMovieList = [];
let marvelTVList = [];
let characterObject = {
  character: "",
  actor: []
};
//actor
let actorID;
let selectedPerson = sessionStorage.actorName;
let actorImgPoster;
let imageUrl = "https://image.tmdb.org/t/p/w600_and_h900_bestv2"
let birthday;
let bio;
let profileImage;
let placeOfBirth;
//firebase 

var config = {
  apiKey: "AIzaSyBDM9ekqHRZwj_ymA8byZo_3gKqQ6EOSDE",
  authDomain: "vaderconfetti.firebaseapp.com",
  databaseURL: "https://vaderconfetti.firebaseio.com",
  projectId: "vaderconfetti",
  storageBucket: "vaderconfetti.appspot.com",
  messagingSenderId: "653966580632"
};
firebase.initializeApp(config);
let database = firebase.database();
let email;
let password;
var user = firebase.auth().currentUser;