(function(window) {
    'use strict';
    var app = angular.module('app', ['gettext']).
    controller('mainCtrl', ['$rootScope','$scope', 'gettextCatalog', function($rootScope, $scope, gettextCatalog) {
        $scope.hello = 'this is hello from the scope';
        $scope.env = {
            myVar: 'Mystrata, 3001 Al shata tower building',
            registers: 11,
            twoRegisters: 2,
            singleRegister: 1,
            multipleRegister: 6
        };

        $rootScope.pageLang = 'en';
        $rootScope.pageDir = 'ltr';

        console.log('catalog is :::', gettextCatalog);

        $scope.setBase = function() {
           gettextCatalog.setCurrentLanguage(gettextCatalog.baseLanguage);
           $rootScope.pageDir = 'ltr';
        };

        $scope.switchLanguage = function(lang) {
            gettextCatalog.setCurrentLanguage(lang);
            gettextCatalog.loadRemote("dist/translations/" + lang + ".json");
        };

        // change language from links
        $scope.setLang = function(lang) {
            if (lang === 'ar') {
                $rootScope.pageDir = 'rtl';
            } else {
                $rootScope.pageDir = 'ltr';
            }
            $rootScope.pageLang = lang;
            gettextCatalog.setCurrentLanguage(lang);
            gettextCatalog.loadRemote("dist/translations/" + lang + ".json");
        };

    }]);

    // Set the default language to english
    angular.module('app').run(function(gettextCatalog) {
        gettextCatalog.setCurrentLanguage(gettextCatalog.baseLanguage);
        //gettextCatalog.debug = true;
    });
}(window));
