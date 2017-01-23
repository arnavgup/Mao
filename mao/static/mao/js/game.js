/**
 * Created by yucenli on 12/27/16.
 */
var game = {
    AX: 0,
    ABX: 1,
    AFC2: 2,
    AFC4: 3,
    L: 4
};

var countdown = function () {
        var count = function (time) {
            document.getElementById("countdown").innerHTML = time + "s left until next round";
        };
        count(5);
        var time = 4;
        var interval = setInterval(function() {
            count(time);
            time--;
            if (time <= 0) {
                clearInterval(interval);
                setTimeout(function () {
                    document.getElementById("countdown").innerHTML = "";
                },1000);
            }
        },1000);
    };

var player = {
    correct: 0,
    incorrect: 0,
    gameType: game.AX,

    newRound: function (gameType) {
        if (gameType != null) {
            this.gameType = gameType;
        }
        setTimeout(function () {
            switch (player.gameType) {
                case game.AX: roundAX.start(); break;
                case game.ABX: roundABX.start(); break;
                case game.AFC2: roundAFC2.start(); break;
            }
        }, 5000);
        countdown();
    },

    check: function (result) {
        var roundCheck = function(result) {
            switch (player.gameType) {
                case game.AX:
                    return roundAX.check(result);
                case game.ABX:
                    return roundABX.check(result);
                case game.AFC2:
                    return roundAFC2.check(result);
            }
        }
        var output = roundCheck(result);
        if (output) {
            document.getElementById("result").innerHTML = "correct!";
            this.correct++;
        }
        else {
            document.getElementById("result").innerHTML = "incorrect!";
            this.incorrect++;
        }
        this.update();
        this.newRound(this.gameType);
    },

    update: function () {
        document.getElementById("correct").innerHTML = "correct rounds: " + this.correct;
        document.getElementById("incorrect").innerHTML = "incorrect rounds: " + this.incorrect;
    }
};

var roundAX = {
    audio1: null,
    audio2: null,
    audioComplete: false,
    same: true,

    init: function () {
        document.getElementById("result").innerHTML = "";
        this.audioComplete = false;
        var x = Math.floor(Math.random() * 4);
        var sound1 = '/static/mao/sounds/F1_chuo1.wav';
        var sound2 = '/static/mao/sounds/F1_chuo2.wav';
        if (x === 0) {
            this.audio1 = new Audio(sound1);
            this.audio2 = new Audio(sound1);
            this.same = true;
        }
        else if (x === 1) {
            this.audio1 = new Audio(sound1);
            this.audio2 = new Audio(sound2);
            this.same = false;
        }
        else if (x === 2) {
            this.audio1 = new Audio(sound2);
            this.audio2 = new Audio(sound1);
            this.same = false;
        }
        else {
            this.audio1 = new Audio(sound2);
            this.audio2 = new Audio(sound2);
            this.same = true;
        }
    },

    play: function () {
        var noRepeat = true;
        this.audio1.addEventListener('ended', function () {
            if (noRepeat) {
                roundAX.audio2.play();
                noRepeat = false;
            }
        });
        this.audio2.addEventListener('ended', function () {
            roundAX.audioComplete = true;
        });
        this.audio1.play();
    },

    start: function () {
        document.getElementById("instructions").innerHTML = "If the sounds are the same, press S. If the sounds are different, press D";
        this.init();
        this.play();
    },

    check: function (result) {
        this.audioComplete = false;
        return result === this.same;
    }
};

var roundABX = {
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
            roundABX.audio2.play();
        });
        this.audio2.addEventListener('ended', function () {
            roundABX.audio3.play();
        });
        this.audio3.addEventListener('ended', function () {
            roundABX.audioComplete = true;
        });
    },

    play: function () {
        this.audio1.play();
    },

    start: function () {
        document.getElementById("instructions").innerHTML = "Press 1, 2, or 3 on the keyboard to select the different sound";
        this.init();
        this.play();
    },

    check: function (result) {
        this.audioComplete = false;
        return result === this.number;
    }
};


var roundAFC2 = {
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
            roundAFC2.audioComplete = true;
        });
    },

    play: function () {
        this.audio.play();
    },

    start: function () {
        document.getElementById("instructions").innerHTML = "Press 1 or 2 to select the correct pinyin";
        this.init();
        this.play();
    },

    check: function (result) {
        this.audioComplete = false;
        return result === this.number;
    }
};

function keyListener(event) {
    var audioComplete = true;
    switch (player.gameType) {
        case game.AX:
            audioComplete = roundAX.audioComplete;
            break;
        case game.ABX:
            audioComplete = roundABX.audioComplete;
            break;
        case game.AFC2:
            audioComplete = roundAFC2.audioComplete;
            break;
    }
    if (audioComplete) {
        var x = event.which || event.keyCode;
        if (player.gameType === game.AX) {
            // s
            if (x === 115) {
                player.check(true);
            }
            // d
            else if (x === 100) {
                player.check(false);
            }
        }
        else if (player.gameType === game.ABX) {
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
        else if (player.gameType === game.AFC2) {
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
}

function start(gameType) {
    player.gameType = gameType;
    setTimeout(player.newRound(gameType), 5000);
}

function main() {
    document.getElementById("AX").addEventListener('click',function () {
        start(game.AX);
        document.getElementById("instructions").innerHTML = "If the sounds are the same, press S. If the sounds are different, press D";
    }  );
    document.getElementById("ABX").addEventListener('click',function () {
        start(game.ABX);
        document.getElementById("instructions").innerHTML = "Press 1, 2, or 3 on the keyboard to select the different sound";
    }  );
    document.getElementById("AFC2").addEventListener('click',function () {
        start(game.AFC2);
        document.getElementById("instructions").innerHTML = "Press 1 or 2 to select the correct pinyin";
    }  );
    document.getElementById("AFC4").addEventListener('click',function () {
        start(game.AFC4);
    }  );

    document.addEventListener('keypress', keyListener);
}
main();

$(document).ready(function(e) {
    $(".dropdown-menu li a").click(function(){
    $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
    $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
    });
 });