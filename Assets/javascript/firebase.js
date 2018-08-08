// Initialize Firebase
    // This is the code we copied and pasted from our app page
    var config = {
        apiKey: "AIzaSyDQVjGqrClX0c5QtQdVoCN12X2hZqTgcoU",
        authDomain: "mutt-match-b7c06.firebaseapp.com",
        databaseURL: "https://mutt-match-b7c06.firebaseio.com",
        projectId: "mutt-match-b7c06",
        storageBucket: "mutt-match-b7c06.appspot.com",
        messagingSenderId: "990425150767"
      };
      firebase.initializeApp(config);

          // Get a reference to the database service
    var database = firebase.database();

    // Setting initial value of our click counter variable to 0
    var clickCounter = 0;

    // FUNCTIONS + EVENTS
    // --------------------------------------------------------------------------------

      // database.ref().on("child_added", function(snapshot){
      //   console.log(snapshot.val());
      //   console.log(snapshot.key);
      // })

    // On Click of Button
    // $(".btn btn-light").on("click", function() {

      $(document).on("click", "i", function(){
        var initialVal = 1;
        var dogId = $(this).attr("data-id");
        database.ref().once("value", function(snap){
          if (snap.hasChild(dogId)){
            var thisChild = snap.child(dogId).val();
            thisChild++;
            database.ref().update({
              [dogId]: thisChild
            })
          } 
          else {
            database.ref().update({
            [dogId]: initialVal
            })
          }
        })
            
            // else {
            //   database.ref().update({
            //   [dogId]: 0
            //   })
            // }
            
          })
      // Add to clickCounter
      // clickCounter++;

      //  Store Click Data to Firebase in a JSON property called clickCount
      // Note how we are using the Firebase .set() method
      // database.ref().update({
      //   [dogId]: clickCounter
      // });


    // MAIN PROCESS + INITIAL CODE
    // --------------------------------------------------------------------------------

    // Using .on("value", function(snapshot)) syntax will retrieve the data
    // from the database (both initially and every time something changes)
    // This will then store the data inside the variable "snapshot". We could rename "snapshot" to anything.
    // database.ref().on("value", function(snapshot) {

    //   // Then we console.log the value of snapshot
    //   console.log(snapshot.val());

    //   // Then we change the html associated with the number.
    //   // $("#click-value").text(snapshot.val().clickCount);

    //   // Then update the clickCounter variable with data from the database.
    //   clickCounter = snapshot.val().clickCount;

    //   // If there is an error that Firebase runs into -- it will be stored in the "errorObject"
    //   // Again we could have named errorObject anything we wanted.
    // }, function(errorObject) {

    //   // In case of error this will print the error
    //   console.log("The read failed: " + errorObject.code);
    // });

  