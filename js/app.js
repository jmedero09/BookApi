
// AIzaSyDv65pOGkf1np9V5
function getRequest(search,callback) {

		var params = {
			//part:'snippet',
			key:"AIzaSyDv65pOGkf1np9V56hTMDV_Iy1ukR3gXj4",

			q:search,

			maxResults:40,

			orderBy:"relevance"
		};
		$.ajax({
			
			url: "https://www.googleapis.com/books/v1/volumes",

			data: params,	

			dataType: "jsonp",//use jsonp to avoid cross origin issues

			type: "GET"
		})
		.done(function(result){ //this waits for the ajax to return with a succesful promise 
				
			$('.error-text').html(result.items.length +" results for "+params.q);
			
			$.each(result.items, function(key,value) {

				$('.book-results').append('<div class=" col-xs-6 col-sm-4 col-md-2 col-lg-2 bookPic"><img class="img-responsive" src= "'+value.volumeInfo.imageLinks.thumbnail+'"><p>'+value.volumeInfo.title+'</p></div>')
			});				
				callback(result.items);

		});

}	

function pagesPerDay(pageAmount,days){
	
	return pageAmount/days;

}
function show(img,title,howManyDays,dailyReadings){
	return '<div class=" col-xs-6 col-sm-4 col-md-offset-3 col-md-2 col-lg-2 bookPic"><img class="img-responsive" src= "'+picture+'"></div><div col-md-1><h3>'+title+'</h3>'+'<h3>Days You want to finish book:'+howManyDays+'</h3><h3>Pages to read a day '+dailyPageReading+'</h3></div>'
}
$(document).ready(function(){
	
	var bookResults = "";

	$('button').click(function(e){
		
		e.preventDefault();

		$('.book-results').empty();

		var search = $("#book_search").val();

		getRequest(search,function(data){

			bookResults = data


		});

	});

	$('.book-results').on('click','.bookPic','img',function(){
				
		for(var i =0;i<bookResults.length;i++){

			if($(this).text()===bookResults[i].volumeInfo.title){

				var bookPages = bookResults[i].volumeInfo.pageCount;
				var picture = bookResults[i].volumeInfo.imageLinks.thumbnail;
				var title =  bookResults[i].volumeInfo.title

			}
}
		var howManyDays =  prompt('In how many days would you like to finish your book');
		var dailyPageReading = Math.round(pagesPerDay(bookPages,howManyDays));
		$('.book-results').empty();
		$('.book-results').append('<div class=" col-xs-6 col-sm-4 col-md-offset-3 col-md-6 col-lg-2 bookPic"><img class="img-responsive" src= "'+picture+'"></div><div><h3>'+title+'</h3>'+'<h3>Days You want to finish book: '+howManyDays+'</h3>'+'<h3>Pages in book: '+ bookPages+'</h3><h3>Pages to read a day: '+dailyPageReading+'</h3></div>')


		
	});		


});


