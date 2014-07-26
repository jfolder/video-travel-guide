$(document).ready(function() {
	var request = {tag: topic,
		      pagesize: 10,
		        period: 'all_time'};
	
	var result = $.ajax({
		url: "http://api.stackexchange.com/2.2/tags/" + topic + "/top-answerers/all_time?site=stackoverflow",
		data: request,
		dataType: "jsonp",
		type: "GET",
		})
	.done(function(result){

		var searchResults = showSearchResults(request.tag, result.items.length);
		$('.search-results').html(searchResults);

		$.each(result.items, function(i, item) {
			var topPerson = showAnswerers(item);
			$('.results').append(topPerson);
		});
	})
	.fail(function(jqXHR, error, errorThrown){
		var errorElem = showError(error);
		$('.search-results').append(errorElem);
	});
});