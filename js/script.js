// FSJS - Random Quote Generator

// Create the array of quote objects and name it quotes
var quotes = [
    {
        quote: "some string1",
        source: "Jeffrey",
        citation: null,
        date: "12/12/12"
    },
    {
        quote: "some string2",
        source: "Jeffrey",
        citation: 'skywards',
        date: "12/12/12"
    },
    {
        quote: "some string3",
        source: "Jeffrey",
        citation: null,
        date: "12/12/12"
    },
    {
        quote: "some string4",
        source: "Jeffrey",
        citation: null,
        date: "12/12/12"
    },
    {
        quote: "some string5",
        source: "Jeffrey",
        citation: null,
        date: null
    }
]

// When making the random RGB color I saw I could reuse this from the getRandomQuote function
function getRandomNumber(topNumber) {
    return Math.floor(Math.random() * topNumber);
} 

// Create the getRandomQuuote function and name it getRandomQuote
function getRandomQuote() {
    // Awesome I remembered this correctly form the course!
    // so randomNumbers gets a number between 0 and whatever the lenght of the quotes array is
    var randomNumber = getRandomNumber(quotes.length);
    // I get a randomQuote Object by taking my quotes array and add the randomNumber to it
    // this way the random number acts like an index number for the array and pics a quote Object from the array
    // I return it because this function needs to be called in the printQuote function
    return quotes[randomNumber];

    // I tested the workings of this function by changing the eventlisteners function call to this function's name
    // so I could console.log the randomNumber, but also the quotes[randomNumber]
}

// I remember the random RGB generator from the course
// So I wrote that myself here
function randomBackgroundColor() {
    // and RGB value ranges from 0 to 255
    // the topNumber should thus be 255
    var red = getRandomNumber(255);
    var green = getRandomNumber(255);
    var blue = getRandomNumber(255);

    return 'rgb('+red+','+green+','+blue+')';
}

// I made the buildString function to build the correct template
function buildTemplate(randomQuote) {
    // flag the buildedString variable
    // build the html with the recieved argument

    // add the qoute to the stringTemplate variable
    var stringTemplate = '<p class="quote">'+randomQuote.quote+'</p>';

    // Before I had the variables which are now within the if-statements
    // at the top here as well, but they only need to be build when their data exist
    // and a quote should always be there (in this exercise) so  I added it
    // directly to the stringTemplate variable

    // I know this is not requested but i want it :)
    if(randomQuote.source) {
        var sourceParagrap = '<p class="source">'+randomQuote.source;
        stringTemplate += sourceParagrap;
    }

    // if there is a citation add it to the template
    // I added the source check later as I felt like there can only be a citation when there is a source
    if(randomQuote.citation && randomQuote.source) {
        var citationSpan = '<span class="citation">'+randomQuote.citation+'</span>';
        stringTemplate += citationSpan;
    }

    // if therre is a date add it to the template
    // I added the source check later as I felt like there can only be a date when there is a source
    if(randomQuote.date && randomQuote.source) {
        var dateSpan = '<span class="year">'+randomQuote.date+'</span>';
        stringTemplate += dateSpan;
    }

    // if there is a source we need to close the p-tag
    if(randomQuote.source) {
        var closingParagraph = '</p>';
        stringTemplate += closingParagraph;
    }

    // return the builded template
    return stringTemplate;
}


// Create the printQuote funtion and name it printQuote
function printQuote() {
    // get a randomQuote object and store it in the randomQuote variable
    var randomQuote = getRandomQuote();
    // get the element with id 'quote-box'
    var quoteBox = document.getElementById('quote-box');
    // set quotebox's innerHtml to the builded template
    // pass the randomQuote as an argument to the buildTemplate function
    quoteBox.innerHTML = buildTemplate(randomQuote);
    // select the body element and style its background-color attribute
    // with an rgb value created by my randomBackgroundColor function
    document.body.style.backgroundColor = randomBackgroundColor();
}

// I build an interval interface with 2 buttons
// one for starting it and one for stoping it
var interval;
var intervalTime = 500;

function startInterval() {
    interval = setInterval(function() {
        printQuote();
    }, intervalTime)
}

function stopInterval() {
    clearInterval(interval);
}

// This event listener will respond to "Show another quote" button clicks
// when user clicks anywhere on the button, the "printQuote" function is called
document.getElementById('loadQuote').addEventListener("click", printQuote, false);

// I added my start and stop interval event listeners the same as for the printQuote
// I added the html for this in the index.html
// I updated the css with these 2 id's so they take over the styling of the already existing button
document.getElementById('startInterval').addEventListener("click", startInterval, false);
document.getElementById('stopInterval').addEventListener("click", stopInterval, false);