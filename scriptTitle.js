'use strict';

// 処理（イニシャライズ）
function Title_init() {

    nowScene = scene.title;

    timer = 0;

    for (let i = 0; i < backList.length; i++) {
        if (backList[i].type === typeName.titleBack) {
            backList[i].isExist = true;
        } else if (backList[i].type === typeName.gameBack) {
            backList[i].isExist = false;
        }
    }

}