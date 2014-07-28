var express = require('express');
var router = express.Router();

var geocoder = require('geocoder');

function getLocation (latitute, longitude, callback) {
  geocoder.reverseGeocode(latitute, longitude, callback);
}

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Example geolocation with geocoder' });
});

router.post('/position', function (req, res) {
  var latitute = req.body.latitude;
  var longitude = req.body.longitude;
  getLocation(latitute, longitude, function (err, data) {
    res.json({
      data: data
    });
  });
})

module.exports = router;
