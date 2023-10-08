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

  function search_place (dict = {}) {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      method: 'POST',
      data: JSON.stringify(dict),
      contentType: 'application/json',
      dataType: 'json',
      success: function (data) {
        const placesSection = $('section.places');
        data.forEach(function (place) {
	  const get_article = create_place(place);
	  placesSection.append(get_article);
        });
      }
    });
  }

  function create_place (place) {
    // const placesSection = $('section.places');
    const article = $('<article></article>');
    // class title_box under article of section place
    const titleBox = $('<div class="title_box"></div>');
    titleBox.append('<h2>' + place.name + '</h2>');
    titleBox.append('<div class="price_by_night">$' + place.price_by_night + '</div>');
    // class information under article of section place
    const information = $('<div class="information"></div>');
    information.append('<div class="max_guest">' + place.max_guest + ' Guest' + (place.max_guest != 1 ? 's' : '') + '</div>');
    information.append('<div class="number_rooms">' + place.number_rooms + ' Bedroom' + (place.number_rooms != 1 ? 's' : '') + '</div>');
    information.append('<div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' + (place.number_bathrooms != 1 ? 's' : '') + '</div>');
    // class user under article of section place
    const user = $('<div class="user"></div>');
    user.append('<b>Owner:</b> No name');
    // descriptions boooooom!!!!
    const description = $('<div class="description"></div>');
    description.html(place.description);
    // append all article childs
    article.append(titleBox);
    article.append(information);
    article.append(user);
    article.append(description);
    return article;
  }
  search_place();
  $('.filter button').click(function () {
    $('section.places article').remove();
    const am = 'amenities';
    search_place({ am: Object.keys(temp) });
  });
});
