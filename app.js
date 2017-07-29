(function() {
var FLICKR_API_KEY = '348d610e39736195b837adc439effa70';
var FLICKR_API_URL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api+key='

function getPhotosForSearch(searchTerms) {

var url = `${FLICKR_API_URL}${FLICKR_API_KEY}&text=${searchTerms}`;
return(
    $.getJSON(url) 
    .then(data => data.photos.photo) 
);

}
 
function createFlickrThumb(photoData) {
    
var thumbnail = `https://farm${photoData.farm}.staticflickr.com/${photoData.server}/${photoData.id}_${photoData.secret}_q.jpg`;
var large = `https://farm${photoData.farm}.staticflickr.com/${photoData.server}/${photoData.id}_${photoData.secret}.jpg`;
var title = `${photoData.title}`
    
  var link = $("<a></a>"); 
  link.attr('href', large); 
  link.attr('target', '_blank'); 
  var image = $("<img></img>"); 
  image.attr('src', thumbnail); 
  image.attr('alt', title); 
  link.append(image); 
 
  return link; 
}

var app = $('#app');
var searchForm = app.find('.search-form');
var searchInput = searchForm.find('.search-input'); 
var flickrPhotos = app.find('.flickr-photos');


  searchForm.on('submit', function(event) {   //searchForm.addEventListener('submit', function(event) 
  event.preventDefault(); 
  getPhotosForSearch(searchInput.val()) 
    .then(photos => { 
        photos.forEach(function(photo) { 
        flickrPhotos.append(createFlickrThumb(photo)); 
      });
    });
});

getPhotosForSearch();

//page loader

var overlay = document.getElementById("overlay");

window.addEventListener('load', function () {
  overlay.style.display = 'none';

    
});

} ())