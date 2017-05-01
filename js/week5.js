
var TwitterApi = (function(options) {
	var shared = {};
	var options = options || {};

	function setupListeners() {

		console.log('setupListeners()');

		$('.timeline').on('click', function(e) {
			e.preventDefault();
			killTheTweets();
			$.ajax('twitter-proxy.php?op=user_timeline&screen_name=' + $('.handle').val())
			.done(processTweetResults);

		});

		$('.quicky').click('submit', function(e) {
			e.preventDefault();
			killTheTweets();
			$.ajax('twitter-proxy.php?op=search_tweets&q=' + $('.query-search').val())
	
			.done(processSearchTweets);

		});

		$('.custom').click('submit', function(e) {
			e.preventDefault();
			killTheTweets();
			$.ajax('twitter-proxy.php?op=search_tweets&q=' + $('.query-2').val() + '&count=' + $('.limit').val() + '&result_type=' + $('.result_type').val())
	
			.done(processSearchTweets);
		});
	}

	function processTweetResults(result) {
		var results = JSON.parse(result);
		console.log(results);

		for (var i = 0; i < results.length; i++) {
			results[i]
			var timelineResult = document.createElement('p');
			$(timelineResult).html(results[i].text)
			$('.tweets').append(timelineResult);
		}

	}

	function processSearchTweets(result) {
		var results = JSON.parse(result).statuses;
		console.log(results);

		for (var i = 0; i < results.length; i++) {
			results[i]
			var timelineResult = document.createElement('p');
			$(timelineResult).html(results[i].text)
			$('.tweets').append(timelineResult);
		}

	}

	function killTheTweets() {
		for (var i = 0; i < $('p').length; i++) {
			$('p').remove();
		}

	}

	var init = function() {
		console.log('init()');
		setupListeners();
		// $.ajax('twitter-proxy.php?op=search_tweets&q=france')
		// .done(processTweetResults)
	};
	shared.init = init;

	return shared;
}());

TwitterApi.init();