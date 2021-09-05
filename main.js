'use strict';

function mainLoop() {

    timer++;
    if (timer % fps === 0) {
        console.log(timer / fps);
    }

    window.onkeydown = function (e) {
        if (e.key === ' ') {
            if (pressSpace === keyPress.up) {
                pressSpace = keyPress.down;
            } else {
                pressSpace = keyPress.pressed;
            }
        }
        if (e.key === 'ArrowUp') {
            if (pressUp === keyPress.up) {
                pressUp = keyPress.down;
            } else {
                pressUp = keyPress.pressed;
            }
        }
        if (e.key === 'ArrowDown') {
            if (pressDown === keyPress.up) {
                pressDown = keyPress.down;
            } else {
                pressDown = keyPress.pressed;
            }
        }
        if (e.key === 'ArrowLeft') {
            if (pressLeft === keyPress.up) {
                pressLeft = keyPress.down;
            } else {
                pressLeft = keyPress.pressed;
            }
        }
        if (e.key === 'ArrowRight') {
            if (pressRight === keyPress.up) {
                pressRight = keyPress.down;
            } else {
                pressRight = keyPress.pressed;
            }
        }
        if (e.key === 'z') {
            if (pressZ === keyPress.up) {
                pressZ = keyPress.down;
            } else {
                pressZ = keyPress.pressed;
            }
        }
        if (e.key === 'x') {
            if (pressX === keyPress.up) {
                pressX = keyPress.down;
            } else {
                pressX = keyPress.pressed;
            }
        }
    }

    window.onkeyup = function (e) {
        if (e.key === ' ') { pressSpace = keyPress.up; }
        if (e.key === 'ArrowUp') { pressUp = keyPress.up; }
        if (e.key === 'ArrowDown') { pressDown = keyPress.up; }
        if (e.key === 'ArrowLeft') { pressLeft = keyPress.up; }
        if (e.key === 'ArrowRight') { pressRight = keyPress.up; }
        if (e.key === 'z') { pressZ = keyPress.up; }
        if (e.key === 'x') { pressX = keyPress.up; }
    }

    if (nowScene === scene.title) {
        if (pressSpace !== keyPress.up) {
            Game_init();
        }
    } else if (nowScene === scene.game) {

        Game_always();

        if (pressSpace !== keyPress.up) {
            Game_pressSpace();
        }
        if (pressUp !== keyPress.up) {
            Game_pressUp();
        }
        if (pressDown !== keyPress.up) {
            Game_pressDown();
        }
        if (pressLeft !== keyPress.up) {
            Game_pressLeft();
        }
        if (pressRight !== keyPress.up) {
            Game_pressRight();
        }
        if (pressZ !== keyPress.up) {
            Game_pressZ();
        }
        if (pressX !== keyPress.up) {
            Game_pressX();
        }

    }

    repaint();

}

window.addEventListener('load', function () {

    Title_init();

    setInterval("mainLoop()", 1000 / fps);

})