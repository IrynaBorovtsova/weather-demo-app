'use strict';

angular
  .module('mapDemoApp', ['ngMaterial'])
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue', {
        'default': '800'
      });
  })
  .directive('leafletMap', function() {
    return {
      restrict: 'E',
      replace: true,
      template: '<div id=\'map\' style="position:absolute; width:100%; height:100%;"></div>',
      link: function(scope, element, attrs) {

        var map = L.map(attrs.id).setView([42.3610, -71.0587], 15); //.setView([49.8433784,24.0276888], 12);
        L.tileLayer('http://api.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token={token}', {
          //  maxZoom: 12,
          token: 'pk.eyJ1IjoiaWJvcm92dHNvdmEiLCJhIjoiY2lvYnd5ejR6MDA0c3czbTVwOWx5Zmc1MCJ9.v1O7fqyBZOnRMsHbEZgwCQ'
        }).addTo(map);
      }
    }
  });
