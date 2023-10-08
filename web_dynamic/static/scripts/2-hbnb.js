$(document).ready(function () {
  const amenity_inputs = $('input#amenityInput');
  const h4_tag = $('div.amenities h4');
  const temp = {};
  amenity_inputs.on('change', function () {
    if (this.checked) {
      temp[$(this).data('id')] = $(this).data('name');
    } else {
      delete temp[$(this).data('id')];
    }

    let val = '';
    for (const k in temp) {
      val += temp[k] + ', ';
    }
    h4_tag.text(val);
  });

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/status/',
    success: function (data) {
      if (data.status === 'OK') {
        $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
      }
    }
  });
});
