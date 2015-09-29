'use strict';

angular
  .module('angular-translate-loader-pluggable', [
    'pascalprecht.translate'
  ])
  .provider('translatePluggableLoader', translatePluggableLoaderProvider);

function translatePluggableLoaderProvider() {
  var loaders = [];

  this.useLoader = function(loaderName, options) {
    loaders.push({
      name: loaderName,
      options: options
    });

    return this;
  };

  this.$get = function($q, $injector, $translate) {
    return function(options) {
      var deferred = $q.defer();

      var loaderInstances = [];

      // lookup in translation table
      loaderInstances.push(function() {
        // var deferred = $q.defer();
        // deferred.resolve(translationTable[options.key]);
        // return deferred.promise;
        return $translate(options.key);
      }());

      // lookup in loaders
      for (var i = 0; i < loaders.length; i++) {
        var loader = loaders[i];

        // get the loader and resolve it, passing in the required options
        var loaderPromise = $injector.get(loader.name)(angular.extend(options, loader.options));
        loaderInstances.push(loaderPromise);
      }

      $q.all(loaderInstances)
        .then(function(loaders) {
          var result;

          for (var i = 0; i < loaders.length; i++) {
            result = angular.extend({}, result, loaders[i]);
          }

          deferred.resolve(result);
        });


      return deferred.promise;
    };
  };
}
