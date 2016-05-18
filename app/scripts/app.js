'use strict';

angular
  .module('weatherDemoApp', ['ngResource'])
  .filter('percentage', ['$filter', function($filter) {
    return function(input, decimals) {
      return $filter('number')(input, decimals) + '%';
    };
  }])
  .filter('formatter', function() {
    return function(input, symbol) {
      return (input) ? input.toString().concat(' ', symbol) : '';
    };
  })
  .filter('offset', function() {
    return function(input, start) {
      if (input) {
        start = parseInt(start, 10);
        return input.slice(start);
      }
      return [];
    };
  })
  .factory('WeatherService', ['$resource',
    function($resource) {
      return $resource('http://api.openweathermap.org/data/2.5/forecast', {
        APPID: '333703333f3f4a53cd3c3866fe0057ca',
        units: 'metric'
      }, {
        get: {
          method: 'GET'
        }
      });
    }
  ])
  .directive('hcChart', function() {
    return {
      restrict: 'E',
      template: '<div></div>',
      scope: {
        options: '='
      },
      link: function(scope, element) {
        scope.options.chart.width = element.parent().width();
        var chart = new Highcharts.chart(element[0], scope.options);

        scope.$watch(function() {
          return scope.options.series[0].data;
        }, function(newValue) {
          console.log('redraw', newValue);
          chart.series[0].setData(newValue);
        }, true)
      }
    };
  })
  .controller('WeatherDemoCtrl', ['$scope', '$timeout', '$filter', 'WeatherService', function($scope, $timeout, $filter, WeatherService) {
    $scope.locations = [{
      id: 702550,
      name: 'Lviv',
      lat: 49.838261,
      lng: 24.023239,
      code: 'UA'
    }, {
      id: 703448,
      name: 'Kiev',
      lat: 50.433334,
      lng: 30.516666,
      code: 'UA'
    }, {
      id: 698740,
      name: 'Odessa',
      lat: 46.477474,
      lng: 30.732622,
      code: 'UA'
    }];

    $scope.$watch('location', function(id) {
      WeatherService.get({
        id: id
      }).$promise.then(function(resp) {
        console.log('resp', resp);
        $scope.forecast = resp.list;

        $scope.highchartsConfig.series[0].data = resp.list
          .slice(0, 10)
          .map(function(item) {
            return {
              color: '#637a8a',
              y: parseFloat(item.main.temp),
              x: item.dt * 1000
            };
          });
      });
    });

    $scope.location = 702550;



    $scope.highchartsConfig = {
      chart: {
        type: 'column',
        marginTop: 45
      },
      title: {
        text: ''
      },
      yAxis: {
        title: {
          text: ''
        }
      },
      xAxis: {
        labels: {
          rotation: -45,
          formatter: function() {
            console.log('for', this.value);
            return $filter('date')(this.value, 'MMM d, HH:mm');
          }
        }
      },
      legend: {
        enabled: false
      },
      tooltip: {
        headerFormat: '<span style="font-size:11px">{point.x: %b %d, %H:%M}</span><br>',
        pointFormat: '<span>Temperature</span>: <b>{point.y: .0f}</b><br/>'
      },
      series: [{
        pointWidth: 55,
        data: []
      }]
    };

  }]);
