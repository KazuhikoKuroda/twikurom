'use strict';

angular.module('twikuromApp.services', [])
	.factory('twitterService', function($q) {
		var authResult = false;
		return {
			initialize: function() {
				//initialize OAuth.io with public key of the application
				OAuth.initialize('JNxnfqtFp1IILAedYNeNybsLalI', {
					cache: true
				});
				//try to create an authorization result when the page loads,
				// this means a returning user won't have to click the twitter button again
				authResult = OAuth.create('twitter');
			},
			isReady: function() {
				return authResult;
			},
			connectTwitter: function() {
				var deferred = $q.defer();
				OAuth.popup('twitter').done(function(result) {
					authResult = result;
					deferred.resolve();
				});
				return deferred.promise;
			},
			clearCache: function() {
				OAuth.clearCache('twitter');
				authResult = false;
			},
			getLatestTweets: function(maxId) {
				var deferred = $q.defer(),
					url = '/1.1/statuses/home_timeline.json';

				if (maxId) {
					url += '?max_id=' + maxId;
				}
				authResult.get(url)
					.done(function(result) {
						deferred.resolve(result);
					})
					.fail(function(err) {
						deferred.reject(err);
					});
				return deferred.promise;
			},
			getMe: function() {
				var deferred = $q.defer();
				if (authResult) {
					authResult.me().done(function(data) {
						deferred.resolve(data);
					});
				} else {
					deferred.reject();
				}
				return deferred.promise;
			}
		};
	});