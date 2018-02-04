var activeOverlay = false;
var departureDate = new Date("Jul 4, 2017 06:25:00").getTime();

function percent() {
    return 100 * current / goal;
}

$(document).ready(function () {
    $('#goalbar').delay(500).fadeIn(1000);
    if ($(window).scrollTop() < $('#contentbox').offset().top) {
        $('html, body').delay(2000).animate({
            scrollTop: $('#contentbox').offset().top
        }, 'slow');
    }

    var countdown = setInterval(function () {
        var now = new Date().getTime();
        var delta = departureDate - now;
        var days = Math.floor(delta / (1000 * 60 * 60 * 24));
        var hours = (hours = Math.floor((delta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))) < 10 ? '0' + hours : hours;
        var minutes = (minutes = Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60))) < 10 ? '0' + minutes : minutes;
        var seconds = (seconds = Math.floor((delta % (1000 * 60)) / 1000)) < 10 ? '0' + seconds : seconds;

        $('#countdown').text(days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's');

        if (delta < 0) {
            clearInterval(countdown);
            $('#departure').text('Jul 4 - Jul 17');
        }
    }, 1000);
    $.ajax({
        type: "GET",
        url: "https://spreadsheets.google.com/feeds/list/1ZWoEWTRTFWRk2ymhJVNiu71mengsHeuUaPOz4A4qN5o/1/public/values?alt=json",
        dataType: "json",
        success: function(data) {processBlog(data);}
	});
});

$(window).resize(function () {
    if ($(window).height() * 7 / 5 > $(window).width()) {
        $('body').addClass('portrait');
    } else {
        $('body').removeClass('portrait');
    }
})

$(window).resize();

function processBlog(data) {
    var entries = data.feed.entry;
    var converter = new showdown.Converter();
    for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        var date = entry.gsx$date.$t;
        var author = entry.gsx$author.$t;
        var text = converter.makeHtml(entry.gsx$text.$t);
        var dateAuthor = '';
        if (date || author) {
            dateAuthor = '<div class="title">' + date + '<span class="small">' + author + '</span></div>';
        }
        $('<div class="box">' + dateAuthor + text + '</div>').prependTo('#blog');
    }
}