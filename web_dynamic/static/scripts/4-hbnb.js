/**
  Fetching places given amenities selection
**/
$(document).ready(function () {
  const amenityList = [];
  const amenitiesH4Elem = $('.amenities h4');

  $('.amenities .check_box').click(function () {
    const id = $(this).data('id');
    if ($(this).is(':checked')) {
      if (amenityList.length === 0) {
        amenitiesH4Elem.text(($(this)).data('name'));
      } else {
        amenitiesH4Elem.append(', ' + ($(this)).data('name'));
      }
      amenityList.push(id);
    } else {
      const index = amenityList.findIndex((el) => el === id);
      amenityList.splice(index, 1);
      let newText;
      if (index === 0 && amenityList.length === 0) {
        amenitiesH4Elem.html('&nbsp;');
        return;
      } else if (index === 0) {
        newText = amenitiesH4Elem.text().replace(($(this)).data('name') + ', ', '');
      } else {
        newText = amenitiesH4Elem.text().replace(', ' + ($(this)).data('name'), '');
      }
      amenitiesH4Elem.text(newText);
    }
  });

  $('.filters button').click(() => {
    $('.places').empty();
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      data: JSON.stringify({ amenities: amenityList }),
      contentType: 'application/json',
      crossDomain: true,
      dataType: 'json',
      success: (places) => {
        for (const place of places) {
          const article =
            `<article>
               <div class="title_box">
                 <h2>${place.name}</h2>
                 <div class="price_by_night">$${place.price_by_night}</div>
               </div>
               <div class="information">
                 <div class="max_guest">${place.max_guest} Guest${place.max_guest === 1 ? '' : 's'}</div>
                 <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms === 1 ? '' : 's'}</div>
                 <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms === 1 ? '' : 's'}</div>
               </div>
               <div class="user"></div>
               <div class="description">${place.description}</div>
             </article>`;
          $('.places').append(article);
        }
      }
    });
  });
});
