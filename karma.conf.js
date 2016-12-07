module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    frameworks: ['jasmine'],
    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-aria/angular-aria.js',
      'bower_components/angular-messages/angular-messages.js',
      'bower_components/angular-material/angular-material.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/md5/src/md5.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/angular-material/angular-material-mocks.js',
      'app/*.js',
      'app/shared/**/*.js',
      'app/components/**/*.js'
    ]

  });
};