const moduleName = 'angular-translate-loader-pluggable';

angular
  .module(moduleName, [
    'pascalprecht.translate'
  ])
  .provider('translatePluggableLoader', translatePluggableLoaderProvider);

function translatePluggableLoaderProvider(): any {
  let loaders = [];
  let translationTable = {};

  this.useLoader = function (loaderName, options) {
    loaders.push({
      name: loaderName,
      options: options
    });

    return this;
  };

  this.translations = function (language, translations) {
    translationTable[language] = angular.extend({}, translationTable[language], translations);

    return this;
  };

  this.$get = function ($q, $injector) {
    return function (options) {
      let deferred = $q.defer();

      let loaderInstances = [];

      // lookup in translation table
      loaderInstances.push(function () {
        let deferred = $q.defer();

        deferred.resolve(translationTable[options.key]);

        return deferred.promise;
      } ());

      // lookup in loaders
      for (let i = 0; i < loaders.length; i++) {
        let loader = loaders[i];

        // get the loader and resolve it, passing in the required options
        let loaderPromise = $injector.get(loader.name)(angular.extend(options, loader.options));
        loaderInstances.push(loaderPromise);
      }

      $q.all(loaderInstances)
        .then(function (loaders) {
          let result;

          for (let i = 0; i < loaders.length; i++) {
            result = angular.extend({}, result, loaders[i]);
          }

          deferred.resolve(result);
        });


      return deferred.promise;
    };
  };
}

const moduleDefinition = {
  name: moduleName
}

export default moduleDefinition;
