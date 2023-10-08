$(document).ready(function () {
  const checkboxes = $('input[type="checkbox"]');
  const amenity_obj = {};
  const city_obj = {};
  const state_obj = {};
  checkboxes.on('change', function () {
    const obj_type = $(this).data('obj');
    if (obj_type === 'State') {
      // console.log('from state');
      if (this.checked) {
        state_obj[$(this).data('id')] = $(this).data('name');
      } else {
        delete state_obj[$(this).data('id')];
      }
    }
    if (obj_type === 'City') {
      // console.log('from city');
      if (this.checked) {
        city_obj[$(this).data('id')] = $(this).data('name');
      } else {
        delete city_obj[$(this).data('id')];
      }
    }
    if (obj_type === 'Amenity') {
      // console.log('Hello');
      if (this.checked) {
        amenity_obj[$(this).data('id')] = $(this).data('name');
      } else {
        delete amenity_obj[$(this).data('id')];
      }
    }
    let val = '';
    let temp = amenity_obj;
    let h4_tag = $('.filters h4.amenity_h4');
    if (obj_type === 'State' || obj_type === 'City') {
      temp = state_obj;
      h4_tag = $('.filters h4.state_h4');
    }
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
  $('.filters button').click(function () {
    $('section.places article').remove();
    const am = 'amenities';
    const cy = 'cities';
    const st = 'states';
    search_place({ am: Object.keys(amenity_obj), cy: Object.keys(city_obj), st: Object.keys(state_obj) });
  });
});
