$(document).ready(function(){

var age = "";
var gender = "";
var breed = "";



$(".age").on("click",function() {
    event.preventDefault();
//    console.log("Here"); 
//    console.log($(this).text().trim());
   age = $(this).text().trim();
   $("#AgeDropdownMenuLink").text(age);
});


$(".gender").on("click",function() {
    event.preventDefault();
    // console.log("Here"); 
    // console.log($(this).text().trim());
    gender = $(this).text().trim();
      $("#GenderDropdownMenuLink").text(gender);
 });

$("#go").on("click", function() {
//console.log("Here");
// console.log(age);
// console.log(gender);
breed = $("#breed").val();
// console.log(breed);

if(age =="" || gender == "" || breed == ""){

    
    //console.log("Not valid");
    //return false;
}
else {
    window.location.href='mutt.html';
}
    
});

});