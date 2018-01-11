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

$('.dropdown-menu a').click(function() {
  $('#selected').text($(this).text());
});

var reservationData = {};

$('.reservation-day li').click(function() {
  reservationData.day = $(this).text();
});

$('.reservations').on('submit', function(event) {

  event.preventDefault();

  reservationData.name = $('.reservation-name').val();

  database.ref('reservations').push(reservationData);
});


database.ref('reservations').on('child_added', function(snapshot) {

  var reservationList = $('.reservation-list');
  var reservations = snapshot.val();
  var source   = $("#reservation-template").html();
  var template = Handlebars.compile(source);  // as the template is created
  var reservationTemplate = template(reservations);
  reservationList.append(reservationTemplate);
});

$( function() {
    $("#datepicker").datepicker({ minDate: -20, maxDate: "+1M +10D" });
  } );

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
