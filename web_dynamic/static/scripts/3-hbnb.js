/**
  Fetching all places with a post request
**/

$(document).ready(function () {
  let reviews = {}
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    data: JSON.stringify({}),
    contentType: 'application/json',
    crossDomain: true,
    dataType: 'json',
    success: (places) => {
      for (const place of places) {
        // $.getJSON(`http://0.0.0.0:5001/api/v1/places/${place.id}/reviews`, (reviews) => 
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
               <div class="reviews">
                  <div class="title">
                    <h2 class="article_subtitle">Reviews</h2>
                    <span data-id=${ place.id }>show</span>
                  </div>
                  <div class="content">
                    <ul class=${ place.id }>
                    </ul>
                  </div>
               </div>
             </article>`;
          $('.places').append(article);
      }
    }
  }).done(() => {
    $('.reviews span').click(function () {
        const placeId = $(this).data('id');
        const ulReview = $('.content .' + placeId);
        // check that review for this specific place is not already printed
        if (!reviews[placeId]) {
          reviews[placeId] = true;
          $.getJSON(`http://0.0.0.0:5001/api/v1/places/${placeId}/reviews`, (reviews) => {
            for (const review of reviews) {
              // get information of the user for this review
              $.getJSON(`http://0.0.0.0:5001/api/v1/users/${review.user_id}`, (user) => {
                const date = new Date(review.created_at)
                const monthNames = ["January", "February", "March", "April", "May", "June",
                                  "July", "August", "September", "October", "November", "December"]; 
                ulReview.append(`<li> <b>From ${user.last_name} ${user.first_name} the ${date.getDay()}th ${monthNames[date.getMonth()]} ${date.getFullYear()} </b></li>`);
                ulReview.append(`<li> ${review.text}</li>`);
              });
            }
          });
        // otherwise, delete from the object and remove reviews from html
        } else {
          delete reviews[placeId];
          ulReview.empty();
        }
      })
  });
});
