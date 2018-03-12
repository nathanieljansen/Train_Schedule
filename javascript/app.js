var config = {
  apiKey: "AIzaSyCaKdTcPkr96n9jc0k9awI23KdXr60L2hs",
  authDomain: "train-schedule-30eeb.firebaseapp.com",
  databaseURL: "https://train-schedule-30eeb.firebaseio.com",
  projectId: "train-schedule-30eeb",
  storageBucket: "",
  messagingSenderId: "1070050230140"
};
firebase.initializeApp(config);

var database = firebase.database();

var trainName = "";
var destination = "";
var trainTime = "";
var frequency = "";

$("#add-train").on("click", function () {
  alert("I was clicked")
  event.preventDefault();
  trainName = $("#train-input").val().trim();
  destination = $("#destination-input").val().trim();
  trainTime = $("#time-input").val().trim();
  frequency = $("#frequency-input").val().trim();
  database.ref().set({
    trainName: trainName,
    destination: destination,
    trainTime: trainTime,
    frequency: frequency,

  });
});

database.ref().on("value", function (snapshot) {
  console.log(snapshot.val());
  console.log(snapshot.val().trainName);
  console.log(snapshot.val().destination);
  console.log(snapshot.val().trainTime);
  console.log(snapshot.val().frequency);
});
