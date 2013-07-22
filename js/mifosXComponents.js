define(['underscore', 'mifosX'], function() {
  var components = {
    models: [
      'LoggedInUser',
      'roleMap'
    ],
    controllers: [
      'MainController',
      'LoginFormController',
      'UserController',
      'RoleController'
    ],
    services: [
      'ResourceFactoryProvider',
      'HttpServiceProvider',
      'AuthenticationService',
      'SessionManager'
    ],
    directives: [
      'DataTablesDirective',
      'OverlayDirective'
    ]
  };

  require(_.reduce(_.keys(components), function(list, group) {
    return list.concat(_.map(components[group], function(name) { return group + "/" + name; }));
  }, [
    'routes',
    'webstorage-configuration'
  ]));
});
