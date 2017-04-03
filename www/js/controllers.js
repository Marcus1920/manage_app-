
 var apiROOT = 'http://154.0.164.72:8080/moblile_backend/Port_Beckend_Mobile/public/';
  // var apiROOT = 'http://localhost:8000/';
angular.module('starter.controllers', [])






.controller('MapCtrl', function($scope, $http, LocationService) {


})

.controller('NewProjectCtrl', function($scope,$timeout , $http, $state  ,$window , $ionicPopup  , $stateParams, $ionicModal , $ionicLoading  ,  $cordovaSQLite , LocationService) {

$state.go($state.current, $stateParams, {reload: true, inherit: false});


      $scope.departement =  [] ;

      $scope.reports  =  [] ;



      $scope.subcategories  =  [] ;


  $http.get(apiROOT + 'api/v1/mobiledepartement').
      success( function(data) {

                for (var i=0; i< data.length; i++) {
         var  boid  =      data[i].id ;
         var  slug  =      data[i].slug ;
         var  name  =      data[i].name ;
         var  created_by  =      data[i].created_by ;
         var  updated_by  =      data[i].updated_by ;
         var  active  =      data[i].active ;
         var  created_at  =      data[i].created_at ;
         var  updated_at  =      data[i].updated_at ;


   var query = "INSERT OR REPLACE INTO department( slug, name, created_by , updated_by , active,  created_at, updated_at ,boid) VALUES (? , ? , ? ,? ,? ,? ,? ,?)";
      $cordovaSQLite.execute(db, query, [ slug ,name , created_by ,  updated_by ,  active , created_at , updated_at ,boid]).then(function(res) {
                         console.log("INSERT ID -> " + res.insertId);
                             }, function (err) {
                           console.error(err);
                         });

                };
                $scope.categorys = data.categorys;
            //    console.log(data.categorys)
            $ionicLoading.hide({
            template: '<ion-spinner class="spinner-energized"></ion-spinner>'+ ' Loading  Data...',
                  });



                  var query = "SELECT  boid ,name ,slug  FROM department ";
                  $cordovaSQLite.execute(db, query, []).then(function(res) {
                      if(res.rows.length > 0) {
                          console.log("SELECTED -> " + res.rows.item(0).department + " " +  res.rows.item(0).id );

                  for (var i=0; i< res.rows.length; i++) {


                  $scope.departement.push({
                    "boid":res.rows.item(i).boid,
                   "name":res.rows.item(i).name,
                   "slug":res.rows.item(i).slug


                        });


                console.log(  $scope.reports);
                       }

                      } else {
                          console.log("No results found");
                      }
                  }, function (err) {
                      console.error(err);
                  });
    });




  //  department   api categories   categories
      $http.get(apiROOT + 'api/v1/categories').
          success( function(data) {

                    for (var i=0; i< data.length; i++) {
             var  boid  =      data[i].id ;
             var  department  =   data[i].department ;
             var  slug  =      data[i].slug ;
             var  name  =      data[i].name ;
             var  created_by  =      data[i].created_by ;
             var  updated_by  =      data[i].updated_by ;
             var  active  =      data[i].active ;
             var  created_at  =      data[i].created_at ;
             var  updated_at  =      data[i].updated_at ;

       var query = "INSERT OR REPLACE INTO categories( slug, name, created_by , updated_by , active,  created_at, updated_at ,boid ,department) VALUES (? ,? , ? , ? ,? ,? ,? ,? ,?)";
          $cordovaSQLite.execute(db, query, [ slug ,name , created_by ,  updated_by ,  active , created_at , updated_at ,boid ,department]).then(function(res) {
                             console.log("INSERT ID -> " + res.insertId);
                                 }, function (err) {
                               console.error(err);
                             });

                    };
                    $scope.categorys = data.categorys;
                //    console.log(data.categorys)
                $ionicLoading.hide({
                template: '<ion-spinner class="spinner-energized"></ion-spinner>'+ ' Loading  Data...',
                      });

        });




  //subcategories

  $http.get(apiROOT + 'api/v1/subcategories').
      success( function(data) {

                for (var i=0; i< data.length; i++) {
         var  boid  =      data[i].id ;
         var  slug  =      data[i].slug ;
         var  name  =      data[i].name ;
         var  created_by  =      data[i].created_by ;
         var  updated_by  =      data[i].updated_by ;
         var  active  =      data[i].active ;
         var  created_at  =      data[i].created_at ;
         var  updated_at  =      data[i].updated_at ;
         var  category  =      data[i].category ;


   var query = "INSERT OR REPLACE INTO subcategories( slug, name, created_by , updated_by , active,  created_at, updated_at ,boid ,category) VALUES (? ,? , ? , ? ,? ,? ,? ,? ,?)";
      $cordovaSQLite.execute(db, query, [ slug ,name , created_by ,  updated_by ,  active , created_at , updated_at ,boid ,category]).then(function(res) {
                         console.log("INSERT ID -> " + res.insertId);
                             }, function (err) {
                           console.error(err);
                         });

                };
                $scope.categorys = data.categorys;
                console.log(data.categorys)


    });

    $http.get(apiROOT + 'api/v1/subsubcategories').
        success( function(data) {
          for (var i=0; i< data.length; i++) {
           var  boid  =      data[i].id ;
           var  slug  =      data[i].slug ;
           var  name  =      data[i].name ;
           var  created_by  =      data[i].created_by ;
           var  updated_by  =      data[i].updated_by ;
           var  active  =      data[i].active ;
           var  created_at  =      data[i].created_at ;
           var  updated_at  =      data[i].updated_at ;
     var query = "INSERT OR REPLACE INTO subsubcategories( slug, name, created_by , updated_by , active,  created_at, updated_at ,boid) VALUES (? ,? , ? , ? ,? ,? ,? ,?)";
        $cordovaSQLite.execute(db, query, [ slug ,name , created_by ,  updated_by ,  active , created_at , updated_at ,boid]).then(function(res) {
                           console.log("INSERT ID -> " + res.insertId);
                               }, function (err) {
                             console.error(err);
                           });

                  };
                  $scope.categorys = data.categorys;
                ///  console.log(data.categorys)
                $ionicLoading.hide({
                template: '<ion-spinner class="spinner-energized"></ion-spinner>'+ ' Loading  Data...',
                      });
      });









                           $scope.catupdate = function() {
                            $scope.reports.category  = $scope.dep.selected.boid;
                            $scope.name  =   $scope.dep.selected.boid;
                            console.log(     $scope.name );
                            var query = "SELECT boid , name, department  FROM categories WHERE department = ?";
                            $cordovaSQLite.execute(db, query, [$scope.name]).then(function (res) {
                             if(res.rows.length > 0) {
                             for (var i=0; i< res.rows.length; i++) {
                             $scope.reports.push({
                             "boid":res.rows.item(i).boid,
                            "name":res.rows.item(i).name,
                             "department":res.rows.item(i).department
                            });
                                 console.log("xxxxx -> " + "Name : " + res.rows.item(i).category + " " +  res.rows.item(i).name );

                                 }

                              }
                                else
                                {
                                    console.log("No results found");
                                }
                                }, function (err) {
                                console.error(err);
                                });

                           }


                           $scope.subcatupdate = function() {
                                   $scope.Sub = {};
                                   $scope.SubSub = {};
                                   $scope.reports.category  = $scope.cat.selected.boid;
                                   $scope.name  =   $scope.cat.selected.department;
                                   console.log(     $scope.name );
                                   var query = "SELECT boid , name, category  FROM subcategories WHERE category = ?";
                                   $cordovaSQLite.execute(db, query, [$scope.name]).then(function (res) {
                                   if(res.rows.length > 0) {
                                   for (var i=0; i< res.rows.length; i++)
                                    {
                                   $scope.subcategories.push({
                                   "boid":res.rows.item(i).boid,
                                   "name":res.rows.item(i).name,
                                  "category":res.rows.item(i).category

                                     });

                                    }
                                     }
                                       else
                                        {
                                           console.log("No results found");
                                       }
                                   }, function (err) {
                                       console.error(err);
                                   });


                               }



                 $scope.reports = [];

                 if (localStorage.getItem("key"))
                  {
                  APIKEY = localStorage.getItem("key");

                  var   api_key =   APIKEY ;
                 }





//map  staff
var ua = navigator.userAgent;
    if (ua.indexOf("Android") >= 0) {
        var androidversion = parseFloat(ua.slice(ua.indexOf("Android") + 8));
        if (androidversion != 4.4) {
            $scope.hideGal = false; // do whatever
        } else {
            $scope.hideGal = true;
        }
    }

    $scope.success   = false;
    $scope.alertBad  = false;
    $scope.alertGood = false;
    $scope.img       = '';
    $scope.report.gps_lat = LocationService.location.latitude;
    $scope.report.gps_lng = LocationService.location.longitude;
    $http.get(apiROOT + 'api/v1/categories')
        .success(function(data, status, headers, config) {

            var obj = data;
            if (obj.error) {
                $scope.$broadcast('event:categories-failed', obj.message);

            } else {
                $scope.$broadcast('event:categories-success', obj);

                   $scope.categories   = obj;

            }

        })
        .error(function(data, status, headers, config) {
            console.log("Error occurred.  Status:" + status);
        });

    $scope.clickUploadFile = function() {
        document.getElementById('FileInput').click();
    }


    $scope.show = function() {
        $ionicLoading.show({
            template: 'Sending...'
        });
    };
    $scope.hide = function() {
        $ionicLoading.hide();
    };

    $scope.update = function() {
        $scope.Sub = {};
        $scope.SubSub = {};
        $scope.report.category = $scope.cat.selected.name;
        $scope.selectedCatSubs = $scope.cat.selected.subs;
        $scope.subs            = $scope.selectedCatSubs;
        //$scope.Sub.selected    = $scope.selectedCatSubs[0];
        //$scope.updateSub();
    }

    $scope.updateSub = function() {
        $scope.report.sub_category = $scope.Sub.selected.name;
        $scope.selectedSubSubs     = $scope.Sub.selected.subs;
        $scope.subsubs             = $scope.selectedSubSubs;
        //$scope.SubSub.selected     = $scope.selectedSubSubs[0];

    }

    $scope.updateSubSub = function() {

        $scope.report.sub_sub_category  =  $scope.SubSub.selected.name;
    }



    $scope.prior = function(selected){
       $scope.report.priorities = selected;
    }






      $scope.takePicture = function () {
              var options = {
                quality: 50,
                destinationType:Camera.DestinationType.FILE_URI,
                sourceType: 1,
                encodingType:0 //0:photos  library

              }

              navigator.camera.getPicture(onSuccess,onFail ,options);


           }

      // function  to get the  picture

      $scope.pickPicture = function () {
            var options = {
              quality: 50,
              width  :640,
              heigth :480,
              destinationType: Camera.DestinationType.FILE_URI,
              sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
              encodingType:0 //0:photos  library
            }

            navigator.camera.getPicture(onSuccess,onFail ,options);


            var photo = document.getElementById('FileInput');
              photo.click();
              photo.onchange = function(argument) {
                  if (photo.files && photo.files[0]) {
                      var reader = new FileReader();
                      reader.onload = function(e) {
                          $scope.img = photo.files[0];
                          $scope.imgSrc = e.target.result;
                          $scope.showMessage = true;
                          $scope.$apply();
                      };
                      reader.readAsDataURL(photo.files);
                  }

              };
         }



         var onSuccess = function(FILE_URI) {

           $scope.img = FILE_URI;
           $scope.imgSrc = FILE_URI;
           $scope.showMessage = true;
           localStorage.setItem("pic", FILE_URI);
           $scope.$apply();
       };
       var onFail = function(e) {
           console.log("On fail " + e);
       }




    $scope.postReport = function() {


           if (LocationService.location.latitude == null) {
               if (navigator.geolocation) {
                   $scope.show();
                   var options = {
                       timeout: 10000,
                       enableHighAccuracy: false,
                       maximumAge: 90000
                   };
                   navigator.geolocation.getCurrentPosition(showPosition, onError, options);


               } else {
                   $scope.hide();
                   navigator.notification.alert('Please make sure to "Allow" GPS communication. And try again', doNothing);

               }

               function onError(argument) {
                   $scope.hide();
                   navigator.notification.alert('We have encountered an error Please make sure to "Allow" GPS communication.', doNothing);
               }



               function showPosition(position) {

                             $scope.report.gps_lat = position.coords.latitude;
                             $scope.report.gps_lng = position.coords.longitude;
                             $scope.report.sub_category =  $scope.dep.selected.name;
                             $scope.report.category = $scope.cat.selected.name;
                             $scope.report.description    = $scope. report.description ;
                             $scope.report.img = localStorage.getItem("pic");
                             $scope.report.sub_category = $scope.Sub.selected.name;
                             var   report  = {
                             category :  $scope.report.category ,
                             sub_category : $scope.report.sub_category ,
                             img  : $scope.report.img ,
                             gps_lat : $scope.report.gps_lat,
                             gps_lng :$scope.report.gps_lng,
                             description:  $scope.report.description ,

                           };

                             if (localStorage.getItem("key")) {
                                    APIKEY = localStorage.getItem("key");
                                  }

                                      $http({
                                      url:  apiROOT + 'api/v1/report',
                                      method: "POST",

                                      headers: {

                                          'api_key' : APIKEY , 'api_key' : APIKEY

                                    },

                                      data:  report

                                  })
                        .success(function(data, status, headers, config) {
                          $ionicPopup.alert({
                               title: 'Message',
                               template: 'Report created successfully'
                             });
                          $ionicLoading.hide() ({
                              template: 'Sending...'
                          });




                          $timeout(function() {
                              $window.location.reload(true);
                          });

                        var obj = data;
                        if (obj.error) {
                         $rootScope.$broadcast('event:report-failed', obj.message);
                        } else {



                        }
                        // console.log(data);

                        })
                        .error(function(data, status, headers, config) {
                        $rootScope.$broadcast('event:report-failed', data);
                        });

                         }





    }
    $scope.postAReport = function(FILE_URI) {
        $scope.img = localStorage.getItem("pic");
        if ($scope.img) {
            $scope.show();
            if ($scope.img.size) {
                Report.postReportWithImage($scope.img, $scope.report);
            } else {
                Report.postReportWithImageCam($scope.img, $scope.report);
            }
        } else {
            $scope.show();
            Report.postReport($scope.report);
        }
    }
    $scope.$on('event:report-success', function(e, res) {
        $scope.hide();
        $scope.success = true;
        $scope.report = {};
        $scope.alertGood = true;
        $scope.message = "Your Report Was Posted Successfully";
    })
    $scope.$on('event:report-failed', function(e, res) {
        $scope.hide();
        $scope.success = true;
        $scope.alertBad = true;
        $scope.message = "There was an issue sending your report, We'll Send it later for you";
        Report.savedReports.push($scope.report);
    })


}
    /////MAP STUFF

    //  mape  staff

      var map, InfoWindow, marker;

                 $scope.initialize = function() {

                     infowindow = new google.maps.InfoWindow();
                     var mapOptions = {
                         center: new google.maps.LatLng(-28.800, 31.025),
                         disableDefaultUI: true,
                         mapTypeId: google.maps.MapTypeId.ROADMAP,
                         mapTypeControlOptions: {
                         mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                       'styled_map']
             },
                         zoom: 16
                     };
                     map = new google.maps.Map(document.getElementById("map"), mapOptions);




                 }

                 if ($state.go($state.current, $stateParams, {reload: true, inherit: false})) {
                      $scope.initialize();
                         Locate();
                 }


                 function Locate() {
                     var myLatLng;


                     if (navigator.geolocation) {

                         var options = {
                             timeout: 10000,
                             enableHighAccuracy: true,
                             maximumAge: 90000
                         };
                         navigator.geolocation.getCurrentPosition(showPosition, onError, options);
                     } else {

                         navigator.notification.alert('Please make sure to "Allow" GPS communication. And try again', doNothing);
                     }

                     function showPosition(position) {

                                    var latt = position.coords.latitude;
                                    var long = position.coords.latitude;
                                    $scope.latt =latt;
                                    $scope.long =long;
                         LocationService.location.latitude = position.coords.latitude;
                         LocationService.location.longitude = position.coords.longitude;
                         //LocationService.location.longitude = position.coords.longitude;

                         myLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

                         marker = new google.maps.Marker({
                             position: myLatLng,
                             map: map,
                             draggable: true
                         });
                         map.panTo(myLatLng);
                         google.maps.event.addListener(marker, 'dragend', function(evt) {

                             LocationService.location.latitude = evt.latLng.lat();
                             LocationService.location.longitude = evt.latLng.lng();

                         });


                     }

                     function onError(argument) {

                         navigator.notification.alert('We were unable to find you, Please drag the marker to your position', doNothing);
                         marker = new google.maps.Marker({
                             position: new google.maps.LatLng(-28.800, 31.025),
                             map: map,
                             draggable: true
                         });
                         map.panTo(myLatLng);
                         map.setZoom(12);
                     }

                 }
    $state.go($state.current, $stateParams, {reload: true, inherit: false});
          //       Locate();

      $scope.sendreport=  function(){

        $ionicLoading.show({
          template: 'Loading...'
        }).then(function(){

        });


        $ionicLoading.hide({
          template: 'Loading...'
        }).then(function(){

        });
        var alertPopup = $ionicPopup.alert({
         title: 'Report ',
         template: 'Was successfully send'
       });

      // $state.go($state.home);
    }

})





.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout ,$http ,  $cordovaSQLite) {
    // Form data for the login modal
//
          $scope.catuser = [];
          $scope.cat = {};
              $scope.Sub = {};
              $scope.SubSub = {};
              $scope.subs = [];
              $scope.subsubs = [];
              $scope.report = {};
 $scope.priorities = {} ;
           $scope.dep = {};

        $scope.report = {};

    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };

//department




})

.controller('LoginCtrl', function($scope, $timeout,  $ionicPlatform, $ionicSideMenuDelegate ,   $stateParams, ionicMaterialInk , $ionicModal,$ionicHistory , $http, $state, $ionicLoading, AuthenticationService, User, $cordovaSQLite ,$rootScope) {

$ionicSideMenuDelegate.canDragContent(false);

/**  $ionicPlatform.ready(function() {

   var push = new Ionic.Push({
    "debug": true
      });

      push.register(function(token) {
         console.log("My Device token:",token.token);

         alert("fsdfsdfsfdsf");
         push.saveToken(token);  // persist the token in the Ionic Platform
           });
  });
**/


  $scope.save = function(newMessage) {
         var query = "INSERT INTO Report (firstname ,status , description) VALUES (? ,? ,?)";
         $cordovaSQLite.execute(db, query, [newMessage,'pending','I need  help to  change the world to make its a better place']).then(function(res) {
            // console.log("INSERT ID -> " + res.insertId);
         }, function (err) {
             console.error(err);
         });


     }

   $scope.load = function() {

   $scope.tasks  =  [] ;
        var query = "SELECT  id ,firstname ,category ,sub_category ,description ,status , img  FROM Report ";
        $cordovaSQLite.execute(db, query, []).then(function(res) {
            if(res.rows.length > 0) {
                console.log("SELECTED -> " + res.rows.item(0).firstname + " " +  res.rows.item(0).id );

        for (var i=0; i< res.rows.length; i++) {


        $scope.tasks.push({
          "id":res.rows.item(i).id,
                "firstname":res.rows.item(i).firstname,
        "category":res.rows.item(i).category,
        "sub_category":res.rows.item(i).sub_category,
        "description":res.rows.item(i).description,
        "img":res.rows.item(i).img,
        "status":res.rows.item(i).status


              });




  console.log("SELECTED -> " + "Name : " + res.rows.item(i).firstname + " " +  res.rows.item(i).id );
             }


      $http({
        url: 'http://41.216.130.6:8080/siyaleader-realtime/public/api/v1/test',
        method: "POST",

    data: {"data": JSON.stringify($scope.tasks)},
        headers: {
                 'Content-type': 'application/json '
        }

    })
    .then(function(response) {
        console.log("home") ;
    },
    function(response) { // optional
            // failed

      console.log("faild") ;
    });




            } else {
                console.log("No results found");
            }
        }, function (err) {
            console.error(err);
        });
    }







    $scope.hide = function() {
        $scope.loginModal.hide();
        $state.go('app.profile', {}, {
            reload: true,
            inherit: false
        });
    };


    $scope.login = function() {
       $ionicLoading.show({
           template: 'Logging  In..'
       });
       AuthenticationService.login($scope.user);
   };


   $scope.user = {
        cell: null,
        password: null

    };



   $scope.$on('event:auth-loginRequired', function(e, rejection) {
        $scope.loginModal.show();
    });

    $scope.$on('event:auth-loginConfirmed', function() {
        $ionicLoading.hide();
        $scope.username    = null;
        $scope.password    = null;
        $scope.card        = false;
        $scope.cardReg     = false;
        $scope.cardSuccess = false;
    //    $scope.loginModal.hide();

    $state.go('app.profile', {}, {
               reload: true,
               inherit: false
           });

    });

    $scope.$on('event:auth-login-failed', function(e, status) {
        $ionicLoading.hide();
        var error = "Invalid Username or Password.";
        $scope.card = true;
        $scope.message = error;
    });



   $scope.$on('event:auth-register-failed', function(e, status) {
       var error = status;
       $scope.cardReg = true;
       $scope.message = error;
   });


   $scope.$on('event:auth-logout-complete', function() {
       $state.go('login', {}, {
           reload: true,
           inherit: false
       });
   });




    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();
})

.controller('FriendsCtrl', function($scope, $stateParams,$http, $timeout, ionicMaterialInk, $cordovaSQLite, $ionicPopup ,  ionicMaterialMotion ,$filter ,$ionicLoading  ,$window ,  $ionicPlatform ) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');

    // Delay expansion
    $timeout(function() {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
    }, 300);

    $scope.photofile= [] ;



      // function  to get the  picture

      $scope.pickPicture = function () {
            var options = {
              quality: 50,
              width  :640,
              heigth :480,
              destinationType: Camera.DestinationType.FILE_URI,
              sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
              encodingType:0 //0:photos  library
            }

            navigator.camera.getPicture(onSuccess,onFail ,options);

            var photo = document.getElementById('FileInput');
              photo.click();
              photo.onchange = function(argument) {
                  if (photo.files && photo.files[0]) {
                      var reader = new FileReader();
                      reader.onload = function(e) {
                      $scope.$apply(function() {
                       $scope.prev_img = e.target.result;
                       $scope.img = photo.files[0];
                   //    $scope.imgSrc = e.target.result;
                   });


                      reader.readAsDataURL(photo.files);
                  }

              };
         }



         var onSuccess = function(FILE_URI) {

           $scope.img = FILE_URI;
           $scope.imgSrc = FILE_URI;
           $scope.showMessage = true;
           localStorage.setItem("pic", FILE_URI);
           $scope.$apply();
       };
       var onFail = function(e) {
           console.log("On fail " + e);
       }
}

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    ionicMaterialInk.displayEffect();


        $scope.departement =  [] ;

        $scope.reports  =  [] ;

        $scope.subcategories  =  [] ;
    $ionicLoading.show({
    template: '<ion-spinner class="spinner-energized"></ion-spinner>'+ ' Loading  Data...',
          });


    $http.get(apiROOT + 'api/v1/mobiledepartement').
        success( function(data) {

                  for (var i=0; i< data.length; i++) {
           var  boid  =      data[i].id ;
           var  slug  =      data[i].slug ;
           var  name  =      data[i].name ;
           var  created_by  =      data[i].created_by ;
           var  updated_by  =      data[i].updated_by ;
           var  active  =      data[i].active ;
           var  created_at  =      data[i].created_at ;
           var  updated_at  =      data[i].updated_at ;


     var query = "INSERT OR REPLACE INTO department( slug, name, created_by , updated_by , active,  created_at, updated_at ,boid) VALUES (? , ? , ? ,? ,? ,? ,? ,?)";
        $cordovaSQLite.execute(db, query, [ slug ,name , created_by ,  updated_by ,  active , created_at , updated_at ,boid]).then(function(res) {
                           console.log("INSERT ID -> " + res.insertId);
                               }, function (err) {
                             console.error(err);
                           });

                  };
                  $scope.categorys = data.categorys;
              //    console.log(data.categorys)
              $ionicLoading.hide({
              template: '<ion-spinner class="spinner-energized"></ion-spinner>'+ ' Loading  Data...',
                    });

                    var query = "SELECT  boid ,name ,slug  FROM department ";
                    $cordovaSQLite.execute(db, query, []).then(function(res) {
                        if(res.rows.length > 0) {
                            console.log("SELECTED -> " + res.rows.item(0).department + " " +  res.rows.item(0).id );

                    for (var i=0; i< res.rows.length; i++) {


                    $scope.departement.push({
                      "boid":res.rows.item(i).boid,
                     "name":res.rows.item(i).name,
                     "slug":res.rows.item(i).slug

                          });

                  console.log(  $scope.reports);
                         }

                        } else {
                            console.log("No results found");
                        }
                    }, function (err) {
                        console.error(err);
                    });
      });


    //  department   api categories   categories
        $http.get(apiROOT + 'api/v1/categories').
            success( function(data) {

                      for (var i=0; i< data.length; i++) {
               var  boid  =      data[i].id ;
               var  department  =   data[i].department ;
               var  slug  =      data[i].slug ;
               var  name  =      data[i].name ;
               var  created_by  =      data[i].created_by ;
               var  updated_by  =      data[i].updated_by ;
               var  active  =      data[i].active ;
               var  created_at  =      data[i].created_at ;
               var  updated_at  =      data[i].updated_at ;





         var query = "INSERT OR REPLACE INTO categories( slug, name, created_by , updated_by , active,  created_at, updated_at ,boid ,department) VALUES (? ,? , ? , ? ,? ,? ,? ,? ,?)";
            $cordovaSQLite.execute(db, query, [ slug ,name , created_by ,  updated_by ,  active , created_at , updated_at ,boid ,department]).then(function(res) {
                               console.log("INSERT ID -> " + res.insertId);
                                   }, function (err) {
                                 console.error(err);
                               });

                      };
                      $scope.categorys = data.categorys;
                  //    console.log(data.categorys)
                  $ionicLoading.hide({
                  template: '<ion-spinner class="spinner-energized"></ion-spinner>'+ ' Loading  Data...',
                        });






          });




    //subcategories

    $http.get(apiROOT + 'api/v1/subcategories').
        success( function(data) {

                  for (var i=0; i< data.length; i++) {
           var  boid  =      data[i].id ;
           var  slug  =      data[i].slug ;
           var  name  =      data[i].name ;
           var  created_by  =      data[i].created_by ;
           var  updated_by  =      data[i].updated_by ;
           var  active  =      data[i].active ;
           var  created_at  =      data[i].created_at ;
           var  updated_at  =      data[i].updated_at ;
           var  category  =      data[i].case_type ;


     var query = "INSERT OR REPLACE INTO subcategories( slug, name, created_by , updated_by , active,  created_at, updated_at ,boid ,category) VALUES (? ,? , ? , ? ,? ,? ,? ,? ,?)";
        $cordovaSQLite.execute(db, query, [ slug ,name , created_by ,  updated_by ,  active , created_at , updated_at ,boid ,category]).then(function(res) {
                           console.log("INSERT ID -> " + res.insertId);
                               }, function (err) {
                             console.error(err);
                           });

                  };
                  $scope.categorys = data.categorys;
                  console.log(data.categorys)


      });
/*
      $http.get(apiROOT + 'api/v1/subsubcategories').
          success( function(data) {

                    for (var i=0; i< data.length; i++) {
             var  boid  =      data[i].id ;
             var  slug  =      data[i].slug ;
             var  name  =      data[i].name ;
             var  created_by  =      data[i].created_by ;
             var  updated_by  =      data[i].updated_by ;
             var  active  =      data[i].active ;
             var  created_at  =      data[i].created_at ;
             var  updated_at  =      data[i].updated_at ;


       var query = "INSERT OR REPLACE INTO subsubcategories( slug, name, created_by , updated_by , active,  created_at, updated_at ,boid) VALUES (? ,? , ? , ? ,? ,? ,? ,?)";
          $cordovaSQLite.execute(db, query, [ slug ,name , created_by ,  updated_by ,  active , created_at , updated_at ,boid]).then(function(res) {
                             console.log("INSERT ID -> " + res.insertId);
                                 }, function (err) {
                               console.error(err);
                             });

                    };
                    $scope.categorys = data.categorys;
                  ///  console.log(data.categorys)
                  $ionicLoading.hide({
                  template: '<ion-spinner class="spinner-energized"></ion-spinner>'+ ' Loading  Data...',
                        });


        });



*/







              //

                     $scope.catupdate = function() {

                      $scope.reports.category  = $scope.dep.selected.boid;

                      $scope.name  =   $scope.dep.selected.boid;

                      console.log(     $scope.name );



                      var query = "SELECT boid , name, department  FROM categories WHERE department = ?";
                              $cordovaSQLite.execute(db, query, [$scope.name]).then(function (res) {
                          if(res.rows.length > 0) {
                            for (var i=0; i< res.rows.length; i++) {


                            $scope.reports.push({
                              "boid":res.rows.item(i).boid,
                             "name":res.rows.item(i).name,
                             "department":res.rows.item(i).department


                                  });


            console.log("xxxxx -> " + "Name : " + res.rows.item(i).category + " " +  res.rows.item(i).name );

                                 }

                                }
                          else {
                              console.log("No results found");
                          }
                      }, function (err) {
                          console.error(err);
                      });


                  }




                  var query = "SELECT boid , name, department  FROM categories WHERE department = ?";
                          $cordovaSQLite.execute(db, query, [$scope.name]).then(function (res) {
                      if(res.rows.length > 0) {
                        for (var i=0; i< res.rows.length; i++) {


                        $scope.reports.push({
                          "boid":res.rows.item(i).boid,
                         "name":res.rows.item(i).name,
                         "department":res.rows.item(i).department


                              });


        console.log("xxxxx -> " + "Name : " + res.rows.item(i).category + " " +  res.rows.item(i).name );

                             }

                            }
                      else {
                          console.log("No results found");
                      }
                  }, function (err) {
                      console.error(err);
                  });



    $scope.subcatupdate = function() {

           $scope.Sub = {};
              $scope.SubSub = {};

            $scope.reports.category  = $scope.cat.selected.boid;

            $scope.name  =   $scope.cat.selected.department;

            console.log(     $scope.name );



            var query = "SELECT boid , name, category  FROM subcategories WHERE category = ?";
                    $cordovaSQLite.execute(db, query, [$scope.name]).then(function (res) {
                if(res.rows.length > 0) {
                  for (var i=0; i< res.rows.length; i++) {


                  $scope.subcategories.push({
                    "boid":res.rows.item(i).boid,
                   "name":res.rows.item(i).name,
                   "category":res.rows.item(i).category


                        });


//  console.log("xxxxx -> " + "Name : " + res.rows.item(i).category + " " +  res.rows.item(i).name );




                       }

                      }
                else {
                    console.log("No results found");
                }
            }, function (err) {
                console.error(err);
            });


        }

        $scope.updateSubSub = function() {

            $scope.report.sub_sub_category  =  $scope.SubSub.selected.name;
        }
$scope.catuser=[] ;



    $http.get(apiROOT + 'api/v1/getallusers')
             .success(function(data, status, headers, config) {

                 var obj = data;
                 if (obj.error) {
                     $scope.$broadcast('event:categories-failed', obj.message);
                 } else {
                     $scope.$broadcast('event:categories-success', obj);


                               for (var i = data.reports.length - 1; i >= 0; i--) {


                                 var  name  =      data.reports[i].name ;
                                 var  surname  =   data.reports[i].surname;
                                 var  codid  =     data.reports[i].id ;
                                 var  email  =     data.reports[i].email ;
                                 var  cellphone  =  data.reports[i].cellphone ;



                               var query = "INSERT OR REPLACE INTO contacts(codid ,name, surname  , email,  cellphone ) VALUES (? ,? , ? , ? ,? )";
                               $cordovaSQLite.execute(db, query, [codid, name ,surname ,  email ,  cellphone ]).then(function(res) {
                                                 console.log("INSERT ID -> " + res.insertId);

                                                     }, function (err) {
                                                   console.error(err);
                                                 });



                               };

                               var query = "SELECT  *  FROM contacts ";
                               $cordovaSQLite.execute(db, query, []).then(function(res) {
                                   if(res.rows.length > 0) {
                                       console.log("SELECTED -> " + res.rows.item(0).department + " " +  res.rows.item(0).id );

                               for (var i=0; i< res.rows.length; i++) {

                                                                   $scope.catuser.push({
                                                                     "name"       :    res.rows.item(i).name ,
                                                                     "surname"    :   res.rows.item(i).surname,
                                                                     "codid"      :   res.rows.item(i).id ,
                                                                     "email"      :    res.rows.item(i).email ,
                                                                     "cellphone"  :   res.rows.item(i).cellphone


                                                                   }) ;

                         //console.log("SELECTED -> " + "Name : " + res.rows.item(i).boid + " " +  res.rows.item(i).name );

                         console.log(  $scope.reports);
                                    }

                                   } else {
                                       console.log("No results found");
                                   }
                               }, function (err) {
                                   console.error(err);
                               });


                 }

             })
             .error(function(data, status, headers, config) {
                 console.log("Error occurred.  Status:" + status);
             });



          /*     var query = "SELECT  *  FROM contacts ";
                   $cordovaSQLite.execute(db, query, []).then(function(res) {
                       if(res.rows.length > 0) {
                           console.log("SELECTED -> " + res.rows.item(0).department + " " +  res.rows.item(0).id );

                   for (var i=0; i< res.rows.length; i++)
                   {


                   $scope.catuser.push({
                         "name"       :    res.rows.item(i).name ,
                         "surname"    :   res.rows.item(i).surname,
                         "codid"      :   res.rows.item(i).id ,
                         "email"      :    res.rows.item(i).email ,
                         "cellphone"  :   res.rows.item(i).cellphone
                       });

                    }
                       }
                        else
                       {
                           console.log("No results found");
                       }
                   },
                   function (err)

                   {
                       console.error(err);
                   });*/

    $scope.name  =null ;
    $scope.cell  = null;
    $scope.email  = null;








                   $scope.update = function() {

                     $scope.catuser.name = $scope.cat.selected.name;

                     $scope.name  =    $scope.catuser.name ;

                     console.log( $scope.catuser.name);



                     var query = "SELECT codid , name, surname,email ,cellphone FROM contacts WHERE name = ?";
                             $cordovaSQLite.execute(db, query, [$scope.catuser.name]).then(function (res) {
                         if(res.rows.length > 0) {
                             console.log("SELECTED -> " + res.rows.item(0).codid + " " +  res.rows.item(0).name);

                             $scope.names  = res.rows.item(0).name;
                             $scope.surname  = res.rows.item(0).surname;
                             $scope.email  = res.rows.item(0).email;
                             $scope.cellphone  = res.rows.item(0).cellphone;

                             $scope.codid =  res.rows.item(0).codid;

                        //     console.log( $scope.cellphone) ;

                         }
                         else {
                             console.log("No results found");
                         }
                     }, function (err) {
                         console.error(err);
                     });

                 }
                 $scope.case = {
                      duetime: null,
                      duedate:null,
                      etimatdate:null ,
                      etimatime :null,
                      description:null,
                      message    : null


                  };


                 //   methode  create  cases

                 $scope.createcase =  function(duedate) {

          /*       $ionicPlatform.ready(function() {
                               if(window.Connection) {
                                   if(navigator.connection.type == Connection.NONE) {

                                     $ionicLoading.show({
                                     template: '<ion-spinner class="spinner-energized"></ion-spinner>'+ ' creating Case...',
                                     });



                                                     var   to           =   $scope.codid  ;
                                                     var   name         =   $scope.names ;
                                                     var   email        =   $scope.email ;
                                                     var   cellphone    =   $scope.cellphone ;
                                                     var   duedate      =   $scope.formatduedate ;
                                                     var   duetime      =   $scope.case.duetime  ;
                                                     var   etimatdate   =   $scope.formatetimatdate;
                                                     var   etimatime    =   $scope.case.duetime;
                                                     var   depart       =   $scope.dep.selected.name;
                                                     var   cat          =   $scope.cat.selected.name;
                                                     var   subcat       =   $scope.Sub.selected.name;
                                                     var   message      =   $scope.case.message;
                                                     var   description  =   $scope.case.description;


                                                     var query = "INSERT  INTO Report( destination ,names ,  emails  , number,  duedate ,  duetime ,  etimatdate ,etimatime ,  depart ,  category ,   sub_category , message ,  description) VALUES (? , ? , ? , ? , ? ,? , ? ,? ,? ,? ,? ,? ,? )";
                                                     $cordovaSQLite.execute(db, query,[ to , name  , email  , cellphone,  duedate ,  duetime ,  etimatdate ,  etimatime , depart ,  cat ,   subcat , message ,  description ]).then(function(res) {
                                                                       console.log("INSERT ID -> " + res.insertId);

                                                                           }, function (err) {
                                                                         console.error(err);
                                                                       });




                                                     //  $http.post(apiROOT + 'api/v1/mobilecaeCreate?api_key=' + api_key +'&name='+ name + '&email=' +email + '&cellphone=' +cellphone + '&duedate=' + duedate + '&duetime=' duetime + '&etimatdate=' +etimatdate + '&etimattime=' + etimatime + '&depart=' + depart + '&cat=' + cat + '&subcat=' + subcat + '&message=' + message )

                                                     $ionicLoading.hide({
                                                     template: '<ion-spinner class="spinner-energized"></ion-spinner>'+ ' creating Case...',
                                                     });



                                                                          $ionicPopup.alert({
                                                                              title: 'Message',
                                                                              template: ' Action complete  '
                                                                            });


                                                                               $window.location.reload();

                                  }else


                                  {*/



/*
 fille   attached   post  to  the  serve


*/






        //   $scope.case.duedate = new Date(); // set to today
           $scope.formatduedate = $filter('date')( $scope.case.duedate, "yyyy-MM-dd");

           $scope.img = localStorage.getItem("pic");
        //   $scope.case.etimatdate = new Date(); // set to today
           $scope.formatetimatdate = $filter('date')( $scope.case.etimatdate, "yyyy-MM-dd");
           if($scope.case.description ==null )
           {

             $scope.erro   = "field  required"   ;
             document.getElementById("description").style.color = "red";


           }

           if ( $scope.case.message==null) {
             document.getElementById("notemessage").style.color = "red";

           }
           else {





            $scope.report={

                 to          :   $scope.codid  ,
                 name        :  $scope.names ,
                 email       :   $scope.email  ,
                 cellphone   :  $scope.cellphone  ,
                 duedate     :  $scope.formatduedate ,
                 duetime     :   $scope.case.duetime   ,
                 etimatdate  :  $scope.formatetimatdate ,
                 etimatime   :  $scope.case.duetime ,
                 depart      :  $scope.dep.selected.name ,
                 cat         :   $scope.cat.selected.name ,
                 subcat      :   $scope.Sub.selected.name ,
                 message     :  $scope.case.message ,
                 description  :  $scope.case.description
            };

              $scope.img         =   localStorage.getItem("pic");
              if (localStorage.getItem("key")) {
                    APIKEY = localStorage.getItem("key");
                    var  api_key   = APIKEY;
                  }

              if ($scope.img) {
              //  data.user_email = localStorage.getItem("user_email");
                var fd = new FormData();
                for (var k in  $scope.report) {
                    if (  $scope.report.hasOwnProperty(k)) {
                        fd.append(k.toString(),   $scope.report[k]);
                    }
                }
                fd.append('img',   $scope.img);

                $http.post(apiROOT + 'api/v1/reportImage', fd, {
                        transformRequest: angular.identity,
                        headers: {
                            'Content-Type': undefined ,'api_key' :APIKEY
                        }
                    })
                    .success(function(data, status, headers, config) {
                        var obj = data;
                        if (obj.error) {
                        alert("erro") ;
                        } else {
                      console.log("home") ;
                        }
                        console.log(data);

                    })
                    .error(function(data, status, headers, config) {
                        $rootScope.$broadcast('event:report-failed', data);
                    });
               }

else {


                var   img          =   localStorage.getItem("pic");

                var   to           =   $scope.codid  ;
                var   name         =   $scope.names ;
                var   email        =   $scope.email ;
                var   cellphone    =   $scope.cellphone ;
                var   duedate      =   $scope.formatduedate ;
                var   duetime      =   $scope.case.duetime  ;
                var   etimatdate   =   $scope.formatetimatdate;
                var   etimatime    =   $scope.case.duetime;
                var   depart       =   $scope.dep.selected.name;
                var   cat          =   $scope.cat.selected.name;
                var   subcat       =   $scope.Sub.selected.name;
                var   message      =   $scope.case.message;
                var   description  =   $scope.case.description;


                var query = "INSERT  INTO Report( destination ,names ,  emails  , number,  duedate ,  duetime ,  etimatdate ,etimatime ,  depart ,  category ,   sub_category , message ,  description) VALUES (? , ? , ? , ? , ? ,? , ? ,? ,? ,? ,? ,? ,? )";
                $cordovaSQLite.execute(db, query,[ to , name  , email  , cellphone,  duedate ,  duetime ,  etimatdate ,  etimatime , depart ,  cat ,   subcat , message ,  description ]).then(function(res) {
                                  console.log("INSERT ID -> " + res.insertId);

                                      }, function (err) {
                                    console.error(err);

                                  });

            // validation  section



                //  $http.post(apiROOT + 'api/v1/mobilecaeCreate?api_key=' + api_key +'&name='+ name + '&email=' +email + '&cellphone=' +cellphone + '&duedate=' + duedate + '&duetime=' duetime + '&etimatdate=' +etimatdate + '&etimattime=' + etimatime + '&depart=' + depart + '&cat=' + cat + '&subcat=' + subcat + '&message=' + message )

                                              $ionicLoading.show({
                                              template: '<ion-spinner class="spinner-energized"></ion-spinner>'+ ' creating Case...',
                                          });


      $http.post(apiROOT + 'api/v1/mobilecaeCreate?api_key=' + api_key +'&to='+ to + '&name='+ name + '&email=' +email   + '&cellphone=' +cellphone + '&duedate=' + duedate + '&duetime='+ duetime +'&etimatdate=' +etimatdate + '&etimattime=' + etimatime + '&depart=' + depart + '&cat=' + cat + '&subcat=' + subcat + '&message=' + message +  '&description=' + description + '&img=' + img)
                    .then(function(response) {


                          $scope.codid            =null ;
                          $scope.names            =null ;
                          $scope.email            =null ;
                          $scope.cellphone        =null ;
                          $scope.formatduedate    =null ;
                          $scope.case.duetime     =null ;
                          $scope.formatetimatdate =null ;
                          $scope.case.duetime     =null ;


                          $scope.case.message       =null ;
                         $scope.case.description    =null ;

                       $ionicLoading.hide({
                       template: '<ion-spinner class="spinner-energized"></ion-spinner>'+ ' creating Case...',
                             });


                     $ionicPopup.alert({
                         title: 'Message',
                         template: 'Action Completed   '
                       });
                        $scope.myWelcome = response.data;
                    });
                      //   $window.location.reload();





                                //      }

                                //     }

                              //   });
          }
}
                 }


})

.controller('ProfileCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk ,$ionicHistory) {
    // Set Header


    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('ActivityCtrl', function($scope, $stateParams, AuthenticationService ,$ionicPlatform , $cordovaFileOpener2 , $ionicLoading , $timeout, ionicMaterialMotion, ionicMaterialInk,$ionicModal  ,  $http ,$ionicPopup) {

                      if (localStorage.getItem("key")) {
                                    APIKEY = localStorage.getItem("key");
                                    var  api_key   = APIKEY;
                                }

                                $ionicLoading.show({
                              template: '<ion-spinner class="spinner-energized"></ion-spinner>'+ '  Loading cases...',
                          });


                  $http({
                  url: apiROOT + 'api/v1/pedingcases?api_key=' + api_key,
                  method: "POST",

                headers: {
                     'api_key': APIKEY,
                     'api_key_new':APIKEY
         }



              }).success(
           function(data) {

             $ionicLoading.hide({
           template: '<ion-spinner class="spinner-energized"></ion-spinner>'+ '  Loading cases...',
       });

               for (var i = data.reports.length - 1; i >= 0; i--) {

               };
               $scope.reports = data.reports;


                if( $scope.reports== ""){


                  $ionicLoading.hide();

                  $ionicPopup.alert({
                      title: 'Message',
                      template: '<ion-spinner class="spinner-energized"></ion-spinner>       you  do not  have a pending case '
                    });
                }
               console.log(data.reports)


           }
       ).error(
           function(data) {
               alert('There was an error retrieving your reports.');
               console.log('MY REPORTS Error', data);

           }
       );




              $scope.doRefresh = function() {

                $http({

            url: apiROOT + 'api/v1/pedingcases?api_key=' + api_key,
                method: "POST",

              headers: {
                   'api_key': APIKEY,
                   'api_key_new':APIKEY
              }



              }).success(
              function(data) {

              for (var i = data.reports.length - 1; i >= 0; i--) {

              };
              $scope.reports = data.reports;

              if( $scope.reports== ""){


               $ionicLoading.hide();

               $ionicPopup.alert({
                   title: 'Message',
                   template: ' No Pendding  Cases   '
                 });
                  $scope.$broadcast('scroll.refreshComplete');
              } else {

               $scope.$broadcast('scroll.refreshComplete');

              }

              console.log(data.reports)
              console.log(data.reports[0].id);

              $ionicLoading.hide();
              }
              ).error(
              function(data) {
              alert('There was an error retrieving your reports.');
              console.log('MY REPORTS Error', data);

              }
              );

                };







	$ionicModal.fromTemplateUrl('templates/mycases.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });


    $scope.openModal = function(report) {
		 $scope.selectedId = report;
    $scope.modal.show();


  };



	 $scope.openclosel=function() {

   $scope.modal.hide();

  };



    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

   $scope.selectedId = {
        id: null,
       note: null

    };

$scope.updatecasefile  = function () {

 window.plugins.mfilechooser.open([], function (uri) {

      alert(uri);

    }, function (error) {

        alert(error);

    });
} ;



   $scope.user = {
        cell: null,
        password: null

    };




})

///uiUploader      Upload
.controller('ReffereCtrl' , function($scope ,AuthenticationService,  $cordovaFileTransfer , $stateParams,$log , getallusers ,$cordovaSQLite , $ionicPopup,$timeout, $ionicLoading  , ionicMaterialMotion, ionicMaterialInk,$ionicModal  ,  $http ,  $ionicLoading){
  $http.get(apiROOT + 'api/v1/getallusers')
           .success(function(data, status, headers, config) {

               var obj = data;
               if (obj.error) {
                   $scope.$broadcast('event:categories-failed', obj.message);
               } else {
                   $scope.$broadcast('event:categories-success', obj);


                             for (var i = data.reports.length - 1; i >= 0; i--) {


                               var  name  =      data.reports[i].name ;
                               var  surname  =   data.reports[i].surname;
                               var  codid  =     data.reports[i].id ;
                               var  email  =     data.reports[i].email ;
                               var  cellphone  =  data.reports[i].cellphone ;



                             var query = "INSERT OR REPLACE INTO contacts(codid ,name, surname  , email,  cellphone ) VALUES (? ,? , ? , ? ,? )";
                             $cordovaSQLite.execute(db, query, [codid, name ,surname ,  email ,  cellphone ]).then(function(res) {
                                               console.log("Contat -> " + res.insertId);

                                                   }, function (err) {
                                                 console.error(err);
                                               });



                             };
                             $scope.catuser = data.reports;

                          //   console.log($scope.catuser)

               }

           })
           .error(function(data, status, headers, config) {
               console.log("Error occurred.  Status:" + status);
           });

           $scope.update = function() {

             $scope.catuser.name = $scope.cat.selected.name;

             $scope.name  =    $scope.catuser.name ;

             console.log( $scope.catuser.name);



             var query = "SELECT codid , name, surname,email ,cellphone FROM contacts WHERE name = ?";
                     $cordovaSQLite.execute(db, query, [$scope.catuser.name]).then(function (res) {
                 if(res.rows.length > 0) {
                     console.log("SELECTED -> " + res.rows.item(0).codid + " " +  res.rows.item(0).name);

                     $scope.names  = res.rows.item(0).name;
                     $scope.surname  = res.rows.item(0).surname;
                     $scope.email  = res.rows.item(0).email;
                     $scope.cellphone  = res.rows.item(0).cellphone;

                     $scope.codid =  res.rows.item(0).codid;

                //     console.log( $scope.cellphone) ;

                 }
                 else {
                     console.log("No results found");
                 }
             }, function (err) {
                 console.error(err);
             });

         }

// delaration   of  the  note  variable
$scope.notice = {
  text: "" ,
  caseFile:""
};

               if (localStorage.getItem("key")) {
                               APIKEY = localStorage.getItem("key");


                               var  api_key   = APIKEY;
                           }


                           $ionicLoading.show({
                                          template: '<ion-spinner class="spinner-energized"></ion-spinner>'+ '  Loading cases...',
                                      });

                                      $scope.requestclose = function() {
                                             $ionicLoading.show({
                                                 template:  '<ion-spinner class="spinner-energized"></ion-spinner>'+ '  Update  In procese..',
                                             });


                                         $scope.notice.text;


                                             AuthenticationService.requestclose($scope.selectedId ,  $scope.notice);
                                         };


                                         $scope.updatecase = function() {
                                                $ionicLoading.show({
                                                   template:  '<ion-spinner class="spinner-energized"></ion-spinner>'+ '  Update  In procese..',
                                                });
                                                AuthenticationService.updatecase($scope.selectedId,   $scope.notice);
                                            };


                                            $scope.$on('event:auth-update-complete', function(e, status) {
                                                    $ionicLoading.hide();
                                                    $scope.modal.hide();


                                             $ionicPopup.alert({
                                                 title: 'Message',
                                                 template: 'successfully updated  '
                                               });

                                                });


                                                $scope.$on('event:auth-closouer-complete', function(e, status) {
                                                        $ionicLoading.hide();
                                                        $scope.modal.hide();


                                                 $ionicPopup.alert({
                                                     title: 'Message',
                                                     template: 'Action complete   '
                                                   });

                                                    });






             $http({

             url: apiROOT + 'api/v1/referecases?api_key=' + api_key,
             method: "POST",

           headers: {
                'api_key': APIKEY,
                'api_key_new':APIKEY
    }



         }).success(
      function(data) {

          for (var i = data.reports.length - 1; i >= 0; i--) {

          };
          $scope.reports = data.reports;

          if( $scope.reports== ""){


            $ionicLoading.hide();

            $ionicPopup.alert({
                title: 'Message',
             template: ' No  Case Refer '
              });
          }

          console.log(data.reports)
    console.log(data.reports[0].id);

      $ionicLoading.hide();
      }
  ).error(
      function(data) {
          alert('There was an error retrieving your reports.');
          console.log('MY REPORTS Error', data);

      }
  );



  	$ionicModal.fromTemplateUrl('templates/reffere.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });


      $scope.openModal = function(report) {
  		 $scope.selectedId = report;
      $scope.modal.show();

}


$scope.openclosel=function() {

$scope.modal.hide();

};



$scope.doRefresh = function() {

  $http({

  url: apiROOT + 'api/v1/referecases?api_key=' + api_key,
  method: "POST",

headers: {
     'api_key': APIKEY,
     'api_key_new':APIKEY
}



}).success(
function(data) {

for (var i = data.reports.length - 1; i >= 0; i--) {

};
$scope.reports = data.reports;

if( $scope.reports== ""){


 $ionicLoading.hide();

 $ionicPopup.alert({
     title: 'Message',
     template: ' No  Case Refer '
   });
} else {

 $scope.$broadcast('scroll.refreshComplete');

}

console.log(data.reports)
console.log(data.reports[0].id);

$ionicLoading.hide();
}
).error(
function(data) {
alert('There was an error retrieving your reports.');
console.log('MY REPORTS Error', data);

}
);


  };
$scope.message   =  null   ;

$scope.caseFile   =  null   ;

$scope.details    = null  ;


               $scope.uploadFiles = function(file, errFiles) {
                          $scope.f = file;
  $scope.message  = 'File Name:'  +   $scope.f.name ;
  //$scope.caseFile   = $scope.f.name;

                          console.log($scope.f) ;
                          $scope.errFile = errFiles && errFiles[0];
                          if (file) {
                    //          file.upload = Upload.upload({
                            //      url: '/upload.php',
                            //      data: {file: file}
                      //        });

                          //    file.upload.then(function (response) {
                            //      $timeout(function () {
                          //            file.result = response.data;
                            //      });
                          //    }, function (response) {
                            //      if (response.status > 0)
                            //          $scope.errorMsg = response.status + ': ' + response.data;
                            //  }, function (evt) {
                                //  file.progress = Math.min(100, parseInt(100.0 *
                                //  evt.loaded / evt.total));
                              //});
                          }
                      }




                         $scope.selectedId ={

                         department : null  ,
                         category : null  ,
                         sub_category : null



                         };


//function  close  cases
     $scope.caseFile= {file:null};
             $scope.refercase = function (report) {


                      $ionicLoading.show({
                            template: '<ion-spinner class="spinner-energized"></ion-spinner>'+ '  Request  In Process...',
                      });

            console.log( $scope.selectedId.id + " / "+  $scope.codid+ ' / '  + $scope.name + '/ ' +  $scope.surname + ' / ' +  $scope.email + '/  ' + $scope.cellphone)    ;


    var  fileNote  = $scope.notice.text;
    var  file = $scope.caseFile.file ;
console.log($scope.caseFile.file) ;



/*
 var options = {
             fileKey: "avatar",
             fileName: "image.png",
             chunkedMode: false,
             mimeType: "image/png"
         };
         $cordovaFileTransfer.upload("http://192.168.56.1:1337/file/upload", "www/img/ionic.png", options).then(function(result) {
             console.log("SUCCESS: " + JSON.stringify(result.response));
         }, function(err) {
             console.log("ERROR: " + JSON.stringify(err));
         }, function (progress) {
             // constant progress updates
         });
*/





var   depart       =   $scope.selectedId.department;
var   cat          =    $scope.selectedId.category;
var   subcat       =   $scope.selectedId.sub_category;

var   description  =   $scope.selectedId.description;

            if (localStorage.getItem("key")) {
                            APIKEY = localStorage.getItem("key");


                            var  api_key   = APIKEY;

                        }

            $http({


        ///      console.log( $scope.selectedId.id + " / "+  $scope.codid+ ' / '  + $scope.name + '/ ' +  $scope.surname + ' / ' +  $scope.email + '/  ' + $scope.cellphone)    ;


            url: apiROOT + 'api/v1/mobilerallocate?api_key=' + api_key + '&depart='  +  depart +  '&cat=' + cat   + '&subcat='+ subcat  + '&description=' + description +    '&responders=' +$scope.codid + '&caseID='  + $scope.selectedId.id +  '&name=' +$scope.name +  '&surname=' + $scope.surname   + '&email=' + $scope.email + '&cellphone=' + $scope.cellphone +      '&file=' + file + '&fileNote=' + fileNote ,
            method: "POST",
          transformRequest: angular.identity,
          headers: {
               'api_key': APIKEY,
               'api_key_new':APIKEY,
               'Content-Type': undefined


   }



        }).success(
     function(data) {

 console.log('Thank  you ', data);

   $ionicLoading.hide() ;

    $ionicPopup.alert({
        title: 'Message',
        template:  data.massage
      });
  $scope.modal.hide();
     }
 ).error(
     function(data) {
         alert('There was an error retrieving your reports.');
         console.log('MY REPORTS Error', data);

     }
 );









             }




})






.controller('AllocateCtrl', function($scope, $stateParams,  $ionicPopup,$timeout, $ionicLoading  , ionicMaterialMotion, ionicMaterialInk,$ionicModal  ,  $http) {

       if (localStorage.getItem("key")) {
                                    APIKEY = localStorage.getItem("key");


                                    var  api_key   = APIKEY;
                                }


        $ionicLoading.show({
      template: '<ion-spinner class="spinner-energized"></ion-spinner>'+ '  Loading cases...',
  });

                  $http({
                  url: apiROOT + 'api/v1/allocatecase?api_key=' + api_key,
                  method: "POST",

                headers: {
                     'api_key': APIKEY,
                     'api_key_new':APIKEY
         }



              }).success(
           function(data) {



               for (var i = data.reports.length - 1; i >= 0; i--) {

               };
               $scope.reports = data.reports;

               if( $scope.reports== ""){


                 $ionicLoading.hide();

                 $ionicPopup.alert({
                     title: 'Message',
                     template: 'you do Not  have any allocted   Cases  '
                   });
               }
               console.log(data.reports)
			   console.log(data.reports[0].id);
             $ionicLoading.hide();
           }
       ).error(
           function(data) {
               alert('There was an error retrieving your reports.');
               console.log('MY REPORTS Error', data);

           }
       );



       $scope.doRefresh = function() {

         $http({

        url: apiROOT + 'api/v1/allocatecase?api_key=' + api_key,
         method: "POST",

       headers: {
            'api_key': APIKEY,
            'api_key_new':APIKEY
       }



       }).success(
       function(data) {

       for (var i = data.reports.length - 1; i >= 0; i--) {

       };
       $scope.reports = data.reports;

       if( $scope.reports== ""){


        $ionicLoading.hide();

        $ionicPopup.alert({
            title: 'Message',
            template: 'you do Not  have   Cases on  your profile  '
          });
       } else {

        $scope.$broadcast('scroll.refreshComplete');

       }

       console.log(data.reports)
       console.log(data.reports[0].id);

       $ionicLoading.hide();
       }
       ).error(
       function(data) {
       alert('There was an error retrieving your reports.');
       console.log('MY REPORTS Error', data);

       }
       );

         };



	$ionicModal.fromTemplateUrl('templates/allocate.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });







    $scope.openModales = function(report) {
     $scope.selectedId = report;
    $scope.modal.show();


  };




   $scope.selectedId = {
        id: null,
        status: null

    };




     $scope.acceptcases=function() {

     $ionicLoading.show({
           template: ' Request   In procese...'
       });

                   if (localStorage.getItem("key")) {
                                    APIKEY = localStorage.getItem("key");


                                    var  api_key   = APIKEY;

                                    var  id   =    $scope.selectedId.id ;

                                }



                              $http({
                              url: apiROOT + 'api/v1/acceptedcaseMoblie?api_key=' + api_key + '&id=' +  id  ,
                                            method: "POST",

                              headers: {
                                   'api_key': APIKEY,
                                   'api_key_new':APIKEY
                                   }

                                 }).success(function(data) {


                              $ionicLoading.hide();
                              $scope.modal.hide();


                           $ionicPopup.alert({
                        title: 'Report  ...',
                  template: ' your Request has  been  successfully updated  '
                           });



               console.log(data.msg)

           }
       ).error(
           function(data) {
               alert('There was error on  request  closouser   .');
               console.log('MY REPORTS Error', data);

           }
       );




  };





     $scope.declinecases=function() {
         $ionicLoading.show({
           template: ' Request   In procese...'
       });


             if (localStorage.getItem("key")) {
                                    APIKEY = localStorage.getItem("key");


                                    var  api_key   = APIKEY;

                                    var  id   =    $scope.selectedId.id ;

                                }



                              $http({
                              url: apiROOT + 'api/v1/declinseMoblie?api_key=' + api_key + '&id=' +  id  ,
                                            method: "POST",

                              headers: {
                                   'api_key': APIKEY,
                                   'api_key_new':APIKEY
                                   }

                                 }).success(function(data) {


                              $ionicLoading.hide();
                              $scope.modal.hide();


                        $ionicPopup.alert({
                        title: 'Report  ...',
                        template: ' your Request has  been  successfully updated  '
                           });


               console.log(data.msg)

           }
       ).error(
           function(data) {
               alert('There was error on  request  closouser   .');
               console.log('MY REPORTS Error', data);

           }
       );


  };



	 $scope.openclosel=function() {

   $scope.modal.hide();

  };



    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();





})
.controller('NotificationCtrl' , function($scope, $stateParams,  $ionicPopup,$timeout, $ionicLoading  , ionicMaterialMotion, ionicMaterialInk,$ionicModal  ,  $http) {

 $scope.message  = {};


 $scope.notice = {text: ""};


                                    if (localStorage.getItem("key")) {
                                     APIKEY = localStorage.getItem("key");
                                     var  api_key   = APIKEY;

                                     }

  $http.get(apiROOT + 'api/v1/messagenofication?api_key=' + api_key)
      .then(function(response) {
          $scope.myWelcome = response.data;
      });
      $scope.modalAnimations = ['bounceIn'
                             , 'bounceInDown'
                             , 'bounceInLeft'
                             , 'bounceInRight'
                             , 'bounceInUp'
                             , 'fadeIn'
                             , 'fadeInDown'
                             , 'fadeInDownBig'
                             , 'fadeInLeft'
                             , 'fadeInLeftBig'
                             , 'fadeInRight'
                             , 'fadeInRightBig'
                             , 'fadeInUp'
                             , 'fadeInUpBig'
                             , 'flipInX'
                             , 'flipInY'
                             , 'lightSpeedIn'
                             , 'rotateIn'
                             , 'rotateInDownLeft'
                             , 'rotateInDownRight'
                             , 'rotateInUpLeft'
                             , 'rotateInUpRight'
                             , 'slideInUp'
                             , 'slideInDown'
                             , 'slideInLeft'
                             , 'slideInRight'
                             , 'zoomIn'
                             , 'zoomInDown'
                             , 'zoomInLeft'
                             , 'zoomInRight'
                             , 'zoomInUp'
                             , 'rollIn'
                             ]


      $ionicModal.fromTemplateUrl('templates/notification.html', {
         scope: $scope,
         animation: 'fadeInUp',
          hideDelay:1020
       }).then(function(modal) {
         $scope.modal = modal;
       });
       $scope.openModal = function(x) {
       $scope.selectedId = x;
         $scope.modal.show();
       };
       $scope.openclosel = function() {
         $scope.modal.hide();
       };


       $scope.sendmesage =  function(selectedId){

      var  from  =     $scope.selectedId.from;
      var  to     = $scope.selectedId.to;
      var  message  =       $scope.notice.text;
      var  case_id   =     $scope.selectedId.case_id;
      //   alert( $scope.selectedId.from) ;

//+ '&from=' + from + '&to=' to+ '&case_id=' case_id + '&message=' + message

         $http.post(apiROOT + 'api/v1/newmessagenofication?api_key=' + api_key +'&from='+from + '&to=' + to + '&case_id=' + case_id+'&message='+message)
             .then(function(response) {
                 $scope.myWelcome = response.data;
             });

              $scope.modal.hide();
       };





})

.controller('GalleryCtrl', function($scope,$ionicModal, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion ,$cordovaCalendar ,$compile,uiCalendarConfig ) {
//238 case controller
$scope.modalAnimations = ['bounceIn'
                       , 'bounceInDown'
                       , 'bounceInLeft'
                       , 'bounceInRight'
                       , 'bounceInUp'
                       , 'fadeIn'
                       , 'fadeInDown'
                       , 'fadeInDownBig'
                       , 'fadeInLeft'
                       , 'fadeInLeftBig'
                       , 'fadeInRight'
                       , 'fadeInRightBig'
                       , 'fadeInUp'
                       , 'fadeInUpBig'
                       , 'flipInX'
                       , 'flipInY'
                       , 'lightSpeedIn'
                       , 'rotateIn'
                       , 'rotateInDownLeft'
                       , 'rotateInDownRight'
                       , 'rotateInUpLeft'
                       , 'rotateInUpRight'
                       , 'slideInUp'
                       , 'slideInDown'
                       , 'slideInLeft'
                       , 'slideInRight'
                       , 'zoomIn'
                       , 'zoomInDown'
                       , 'zoomInLeft'
                       , 'zoomInRight'
                       , 'zoomInUp'
                       , 'rollIn'
                       ]


$ionicModal.fromTemplateUrl('templates/gallery.html', {
   scope: $scope,
   animation: 'fadeInUp',
    hideDelay:1020
 }).then(function(modal) {
   $scope.modal = modal;
 });
 $scope.openModal = function(x) {
 $scope.selectedId = x;
   $scope.modal.show();
 };
 $scope.openclosel = function() {
   $scope.modal.hide();
 };


             if (localStorage.getItem("key")) {
                                    APIKEY = localStorage.getItem("key");


                                    var  api_key   = APIKEY;


                                }



  $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
          left: 'month  agendaWeek agendaDay',
          center: 'title',
          right: 'today prev,next'
        },
        eventClick: function(calEvent, jsEvent, view) {

            //   alert('Event: ' + calEvent.title  + calEvent.message);
               //alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
               //alert('View: ' + view.name);
               // change the border color just for fun
             $(this).css('border-color', 'red');

               $scope.title      = calEvent.title;
               $scope.department = calEvent.department;
               $scope.category   = calEvent.category;
               $scope.sub_category   = calEvent.sub_category;
               $scope.description   = calEvent.description;
               $scope.status   = calEvent.status;
               $scope.message   = calEvent.message;

                 $scope.modal.show();


           },

             selectable: true,
             selectHelper: true,
             editable: false,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
       events:apiROOT + 'api/v1/mobilecalendarListPerUser?api_key='+APIKEY
      }
    };

//   events:apiROOT + 'api/v1/mobilecalendarListPerUser?api_key='+APIKEY
    /* alert on eventClick */
      $scope.alertOnEventClick = function( events){
          $scope.alertMessage = (date.title + ' was clicked ');
      };
      /* alert on Drop */



})

;
