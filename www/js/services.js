//var apiROOT = 'http://154.0.164.72:8080/siyaleader-durban-port/public/';

var apiROOT = 'http://localhost:8000/';

angular.module('starter.services', [])

var APIKEY;
var api_key;
angular.module('starter.services', ['http-auth-interceptor'])
    .directive('fileModel', ['$parse',
        function($parse) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    var model = $parse(attrs.fileModel);
                    var modelSetter = model.assign;

                    element.bind('change', function() {
                        scope.$apply(function() {
                            modelSetter(scope, element[0].files[0]);
                        });
                    });
                }
            };
        }
    ])





.directive('appFilereader', function($q) {
      var slice = Array.prototype.slice;

      return {
          restrict: 'A',
          require: '?ngModel',
          link: function(scope, element, attrs, ngModel) {
                  if (!ngModel) return;

                  ngModel.$render = function() {};

                  element.bind('change', function(e) {
                      var element = e.target;

                      $q.all(slice.call(element.files, 0).map(readFile))
                          .then(function(values) {
                              if (element.multiple) ngModel.$setViewValue(values);
                              else ngModel.$setViewValue(values.length ? values[0] : null);
                          });

                      function readFile(file) {
                          var deferred = $q.defer();

                          var reader = new FileReader();
                          reader.onload = function(e) {
                              deferred.resolve(e.target.result);
                          };
                          reader.onerror = function(e) {
                              deferred.reject(e);
                          };
                          reader.readAsDataURL(file);

                          return deferred.promise;
                      }

                  }); //change

              } //link
      }; //return
  })






    .factory('AuthenticationService', function($q, $rootScope, $http,  authService, User , $state ,  $cordovaSQLite ,$ionicPlatform ,  $ionicLoading) {
      var service = {
          login: function(user) {


                      /*    $ionicPlatform.ready(function() {
                                if(window.Connection) {
                                    if(navigator.connection.type == Connection.NONE) {

                                        //   password: user.password
                                        if  (user.cell == null)
                                        {
                                             $ionicLoading.hide({
                                           template: 'Loggin In...'
                                       });
                                             var alertPopup = $ionicPopup.alert({
                                              title: 'Erro ',
                                             template: 'wrong  user name  or password'
                                          });
                                        }else
                                        {
                                        var query = "SELECT  cellphone ,key  FROM  user WHERE  cellphone =  (?)";
                                            $cordovaSQLite.execute(db, query, [user.cell]).then(function(res) {
                                                if(res.rows.length > 0) {
                                      //        console.log("SELECTED -> " + res.rows.item(0).key + " " +  res.rows.item(0).id );
                                         $ionicLoading.hide({
                                           template: 'Log...'
                                       });
                                            //     $state.go('app.profile');

                                            $state.go('app.profile', {}, {
                                                       reload: true,
                                                       inherit: false
                                                   });

                                                }
                                                }, function (err) {

                                              console.error(err);
                                            });
                                       }

                                   }else{   */



            if (localStorage.getItem("key")) {
                          APIKEY = localStorage.getItem("key");


                          var  api_key   = APIKEY ;


                      }

              $http.post(apiROOT + 'api/v1/login', {
                      cell: user.cell,
                      password: user.password,
                      api_key : APIKEY
                  }, {
                      ignoreAuthModule: true
                  })
                  .success(function(data, status, headers, config) {
                      var obj = data;
                      if (obj.error) {
                          $rootScope.$broadcast('event:auth-login-failed', status);
                      } else {

                          APIKEY  = obj.apiKey;
                          api_key = obj.api_key;
                          $http.defaults.headers.common.api_key = APIKEY ; // Step 1
                          $http.defaults.headers.common.api_key_new = api_key;
                          User.setDetails(obj);
                          localStorage.setItem("Cell1", obj.cell_no);
                          localStorage.setItem("key",APIKEY);


                          // Need to inform the http-auth-interceptor that
                          // the user has logged in successfully.  To do this, we pass in a function that
                          // will configure the request headers with the authorization token so
                          // previously failed requests(aka with status == 401) will be resent with the
                          // authorization token placed in the header

                          var query = "INSERT INTO user (cellphone ,key ) VALUES (? ,?)";
                                              $cordovaSQLite.execute(db, query, [obj.cell_no,APIKEY]).then(function(res) {
                                              console.log("INSERT ID -> " + res.insertId);
                                                  }, function (err) {
                                                console.error(err);
                                              });


                          authService.loginConfirmed(data, function(config) {
                              // Step 2 & 3

                              localStorage.setItem("key", APIKEY);
                              config.headers.Authorization.api_key     = APIKEY;
                              config.headers.Authorization.api_key_new = api_key;

                              console.log(config);
                              return config;

                          });
                      }
                  })
                  .error(function(data, status, headers, config) {
                      $rootScope.$broadcast('event:auth-login-failed', status);
                  });

        //   }

      //      }

  //     });


          },
      updatecase: function  (selectedId ,notice) {
                         var    response = [] ;

                      if (localStorage.getItem("key")) {
                                    APIKEY = localStorage.getItem("key");


                                    var  api_key   = APIKEY;

                                    var  id   =    selectedId.id ;
                                    var  note  =    notice.text ;

                                }



                              $http({
                              url: apiROOT + 'api/v1/updatecasemobile?api_key=' + api_key + '&id=' +  id + '&note=' + note ,
                                            method: "POST",

                              headers: {
                                   'api_key': APIKEY,
                                   'api_key_new':APIKEY
                                   }

                                 }).success(function(data) {


 $rootScope.$broadcast('event:auth-update-complete',data.msg);

               console.log(data.msg)

           }
       ).error(
           function(data) {
               alert('There was error on  updating  your report .');
               console.log('MY REPORTS Error', data);

           }
       );


      },




      requestclose:function (selectedId ,notice) {

          var    response = [] ;

                      if (localStorage.getItem("key")) {
                                    APIKEY = localStorage.getItem("key");


                                    var  api_key   = APIKEY;

                                    var  id   =    selectedId.id ;

                                    var  note  =    notice.text ;

                                }



                              $http({
                              url: apiROOT + 'api/v1/requestcloser?api_key=' + api_key + '&id=' +  id + '&note=' + note ,
                                            method: "POST",

                              headers: {
                                   'api_key': APIKEY,
                                   'api_key_new':APIKEY
                                   }

                                 }).success(function(data) {


   $rootScope.$broadcast('event:auth-closouer-complete',data.msg);

               console.log(data.msg)

           }
       ).error(
           function(data) {
               alert('There was error on  request  closouser   .');
               console.log('MY REPORTS Error', data);

           }
       );



      },

          logout: function(user) {
              $http.post(apiROOT + 'api/v1/logout', {}, {
                      ignoreAuthModule: true
                  })
                  .finally(function(data) {
                      delete $http.defaults.headers.common.Authorization;
                      $rootScope.$broadcast('event:auth-logout-complete');
                  });
          },

          loginCancelled: function() {
              authService.loginCancelled();
          },

      };




      return service;
  })



      .factory('User', function() {
              var user = {
                  details: {
                      id: null,
                      name: null,
                      cell: null,
                      apiKey: null
                  },
                  setDetails: function(user) {
                      this.details = user;
                  }
              };
              return user;
          })




          .factory('getallusers', function($rootScope, $http) {
                     var categories = {
                         getCategories: function() {
                             var catuser = {};
                             $http.get(apiROOT + 'aapi/v1/getallusers')
                                 .success(function(data, status, headers, config) {
                                     var str = data.slice(1);
                                     var obj = JSON.parse(str);
                                     if (obj.error) {
                                         $rootScope.$broadcast('event:categories-failed', obj.message);
                                     } else {
                                         $rootScope.$broadcast('event:categories-success', obj.message);
                                     }

                                 })
                                 .error(function(data, status, headers, config) {
                                     console.log("Error occurred.  Status:" + status);
                                 });

                         }
                     };
                     return categories;
                 })

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
