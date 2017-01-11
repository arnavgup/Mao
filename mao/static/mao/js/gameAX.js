/**
 * Created by yucenli on 12/27/16.
 */
var player = {
    correct: 0,
    incorrect: 0,

    newRound: function () {
        round.start();
    },

    check: function (result) {
        var output = round.check(result);
        if (output) {
            document.getElementById("result").innerHTML = "correct!";
            this.correct++;
        }
        else {
            document.getElementById("result").innerHTML = "incorrect!";
            this.incorrect++;
        }
        this.update();
        setTimeout(this.newRound, 5000);
    },

    update: function () {
        document.getElementById("correct").innerHTML = "correct rounds: " + this.correct;
        document.getElementById("incorrect").innerHTML = "incorrect rounds: " + this.incorrect;
    }
};

var round = {
    audio1: null,
    audio2: null,
    same: true,

    init: function () {
        document.getElementById("result").innerHTML = "";
        var x = Math.floor(Math.random() * 4);
        var sound1 = new Audio('/static/mao/sounds/F1_chuo1.wav');
        var sound2 = new Audio('/static/mao/sounds/F1_chuo2.wav');
        if (x === 0) {
            this.audio1 = sound1;
            this.audio2 = sound1;
            this.same = true;
        }
        else if (x === 1) {
            this.audio1 = sound1;
            this.audio2 = sound2;
            this.same = false;
        }
        else if (x === 2) {
            this.audio1 = sound2;
            this.audio2 = sound1;
            this.same = false;
        }
        else {
            this.audio1 = sound2;
            this.audio2 = sound2;
            this.same = true;
        }
    },

    play: function () {
        var noRepeat = true;
        this.audio1.addEventListener('ended', function () {
            if (noRepeat) {
                round.audio2.play();
                noRepeat = false;
            }
        });
        this.audio1.play();
    },

    start: function () {
        this.init();
        this.play();
    },

    check: function (result) {
        return result === this.same;
    }
};

function keyListener(event) {
    var x = event.which || event.keyCode;
    // s
    if (x == 115) {
        player.check(true);
    }
    // d
    else if (x == 100) {
        player.check(false);
    }
}

function main() {
    document.addEventListener('keypress', keyListener);
    player.newRound();
}
main();
