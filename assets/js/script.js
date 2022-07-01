var calendar = init(); //initializes the list on startup
var today = moment().format('dddd, MMMM Do'); // grabs the current time and formats it appropriately
$('#currentDay').text(today); // sets the jumbotron object that holds the date

//event listener that checks for the clicking of the save buttons
$('.row').on('click', 'button', function() {
    //grabs the text area relative to the button that was clicked
    var textAreaEl = $(this).siblings('textarea'); 
    //grabs the time that corresponds to the time of the current timeblock 
    var index = $(this).parent().attr('data-milTime');
    //saves the current index into localStorage
    save(index - 9, textAreaEl.val());
});

//function that stores the current data in localStorage
function save(index, content) {
    calendar.splice(index,1,content); //overwrites the index with the current data
    localStorage.setItem('calendar',JSON.stringify(calendar)); // saves the array to localStorage
}

function init() { // this is the function to initialize content from localStorage
    var calendar = JSON.parse(localStorage.getItem('calendar'));
    //if the localStorage is empty, create a blank array for data storage
    if (calendar === null) { 
        calendar = ["","","","","","","","",""];
    }
    //assigns each datapoint in the localStorage to its respective time block
    for (var i = 0; i < calendar.length; i++) {
        $('.container').children().eq(i).children('textarea').text(calendar[i]);
    }

    // updates the colors of the time blocks on load, rather than
    changeColor(); 
    //starts a clock that will update the colors as time passes with the website open
    var clock = setInterval(function() {
        changeColor();
    },1000);

    return calendar; // returns the localStorage data to the global
}

// function that updates the colors of the timeblocks based on the current time
function changeColor() {
    var timeBlock = $('.row'); // creates an array that holds each of the timeblocks
    var now = parseInt(moment().format('k')); // grabs the current hour, in military time
    //loops through the timeblock array
    $.each(timeBlock, function() {
        var blockTime = $(this).attr('data-milTime'); // grabs the index of the current timeblock
        var textAreaEl = $(this).children('textarea');// points to the textarea in the current timeblock
        if (blockTime == now) { // if the timeblock represents the current time switch it's color to match
            textAreaEl.removeClass('future');
            textAreaEl.addClass('present');
        } else if (blockTime < now) { // if the timeblock represents a time that has already passed, switch it's color to match
            textAreaEl.removeClass('future');
            textAreaEl.addClass('past');
            }
    });
}