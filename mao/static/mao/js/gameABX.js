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
    audio1: null,
    audio2: null,
    audio3: null,
    number: 1,
    audioComplete: false,

    init: function () {
        document.getElementById("result").innerHTML = "";
        this.audioComplete = false;
        var x = Math.floor(Math.random() * 6);
        var sound1 = '/static/mao/sounds/F1_chuo1.wav';
        var sound2 = '/static/mao/sounds/F1_chuo2.wav';
        if (x === 0) {
            this.audio1 = new Audio(sound1);
            this.audio2 = new Audio(sound2);
            this.audio3 = new Audio(sound2);
            this.number = 1;
        }
        else if (x === 1) {
            this.audio1 = new Audio(sound2);
            this.audio2 = new Audio(sound1);
            this.audio3 = new Audio(sound1);
            this.number = 1;
        }
        else if (x === 2) {
            this.audio1 = new Audio(sound1);
            this.audio2 = new Audio(sound2);
            this.audio3 = new Audio(sound1);
            this.number = 2;
        }
        else if (x === 3) {
            this.audio1 = new Audio(sound2);
            this.audio2 = new Audio(sound1);
            this.audio3 = new Audio(sound2);
            this.number = 2;
        }
        else if (x === 4) {
            this.audio1 = new Audio(sound1);
            this.audio2 = new Audio(sound1);
            this.audio3 = new Audio(sound2);
            this.number = 3;
        }
        else {
            this.audio1 = new Audio(sound2);
            this.audio2 = new Audio(sound2);
            this.audio3 = new Audio(sound1);
            this.number = 3;
        }
        this.audio1.addEventListener('ended', function () {
            round.audio2.play();
        });
        this.audio2.addEventListener('ended', function () {
            round.audio3.play();
        });
        this.audio3.addEventListener('ended', function () {
            round.audioComplete = true;
        });
    },

    play: function () {
        this.audio1.play();
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
        // 3
        else if (x == 51) {
            player.check(3);
        }
    }
}

function main() {
    document.addEventListener('keypress', keyListener);
    player.newRound();
}
main();
