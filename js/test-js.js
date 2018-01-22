$( function() {
    $( "#datepicker" ).datepicker({
        minDate: 0,
        maxDate: "+1M 0D",
        onSelect: function() {
            var resDate = $(this).val();

            $('.selectedDate').text("Date is " + resDate + ".");
            alert(resDate);

        }
    });

} );

