$(document).ready(function() {

	$('.form1').submit( function(event){
		// zero out results if previous search has run
		// $('.results').html('');
		// get the value of the tags the user submitted
		var search = $(this).find("input[name='tags']").val();
		getVideos(search);
	});

	function YouTubeGetID(url) {
		var ID = '';
		url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
		if(url[2] !== undefined) {
			ID = url[2].split(/[^0-9a-z_]/i);
			ID = ID[0];
		}
		else {
			ID = url;
		}
		return ID;
	}
/*
	var request = {tag: topic,
		      pagesize: 10,
		        period: 'all_time'};
*/

	function getVideos(search)
	{

		var result = $.ajax({
			url: "http://gdata.youtube.com/feeds/api/videos?alt=json&v=2&q=" + search + " travel&safeSearch=strict&time=all_time&uploader=partner",
			dataType: "json",
			type: "GET",
			})
		.done(function(result){
			/*
			var searchResults = showSearchResults(request.tag, result.items.length);
			$('.search-results').html(searchResults);

			$.each(result.items, function(i, item) {
				var topPerson = showAnswerers(item);
				$('.results').append(topPerson);
			});
			*/
			/* result.feed.entry[0].title.$t */
			for(var i = 0; i < result.feed.entry.length; i++)
			{
				var link = result.feed.entry[i].link[0].href;
				$("section").append("<iframe id=\"" + i + "\" width=\"560\" height=\"315\" src=\"//www.youtube.com/embed/bBH0ele7qdw\" frameborder=\"0\" allowfullscreen></iframe>");
				$("section iframe#" + i + "").attr("src", "//www.youtube.com/embed/" + YouTubeGetID(link));
			}
		})
		.fail(function(jqXHR, error, errorThrown){
			/*
			var errorElem = showError(error);
			$('.search-results').append(errorElem);
			*/
			alert("There was a problem");
		});
	}

});