;(function (w, d, n, undefined) {

  var main = (function () {

    var exports = {};

    var _getCurrentPosition = function () {
        if (n.geolocation) {
            n.geolocation.getCurrentPosition(function (position) {
              d.getElementById('latitude').value = position.coords.latitude;
              d.getElementById('longitude').value = position.coords.longitude;

              _sendAjax();
            });
        } else { 
            d.getElementById('result') = "Geolocation is not supported by this browser.";
        }
    };

    var _buildData = function () {
      var latitude = d.getElementById('latitude').value;
      var longitude = d.getElementById('longitude').value;
      var data = 'latitude=' + latitude + '&longitude=' + longitude;

      return data;
    };

    var _buildResult = function (results) {
      var value = ''
      results.forEach(function (result) {
        value += '<li>' + result.formatted_address + '</li>';
      });
      d.getElementById('result').innerHTML = value;
    };

    var _doAjax = function (data) {
      var xhr = new XMLHttpRequest();

      xhr.open('POST', '/position', true);

      xhr.onload = function () {

        if (xhr.status === 200) {
          var resp = JSON.parse(xhr.responseText);
          _buildResult(resp.data.results);
        }

      };

      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.send(data);
    };

    var _getSearchPosition = function () {
      d.getElementById('form').addEventListener('submit', function (e) {

        e.preventDefault();

        _sendAjax();    

      }, false);
    };

    var _sendAjax = function () {
      // input values
        data = _buildData();

        // ajax
        _doAjax(data);
    };

    exports.init = function () {
      _getCurrentPosition();
      _getSearchPosition();
    };
    
    return exports;

  })();

  main.init();

})(window, document, navigator);