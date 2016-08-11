var index = 0;

var indexValue = 0;

var tempSearch = '';

var bookResults = "";

function getRequest(search, callback) {

	var params = {
		//part:'snippet',
		key: "AIzaSyDv65pOGkf1np9V56hTMDV_Iy1ukR3gXj4",

		q: search,

		startIndex: index,

		maxResults: 18,

		orderBy: "relevance",

		printType: 'books',

		intitle: search

	};
	$.ajax({

		url: "https://www.googleapis.com/books/v1/volumes",

		data: params,

		dataType: "json	", //use jsonp to avoid cross origin issues

		type: "GET"
	})
	.done(function(result) { //this waits for the ajax to return with a succesful promise 	

		for (var i = 1; i < Math.floor(result.totalItems / 18); i++) {

			// make sure this only gets appended once 
			if(i<=10){
				
				$('#pagination').append('<li value="' + indexValue + '">' + i + '</li>');

				indexValue = indexValue + 18;

				//console.log(indexValue);
			}
		}
		indexValue=0;


		$('.error-text').html(result.items.length + " results for " + params.q);

		$.each(result.items, function(key, value) {

			$('.book-results').append('<div class=" col-xs-6 col-sm-4 col-md-2 col-lg-2 bookPic"><img class="img-responsive" src= "' + value.volumeInfo.imageLinks.thumbnail + '"><p>' + value.volumeInfo.title + '</p></div>')
		});

		callback(result.items);

	});

}

function pagesPerDay(pageAmount, days) {

	return pageAmount / days;

}

$(document).ready(function() {

	$('button').click(function(e) {

		e.preventDefault();

		$('.book-results').empty();

		$('.display-book-info').empty();

		var search = $("#book_search").val();

		tempSearch = $("#book_search").val();

		getRequest(search, function(data) {

			bookResults = data

		});

	});

	$('.book-results').on('click', '.bookPic', 'img', function() {

		for (var i = 0; i < bookResults.length; i++) {

			if ($(this).text() === bookResults[i].volumeInfo.title) {

				var bookPages = bookResults[i].volumeInfo.pageCount;

				var picture = bookResults[i].volumeInfo.imageLinks.thumbnail;

				var title = bookResults[i].volumeInfo.title

			}
		}
		var howManyDays = prompt('In how many days would you like to finish your book');

		if(howManyDays === ""|| howManyDays===null||howManyDays === 0){

			howManyDays = prompt('In how many days would you like to finish your book');
		}
		else{
			var dailyPageReading = Math.round(pagesPerDay(bookPages, howManyDays));

			$('.book-results').empty();

			$('.display-book-info').append('<div class=" col-xs-6 col-sm-4 col-md-offset-3 col-md-6 col-lg-2 bookPic"><img class="img-responsive" src= "' + picture + '"></div><div><h2>' + title + '</h2>' + '<p>Days You want to finish book: ' + howManyDays + '</p>' + '<p>Pages in book: ' + bookPages + '</p><p>Pages to read a day: ' + dailyPageReading + '</p></div>');

			$('#pagination').empty();			
		}


	});
	//page link number section 
	$('#pagination').on('click', 'li', function() {

		$('.book-results').empty();

		index = $(this).val(); //index + 18;//

		console.log(index);

		$('#pagination').empty();			


		getRequest(tempSearch, function(data) {

		bookResults = data

		});

	});

});