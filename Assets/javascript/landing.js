
var age = "3";
var gender = "";
var breed = "";
var zip = "";

$(document).ready(function(){




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
    event.preventDefault();
//console.log("Here");
// console.log(age);
// console.log(gender);
breed = $("#breed").val();
zip = $("#zip").val();
// console.log(breed);

if(age =="" || gender == "" || breed == ""){
    //console.log("Not valid");
    //return false;
}
else {
    localStorage.setItem("age", age);
    localStorage.setItem("gender", gender);
    localStorage.setItem("breed", breed);
    localStorage.setItem("zip", zip);
    window.location.href='mutt.html';
}
    
});


// $("h1").click(function(){
//     //console.log($("#breed").val());
//     //console.log($("#GenderDropdownMenuLink").text());
//     //console.log($("#AgeDropdownMenuLink").text());
//     age = $("#AgeDropdownMenuLink").text();
//     window.location.href='mutt.html';

//   })
});