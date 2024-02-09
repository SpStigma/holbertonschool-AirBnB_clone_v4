/* global $ */
$(document).ready(() => {
  // Object to store Amenity IDs
  const amenities = {};

  $('input[type="checkbox"]').change(function () {
    // Taking the ID/name of the closest li element
    const amenityId = $(this).closest('li').data('id');
    const amenityName = $(this).closest('li').data('name');

    if ($(this).is(':checked')) {
      amenities[amenityId] = amenityName;
    } else {
      delete amenities[amenityId];
    }

    $('.amenities h4').text(Object.values(amenities).join(', '));
  });

  $.get('http://localhost:5001/api/v1/status/', data => {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

  $.ajax({
    url: 'http://localhost:5001/api/v1/places_search/',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({}),
    success: function (data) {
      console.log('Received places data:', data); // Debug : Log received data
      // Looping through the results and creating article tags for each "place"
      // Fancy ternary conditions for singular/plural words !
      // As requested, the owner tag is removed
      data.forEach(place => {
        $('.places').append(`
          <article>
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">$${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
              <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
              <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
            </div>
            <div class="description">${place.description}</div>
          </article>
        `);
      });
    },
    error: function (error) {
      console.error(error);
    }
  });
});
