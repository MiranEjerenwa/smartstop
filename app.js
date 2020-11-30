// create an array of strings, 
// each one related to a stock symbol that interests you. Save it to a variable called `location`

var location = [];
const validationList = [];
console.log(validationList);

const getValList = function () {
  ///stock/market/batch?symbols=aapl,fb,tsla&types=quote,news,chart&range=1m&last=5
  const queryURL = `https://api.iextrading.com/1.0/ref-data/symbols?`;
  $.get(queryURL, function(response){
    for (let i = 0; i < response.length; i++) {
      const accessList = response[i];

// Creating a div to hold the validation symbols
const valSymbolsDiv = $('<div>').addClass('valSymbols');

// Storing the valSymbols
const valSymbols = accessList.symbol;

// Appending the valSymbols to our valSymbolsDiv
valSymbolsDiv.append(valSymbols);
validationList.push(valSymbols);

    }
  
  })

}
getValList();

// Your app should take the stocks in this array and create buttons in your HTML.
const createButton = function () {

  // start with empty div
  $('.magicBtns').empty();
  // for loop to go through array length and make buttons for them

for (let i = 0; i < location.length; i++) {
  const element = location[i];
  
  // create a variable for buttons
  const stockBtn = $('<button>');
  // give the button a class 'createBtn'
stockBtn.addClass('stock-btn');
// give btn attr
stockBtn.attr('data-name', element);
// add a text to the stockBtn, which is the element name
stockBtn.text(element);
// append the buttons to html div 'magicBtns'
$('.magicBtns').append(stockBtn);
}
}
createButton();

// // calling the above function to append buttons
// $('#addSymbol').on('click', )

// When the user clicks on a button, the page should grab the company name, 
// logo, price, and up to 10 news articles related to the stock from the 
// iexTrading API and place them on the page.


const getStockInfo = function (event) {
// declare a variable for user input and query url
event.preventDefault();
const stock = $(this).attr('data-name');
console.log(stock, "this is the stock");

const queryURL = `https://api.iextrading.com/1.0/stock/${stock}/batch?types=quote,name,logo,price,news&range=1m&last=10`;

// ajax call for the specific stock button clicked
$.ajax({
  url: queryURL,
  method: 'GET'
}).then(function(response) {
  // Creating a div to hold the stock
  const stockDiv = $('<div>').addClass('stock');

// Storing the company name
const companyName = response.quote.companyName;

// Creating an element to display the company name
const nameHolder = $('<p>').text(`Company Name: ${companyName}`);

// Appending the name to our stockDiv
  stockDiv.append(nameHolder);

// Storing the logo
const companyLogo = response.logo.url;
console.log(companyLogo);

// Creating an element to display the logo
const logoHolder = $('<img>').attr('src', `${companyLogo}`);

// Appending the logo to our stockDiv
stockDiv.append(logoHolder);

// Storing the stock symbol
const stockSymbol = response.quote.symbol;

// Creating an element to display the stock symbol
const symbolHolder = $('<p>').text(`Stock Symbol: ${stockSymbol}`);

// Appending the symbol to our stockDiv
stockDiv.append(symbolHolder);

// Storing the price
const stockPrice = response.quote.latestPrice;

// Creating an element to display the price
const priceHolder = $('<p>').text(`Stock Price: $${stockPrice}`);

// Appending the price to our stockDiv
stockDiv.append(priceHolder);

   // Storing the first 10 news summary
   const companyNews = response.news;
   for (let i = 0; i<companyNews.length; i++) {
      // Creating an element to display the news summary
    const summaryHolder = $('<p>').text(`News Headline: ${companyNews[i].summary}`);
    
   // Appending the summary to our stockDiv
   stockDiv.append(summaryHolder);
   }

   //Finally adding the stockDiv to the DOM
    // Until this point nothing is actually displayed on our page
    $('#display-section').prepend(stockDiv);

})

}
// when a button is clicked
const addButton = function(event) {
  // event.preventDefault() prevents the form from trying to submit itself.
  // We're using a form so that the user can hit enter instead of clicking the button if they want
  event.preventDefault();

  // This line will grab the text from the input box & // Convert entry to upper case
  const stock = $('#stockSymbol').val().trim().toUpperCase();
// The stock from the input is then added to our array
location.push(stock);

// then use an if statement or validation to ensure the stock === 'validationList' before adding to 'stockList'
// for (let i = 0; i< validationList.length; i++) {
//   if (stock === 'validationList[i]') {
//     // The stock from the input is then added to our array
// location.push(stock);
//   } else (stock !== validationList[i]); {
//     console.log('what ?');
//   }
// }

// Deletes the contents of the input
$('#stockSymbol').val('');

// calling createButton which handles the processing of our stockList array

createButton();
}

// Event listener for #add-stock button
$('#addSymbol').on('click', addButton);

// Adding a click event listener to all elements with a class of 'stock-btn'
$(document).on('click', '.stock-btn', getStockInfo);





// $.ajax({
//   Url:'https://api.nytimes.com/svc/search/v2/articlesearch.json?',
//   Method:'GET'
//   })
  
//   .done(function() { 
// console.log('response');})
  
//   .fail (function () {
// console.log(`say what ever you want if you can't get request`);
//   });

