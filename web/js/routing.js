ikApp.config(function($routeProvider) {$routeProvider
  .when('/', {
    controller: 'IndexController',
    templateUrl: 'partials/index.html'
  })
  .when('/channels', {
    controller: 'ChannelsController',
    templateUrl: 'partials/channel/channels.html'
  })
  .when('/slides', {
    controller: 'SlidesController',
    templateUrl: 'partials/slide/slides.html'
  })
  .when('/screens', {
    controller: 'ScreensController',
    templateUrl: 'partials/screen/screens.html'
  })
  .when('/templates', {
    controller: 'TemplatesController',
    templateUrl: 'partials/templates.html'
  })
  .when('/screen', {
    controller: 'ScreenController',
    templateUrl: 'partials/screen/screen.html'
  })
  .when('/screen/:id', {
    controller: 'ScreenController',
    templateUrl: 'partials/screen/screen.html'
  })
  .when('/slide', {
    controller: 'SlideController',
    templateUrl: 'partials/slide/slide.html'
  })
  .when('/slide/:id', {
    controller: 'SlideController',
    templateUrl: 'partials/slide/slide.html'
  })
  .when('/channel', {
    controller: 'ChannelController',
    templateUrl: 'partials/channel/channel.html'
  })
  .when('/channel/:id', {
    controller: 'ChannelController',
    templateUrl: 'partials/channel/channel.html'
  })
  .when('/media', {
    controller: 'MediaController',
    templateUrl: 'partials/media.html'
  })
  .otherwise({redirectTo: '/'});
});
