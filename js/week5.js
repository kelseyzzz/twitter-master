
var TwitterApi = (function(options) {
	var shared = {};
	var options = options || {};
		var value;
	function setupListeners() {

		console.log('setupListeners()');

		$('.timeline').on('click', function(e) {
			e.preventDefault();
			killTheTweets();
			value = $('.handle').val(); 
			$.ajax('twitter-proxy.php?op=user_timeline&screen_name=' + value )
			
			.done(processTweetResults);

		});

		$('.quicky').click('submit', function(e) {
			e.preventDefault();
			killTheTweets();
			value = $('.query-search').val();
			$.ajax('twitter-proxy.php?op=search_tweets&q=' + value)
	
			.done(processSearchTweets);

		});

		$('.custom').click('submit', function(e) {
			e.preventDefault();
			killTheTweets();
			value = $('.query-2').val();
			$.ajax('twitter-proxy.php?op=search_tweets&q=' + value + '&count=' + $('.limit').val() + '&result_type=' + $('.result_type').val())
	
			.done(processSearchTweets);
		});
	}

	function createTweetOnPage (results) {
		console.log('fired');
		for (var i = 0; i < results.length; i++) {
			var timelineResult = document.createElement('p');
			var a = RegexModule.url(results[i].text);
			var b = RegexModule.at(a);
			var c = RegexModule.hash(b);	
			var d = RegexModule.word(c, value);
			$(timelineResult).html(d);
			$('.tweets').append(timelineResult);
		}

	}

	function processTweetResults(result) {
		var results = JSON.parse(result);
		console.log(results);
		createTweetOnPage(results);
	}


	function processSearchTweets(result) {
		var results = JSON.parse(result).statuses;
		console.log(results);
		createTweetOnPage(results);

	}



	function killTheTweets() {
		for (var i = 0; i < $('p').length; i++) {
			$('p').remove();
		}

	}

	var init = function() {
		console.log('init()');
		setupListeners();
		
	};
	shared.init = init;

	return shared;
}());

var RegexModule = (function(){
	var shared = {};

	var getURL = function(data) {
		var urlRegex = /((http|ftp|https)?:\/\/\S+)/g;

		return data.replace(urlRegex, "<a class='url' href='$1'> $1 </a>")
	}
	var getAt = function(data) {
		var atRegex = /(^|\W)(@[a-z\d][\w-]*)/ig;

		return data.replace(atRegex, "<a class='at' href='$2'> $2 </a>")
	}
	var getHash = function(data) {
		var hashRegex = /(^|\W)(#[a-z\d][\w-]*)/ig;

		return data.replace(hashRegex, "<a class'hash' href='$3'> $2 </a>")
	}

	function highlightWord(data, keyword){
		 var searchWord = new RegExp(keyword, "gi");
		 console.log(searchWord);

		 
		 return data.replace(searchWord, "<span class='search-word'> $1 </span>")


	}


	shared = {
		url: getURL,
		at: getAt,
		hash: getHash,
		word: highlightWord

		
	}

	return shared

})();

TwitterApi.init();