'use strict';

describe('the pluggble loader', function(){
    var $translate,
        $scope;

    beforeEach(angular.mock.module('angular-translate-loader-pluggable'));

    beforeEach(function(){
      // define a demo app
      angular
        .module('demo', [
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
    });

    beforeEach(angular.mock.module('demo'));

    beforeEach(inject(function(_$translate_, $rootScope){
        $translate = _$translate_;
        $scope = $rootScope.$new();
    }));

    it('should properly resolve static translations', function(done){
        $translate('greeting.friendly').then(function(text){
            expect(text).toEqual('Hallo, wie geht es dir?');
            done();
        });
        $scope.$digest();
    });

})