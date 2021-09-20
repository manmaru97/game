'use strict';

function mainLoop() {

    // タイマー
    timer++;
    if (timer % fps === 0) {
        console.log(timer / fps);
        if (nowScene === scene.game) {
            if (player.where === where.ground) {
                console.log("ground");
            } else if (player.where === where.sky) {
                console.log("sky");
            }
        }
    }

    // キー入力（開始）
    window.onkeydown = function (e) {
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
        if (e.key === 'v') {
            if (pressV === keyPress.up) {
                pressV = keyPress.down;
            } else {
                pressV = keyPress.pressed;
            }
        }
        if (e.key === 'b') {
            if (pressB === keyPress.up) {
                pressB = keyPress.down;
            } else {
                pressB = keyPress.pressed;
            }
        }
        if (e.key === 't') {
            if (pressT === keyPress.up) {
                pressT = keyPress.down;
            } else {
                pressT = keyPress.pressed;
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

    // キー入力（終了）
    window.onkeyup = function (e) {
        if (e.key === 'ArrowUp') { pressUp = keyPress.up; }
        if (e.key === 'ArrowDown') { pressDown = keyPress.up; }
        if (e.key === 'ArrowLeft') { pressLeft = keyPress.up; }
        if (e.key === 'ArrowRight') { pressRight = keyPress.up; }
        if (e.key === 'v') { pressV = keyPress.up; }
        if (e.key === 'b') { pressB = keyPress.up; }
        if (e.key === 't') { pressT = keyPress.up; }
        if (e.key === 'z') { pressZ = keyPress.up; }
        if (e.key === 'x') { pressX = keyPress.up; }
    }

    // シーンごとの処理
    if (nowScene === scene.title) {
        Title_main();
    } else if (nowScene === scene.game) {
        Game_main();
    }

    repaint();

}

window.addEventListener('load', function () {

    Title_init();

    setInterval("mainLoop()", 1000 / fps);

})