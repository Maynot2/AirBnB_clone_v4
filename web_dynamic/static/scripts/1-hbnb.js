let list;
$(document).ready(function () {
  list = [];
  const amenitiesH4Elem = $('.amenities h4');

  $('.check_box').click(function () {
    const id = $(this).data('id');
    if ($(this).is(':checked')) {
      if (list.length === 0) {
        amenitiesH4Elem.text(($(this)).data('name'));
      } else {
        amenitiesH4Elem.append(', ' + ($(this)).data('name'));
      }
      list.push(id);
    } else {
      const index = list.findIndex((el) => el === id);
      list.splice(index, 1);
      let newText;
      if (index === 0 && list.length === 0) {
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

export { list };
