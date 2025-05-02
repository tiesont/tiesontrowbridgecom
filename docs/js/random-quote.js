$(function(){
    let quote = $('#random-quote');

    let i = Math.floor(Math.random() * quoteIDs.length);
    let id = quoteIDs[i];

    let url = `${location.origin}/quotes/${id}`;

    $.get(url)
        .done(function(response, status, jqxhr){
            quote.html(response);
        });    
});