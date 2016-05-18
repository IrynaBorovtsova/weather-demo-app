'use strict';

angular
  .module('mapDemoApp', ['ngMaterial', 'leaflet-directive'])
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('light-blue', {
        'default': '900'
      })
      .backgroundPalette('grey', {
        'default': '50'
      });
  })
  .controller('DemoAppCtrl', ['$scope', function($scope) {
    angular.extend($scope, {
      london: {
        lat: 42.3610,
        lng: -71.0587,
        zoom: 15
      },
      layers: {
        baselayers: {
          googleTerrain: {
            name: 'Google Terrain',
            layerType: 'TERRAIN',
            type: 'google'
          },
          googleHybrid: {
            name: 'Google Hybrid',
            layerType: 'HYBRID',
            type: 'google'
          },
          googleRoadmap: {
            name: 'Google Streets',
            layerType: 'ROADMAP',
            type: 'google'
          }
        }
      },
      defaults: {
        tileLayer: 'http://api.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token={token}',
        tileLayerOptions: {
          opacity: 0.9,
          detectRetina: true,
          reuseTiles: true,
          token: 'pk.eyJ1IjoiaWJvcm92dHNvdmEiLCJhIjoiY2lvYnd5ejR6MDA0c3czbTVwOWx5Zmc1MCJ9.v1O7fqyBZOnRMsHbEZgwCQ'
        },
        scrollWheelZoom: false
      },
      events: {}
    });

    $scope.markers = [];
    $scope.$on('leafletDirectiveMap.click', function(event, args) {
      var leafEvent = args.leafletEvent;
      $scope.markers.push({
        lat: leafEvent.latlng.lat,
        lng: leafEvent.latlng.lng,
        message: 'My Added Marker',
        draggable: true
      });
    });

    $scope.$watch(function() {
      return angular.element(document.querySelector('.map-container'))[0].offsetHeight;
    }, function(newValue) {
      $scope.mapHeight = newValue;
    });
  }]);
