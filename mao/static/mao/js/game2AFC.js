/**
 * Created by yucenli on 12/29/16.
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
        round.audioComplete = false;
        document.getElementById("correct").innerHTML = "correct rounds: " + this.correct;
        document.getElementById("incorrect").innerHTML = "incorrect rounds: " + this.incorrect;
    }
};

var round = {
    audio: null,
    number: 1,
    audioComplete: false,

    init: function () {
        document.getElementById("result").innerHTML = "";
        this.audioComplete = false;
        var x = Math.floor(Math.random() * 2);
        this.audio = new Audio('/static/mao/sounds/F1_chuo1.wav');
        if (x === 0) {
            this.number = 1;
            document.getElementById("choices").innerHTML = "1.chuo1 2.chuo2";
        }
        else {
            this.number = 2;
            document.getElementById("choices").innerHTML = "1.chuo2 2.chuo1";
        }
        this.audio.addEventListener('ended', function () {
            round.audioComplete = true;
        });
    },

    play: function () {
        this.audio.play();
    },

    start: function () {
        this.init();
        this.play();
    },

    check: function (result) {
        return result === this.number;
    }
};

function keyListener(event) {
    if (round.audioComplete) {
        var x = event.keyCode || event.which;
        // 1
        if (x == 49) {
            player.check(1);
        }
        // 2
        else if (x == 50) {
            player.check(2);
        }
    }
}

function main() {
    document.addEventListener('keypress', keyListener);
    player.newRound();
}
main();
