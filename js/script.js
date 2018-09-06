// FSJS - Random Quote Generator

/* I know
 I should write multiline comments
 like this,,,
 but I don't like it
*/

//////////////////////////////////////////////////////////////////
// I am shooting for the 'Exceeds Expectations' grade here! :)  //
//////////////////////////////////////////////////////////////////

// Create the array of quote objects and name it quotes
// because of lack of inspiration I got my qoutes from here:
// https://www.brainyquote.com/
// pinterest
// google
var quotes = [
    {
        quote: "One good thing about music, when it hits you, you feel no pain.",
        source: "Bob Marley",
        citation: null,
        date: null,
        categorization: 'music, ragea, good'
    },
    {
        quote: "The beginning is the most important part of the work",
        source: "Plato",
        citation: null,
        date: null,
        categorization: 'philosophy'
    },
    {
        quote: "Don't cry because it's over, smile because it happened.",
        source: "Dr. Seuss",
        citation: null,
        date: null,
        categorization: ['happy', 'life', 'smile']
    },
    {
        quote: "The only thing we have to fear is fear itself.",
        source: "President Roosevelt",
        citation: "Roosevelt's Inaugural Address",
        date: "1933",
        categorization: 'presidents'
    },
    {
        quote: "Trust me you can dance",
        source: "Vodka",
        citation: '<a href="https://nl.pinterest.com/pin/53761789279013988" target="_blank" >Pinterest<a>',
        date: new Date().toLocaleDateString(),
        categorization: 'fun'
    }
]
// I did not know there are so many ways to get the current date: https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript

// When making the random RGB color I saw I could reuse this random number part from the getRandomQuote function
function getRandomNumber(topNumber) {
    return Math.floor(Math.random() * topNumber);
} 

// Create the getRandomQuuote function and name it getRandomQuote
function getRandomQuote() {
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
    return 'rgb('+ getRandomNumber(255)+','+getRandomNumber(255)+','+getRandomNumber(255)+')';
}

// I made a buildString function to build the correct template
function buildTemplate(randomQuote) {
    // build the html with the recieved argument
    // add the qoute to the stringTemplate variable
    var stringTemplate = '<p class="quote">'+randomQuote.quote+'</p>';

    // I know this is not requested but i want it :)
    if(randomQuote.source) {
        stringTemplate += '<p class="source">'+randomQuote.source;
    }

    // if there is a citation add it to the template
    // I added the source check later as I felt like there can only be a citation when there is a source
    if(randomQuote.citation && randomQuote.source) {
        stringTemplate += '<span class="citation">'+randomQuote.citation+'</span>';
    }

    // if therre is a date add it to the template
    // I added the source check later as I felt like there can only be a date when there is a source
    if(randomQuote.date && randomQuote.source) {
        stringTemplate += '<span class="year">'+randomQuote.date+'</span>';
    }

    // if there is a source we need to close the p-tag
    if(randomQuote.source) {
        stringTemplate += '</p>';
    }

    if(randomQuote.categorization) {
        var categorization = randomQuote.categorization;

        if(typeof categorization === 'string') {
            // I asume that when it is a string there is only one category
            // that's how I set my array up any way :p
            // also if it is a propperly formatted string it should not be a problem:
            // categorization: 'fun, happy, JavaScipting'
            // Now I had to change my qoutes array to show it!
            stringTemplate += '<p>category: <i>'+categorization+'</i></p>'

            // I wanted to use an array, but soon remembered that an array is of type object
            // So I had to google for a solution
            // StackOverflow: https://stackoverflow.com/questions/4775722/check-if-object-is-array
            // and chacked if it is useable: https://caniuse.com/#search=isArray
        } else if (Array.isArray(categorization)) {
            // start categories template
            stringTemplate += '<p>categories: <i>';
            // create a loop to loop over the array
            for(var i = 0; i < categorization.length; i += 1 ) {
                // if not the last array item add a comma and white space
                if(i !== (categorization.length - 1)) {
                    stringTemplate += categorization[i]+", ";    
                // else this is last array item and just add the array item
                } else {
                    stringTemplate += categorization[i];
                }
            }
            // close categories template
            stringTemplate += '</i></p>';
        }
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
var intervalTime = 1000; // I can't read this fast!

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

// I think there are more text comments in this document than actual code, sorry!
