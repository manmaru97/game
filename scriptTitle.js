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

    for (let i = 0; i < backList.length; i++) {
        if (backList[i].type === typeName.titleBack) {
            backList[i].isExist = true;
        } else if (backList[i].type === typeName.gameBack) {
            backList[i].isExist = false;
        }
    }

}
