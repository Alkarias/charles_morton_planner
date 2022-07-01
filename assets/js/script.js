var today = moment().format('dddd, MMMM Do'); // grabs the current time and formats it appropriately
var calendar = init(); //initializes the list on startup
$('#currentDay').text(today); // sets the jumbotron object that holds the date
// colorChange();

$('.row').on('click', 'button', function(event) {
    var textAreaEl = $(this).siblings('textarea');
    var index = ;
    console.log(index);


    save(index, textAreaEl.val());
});

function save(index, content) {
    calendar.splice(index,1,content);
    console.log(calendar);
    localStorage.setItem('calendar',JSON.stringify(calendar));
}

function init() { // this is the function to initialize content from localStorage
    var calendar = JSON.parse(localStorage.getItem('calendar'));

    if (calendar === null) {
        calendar = ["","","","","","","","",""];
    }
    
    for (var i = 0; i < calendar.length; i++) {
        $('.container').children().eq(i).children('textarea').text(calendar[i]);
    }
    return calendar;
}

function colorChange() {
    var label = $('.row').children('span');
    var clock = setInterval(function() {


        var now = moment().format('hh');
        console.log(now);

        $.each(label, function() {
            
        });



    }, 1000);
}