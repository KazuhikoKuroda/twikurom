'use strict';

function TwitterController($scope, $q, twitterService) {
	$scope.tweets = [];
	$scope.rateLimitError = false;

	twitterService.initialize();

	$scope.refreshTimeline = function(maxId) {
		twitterService.getLatestTweets(maxId).then(function(result) {
			$scope.tweets = $scope.tweets.concat(result);
		}, function() {
			$scope.rateLimitError = true;
		});
	};

	$scope.connect = function() {
		twitterService.connectTwitter().then(function() {
			if (twitterService.isReady()) {
				$('#connectButton').fadeOut(function() {
					$('#getTimelineButton, #signOut').fadeIn();
					$scope.refreshTimeline();
					$scope.connectedTwitter = true;
				});
			} else {
				console.log('unable to connect twitter');
			}
		});
	};

	$scope.signOut = function() {
		twitterService.clearCache();
		$scope.tweets.length = 0;
		$('#getTimelineButton, #signOut').fadeOut(function() {
			$('#connectButton').fadeIn();
		});
	};

	$scope.getMe = function() {
		twitterService.getMe()
			.then(function(result) {
				console.log(result);
			}, function() {
				console.error('error');
			});
	};

	if (twitterService.isReady()) {
		$('#connectButton').hide();
		$('#getTimelineButton, #signOut').show();
		$scope.connectedTwitter = true;
		$scope.refreshTimeline();
	}
}

angular.module('twikuromApp')
	.controller('TwitterController', TwitterController);
