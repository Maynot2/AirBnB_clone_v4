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
});
