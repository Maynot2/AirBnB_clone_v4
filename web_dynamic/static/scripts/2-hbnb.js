/**
  Request the status of the api
  Api is started add the class to api_status
  else, remove the class avalaible
**/
$(document).ready(function () {
  const status = $('#api_status');
  $.getJSON('http://0.0.0.0:5001/api/v1/status/')
  .done(() => {
      status.addClass('available');
  })
  .fail(() => { status.removeClass('available'); });
});
