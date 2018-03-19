


$(function () {

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
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // function validateForm() {
  //   var isValid = true;
  //   $('.form-control').each(function () {
  //     if ($(this).val() === '')
  //       isValid = false;
  //   });
  //   return isValid;
  // }


  $("#add-train").on("click", function () {
    event.preventDefault();
    // validateForm();
    trainName = $("#train-input").val().trim();
    destination = $("#destination-input").val().trim();
    trainTime = $("#time-input").val().trim();
    frequency = $("#frequency-input").val().trim();


    var newTrain = {
      trainName: trainName,
      destination: destination,
      trainTime: trainTime,
      frequency: frequency,
    };

    database.ref().push(newTrain)

    alert("Train Added");
    $(".form-control").val("");
  });

  database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    console.log(childSnapshot);
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().trainTime;
    var frequency = childSnapshot.val().frequency;

    var firstTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


    var row = $("<tr>");
    row.append($("<td>" + trainName + "</td>"))
    row.append($("<td>" + destination + "</td>"))
    row.append($("<td>" + frequency + "</td>"))
    row.append($("<td>" + moment(nextTrain).format("hh:mm") + "</td>"))
    row.append($("<td>" + tMinutesTillTrain + "<td>"))
    $(".table").append(row);
  });

})