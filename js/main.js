// Initialize Firebase
var config = {
  apiKey: "AIzaSyC2AwtYwTT0yli6xj5eERRQFEJZDXxBGT8",
  authDomain: "reservation-site-9fffb.firebaseapp.com",
  databaseURL: "https://reservation-site-9fffb.firebaseio.com",
  projectId: "reservation-site-9fffb",
  storageBucket: "reservation-site-9fffb.appspot.com",
  messagingSenderId: "1057802240689"
};
firebase.initializeApp(config);


var database = firebase.database();

// Declare reservationData variable
var reservationData = {};


// Show selection in dropdown
$('.reservation-day a').click(function() {
  $('#selected').text($(this).text());
});

$('.reservation-number a').click(function() {
  $('#numberInParty').text($(this).text());
});


//var resDate;

// jQuery callback: Execute the function when the DOM is ready to be used.
// $(function() {
//     $("#datepicker").datepicker({
//       minDate: 0,
//       maxDate: "+1M 0D",
//       onSelect: function() {
//         resDate = $(this).val();
//       }

//     });



// //    var resDate = $("#datepicker").datepicker("getDate");
// //    return resDate;
// //    console.log("date is: " + resDate);
// });

// Set the reservation day: dropdown list
$('.reservation-day li').click(function() {
  reservationData.day = $(this).text();
});

// Set the reservation number in party
$('.reservation-number li').click(function() {
  reservationData.number = $(this).text();
});


// On clicking Set Reservations button
$('.reservations').on('submit', function(event) {

  event.preventDefault();
  
  // Set reservation name
  reservationData.name = $('.reservation-name').val();
  
  // Send reservation data to firebase database
  database.ref('reservations').push(reservationData);

  // clunky way to reset form fields to default
  location.reload();

  // Clear name input text box only
  //$('form')[0].reset();

// trying to reset dropdowns. this doesn't work.
  $('.btn dropdown-toggle').removeClass('active');

  //document.getElementById("myForm").reset(); doesn't clear dropdowns
  
});


database.ref('reservations').on('child_added', function(snapshot) {

  var reservationList = $('.reservation-list');
  var reservations = snapshot.val();
  var source   = $("#reservation-template").html();
  var template = Handlebars.compile(source);  // as the template is created
  var reservationTemplate = template(reservations);
  reservationList.append(reservationTemplate);
});



function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.7128, lng: -74.0059},
    zoom: 10,
    scrollwheel: false,
    styles: [{"featureType":"landscape","stylers":[{"hue":"#FFBB00"},{"saturation":43.400000000000006},{"lightness":37.599999999999994},{"gamma":1}]},{"featureType":"road.highway","stylers":[{"hue":"#FFC200"},{"saturation":-61.8},{"lightness":45.599999999999994},{"gamma":1}]},{"featureType":"road.arterial","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":51.19999999999999},{"gamma":1}]},{"featureType":"road.local","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":52},{"gamma":1}]},{"featureType":"water","stylers":[{"hue":"#0078FF"},{"saturation":-13.200000000000003},{"lightness":2.4000000000000057},{"gamma":1}]},{"featureType":"poi","stylers":[{"hue":"#00FF6A"},{"saturation":-1.0989010989011234},{"lightness":11.200000000000017},{"gamma":1}]}]
  });

  var marker = new google.maps.Marker({
    position: {lat: 40.7128, lng: -74.0059},
    map: map,
    title: 'Monks Café'
  });
}
