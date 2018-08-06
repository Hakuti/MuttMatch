$(document).ready(function(){
  //Variable housing neccessary data for image carousel
    var $carousel = $('.carousel').flickity()
  .flickity('next')
  .flickity( 'select', 4 );

  //Arrays housing information retrieved from ebay api
  //Each array holds 3 item images and links to their URL of dog products according to size
    var smallDogItem = [];
    var mediumDogItem = [];
    var largeDogItem = [];
    var modalDogImages = [];


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
            // console.log(response);
            // console.log(response.petfinder.pets.pet)

           //Variable that starts at zero, increases for each loop iteration. Used to hold unique info in each modal
            var dogIndex = 0;
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
                        //Creatin a div to hold the image
                        var uniqueDogDiv = $("<div>");
                        var newImg = $("<img>");
                        //Gets the info icon from FontAwesome
                        var infoIcon = $("<i class='fas fa-info-circle fa-2x'></i>");
                        //Adds class to work with carousel
                        uniqueDogDiv.addClass("carousel-cell");
                        //setting src of the image of the first full sized image of the dog
                        newImg.attr("src", uniqueDogImg);
                        newImg.addClass("uniqueDogImg");
                        uniqueDogDiv.attr("data-index", dogIndex);
                        uniqueDogDiv.attr("data-size", j.size.$t);
                        uniqueDogDiv.html(newImg);
                        //Sets styling for info icon on each image
                        infoIcon.css("position", "absolute");
                        infoIcon.css("bottom", "20");
                        infoIcon.css("right", "50");
                        infoIcon.css("color", "#017bff");
                        infoIcon.attr("data-index", dogIndex)
                        uniqueDogDiv.append(infoIcon)
                        //Appends the image to the carousel
                        $carousel.flickity( 'append', uniqueDogDiv )
                        dogIndex++;
                    }
                }

                //This for each loop is used to push extra images of each dog to an array for use in the modal
                // it takes each full size image of each unique dog and pushes it to an array
                //That array of images is then pushed to a parent array.
                //The each index of the parent array corresponds each unique dog in the order that they come from the API

                //array holding each dog's pictures initialized empty
                thisDogPics = [];
                j.media.photos.photo.forEach(function(m){
                  //If the image is full sized
                  if (m["@size"] == "x"){
                    //the image is pushed to the thisDogPics array
                    thisDogPics.push(m.$t);
                  }
                })
                //the array of this unique dog's images are pushed to a parent array, with an index corresponding to that dog's data-index
                modalDogImages.push(thisDogPics);
            })
            console.log(modalDogImages);





            // photoGallery.forEach(function(i){
            //     // THIS LOOP IS WORKING ON photoGallery VARIABLE
            //     //VARIABLE IS ONLY SET TO 1 DOG IN THE ARRAY OF 25 DOGS
            //     //THIS LOOP IS MEANT TO PUSH EVERY ADDITIONAL IMAGE OF ONE SPECIFIC DOG
            //     //TO THE INNER CAROUSEL INSIDE THE MODAL
            //     if (i["@size"] == "x"){
            //         console.log(i.$t)
            //         var newCarouselDiv = $("<div>");
            //         var newCarImg = $("<img>");
            //         newCarouselDiv.addClass("carousel-cell");
            //         newCarImg.attr("src", i.$t);
            //         newCarouselDiv.html(newCarImg);
            //         // $carousel.flickity( 'append', newCarouselDiv )
            //     }
            // })

            // $("#dogModalPic").addClass("img-responsive");
            // $("#modalTitle").text(dogName);
            // $("#description").html(dogDescription);
            // $("#details").append($("<p>").addClass("col-md-4").text("Age: " + dogAge));
            // $("#details").append($("<p>").addClass("col-md-4").text("Size: " + dogSize));
            // $("#details").append($("<p>").addClass("col-md-4").text("Sex: " + dogSex));
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
        // console.log(smallDogItem)
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

      $(document).on("click", ".fas", function(){
        console.log(".uniqueDogImg clicked");
        console.log($(this));
        console.log($(this[0]));
        $('#myModal').modal({
          keyboard: true
        })
      })

    
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