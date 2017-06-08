Number.prototype.formatMoney = function(c, d, t){
var n = this, 
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
    j = (j = i.length) > 3 ? j % 3 : 0;
   return '$' + s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };

var current = 0;
var goal = 0;
var activeOverlay = false;
var departureDate = new Date("Jul 4, 2017 06:25:00").getTime();

function percent() {
    return 100 * current / goal;
}

$(document).ready(function () {
    $('#goalbar .close').hide();
    $('#number').text(0);
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
        url: "https://spreadsheets.google.com/feeds/list/1ukebBgrtl3TU7HG-MpN8eON-nA6jjfQf0QZecDu6uvc/2/public/values?alt=json",
        dataType: "json",
        success: function(data) {processMoney(data);}
	});
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

function processMoney(data) {
    var entries = data.feed.entry;
    goal = parseFloat(entries[0].gsx$goal.$t);
    current = parseFloat(entries[0].gsx$totalraised.$t);
    $('#goal').text('Goal: ' + goal.formatMoney());
    setTimeout(function () {
        $('#goalbar').css('height', 0);
                    $('#goal').removeClass('below');
        $('#goalbar').animate({
            height: percent() + '%'
        }, {
            duration: 1000,
            step: function( now, fx ) {
                $('#number').text((now * goal / 100).formatMoney());
                if ($('#goal').offset().top < $('#goal').height()) {
                    $('#goal').addClass('below');
                }
            }
        });
    }, 500);

    for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        var name = entry.gsx$donatedto.$t;
        var amt = parseFloat(entry.gsx$sumamount.$t);
        $('<div class="goalbar-sect" style="height: ' + (amt * 100 / current) + '%"><div class="overlay"></div><div class="data"><div class="title">' + name + '</span></div><div class="description"><em class="small">Raised ' + amt.formatMoney(2) + '</em></div></div></div>').appendTo('#goalbar');
    }

    $('.goalbar-sect').click(function (e) {
        if (e.target !== this) {
            $(this).children('.data, .overlay').animate({ left: '100vw'}, 'slow');
            $('#goalbar .close').fadeOut();
            activeOverlay = false;
        } else {
            $(this).children('.data, .overlay').animate({ left: '0'}, 'slow');
            $('#goalbar .close').delay(400).fadeIn();
            activeOverlay = true;
        }
    });
}

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

    $('.goalbar-sect').click(function (e) {
        if (e.target !== this) {
            $(this).children('.data, .overlay').animate({ left: '100vw'}, 'slow');
            $('#goalbar .close').fadeOut();
            activeOverlay = false;
        } else {
            $(this).children('.data, .overlay').animate({ left: '0'}, 'slow');
            $('#goalbar .close').delay(400).fadeIn();
            activeOverlay = true;
        }
    });
}

jQuery('body').keyup(function(event) {
    if (activeOverlay && event.which == 27) {
        $('.goalbar-sect .data, .goalbar-sect .overlay').animate({ left: '100vw'}, 'slow');
        $('#goalbar .close').fadeOut();
        activeOverlay = false;
    }
});