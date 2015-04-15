/*
 * Copyright © 2012-2015, Intel Corporation. All rights reserved.
 * Please see the included README.md file for license terms and conditions.
 */


/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false app:false, dev:false, cordova:false */



// This file contains your event handlers, the center of your application.
// NOTE: see app.initEvents() in init-app.js for event handler initialization code.

function myEventHandler() {
    "use strict" ;
    var ua = navigator.userAgent ;
    var str ;

    if( window.Cordova && dev.isDeviceReady.c_cordova_ready__ ) {
            str = "It worked! Cordova device ready detected at " + dev.isDeviceReady.c_cordova_ready__ + " milliseconds!" ;
    }
    else if( window.intel && intel.xdk && dev.isDeviceReady.d_xdk_ready______ ) {
            str = "It worked! Intel XDK device ready detected at " + dev.isDeviceReady.d_xdk_ready______ + " milliseconds!" ;
    }
    else {
        str = "Bad device ready, or none available because we're running in a browser." ;
    }

    alert(str) ;
}

user_located = false;

var options = {
    timeout: 60000,
    maximumAge: 11000,
    enableHighAccuracy: true
};
//Success callback
var suc = function(p) {
    var lat = p.coords.latitude;
    var lng = p.coords.longitude;
    
    $.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&key=AIzaSyBEZmp4sgUd_IuyfMlSJJJ1tZWwN45NVfE', function(data) {
        $("#location-placeholder").html("We think you are in " + data.results[0].address_components[3].short_name +", "+ data.results[0].address_components[4].long_name);
    }); 
};

var fail = function(err) {
  //  alert(err.message);
    console.log("Geolocation failed. \nPlease enable GPS in Settings.", 1);
    
};

function locateUser($ionicLoading) {
    if (!user_located) {
        try {
            if (navigator.geolocation !== null) {
                navigator.geolocation.watchPosition(suc, fail, options);
            }
            else if (intel.xdk.geolocation != null) {
                intel.xdk.geolocation.watchPosition(suc, fail, options);
            }
        } catch (e) {
            alert(e.message);
        }

        // IP Geolocation first
    /*    $.get("http://ip-api.com/json", function (data,  {
            $("#location-placeholder").html("We think you are in " + data.city +", "+ data.country);
        });*/

   /*     $.ajax({
            url: "http://ip-api.com/json",
            success: function (data) {
                $("#location-placeholder").html("We think you are in " + data.city +", "+ data.country);
            },
            error: function(data, msg) {
                $ionicLoading.show({ template: 'We are unable to connect to the Internet. Please check your connection.', noBackdrop: true, duration: 5000 });
            }
        });
*/
        user_located = true;
    }
}

_routes = [
    { id: 1, likes:'12', distance: '10.4',title: 'Tallinn forrest 1', url: 'tab/routes/detail/1', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor.', image:'img/map-preview-default.png' },
    { id: 2, likes:'10', distance: '2.2', title: 'Tallinn forrest 2', url: 'tab/routes/detail/2', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor.', image:'img/map-preview-default-2.png' },
    { id: 3, likes:'1', distance: '12.2', title: 'Tallinn forrest 3', url: 'tab/routes/detail/3', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor.', image:'img/map-preview-default-2.png' },
    { id: 4, likes:'3', distance: '24.9', title: 'Tallinn forrest 4', url: 'tab/routes/detail/4', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor.', image:'img/map-preview-default.png' },
    { id: 5, likes:'9', distance: '103.3', title: 'Tallinn forrest 5', url: 'tab/routes/detail/5', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor.', image:'img/map-preview-default-2.png' },
    { id: 6, likes:'2', distance: '1.3', title: 'Tallinn forrest 6', url: 'tab/routes/detail/6', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor.', image:'img/map-preview-default.png' }
  ];

_places = [
    { id: 1, title: 'Tallinn place 1', src:'img/place-1.jpg', url: 'tab/places/detail/1', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor.', likes: 152, lng: 0, lat: 0, distance: "2km" }, //TODO: Calculate the distance from the coordinates
    { id: 2, title: 'Tallinn place 2', src:'img/place-2.jpg', url: 'tab/places/detail/2', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor.', likes: "1.3k", lng: 0, lat: 0, distance: "7km"  },
    { id: 3, title: 'Tallinn place 3', src:'img/place-1.jpg', url: 'tab/places/detail/3', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor.', likes: 280, lng: 0, lat: 0, distance: "15km"  },
    { id: 4, title: 'Tallinn place 4', src:'img/place-2.jpg', url: 'tab/places/detail/4', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor.', likes: 80, lng: 0, lat: 0, distance: "16km"  },
    { id: 5, title: 'Tallinn place 5', src:'img/place-1.jpg', url: 'tab/places/detail/5', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor.', likes: 399, lng: 0, lat: 0, distance: "18km"  },
    { id: 6, title: 'Tallinn place 6', src:'img/place-2.jpg', url: 'tab/places/detail/6', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor.', likes: 412, lng: 0, lat: 0, distance: "35km"  }
  ];

// ...additional event handlers here...



angular.module('ionicApp', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })
    .state('tabs.dashboard', {
      url: "/dashboard",
      views: {
        'dashboard-tab': {
          templateUrl: "templates/dashboard.html",
          controller: 'DashboardTabCtrl'
        }
      }
    })
    .state('tabs.places', {
      url: "/places",
      views: {
        'places-tab': {
          templateUrl: "templates/places.html",
          controller: "PlacesTabCtrl"
        }
      }
    })
    .state('tabs.pdetail', {
      url: "/places/detail/:routeId",
      views: {
        'places-tab': {
          templateUrl: "templates/place-detail.html",
          controller: 'PlaceDetailTabCtrl'          
        }
      }
    })
    .state('tabs.routes', {
      url: "/routes",
      views: {
        'routes-tab': {
          templateUrl: "templates/routes.html",
          controller: "RouteListCtrl"
        }
      }
    })
    .state('tabs.rdetail', {
      url: "/routes/detail/:routeId",
      views: {
        'routes-tab': {
          templateUrl: "templates/route-detail.html",
          controller: 'RoutesTabCtrl'          
        }
      }
    })
    .state('tabs.profile', {
      url: "/profile",
      views: {
        'profile-tab': {
          templateUrl: "templates/profile.html"
        }
      }
    });


   $urlRouterProvider.otherwise("/tab/dashboard");

})

.controller('NavCtrl', function($scope, $ionicSideMenuDelegate) {
  $scope.showMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
})

.controller("RouteListCtrl",function($scope,$location,$ionicLoading){
    $scope.routes = _routes;
})

.controller('DashboardTabCtrl', function($scope, $location, $ionicLoading) {

  //locateUser($ionicLoading);
    
  $scope.routes = _routes;
    
  $scope.places = _places;
    
  $scope.goDetail = function ( path ) {
      //$location.state( "/tab/routes");
      $location.path( path );
      
  };
})

.controller('PlacesTabCtrl', function($scope, $location, $ionicLoading) {
  var img_margin = 11;
  var desired_width = 200;
  var screen_width = $(window).width();
  var item_cnt = Math.round(screen_width/desired_width);
      
  var real_width = Math.round(desired_width + (screen_width - (desired_width)*item_cnt)/item_cnt);
    
  $scope.places = _places;
  $scope.img_width = real_width - img_margin*2;
})

.controller('PlaceDetailTabCtrl', function($scope, $stateParams) {
  $scope.data = _places[$stateParams.routeId-1];
    
  $scope.getFavouriteBtnIcon = function () {
      return "ion-ios-heart-outline";
  };
    
  $scope.toggleFavourite = function ($event) {
    if ($($event.target).hasClass("ion-ios-heart-outline")) {
        $($event.target).removeClass("ion-ios-heart-outline");
        $($event.target).addClass("ion-ios-heart");
    }
    else {
        $($event.target).removeClass("ion-ios-heart");
        $($event.target).addClass("ion-ios-heart-outline");
    }
  }
})


.controller('RoutesTabCtrl', function($scope, $stateParams) {
  $scope.title = _routes[$stateParams.routeId-1].title;
})

.directive('searchBar', [function () {
	return {
		scope: {
			ngModel: '='
		},
		require: ['^ionNavBar', '?ngModel'],
		restrict: 'E',
		replace: true,
		template: '<ion-nav-buttons side="right">'+
						'<div class="searchBar">'+
							'<div class="searchTxt" ng-show="ngModel.show">'+
						  		'<div class="bgdiv"></div>'+
						  		'<div class="bgtxt">'+
						  			'<input type="text" placeholder="Search for a place or a route..." ng-model="ngModel.txt">'+
						  		'</div>'+
					  		'</div>'+
						  	'<i class="icon placeholder-icon" id="search-btn" ng-click="ngModel.txt=\'\';ngModel.show=!ngModel.show;"></i>'+
						'</div>'+
					'</ion-nav-buttons>',
		
		compile: function (element, attrs) {
			var icon=attrs.icon
					|| (ionic.Platform.isAndroid() && 'ion-android-search')
					|| (ionic.Platform.isIOS()     && 'ion-ios7-search')
					|| 'ion-search';
			angular.element(element[0].querySelector('.icon')).addClass(icon);
			
			return function($scope, $element, $attrs, ctrls) {
				var navBarCtrl = ctrls[0];
				$scope.navElement = $attrs.side === 'right' ? navBarCtrl.rightButtonsElement : navBarCtrl.leftButtonsElement;
				
			};
		},
		controller: ['$scope','$ionicNavBarDelegate', function($scope,$ionicNavBarDelegate){
			var title, definedClass;
			$scope.$watch('ngModel.show', function(showing, oldVal, scope) {
        $("#search-btn").click(function(){
          $(".bar-header .title").toggle();
        });
        
				if(showing!==oldVal) {
					if(showing) {
						if(!definedClass) {
							var numicons=$scope.navElement.children().length;
							angular.element($scope.navElement[0].querySelector('.searchBar')).addClass('numicons'+numicons);
						}
						
						title = $ionicNavBarDelegate.title();
						$ionicNavBarDelegate.title('');
            //$(".bar-header .title").hide();
					} else {
						$ionicNavBarDelegate.title(title);
					}
				} else if (!title) {
					title = $ionicNavBarDelegate.title();
				}
			});
		}]
	};
}]);
