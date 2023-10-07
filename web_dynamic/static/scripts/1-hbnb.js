$(document).ready(function check_box_handler() {
  const amenity_inputs = $('input#amenityInput');
  const h4_tag = $('div.amenities h4');
  const temp = {};

  amenity_inputs.on('change', function(event) {
    if ($(this).is(':checked')) {
      temp[$(this).data('name')] = $(this).data('id');
    } else {
      delete temp[$(this).data('name')];
    }

    let val = '';
    for (let k in temp) {
      val += temp[k] + ', ';
    }
    h4_tag.text(val);
  });
});
