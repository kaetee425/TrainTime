
// Nice job putting everything in a document.ready block 👌

$(document).ready(function(){

   var config = {
      apiKey: "AIzaSyC7kA1Wk8dXkk6n1c90r5mpB3iKrDrJhXM",
      authDomain: "traintime-fef74.firebaseapp.com",
      databaseURL: "https://traintime-fef74.firebaseio.com",
      projectId: "traintime-fef74",
      storageBucket: "",
      messagingSenderId: "85719308481"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    $("#addTrain").on("click", function(event){
      event.preventDefault();

      var trainName = $("#trainName").val().trim();
      var destination = $("#destination").val().trim();
      var firstTime = $("#firstTime").val().trim();
      var frequency = $("#frequency").val().trim();

      var newTrain = {
        name: trainName,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency,
      };

      database.ref().push(newTrain); 

      // Generally best practice to remove console.log's from production code.
      // console.log(newTrain.name);
      // console.log(newTrain.destination);
      // console.log(newTrain.firstTime);
      // console.log(newTrain.frequency);

      alert("added a new train to the K-Station!");

      $("#trainName").val("");
      $("#destination").val("");
      $("#firstTime").val("");
      $("#frequency").val("");

    }); // submit basline

  database.ref().on("child_added", function(childSnapshot, prevChildKey){
    // console.log("show me")
    // console.log(childSnapshot.val())

    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var firstTime = childSnapshot.val().firstTime;
    var frequency = childSnapshot.val().frequency;

    // console.log(trainName);
    // console.log(destination);
    // console.log(firstTime);
    // console.log(frequency);

    // var minAway = 
    // var nextArr = 

    var firstConverted = moment(firstTime, "HH:mm").subtract(1, "years")
    // console.log(firstConverted)

    var difference = moment().diff(moment(firstConverted), "minutes");
    // console.log("First to Now in Minutes: " + difference)

    var remainder = difference % frequency;
    // console.log("Remainder" + remainder)

    var timeUntil = frequency - remainder;
    // console.log("Minutes Wait Time: " + timeUntil)

    // You were suuuper close on this! But you actually wanted to add the `timeUntil`
    // to the current time to find out when the next train arrives 🤓
    var nextTrain = moment().add(timeUntil, 'm').format("HH:mm");
    // console.log("NEXTTTT: " + nextTrain)

    $(".table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextTrain + "</td><td>" + timeUntil + "</td></tr>");

  });  


}); //baseline
