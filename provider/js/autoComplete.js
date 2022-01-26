$(window).ready(function () {
    if (google && google.maps.places) {
        var autocomplete = new google.maps.places.Autocomplete($("#zipCode")[0], {
        });
        google.maps.event.addListener(autocomplete, 'place_changed', function () {
            var place = autocomplete.getPlace();
            var zipcode = ''
            for (var j = 0; j < place.address_components.length; j++) {
                for (var k = 0; k < place.address_components[j].types.length; k++) {
                    if (place.address_components[j].types[k] == "postal_code") {
                        zipcode = place.address_components[j].short_name;
                    }
                }
            }
            if (zipcode != '') {
                $("#hiddenZipCode").val(zipcode);
                $('#addZipCode').prop('disabled', false);
            } else {
                $('#addZipCode').prop('disabled', true);
            }
            console.log(zipcode);
        });
    }
});