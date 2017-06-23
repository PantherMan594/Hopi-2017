var character = 'all';
var showAround = true;
var showAll = true;
var showLine = true;
var showOtherLines = true;
var showStage = true;

function update() {
    var lines = $('#skitlines').children('.line');
    for (var i = 0; i < lines.length; i++) {
        var line = $(lines[i]);
        var prevLine = $(lines[i - 1]);
        var nextLine = $(lines[i + 1]);
        if (line.hasClass('stage')) {
            if (showStage) line.show();
            else line.hide();
        } else if (!line.hasClass('scene')) {
            if (line.hasClass(character)) {
                line.show();
                if (!showLine) {
                    line.addClass('hideLine');
                } else {
                    line.removeClass('hideLine');
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
}

$(document).ready(function () {    
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
            case 'other':
                showOtherLines = this.checked;
                break;
            case 'stage':
                showStage = this.checked;
                break;
        }
        update();
    });

    // Add names
    /* RUNNING SKIT */
    $('.stephen').prepend('<span class="name">Stephen: </span>');
    $('.kevin').prepend('<span class="name">Kevin: </span>');
    $('.ian').prepend('<span class="name">Ian: </span>');
    $('.steve').prepend('<span class="name">Steve: </span>');
    $('.ayesha').prepend('<span class="name">Ayesha: </span>');
    $('.announcer').prepend('<span class="name">Announcer: </span>');

    /* BULLY SKIT */
    $('.bully').prepend('<span class="name">Bully: </span>');
    $('.daniel').prepend('<span class="name">Daniel: </span>');
    $('.lindsey').prepend('<span class="name">Lindsey: </span>');
    $('.auntielin').prepend('<span class="name">Auntie Lin: </span>');

    /* GOOD SAMARITAN SKIT */
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

    /* ZACCHEUS SKIT */
    $('.zack').prepend('<span class="name">Zack: </span>');
    $('.jesus').prepend('<span class="name">Jesus: </span>');
    $('.tall1').prepend('<span class="name">Tall Person 1: </span>');
    $('.tall2').prepend('<span class="name">Tall Person 2: </span>');
    $('.narrator').prepend('<span class="name">Narrator: </span>');
    $('.citizen').prepend('<span class="name">Citizen: </span>');
    $('.crowd').prepend('<span class="name">Crowd: </span>');
});