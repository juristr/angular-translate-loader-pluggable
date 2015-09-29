'use strict';

describe('test ng-translate', function() {
  var $translate,
    $scope,
    $httpBackend;

  beforeEach(function() {
    // define a demo app
    angular
      .module('demo', [
        'pascalprecht.translate',
        'angular-translate-loader-pluggable'
      ])
      .config(function($translateProvider, translatePluggableLoaderProvider) {
        // translatePluggableLoaderProvider.setTranslate($translateProvider);

        $translateProvider
            .translations('de', {
              'anotherModuleMessage': 'I bin vom partial loader Modul'
            });

        $translateProvider.useLoader('translatePluggableLoader');
        $translateProvider.use('de');
      });
  });

  beforeEach(angular.mock.module('demo'));

  beforeEach(inject(function(_$translate_, $rootScope, _$httpBackend_) {
    $translate = _$translate_;
    $scope = $rootScope.$new();
  }));

  afterEach(function() {
  });

  it('should properly resolve translations from a partial loader', function() {
    $translate('anotherModuleMessage').then(function(text) {
      expect(text).toEqual('I bin vom partial loader Modul');
    });
  });

  it('should properly resolve when using the "instant()" function', function() {
    expect($translate.instant('anotherModuleMessage')).toEqual('I bin vom partial loader Modul');
  });

});
