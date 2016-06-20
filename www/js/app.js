var app = angular.module('simple-todo', ['ionic', 'LocalStorageModule', 'todos.controllers'])


app.config(function($stateProvider, $urlRouterProvider, localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('simple-todo');

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })

    // Each tab has its own nav history stack:
    .state('tab.dash', {
      url: '/dash',
      views: {
        'tab-dash': {
          templateUrl: 'templates/tab-dash.html'
        }
      }
    })

    .state('tab.complete', {
        url: '/completed',
        views: {
          'tab-completed': {
            templateUrl: 'templates/tab-completed.html'
          }
        }
      })
    .state('tab.incomplete', {
      url: '/incomplete',
      views: {
        'tab-incomplete': {
          templateUrl: 'templates/tab-incomplete.html'
        }
      }
    })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});


app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
