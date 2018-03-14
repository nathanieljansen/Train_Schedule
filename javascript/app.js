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

$("#add-train").on("click", function () {
  event.preventDefault();
  alert("Train Added")
  var trainName = $("#train-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var trainTime = $("#time-input").val().trim();
  var frequency = $("#frequency-input").val().trim();
  $(".form-control").val("");
  var newTrain = {
    trainName: trainName,
    destination: destination,
    trainTime: trainTime,
    frequency: frequency
  };

  database.ref().push({
    trainName: trainName,
    destination: destination,
    trainTime: trainTime,
    frequency: frequency,
  });
  



  database.ref().push(newTrain);

  console.log(newTrain.trainName);
  console.log(newTrain.destination);
  console.log(newTrain.trainTime);
  console.log(newTrain.frequency);
  

  var row = $("<tr>");
  row.append($("<td>" + trainName + "</td>"))
  row.append($("<td>" + destination + "</td>"))
  row.append($("<td>" + trainTime + "<td>"))
  row.append($("<td>" + frequency +"</td>"))
  // row.append($("<td>Text-1</td>"))
  $(".table").append(row);
});
