var character = 'all';
var showAround = true;
var showAll = true;
var showLine = true;
var showCue = true;
var showOtherLines = true;
var showStage = true;

function update(keepUrl) {
    $('#char').val(character);
    $('#showaround').prop('checked', showAround);
    $('#showall').prop('checked', showAll);
    $('#showline').prop('checked', showLine);
    $('#showcue').prop('checked', showCue);
    $('#showotherlines').prop('checked', showOtherLines);
    $('#showstage').prop('checked', showStage);
    var lines = $('#skitlines').children('.line');
    for (var i = 0; i < lines.length; i++) {
        var line = $(lines[i]);
        var prevLine = $(lines[i - 1]);
        var nextLine = $(lines[i + 1]);
        line.removeClass('highlight');
        if (line.hasClass('stage')) {
            if (showStage) line.show();
            else line.hide();
        } else if (!line.hasClass('scene')) {
            if (line.hasClass(character)) {
                if (showCue) {
                    line.show();
                    line.addClass('highlight');
                    if (!showLine) {
                        line.addClass('hideLine');
                    } else {
                        line.removeClass('hideLine');
                    }
                } else {
                    line.hide();
                }
            } else if (showAll || (showAround && ((prevLine && prevLine.hasClass(character)) || (nextLine && nextLine.hasClass(character))))) {
                line.show();
                if (!showOtherLines) {
                    line.addClass('hideLine');
                } else {
                    line.removeClass('hideLine');
                }
            } else {
                line.hide();
            }
        }
    }

    if (!keepUrl)
        history.pushState('', '', window.location.pathname + '?c='+ character
            + (showCue ? '' : '&cu=0') + (showOtherLines ? '' : '&ot=0')
            + (showAll ? '' : '&al=0') + (showAround ? '' : '&ar=0')
            + (showLine ? '' : '&li=0') + (showStage ? '' : '&st=0'));
}

var urlParams;
(window.onpopstate = function () {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query))
        urlParams[decode(match[1])] = decode(match[2]);
    character = urlParams['c'] ? urlParams['c'] : 'all';
    showAround = urlParams['ar'] ? false : true;
    showAll = urlParams['al'] ? false : true;
    showLine = urlParams['li'] ? false : true;
    showCue = urlParams['cu'] ? false : true;
    showOtherLines = urlParams['ot'] ? false : true;
    showStage = urlParams['st'] ? false : true;
    update(true);
})();

$(document).ready(function () {    
    $('#controlbox').append('<input type="checkbox" id="showaround" value="around" checked/> Show lines around character (to practice getting in/out of lines)<br />'
        + '<input type="checkbox" id="showall" value="all" checked/> Show all other lines<br />'
        + '<input type="checkbox" id="showline" value="line" checked/> Show character line (uncheck to memorize lines, though you can still highlight them to see the text)<br />'
        + '<input type="checkbox" id="showcue" value="cue" checked/> Show character line cues (completely hide the lines, to memorize getting in/out of lines)<br />'
        + '<input type="checkbox" id="showotherlines" value="other" checked/> Show other lines (uncheck if you don\'t care what other characters are saying, but just need their cues)<br />'
        + '<input type="checkbox" id="showstage" value="stage" checked/> Show stage directions');
    
    $('#char').change(function () {
        character = $('#char option:selected').val();
        update();
    });

    $('#controlbox input').change(function () {
        switch (this.value) {
            case 'around':
                showAround = this.checked;
                break;
            case 'all':
                showAll = this.checked;
                break;
            case 'line':
                showLine = this.checked;
                break;
            case 'cue':
                showCue = this.checked;
                break;
            case 'other':
                showOtherLines = this.checked;
                break;
            case 'stage':
                showStage = this.checked;
                break;
        }
        update();
    });

    $('#controlbox').prepend('<a href="bully.html">Bully</a>&emsp;'
        + '<a href="good-samaritan.html">Good Samaritan</a>&emsp;'
        + '<a href="good-samaritan-kids.html">Good Samaritan (kids)</a>&emsp;'
        + '<a href="zaccheus.html">Zaccheus</a>&emsp;'
        + '<a href="prodigal-son.html">Prod Son-ish</a>&emsp;'
        + '<a href="running.html">Running</a>&emsp;'
        + '<a href="big-baller.html">Big Baller</a>&emsp;'
        + '<a href="daniel.html">Daniel in Cave</a>&emsp;'
        + '<a href="god-is-gracious.html">God is Gracious</a><br /><br />');

    // Add names
    /* BULLY */
    $('.bully').prepend('<span class="name">Bully: </span>');
    $('.daniel').prepend('<span class="name">Daniel: </span>');
    $('.lindsey').prepend('<span class="name">Lindsey: </span>');
    $('.auntielin').prepend('<span class="name">Auntie Lin: </span>');

    /* GOOD SAMARITAN */
    $('.alcoholic').prepend('<span class="name">Alcoholic: </span>');
    $('.samaritan').prepend('<span class="name">Samaritan: </span>');
    $('.dealer').prepend('<span class="name">Dealer: </span>');
    $('.nurse').prepend('<span class="name">Nurse: </span>');
    $('.random1').prepend('<span class="name">Random Character 1: </span>');
    $('.random2').prepend('<span class="name">Random Character 2: </span>');
    $('.snapgirl').prepend('<span class="name">Snapchat Girl: </span>');
    $('.parent').prepend('<span class="name">Parent: </span>');
    $('.child').prepend('<span class="name">Child: </span>');
    $('.loser1').prepend('<span class="name">Loser 1: </span>');
    $('.loser2').prepend('<span class="name">Loser 2: </span>');
    $('.friend1').prepend('<span class="name">Friend 1: </span>');
    $('.friend2').prepend('<span class="name">Friend 2: </span>');

    /* GOOD SAMARITAN (KIDS) */

    $('.dad').prepend('<span class="name">Dad: </span>');
    $('.son').prepend('<span class="name">Son: </span>');
    $('.harasser1').prepend('<span class="name">Harasser 1: </span>');
    $('.harasser2').prepend('<span class="name">Harasser 2: </span>');
    $('.injuredboy').prepend('<span class="name">Injured Boy: </span>');
    $('.ped').prepend('<span class="name">Ped: </span>');
    $('.meanped').prepend('<span class="name">Mean Ped: </span>');
    $('.jesus').prepend('<span class="name">Jesus: </span>');

    /* ZACCHEUS */
    $('.zack').prepend('<span class="name">Zack: </span>');
    //$('.jesus').prepend('<span class="name">Jesus: </span>');
    $('.tall1').prepend('<span class="name">Tall Person 1: </span>');
    $('.tall2').prepend('<span class="name">Tall Person 2: </span>');
    $('.narrator').prepend('<span class="name">Narrator: </span>');
    $('.citizen').prepend('<span class="name">Citizen: </span>');
    $('.crowd').prepend('<span class="name">Crowd: </span>');

    /* PRODIGAL SON */
    $('.penny').prepend('<span class="name">Penny: </span>');
    $('.dame').prepend('<span class="name">Dame: </span>');
    //$('.dad').prepend('<span class="name">Dad: </span>');
    $('.boy1').prepend('<span class="name">Boy 1: </span>');
    $('.boy2').prepend('<span class="name">Boy 2: </span>');
    //$('.friend1').prepend('<span class="name">Friend 1: </span>');
    //$('.friend2').prepend('<span class="name">Friend 2: </span>');
    $('.crowd').prepend('<span class="name">Crowd: </span>');
    $('.goodfriend').prepend('<span class="name">Good Friend: </span>');
    $('.god').prepend('<span class="name">God: </span>');

    /* RUNNING */
    $('.stephen').prepend('<span class="name">Stephen: </span>');
    $('.kevin').prepend('<span class="name">Kevin: </span>');
    $('.ian').prepend('<span class="name">Ian: </span>');
    $('.steve').prepend('<span class="name">Steve: </span>');
    $('.ayesha').prepend('<span class="name">Ayesha: </span>');
    $('.announcer').prepend('<span class="name">Announcer: </span>');

    /* BIG BALLER */
    $('.alan').prepend('<span class="name">Alan: </span>');
    $('.coach').prepend('<span class="name">Coach: </span>');
    $('.andy').prepend('<span class="name">Andy: </span>');
    $('.person1').prepend('<span class="name">Person 1: </span>');
    $('.trainer').prepend('<span class="name">Trainer: </span>');
    //$('.narrator').prepend('<span class="name">Narrator: </span>');

    /* DANIEL IN THE RATTLESNAKE CAVE */
    //$('.daniel').prepend('<span class="name">Daniel: </span>');
    $('.man1').prepend('<span class="name">Man 1: </span>');
    $('.man2').prepend('<span class="name">Man 2: </span>');
    $('.king').prepend('<span class="name">King: </span>');
    $('.rattlesnake1').prepend('<span class="name">Rattlesnake 1: </span>');
    $('.rattlesnake2').prepend('<span class="name">Rattlesnake 2: </span>');
    $('.guard').prepend('<span class="name">Guard: </span>');
    //$('.god').prepend('<span class="name">God: </span>');

    /* GOD IS GRACIOUS */
    $('.christian').prepend('<span class="name">Christian: </span>');
    $('.mercy').prepend('<span class="name">Mercy: </span>');
    $('.bf').prepend('<span class="name">Mercy’s new bf: </span>');
    $('.david').prepend('<span class="name">David: </span>');
    $('.adam').prepend('<span class="name">Adam: </span>');
    $('.richie').prepend('<span class="name">Richie: </span>');
    $('.grace').prepend('<span class="name">Grace: </span>');
    $('.teacher').prepend('<span class="name">Teacher: </span>');
    //$('.narrator').prepend('<span class="name">Narrator: </span>');

    update(true);
});