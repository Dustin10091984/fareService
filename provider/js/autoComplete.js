$(window).ready(function () {
    $(document).ready(function () {
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
                    $('#addZipCode').prop('disabled', false);
                    $('.zip-code').append(
                        `<div class="badge-ctm d-flex align-items-center justify-content-between mr-2 mb-1 selectedZipCode" data-value=${zipcode}>${zipcode}
                        <span class="fa fa-times ml-1"></span></div>`
                    ).click(function (evt) {
                        evt.preventDefault();
                        $(this).remove();
                    });
                    $("#zipCode").val('');
                    $('#zipCodeErr').text('');
                } else {
                    $('#zipCodeErr').text('please choose another location');
                    $('#addZipCode').prop('disabled', true);
                    $("#zipCode").val('');
                }
            });
        }
    });
});