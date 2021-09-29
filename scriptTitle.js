'use strict';

// main
function Title_main() {

    if (pressT === keyPress.down) {
        pressT = keyPress.pressed;
        Game_init();
    }

}

// 処理（イニシャライズ）
function Title_init() {

    nowScene = scene.title;

    if (player !== undefined) {
        document.getElementById("bgmGame").pause();
        document.getElementById("bgmGame").currentTime = 0;
        document.getElementById("bgmTitle").play();
    }

    titleBackList.push(new Obj(typeName.titleBack, document.getElementById("title"), 0, 0, canvas.width, canvas.height, 0, 0, 0, 0, true));

}
