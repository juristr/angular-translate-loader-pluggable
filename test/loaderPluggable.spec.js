'use strict';

describe('the pluggble angular-translate loader', function() {
  var $translate,
    $scope,
    $httpBackend;

  beforeEach(angular.mock.module('angular-translate-loader-pluggable'));

  beforeEach(function() {
    // define a demo app
    angular
      .module('demo', [
        'partialModule',
        'staticTranslationsModule',

        'angular-translate-loader-pluggable',
        'pascalprecht.translate'
      ])
      .config(function($translateProvider, translatePluggableLoaderProvider) {
        translatePluggableLoaderProvider
          .translations('de', {
            "greeting": {
              "friendly": "Hallo, wie geht es dir?"
            }
          })
          .translations('en', {
            "greeting": {
              "friendly": "Hey there! How is it going?"
            }
          });

        $translateProvider.useLoader('translatePluggableLoader');
        $translateProvider.use('de');
      });

    // a pluggable module of the application (potentially also 3rd party)
    // that uses the partial loader mechanism
    angular
      .module('partialModule', ['angular-translate-loader-pluggable'])
      .config(function(translatePluggableLoaderProvider, $translatePartialLoaderProvider) {
        // this module uses the $translatePartialLoader
        translatePluggableLoaderProvider.useLoader('$translatePartialLoader', {
          urlTemplate: '{part}-locale-{lang}.json'
        });

        $translatePartialLoaderProvider.addPart('anothermodule');
      });

    // hard coded translations
    angular.module('staticTranslationsModule', ['angular-translate-loader-pluggable'])
      .config(function(translatePluggableLoaderProvider) {
        translatePluggableLoaderProvider
          .translations('de', {
            "anotherMessage": "Anderes Message!"
          })
          .translations('en', {
            "anotherMessage": "Some Message!"
          });
      })
      .directive('localesStatic', function() {
        return {
          template: '<p><b>Locales static:</b> {{ "anotherMessage" | translate }}</p>'
        }
      });
  });

  beforeEach(angular.mock.module('demo'));

  beforeEach(inject(function(_$translate_, $rootScope, _$httpBackend_) {
    $translate = _$translate_;
    $scope = $rootScope.$new();

    $httpBackend = _$httpBackend_;

    $httpBackend.whenGET('anothermodule-locale-de.json').respond(200, {
      "de": {
        "anotherModuleMessage": "I bin vom partial loader Modul"
      }
    });
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should properly resolve static translations', function() {
    $translate('greeting.friendly').then(function(text) {
      expect(text).toEqual('Hallo, wie geht es dir?');
    });
    $httpBackend.flush();
  });

  it('should properly resolve translations from a partial loader', function() {
    $translate('anotherModuleMessage').then(function(text) {
      expect(text).toEqual('I bin vom partial loader Modul');
    });
    $httpBackend.flush();
  });

  it('should properly resolve translations from another module', function() {
    $translate('anotherMessage').then(function(text) {
      expect(text).toEqual('Anderes Message!');
    });
    $httpBackend.flush();
  });

});