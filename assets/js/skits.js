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
});