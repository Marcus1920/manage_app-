// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js  'ionic.service.push','ionic.service.core',
//'ngFileUpload'
//'ui.uploader'


angular.module('starter', ['ionic', 'starter.controllers', 'starter.services' ,'ionic-material', 'ionMdInput','ng-cordova' ,'ngCordova' ,'ui.calendar' ,'ngSanitize', 'ui.select' ])
.run(function($ionicPlatform ,$cordovaSQLite , $http ,$ionicPopup ,$cordovaPush ,  $rootScope ) {


    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          //    cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }


    /*    var   cellphone    =   $scope.cellphone ;
        var   duedate      =   $scope.formatduedate ;
        var   duetime      =   $scope.case.duetime  ;
        var   etimatdate   =   $scope.formatetimatdate;
        var   etimatime    =   $scope.case.duetime;
        var   depart       =   $scope.dep.selected.name;
        var   cat          =   $scope.cat.selected.name;
        var   subcat       =   $scope.Sub.selected.name;
        var   message      =   $scope.case.message;
        var   description  =   $scope.case.description;

                                                                                                                                                                                                                                                      */



          db = window.openDatabase("my.db", '1', 'my', 1024 * 1024 * 100); // browser
          $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS  Report (id integer primary key, destination int ,names VARCHAR(60) ,emails VARCHAR(60) ,number text ,duedate  VARCHAR(60) , duetime  text  ,etimatdate text, etimatime  text , depart  text , category  text , sub_category  text , message  text , description  text )");
          $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS  user (id integer primary key, cellphone text ,key text ,password text  )");
          $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS  categories ( slug VARCHAR(60) UNIQUE ,name VARCHAR(60) UNIQUE,created_by text, updated_by text , active int , created_at text,updated_at text  ,boid int ,department int )");
           console.log("1");
           $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS  subcategories( slug VARCHAR(60) UNIQUE ,name VARCHAR(60) UNIQUE,created_by int, updated_by int , active int , created_at text,updated_at text ,boid int ,category int )");
           console.log("2");
           $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS  department ( slug VARCHAR(60) UNIQUE ,name VARCHAR(60) UNIQUE,created_by int, updated_by int , active int , created_at text,updated_at text ,boid int)");
            console.log("3");
           $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS  susubbcategories ( slug VARCHAR(60) UNIQUE ,name VARCHAR(60) UNIQUE,created_by int, updated_by int , active int , created_at text,updated_at text ,boid int)");
             console.log("4")
           $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS  contacts (codid int , name VARCHAR(60) UNIQUE ,surname VARCHAR(60) UNIQUE,email text,cellphone text , id  text  )");
           console.log("5");


     console.log("done");
    });
})




.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    // Turn off caching for demo simplicity's sake
  //  $ionicConfigProvider.views.maxCache(0);

    /*
    // Turn off back button text
    $ionicConfigProvider.backButton.previousTitleText(false);
    */

            // org.apache.cordova.statusbar required



    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })




        $stateProvider.state('tabs', {
            url: '/tabs',
            abstract: true,
            templateUrl: 'templates/tabs.html'

        })


    .state('app.mycases', {
        url: '/mycases',
        views: {
            'menuContent': {
                templateUrl: 'templates/mycases.html',
                controller: 'ActivityCtrl'
            },
            'fabContent': {
                template: '<button id="fab-activity"  ng-lick="refresh()" class="button button-fab button-fab-top-right expanded button-energized-900 flap"><i class="icon ion-paper-airplane"></i></button>',
                controller: function ($timeout , $scope) {


                  $scope.add  =  function  ()  {
                  $state.go('app.friends', {}, {
                      reload: true,
                      inherit: false
                  });


                }



                }
            }
        }
    })




    .state('app.newproject', {
        url: "/newproject",
        views: {
            'menuContent': {
                controller: "NewProjectCtrl",
                templateUrl: "templates/newproject.html"
            }
        }
    })

    .state('app.map', {
                url: "/newproject/:map",
                views: {
                    'menuContent': {
                        controller: "NewProjectCtrl",
                        templateUrl: "templates/map.html"
                    }
                }
            })



    .state('app.notification', {
        url: '/notification',
        views: {
            'menuContent': {
                templateUrl: 'templates/notification.html',
                controller: 'NotificationCtrl'
            },
            'fabContent': {
                template: '<button id="fab-activity" ng-click="refrersh()" class="button button-fab button-fab-top-right expanded button-energized-900 flap"><i class="icon ion-paper-airplane"></i></button>',
                controller: function ($timeout , $scope) {



                }
            }

        }
    })




    .state('app.friends', {
        url: '/friends',
        views: {
            'menuContent': {
                templateUrl: 'templates/friends.html',
                controller: 'FriendsCtrl'
            },
            'fabContent': {
                template: '<button id="fab-friends" ng-click="createcase()" class="button button-fab button-fab-top-left expanded button-balanced-900 spin"><i class="icon ion-loop"></i></button>',
                controller: function ($timeout , $scope , $ionicLoading , $http , $filter ,  $cordovaSQLite , $ionicPopup ) {
            /*        $timeout(function () {
                        document.getElementById('fab-friends').classList.toggle('on');
                    }, 900);



                    $scope.createcase = function()   {

                      $scope.tasks  =  [] ;
                      var query = "SELECT  *  FROM Report ";


                      $cordovaSQLite.execute(db, query, []).then(function(res) {


                          if(res.rows.length > 0) {
                              console.log("SELECTED -> " + res.rows.item(0).firstname + " " +  res.rows.item(0).id );





                      for (var i=0; i< res.rows.length; i++) {


                      $scope.tasks.push({
                      "id":res.rows.item(i).id,
                      "to":res.rows.item(i).destination,
                      "names":res.rows.item(i).names,
                      "emails":res.rows.item(i).emails,
                      "number":res.rows.item(i).number,
                      "depart":res.rows.item(i).depart,
                      "category":res.rows.item(i).category,
                      "sub_category":res.rows.item(i).sub_category,
                      "description":res.rows.item(i).description,
                      "message":res.rows.item(i).message,
                      "duedate":res.rows.item(i).duedate,
                      "duetime":res.rows.item(i).duetime,
                      "etimatime":res.rows.item(i).etimatime,
                      "etimatdate":res.rows.item(i).etimatdate

                            });

                console.log("SELECTED -> " + "Name : " + res.rows.item(i).names + " " +  res.rows.item(i).emails );
                           }


                                    var headers = {
                                        'api_key': APIKEY,
                                        'api_key_new':APIKEY

                                    };

                    $http({
                      url: 'http://154.0.164.72:8080/siyaleader_internal/public/api/v1/mobilesynch',
                      method: "POST",
                      contentType: "application/json; charset=utf-8",
                      dataType: "json",
                      headers: {

                      'api_key' : APIKEY , 'api_key' : APIKEY

                },

                  data: $scope.tasks,

                  })
                  .then(function(response , status, headers, conf) {


                    var alertPopup = $ionicPopup.alert({
                     title: 'Report ',
                     template: 'Was successfully send'
                   });
                 });

                 var query = "DELETE   FROM  Report";
                              $cordovaSQLite.execute(db, query, []).then(function(res) {
                          if(res.rows.length > 0) {
                              //        console.log("SELECTED -> " + res.rows.item(0).key + " " +  res.rows.item(0).id );

                          }
                                        }, function (err) {

                                      console.error(err);
                                    });



                 $ionicLoading.hide({
                   template: 'Loading...'
                 }).then(function(){

                 });
                 var alertPopup = $ionicPopup.alert({
                  title: 'Report ',
                  template: 'Was successfully send'
                });



                  }





                  function(response) { // optional
                          // failed

                    console.log("faild") ;
                  });


                          } else {

                            var alertPopup = $ionicPopup.alert({
                             title: 'Message',
                             template: 'No data to  Sync try again  later'
                           });
                              console.log("No results found");
                          }
                      }, function (err) {
                          console.error(err);
                      });
                  }

*/



}


                }

        }
    })

    .state('app.gallery', {
        url: '/gallery',
        views: {
            'menuContent': {
                templateUrl: 'templates/gallery.html',
                controller: 'GalleryCtrl'
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-gallery').classList.toggle('on');
                    }, 600);
                }
            }
        }
    })

    .state('app.login', {
        url: '/login',
        views: {
            'menuContent': {
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })





    .state('app.profile', {
        url: '/profile',
        views: {
            'menuContent': {
                templateUrl: 'templates/profile.html',
                controller: 'ProfileCtrl'
            },
            'fabContent': {
                template: '<button id="fab-profile" ng-click="add()" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-plus"></i></button>',
                controller: function ($scope, $state) {

        $scope.add  =  function  ()  {
        $state.go('app.friends', {}, {
            reload: true,
            inherit: false
        });


      }


                }
            }
        }
    })




   .state('app.cases', {
     url: "/cases",
     views: {
       'menuContent': {
         templateUrl: "templates/cases.html"

       }
     }
   })


   .state('app.allocate', {
     url: "/allocate",
     views: {
       'menuContent': {
         templateUrl: "templates/allocate.html",
	   controller:'AllocateCtrl'
       },


            'fabContent': {
                template: ''
            }
     }
   })

   .state('app.reffere', {
     url: "/reffere",
     views: {
       'menuContent': {
         templateUrl: "templates/reffere.html",


          controller:'ReffereCtrl'



       }
     }
   })



    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/login');
});
