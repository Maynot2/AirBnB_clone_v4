/**
  Fetching all places with a post request
**/
$(document).ready(function () {
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    data: JSON.stringify({}),
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
