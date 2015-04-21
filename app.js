(function(window) {
    'use strict';
    var app = angular.module('app', ['gettext', 'ui.bootstrap', 'tmh.dynamicLocale', 'ngRoute'])
        .config(['tmhDynamicLocaleProvider', function(tmhDynamicLocaleProvider) {
            tmhDynamicLocaleProvider.localeLocationPattern('bower_components/angular-i18n/angular-locale_{{locale}}.js');
        }])
        .run(function(gettextCatalog, $rootScope) {
            var defaultLang = 'fr';
            gettextCatalog.setCurrentLanguage(defaultLang);
            gettextCatalog.loadRemote("dist/translations/" + defaultLang + ".json");
            gettextCatalog.debug = true;
        })
        .controller('mainCtrl', ['$rootScope', '$scope', 'gettextCatalog', 'tmhDynamicLocale', '$locale', '$http', '$route', function($rootScope, $scope, gettextCatalog, tmhDynamicLocale, $locale, $http, $route) {
            $scope.hello = 'this is hello from the scope';
            $scope.env = {
                myVar: 'Mystrata, 3001 Al shata tower building',
                registers: 11,
                twoRegisters: 2,
                singleRegister: 1,
                multipleRegister: 6
            };

            $rootScope.pageLang = 'fr';
            $rootScope.pageDir = 'ltr';
            $scope.locale = 'ar-tn';
            $scope.dt = new Date('dd-MMMM-yyyy');
            window.localStorage.setItem("locale", $scope.locale);
            $route.reload();
            // Ui calendar
            // initialize a datepicker
            $scope.open = function($event) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.opened = true;
            };

            $scope.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };
            $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            $scope.format = $scope.formats[0];

            $scope.setBase = function() {
                gettextCatalog.setCurrentLanguage(gettextCatalog.baseLanguage);
                $rootScope.pageDir = 'ltr';
                tmhDynamicLocale.set('en-us');
            };

            $scope.switchLanguage = function(lang) {
                gettextCatalog.setCurrentLanguage(lang);
                gettextCatalog.loadRemote("dist/translations/" + lang + ".json");
            };
            // change language from links
            $scope.setLang = function(lang, locale) {
                if (lang === 'ar') {
                    $rootScope.pageDir = 'rtl';
                } else {
                    $rootScope.pageDir = 'ltr';
                }
                $rootScope.pageLang = lang;
                gettextCatalog.setCurrentLanguage(lang);
                gettextCatalog.loadRemote("dist/translations/fr.json");
                $http.get('bower_components/angular-i18n/angular-locale_fr-fr.js').
                  success(function(data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    tmhDynamicLocale.set(locale);
                    // changes dt to apply the $locale changes
                    $scope.dt = new Date($scope.dt.getTime());
                    $scope.dt = new Date();
                    $scope.$apply;
                    $rootScope.$apply;
                    $route.reload();
                  }).
                  error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                  });


                // $scope.$watch('model.locale', function(locale) {
                //    // invoke "set" when your desired locale changes
                //    tmhDynamicLocale.set('fr-fr');
                //    $scope.$apply;
                // });
            };

        }]);

}(window));
