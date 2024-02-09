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
});
