var moduleName = 'angular-translate-loader-pluggable';

angular
  .module(moduleName, [
    'pascalprecht.translate'
  ])
  .provider('translatePluggableLoader', translatePluggableLoaderProvider);

function translatePluggableLoaderProvider() {
  var loaders = [];
  var translationTable = {};

  this.useLoader = function(loaderName, options) {
    loaders.push({
      name: loaderName,
      options: options
    });

    return this;
  };

  this.translations = function(language, translations) {
    translationTable[language] = angular.extend({}, translationTable[language], translations);

    return this;
  };

  this.$get = function($q, $injector) {
    return function(options) {
      var deferred = $q.defer();

      var loaderInstances = [];

      // lookup in translation table
      loaderInstances.push(function() {
        var deferred = $q.defer();

        deferred.resolve(translationTable[options.key]);

        return deferred.promise;
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

return moduleName;
