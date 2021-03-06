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

    // キー入力
    if (pressUp !== keyPress.up) {
        if (pressUp === keyPress.down) {
            switch (nowScene) {
                case scene.title:
                    Title_firstPressUp();
                    break;
                case scene.game:
                    Game_firstPressUp();
                    break;
            }
            pressUp = keyPress.pressed;
        }
        switch (nowScene) {
            case scene.title:
                Title_pressingUp();
                break;
            case scene.game:
                Game_pressingUp();
                break;
        }
    }
    if (pressDown !== keyPress.up) {
        if (pressDown === keyPress.down) {
            switch (nowScene) {
                case scene.title:
                    Title_firstPressDown();
                    break;
                case scene.game:
                    Game_firstPressDown();
                    break;
            }
            pressDown = keyPress.pressed;
        }
        switch (nowScene) {
            case scene.title:
                Title_pressingDown();
                break;
            case scene.game:
                Game_pressingDown();
                break;
        }
    }
    if (pressLeft !== keyPress.up) {
        if (pressLeft === keyPress.down) {
            switch (nowScene) {
                case scene.title:
                    Title_firstPressLeft();
                    break;
                case scene.game:
                    Game_firstPressLeft();
                    break;
            }
            pressLeft = keyPress.pressed;
        }
        switch (nowScene) {
            case scene.title:
                Title_pressingLeft();
                break;
            case scene.game:
                Game_pressingLeft();
                break;
        }
    }
    if (pressRight !== keyPress.up) {
        if (pressRight === keyPress.down) {
            switch (nowScene) {
                case scene.title:
                    Title_firstPressRight();
                    break;
                case scene.game:
                    Game_firstPressRight();
                    break;
            }
            pressRight = keyPress.pressed;
        }
        switch (nowScene) {
            case scene.title:
                Title_pressingRight();
                break;
            case scene.game:
                Game_pressingRight();
                break;
        }
    }
    if (pressV !== keyPress.up) {
        if (pressV === keyPress.down) {
            switch (nowScene) {
                case scene.title:
                    Title_firstPressV();
                    break;
                case scene.game:
                    Game_firstPressV();
                    break;
            }
            pressV = keyPress.pressed;
        }
        switch (nowScene) {
            case scene.title:
                Title_pressingV();
                break;
            case scene.game:
                Game_pressingV();
                break;
        }
    }
    if (pressB !== keyPress.up) {
        if (pressB === keyPress.down) {
            switch (nowScene) {
                case scene.title:
                    Title_firstPressB();
                    break;
                case scene.game:
                    Game_firstPressB();
                    break;
            }
            pressB = keyPress.pressed;
        }
        switch (nowScene) {
            case scene.title:
                Title_pressingB();
                break;
            case scene.game:
                Game_pressingB();
                break;
        }
    }
    if (pressT !== keyPress.up) {
        if (pressT === keyPress.down) {
            switch (nowScene) {
                case scene.title:
                    Title_firstPressT();
                    break;
                case scene.game:
                    Game_firstPressT();
                    break;
            }
            pressT = keyPress.pressed;
        }
        switch (nowScene) {
            case scene.title:
                Title_pressingT();
                break;
            case scene.game:
                Game_pressingT();
                break;
        }
    }
    if (pressZ !== keyPress.up) {
        if (pressZ === keyPress.down) {
            switch (nowScene) {
                case scene.title:
                    Title_firstPressZ();
                    break;
                case scene.game:
                    Game_firstPressZ();
                    break;
            }
            pressZ = keyPress.pressed;
        }
        switch (nowScene) {
            case scene.title:
                Title_pressingZ();
                break;
            case scene.game:
                Game_pressingZ();
                break;
        }
    }
    if (pressX !== keyPress.up) {
        if (pressX === keyPress.down) {
            switch (nowScene) {
                case scene.title:
                    Title_firstPressX();
                    break;
                case scene.game:
                    Game_firstPressX();
                    break;
            }
            pressX = keyPress.pressed;
        }
        switch (nowScene) {
            case scene.title:
                Title_pressingX();
                break;
            case scene.game:
                Game_pressingX();
                break;
        }
    }

    // シーンごとの処理
    switch (nowScene) {
        case scene.title:
            Title_always();
            break;
        case scene.game:
            Game_always();
            break;
    }

    repaint();

}

window.addEventListener('load', function () {

    changeCanvasSize();

    Title_init();

    setInterval(mainLoop, 1000 / fps);

});

// ページサイズ変更時の処理
window.addEventListener('resize', function () {
    if (autoSetCanvasSize == true) { // キャンバスサイズを変更
        changeCanvasSize();
    }
});