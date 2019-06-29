console.log("TESTING")
// Firebase goes here 
var firebaseConfig = {
    apiKey: "AIzaSyDJy3HphxtTCgCIiITgzZQmbVdjAcvU0HM",
    authDomain: "train-schedule-5caef.firebaseapp.com",
    databaseURL: "https://train-schedule-5caef.firebaseio.com",
    projectId: "train-schedule-5caef",
    storageBucket: "train-schedule-5caef.appspot.com",
    messagingSenderId: "773603576695",
    appId: "1:773603576695:web:0d2c12b651013d4c"
  };
  
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();




// The button for adding the trains 
$("#add-train-btn").on("click", function(event){
    event.preventDefault();
 
//  Create the variables here

    

// Grab the user's input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainTime = $("#time-input").val().trim();
  var trainFrequency = $("#frequency-input").val().trim();

  var newTrain ={
    name: trainName,
    destination: trainDestination,
    time: trainTime,
    frequency : trainFrequency,
}
 database.ref().push(newTrain);

 console.log(newTrain.name);
 console.log(newTrain.destination);
 console.log(newTrain.time);
 console.log(newTrain.frequency);

//  alert("Train Name has been added to the schedule!")

// Empty the boxes 
$("#train-name-input").val("");
$("#destination-input").val("");
$("#time-input").val("");
$("#frequency-input").val("");

});

// Store database info, create event on firebase that will add the trains and a row on table
database.ref().on("child_added", function (childSnapshot){
var trainName = childSnapshot.val().name;
var trainDestination = childSnapshot.val().destination;
var trainTime = childSnapshot.val().time;
var trainFrequency = childSnapshot.val().frequency; 

// Console log the train info
// console.log(trainName);
// console.log(trainDestination);
// console.log(trainTime);
// console.log(trainFrequency);

// Add moment js 
var currentDate = moment().format ('HH:mm');
console.log(currentDate)

var table= $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainTime),
    $("<td>").text(trainFrequency),
    $("<td>").text(currentDate),
);
$("#train-table > tbody").append(table);
});
