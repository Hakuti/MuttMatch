$(document).ready(function(){
  //Variable housing neccessary data for image carousel
  var $carousel = $('#myCar').flickity()
  .flickity('next')
  .flickity( 'select', 4 );

  //Arrays housing information retrieved from ebay api
  //Each array holds 3 item images and links to their URL of dog products according to size
    var smallDogItem = [];
    var mediumDogItem = [];
    var largeDogItem = [];
    //Array holding additional images of each unique dog
    var modalDogImages = [];
    //Array holding description of each unique dog
    var dogDescription = [];
    //Array holding the name of each dog
    var dogName = [];
    //Array holding age of each dog
    var dogAge = [];
    //Arrary holding sex of each dog
    var dogSex = [];
    //Array holding the size of each dog
    var dogSize = [];


    //petfinder api call
    var petUrl = "http://api.petfinder.com/pet.find";
    var petApiKey = "aaf7ea34460505b8e7841f0512aae7a4"
    $.ajax({
        url: petUrl,
        jsonp: "callback",
        dataType: "jsonp",
        data: {
            key: petApiKey,
            animal: "dog",
            "location": "32812",
            output: "basic",
            format: "json"
        }
    }).then(response=> {
        var apiKey = "aaf7ea34460505b8e7841f0512aae7a4"
        $.ajax({
            url: petUrl,
            jsonp: "callback",
            dataType: "jsonp",
            data: {
                key: petApiKey,
                animal: "dog",
                "location": "32812",
                output: "basic",
                format: "json"
            }
        }).then(response=> {
          console.log(response);
           //Variable that starts at zero, increases for each loop iteration. Used to hold unique info in each modal
            var dogIndex = 0;
            //Array that holds additional pictures of each dog.
            var thisDogPics = [];
            //Loops through each dog pulled back from ajax request
            response.petfinder.pets.pet.forEach(function(j){
                //This loop goes through the first 5 images for each dog
                //Each image pulled from the API has the same image in 5 different sizes
                //This for loop looks for the first full sized image of the dog
                for (l = 0; l < 5 ; l++){
                    if (j.media.photos.photo[l]["@size"] == "x"){
                        //Sets the first full size image of the dog to uniqueDogImg
                        var uniqueDogImg = j.media.photos.photo[l].$t;
                        //Creating a div to hold the image
                        var uniqueDogDiv = $("<div>");
                        var newImg = $("<img>");
                        //Adds class to work with carousel
                        uniqueDogDiv.addClass("carousel-cell");
                        //setting src of the image of the first full sized image of the dog
                        newImg.attr("src", uniqueDogImg);
                        newImg.addClass("uniqueDogImg");
                        uniqueDogDiv.attr("data-index", dogIndex);
                        uniqueDogDiv.attr("data-size", j.size.$t);
                        uniqueDogDiv.html(newImg);
                        //Appends the image to the carousel
                        $carousel.flickity( 'append', uniqueDogDiv )
                        dogIndex++;
                    }
                }

                //This for each loop is used to push extra images of each dog to an array for use in the modal
                // it takes each full size image of each unique dog and pushes it to an array
                //That array of images is then pushed to a parent array.
                //Each index of the parent array corresponds each unique dog in the order that they come from the API

                //array holding each dog's pictures initialized empty
                thisDogPics = [];
                j.media.photos.photo.forEach(function(m){
                  //If the image is full sized
                  if (m["@size"] == "x"){
                    //the image is pushed to the thisDogPics array
                    thisDogPics.push(m.$t);
                  }
                })
                //The description about this unique dog is pushed to the global array
                dogDescription.push(j.description.$t);

                //The name of this unique dog is pushed to the global array
                dogName.push(j.name.$t);

                //The sex of this unique dog is changed to the string "Male" or "Female" and then pushed to the global array
                if (j.sex.$t == "M"){
                  dogSex.push("Male");
                }
                else if (j.sex.$t == "F"){
                  dogSex.push("Female");
                }

                //Pushes the age of the dog being iterated over to the dogAge array
                //If the age from the API is "baby", the string is changed to "puppy" and then pushed to the array.
                if (j.age.$t == "Baby"){
                  dogAge.push("Puppy");
                }
                else {
                  dogAge.push(j.age.$t);
                }

                //The size of the dog being iterated over is pushed to the dogSize array
                dogSize.push(j.size.$t);

                //the array of this unique dog's images are pushed to a parent array, with an index corresponding to that dog's data-index
                modalDogImages.push(thisDogPics);
            })
        });
    });
    var searchString;
      var ebayURL = "http://svcs.ebay.com/services/search/FindingService/v1";
      ebayURL += "?OPERATION-NAME=findCompletedItems";
      ebayURL += "&SERVICE-VERSION=1.13.0";
      ebayURL += "&SERVICE-NAME=FindingService";
      ebayURL += "&SECURITY-APPNAME=TimothyB-MuttMatc-PRD-8ed499e41-2cbab10d";
      ebayURL += "&GLOBAL-ID=EBAY-US";
      ebayURL += "&RESPONSE-DATA-FORMAT=JSON";
      ebayURL += "&REST-PAYLOAD";
      ebayURL += "&paginationInput.pageNumber=1";
      ebayURL += "&paginationInput.entriesPerPage=10";
      ebayURL += "&sortOrder=StartTimeNewest";

      //This ajax request seems useless but the following requests to ebay API fail without it
      //no idea why
      searchString = "medium dog leash";
      ebayURL += "&keywords=" + searchString;
      $.ajax({
        type: "GET",
        url: ebayURL,
        dataType: "jsonp",
      }).then(response => {
          mediumDogItem.push({
              imageURL: response.findCompletedItemsResponse[0].searchResult[0].item[0].galleryURL[0],
              itemURL: response.findCompletedItemsResponse[0].searchResult[0].item[0].viewItemURL[0]
          })
      });

      ebayURL = "http://svcs.ebay.com/services/search/FindingService/v1";
      ebayURL += "?OPERATION-NAME=findCompletedItems";
      ebayURL += "&SERVICE-VERSION=1.13.0";
      ebayURL += "&SERVICE-NAME=FindingService";
      ebayURL += "&SECURITY-APPNAME=TimothyB-MuttMatc-PRD-8ed499e41-2cbab10d";
      ebayURL += "&GLOBAL-ID=EBAY-US";
      ebayURL += "&RESPONSE-DATA-FORMAT=JSON";
      ebayURL += "&REST-PAYLOAD";
      ebayURL += "&paginationInput.pageNumber=1";
      ebayURL += "&paginationInput.entriesPerPage=10";
      ebayURL += "&sortOrder=StartTimeNewest";

      searchString = "medium dog food";
      ebayURL += "&keywords=" + searchString;
      $.ajax({
        type: "GET",
        url: ebayURL,
        dataType: "jsonp",
      }).then(response => {
          mediumDogItem.push({
            imageURL: response.findCompletedItemsResponse[0].searchResult[0].item[0].galleryURL[0],
            itemURL: response.findCompletedItemsResponse[0].searchResult[0].item[0].viewItemURL[0]
        })
      });
      
      
      ebayURL = "http://svcs.ebay.com/services/search/FindingService/v1";
      ebayURL += "?OPERATION-NAME=findCompletedItems";
      ebayURL += "&SERVICE-VERSION=1.13.0";
      ebayURL += "&SERVICE-NAME=FindingService";
      ebayURL += "&SECURITY-APPNAME=TimothyB-MuttMatc-PRD-8ed499e41-2cbab10d";
      ebayURL += "&GLOBAL-ID=EBAY-US";
      ebayURL += "&RESPONSE-DATA-FORMAT=JSON";
      ebayURL += "&REST-PAYLOAD";
      ebayURL += "&paginationInput.pageNumber=1";
      ebayURL += "&paginationInput.entriesPerPage=10";
      ebayURL += "&sortOrder=StartTimeNewest";

      searchString = "medium dog flea medicine";
      ebayURL += "&keywords=" + searchString;
      $.ajax({
        type: "GET",
        url: ebayURL,
        dataType: "jsonp",
      }).then(response => {
          mediumDogItem.push({
            imageURL: response.findCompletedItemsResponse[0].searchResult[0].item[0].galleryURL[0],
            itemURL: response.findCompletedItemsResponse[0].searchResult[0].item[0].viewItemURL[0]
        })
        // console.log(mediumDogItem)
      });

      ebayURL = "http://svcs.ebay.com/services/search/FindingService/v1";
      ebayURL += "?OPERATION-NAME=findCompletedItems";
      ebayURL += "&SERVICE-VERSION=1.13.0";
      ebayURL += "&SERVICE-NAME=FindingService";
      ebayURL += "&SECURITY-APPNAME=TimothyB-MuttMatc-PRD-8ed499e41-2cbab10d";
      ebayURL += "&GLOBAL-ID=EBAY-US";
      ebayURL += "&RESPONSE-DATA-FORMAT=JSON";
      ebayURL += "&REST-PAYLOAD";
      ebayURL += "&paginationInput.pageNumber=1";
      ebayURL += "&paginationInput.entriesPerPage=10";
      ebayURL += "&sortOrder=StartTimeNewest";

      searchString = "small dog food";
      ebayURL += "&keywords=" + searchString;
      $.ajax({
        type: "GET",
        url: ebayURL,
        dataType: "jsonp",
      }).then(response => {
          smallDogItem.push({
            imageURL: response.findCompletedItemsResponse[0].searchResult[0].item[0].galleryURL[0],
            itemURL: response.findCompletedItemsResponse[0].searchResult[0].item[0].viewItemURL[0]
        })
      });
      ebayURL = "http://svcs.ebay.com/services/search/FindingService/v1";
      ebayURL += "?OPERATION-NAME=findCompletedItems";
      ebayURL += "&SERVICE-VERSION=1.13.0";
      ebayURL += "&SERVICE-NAME=FindingService";
      ebayURL += "&SECURITY-APPNAME=TimothyB-MuttMatc-PRD-8ed499e41-2cbab10d";
      ebayURL += "&GLOBAL-ID=EBAY-US";
      ebayURL += "&RESPONSE-DATA-FORMAT=JSON";
      ebayURL += "&REST-PAYLOAD";
      ebayURL += "&paginationInput.pageNumber=1";
      ebayURL += "&paginationInput.entriesPerPage=10";
      ebayURL += "&sortOrder=StartTimeNewest";

      searchString = "small dog leash";
      ebayURL += "&keywords=" + searchString;
      $.ajax({
        type: "GET",
        url: ebayURL,
        dataType: "jsonp",
      }).then(response => {
          smallDogItem.push({
            imageURL: response.findCompletedItemsResponse[0].searchResult[0].item[0].galleryURL[0],
            itemURL: response.findCompletedItemsResponse[0].searchResult[0].item[0].viewItemURL[0]
        })
      });
      ebayURL = "http://svcs.ebay.com/services/search/FindingService/v1";
      ebayURL += "?OPERATION-NAME=findCompletedItems";
      ebayURL += "&SERVICE-VERSION=1.13.0";
      ebayURL += "&SERVICE-NAME=FindingService";
      ebayURL += "&SECURITY-APPNAME=TimothyB-MuttMatc-PRD-8ed499e41-2cbab10d";
      ebayURL += "&GLOBAL-ID=EBAY-US";
      ebayURL += "&RESPONSE-DATA-FORMAT=JSON";
      ebayURL += "&REST-PAYLOAD";
      ebayURL += "&paginationInput.pageNumber=1";
      ebayURL += "&paginationInput.entriesPerPage=10";
      ebayURL += "&sortOrder=StartTimeNewest";

      searchString = "small dog flea medicine";
      ebayURL += "&keywords=" + searchString;
      $.ajax({
        type: "GET",
        url: ebayURL,
        dataType: "jsonp",
      }).then(response => {
          smallDogItem.push({
            imageURL: response.findCompletedItemsResponse[0].searchResult[0].item[0].galleryURL[0],
            itemURL: response.findCompletedItemsResponse[0].searchResult[0].item[0].viewItemURL[0]
        })
      });

      ebayURL = "http://svcs.ebay.com/services/search/FindingService/v1";
      ebayURL += "?OPERATION-NAME=findCompletedItems";
      ebayURL += "&SERVICE-VERSION=1.13.0";
      ebayURL += "&SERVICE-NAME=FindingService";
      ebayURL += "&SECURITY-APPNAME=TimothyB-MuttMatc-PRD-8ed499e41-2cbab10d";
      ebayURL += "&GLOBAL-ID=EBAY-US";
      ebayURL += "&RESPONSE-DATA-FORMAT=JSON";
      ebayURL += "&REST-PAYLOAD";
      ebayURL += "&paginationInput.pageNumber=1";
      ebayURL += "&paginationInput.entriesPerPage=10";
      ebayURL += "&sortOrder=StartTimeNewest";

      searchString = "large dog leash";
      ebayURL += "&keywords=" + searchString;
      $.ajax({
        type: "GET",
        url: ebayURL,
        dataType: "jsonp",
      }).then(response => {
          largeDogItem.push({
            imageURL: response.findCompletedItemsResponse[0].searchResult[0].item[0].galleryURL[0],
            itemURL: response.findCompletedItemsResponse[0].searchResult[0].item[0].viewItemURL[0]
        })
      });
      ebayURL = "http://svcs.ebay.com/services/search/FindingService/v1";
      ebayURL += "?OPERATION-NAME=findCompletedItems";
      ebayURL += "&SERVICE-VERSION=1.13.0";
      ebayURL += "&SERVICE-NAME=FindingService";
      ebayURL += "&SECURITY-APPNAME=TimothyB-MuttMatc-PRD-8ed499e41-2cbab10d";
      ebayURL += "&GLOBAL-ID=EBAY-US";
      ebayURL += "&RESPONSE-DATA-FORMAT=JSON";
      ebayURL += "&REST-PAYLOAD";
      ebayURL += "&paginationInput.pageNumber=1";
      ebayURL += "&paginationInput.entriesPerPage=10";
      ebayURL += "&sortOrder=StartTimeNewest";

      searchString = "large dog food";
      ebayURL += "&keywords=" + searchString;
      $.ajax({
        type: "GET",
        url: ebayURL,
        dataType: "jsonp",
      }).then(response => {
          largeDogItem.push({
            imageURL: response.findCompletedItemsResponse[0].searchResult[0].item[0].galleryURL[0],
            itemURL: response.findCompletedItemsResponse[0].searchResult[0].item[0].viewItemURL[0]
        })
      });
      ebayURL = "http://svcs.ebay.com/services/search/FindingService/v1";
      ebayURL += "?OPERATION-NAME=findCompletedItems";
      ebayURL += "&SERVICE-VERSION=1.13.0";
      ebayURL += "&SERVICE-NAME=FindingService";
      ebayURL += "&SECURITY-APPNAME=TimothyB-MuttMatc-PRD-8ed499e41-2cbab10d";
      ebayURL += "&GLOBAL-ID=EBAY-US";
      ebayURL += "&RESPONSE-DATA-FORMAT=JSON";
      ebayURL += "&REST-PAYLOAD";
      ebayURL += "&paginationInput.pageNumber=1";
      ebayURL += "&paginationInput.entriesPerPage=10";
      ebayURL += "&sortOrder=StartTimeNewest";

      searchString = "large dog flea medicine";
      ebayURL += "&keywords=" + searchString;
      $.ajax({
        type: "GET",
        url: ebayURL,
        dataType: "jsonp",
      }).then(response => {
          largeDogItem.push({
            imageURL: response.findCompletedItemsResponse[0].searchResult[0].item[0].galleryURL[0],
            itemURL: response.findCompletedItemsResponse[0].searchResult[0].item[0].viewItemURL[0]
        })
        // console.log(largeDogItem)
      });

      //On click function that grabs all images of selected dog from modalDogImages array
      $(document).on("click", ".uniqueDogImg", function(){
        //Sets the div that will hold the inner carousel
        var innerCarousel = $("<div id='innerCarousel' class='carousel'>")
        //Puts the newly declared carousel div into the parent container
        $("#modalCarouselContainer").html(innerCarousel);
        //Setting up inner modal carousel to work with flickity
        var $flkty = $("#innerCarousel").flickity()
          .flickity('next')
          .flickity( 'select', 4 );

        //Variable used to index the item pulled from ebay api and append them accordingly
        var itemIndex = 1;

        //grabs the index of the dog clicked
        var currentIndex = $(this)[0].parentElement.dataset.index;

        //array that will hold all extra images of dog selected
        var thisDogExtraPics = [];

        //HOLDS THE SIZE OF THE DOG CLICKED ON
        var dogSize = ($(this)["0"].parentElement.attributes[2].nodeValue);
        // console.log($(this)["0"].parentElement.attributes);

        //Pushes images of dog slected to thisDogExtraPics array
        modalDogImages[currentIndex].forEach(function(p){
          thisDogExtraPics.push(p);
        })

        // This for each loop iterates on each image of the selected dog
        thisDogExtraPics.forEach(function(n){
          //Creates a new div to hold the dog's images
          var thisDogDiv = $("<div>");
          //Creates a new img tag for each image of the dog
          var thisDogImg = $("<img>");
          //Gives the carousel-cell class to work with the carousel
          thisDogDiv.addClass("carousel-cell");
          //gives the image the src attribute of the image
          thisDogImg.attr("src", n);
          //inserts the img tag into the div holding the dog image
          thisDogDiv.html(thisDogImg);
          //appends the div holding the image to the carousel
          $flkty.flickity( 'append', thisDogDiv )
        })


        $('#myModal').modal({
          keyboard: true
        })

        //Appends the sex of the dog selected under the carousel in the modal
        $("#dogSex").text("Sex: " + dogSex[currentIndex]);

        //Appends the name of the dog selected under the carousel in the modal
        $("#dogName").text("Name: " + dogName[currentIndex]);

        //Appends the age of ther dog selected under the carousel in the modal
        $("#dogAge").text("Age: " + dogAge[currentIndex]);

        //Appends the description of the dog to the modal
        $("#dogDescription").text(dogDescription[currentIndex]);

       
        //Determines the size of the dog selected and displays products from Ebay accordingly
          //If the dog's size is "small", the results from the small dog item search from the ebay API
          //are appended to the bottom of the modal
            if (dogSize[currentIndex] == "S"){
          smallDogItem.forEach(function(a){
            //creates a new div for each ebay item being appended
            var ebayItemDiv = $("<div>");
            //Creates an img tag for the picture of the item pulled from ebay
            var ebayItemImg = $("<img>");
            //anchor tag to hold a link to the item on ebay's website
            var embayItemURL = $("<a>");

            //Setting attribues of the img and anchor tags to their respective item URLs
            ebayItemImg.attr("src", a.imageURL);
            embayItemURL.attr("href", a.itemURL);
            //Appends the item image to the anchor tag, and the anchor tag to the parent item div
            embayItemURL.append(ebayItemImg);
            ebayItemDiv.append(embayItemURL);
            //Inserts the item div into the DOM
            $("#ebayItem" + itemIndex).html(ebayItemDiv);
            itemIndex++
          })
        }
        //If the dog's size is "medium", the results from the medium dog item search the ebay API
        //are appended to the bottom of the modal
        else if (dogSize[currentIndex] == "M"){
          mediumDogItem.forEach(function(b){
            //creates a new div for each ebay item being appended
            var ebayItemDiv = $("<div>");
            //Creates an img tag for the picture of the item pulled from ebay
            var ebayItemImg = $("<img>");
            //anchor tag to hold a link to the item on ebay's website
            var embayItemURL = $("<a>");
  
            //Setting attribues of the img and anchor tags to their respective item URLs
            ebayItemImg.attr("src", b.imageURL);
            embayItemURL.attr("href", b.itemURL);
            //Appends the item image to the anchor tag, and the anchor tag to the parent item div
            embayItemURL.append(ebayItemImg);
            ebayItemDiv.append(embayItemURL);
            //Inserts the item div into the DOM
            $("#ebayItem" + itemIndex).html(ebayItemDiv);
            itemIndex++;
          })
        }
        //If the dog's size is NOT "medium" or "small", the results from the large dog item search the ebay API
        //are appended to the bottom of the modal
        else {
          largeDogItem.forEach(function(c){
            //creates a new div for each ebay item being appended
            var ebayItemDiv = $("<div>");
            //Creates an img tag for the picture of the item pulled from ebay
            var ebayItemImg = $("<img>");
            //anchor tag to hold a link to the item on ebay's website
            var embayItemURL = $("<a>");

            //Setting attribues of the img and anchor tags to their respective item URLs
            ebayItemImg.attr("src", c.imageURL);
            embayItemURL.attr("href", c.itemURL);
            //Appends the item image to the anchor tag, and the anchor tag to the parent item div
            embayItemURL.append(ebayItemImg);
            ebayItemDiv.append(embayItemURL);
            //Inserts the item div into the DOM
            $("#ebayItem" + itemIndex).html(ebayItemDiv);
            itemIndex++;
          })
        }
      })

      $('#myModal').on('hidden.bs.modal', function () {
        $("#innerCarousel .flickity-slider").empty();
      });

    
        $("#myCarousel").on( "swipeleft", function( event )
        {
          $(this).carousel("prev");
          console.log("Here");
        } );
     
        $("#myCarousel").on( "swiperight", function( event )
        {
          $(this).carousel("next");
          console.log("Here")
        } );
     
    
     $(".carousel-control-prev-icon").on( "click", function( event ) 
        {
          $("#myCarousel").carousel('prev');
          console.log("prev")
        } );
    
        $(".carousel-control-next-icon").on( "click", function( event ) 
        {
          $("#myCarousel").carousel('next');
          console.log("next")
        } )
        
        
    })
