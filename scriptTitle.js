'use strict';

// 処理（イニシャライズ）
function Title_init() {

    nowScene = scene.title;

    if (player !== undefined) { // 起動時エラー対策
        document.getElementById("bgmGame").pause();
        document.getElementById("bgmGame").currentTime = 0;
        document.getElementById("bgmTitle").play();
    }

    titleCursor = currentTitleCursor.mainGame;

    titleBack = new Obj(typeName.titleBack, [document.getElementById("title")], 0, 0, virtualSize.width, virtualSize.height, 0, 0, 0, 0, true);

}

function Title_always() {

}

function Title_firstPressUp() {
    if (titleCursor === currentTitleCursor.mainGame) {
        titleCursor = currentTitleCursor.stageEdit;
    } else if (titleCursor === currentTitleCursor.myGame) {
        titleCursor = currentTitleCursor.mainGame;
    } else if (titleCursor === currentTitleCursor.stageEdit) {
        titleCursor = currentTitleCursor.myGame;
    };
}
function Title_pressingUp() {
}

function Title_firstPressDown() {
    if (titleCursor === currentTitleCursor.mainGame) {
        titleCursor = currentTitleCursor.myGame;
    } else if (titleCursor === currentTitleCursor.myGame) {
        titleCursor = currentTitleCursor.stageEdit;
    } else if (titleCursor === currentTitleCursor.stageEdit) {
        titleCursor = currentTitleCursor.mainGame;
    };
}
function Title_pressingDown() {
}

function Title_firstPressLeft() {
    document.getElementById("downDiv").style.display = "block";
    document.getElementById("upDiv").style.display = "none";
    repaint();
}
function Title_pressingLeft() {
}

function Title_firstPressRight() {
    document.getElementById("upDiv").style.display = "block";
    document.getElementById("downDiv").style.display = "none";
    repaint();
}
function Title_pressingRight() {
}

function Title_firstPressV() {
    autoSetCanvasSize = false;
}
function Title_pressingV() {
}

function Title_firstPressB() {
    autoSetCanvasSize = true;
    changeCanvasSize();
}
function Title_pressingB() {
}

function Title_firstPressT() {
    Game_init();
}
function Title_pressingT() {
}

function Title_firstPressZ() {
    { // ファイル入力後の処理
        reader.readAsText(file.files[0], "UTF-8");
    }
}
function Title_pressingZ() {
}

function Title_firstPressX() {
    { // ファイル出力前の処理
        blob = new Blob([result], { type: 'text/plain' });
        output = document.getElementById('download');
        output.href = window.URL.createObjectURL(blob);
    }
}
function Title_pressingX() {
}