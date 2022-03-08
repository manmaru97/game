'use strict';

// キャンバス
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d", { alpha: true });

// 仮想サイズ
const virtualSize = {
    width: 1920,
    height: 1080,
};

// true = 動的にキャンバスサイズを変更する
let autoSetCanvasSize = true;

// 自作ステージのアップロードに用いるマップ
let map = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
];
let tmpMap = [];
let tmpStr = "";

// ファイル入力
let file = document.getElementById("upload");
let result = undefined;
let reader = new FileReader();
reader.addEventListener("load", function () {
    result = reader.result.replace(/(\n|\r)/g, ""); // 改行文字を削除して代入
    for (let i = 0; i < result.length; i++) {
        if (result[i] === "#") {
            map = [];
            tmpMap = [];
            tmpStr = "";
        } else if (result[i] === "[") {
            // 何もしない
        } else if (result[i] === "]") {
            tmpMap.push(tmpStr);
            map.push(tmpMap);
            tmpStr = "";
            tmpMap = [];
        } else if (result[i] === ",") {
            tmpMap.push(tmpStr);
            tmpStr = "";
        } else {
            tmpStr = + result[i];
        }
    }
}, false);
reader.addEventListener("error", function () {
    result = undefined;
}, false);

// ファイル出力
let blob;
let output;

// 入力判定
let pressSpace = keyPress.up;   // up = 押されていない
let pressUp = keyPress.up;
let pressDown = keyPress.up;
let pressLeft = keyPress.up;
let pressRight = keyPress.up;
let pressV = keyPress.up;
let pressB = keyPress.up;
let pressT = keyPress.up;
let pressZ = keyPress.up;
let pressX = keyPress.up;

// 基本サイズ
const size = 32;

// タイマー
let timer = 0;
const fps = 60;

// シーン
let nowScene = undefined;

// オブジェクトの要素
class Obj {

    constructor(type, img, x, y, width, height, upMargin, downMargin, leftMargin, rightMargin, isExist) {
        this.type = type;
        this.img = img;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.upMargin = upMargin;
        this.downMargin = downMargin;
        this.leftMargin = leftMargin;
        this.rightMargin = rightMargin;
        this.isExist = isExist;
        this.init();
    }

    init() { }

    up() { return (this.y); }
    down() { return (this.y + this.height); }
    left() { return (this.x); }
    right() { return (this.x + this.width); }
    centerX() { return (this.x + this.width / 2); }
    centerY() { return (this.y + this.height / 2); }

    realUp() { return (this.y + this.upMargin); }
    realDown() { return (this.y + this.height - this.downMargin); }
    realLeft() { return (this.x + this.leftMargin); }
    realRight() { return (this.x + this.width - this.rightMargin); }
    realWidth() { return (this.width - this.leftMargin - this.rightMargin); }
    realHeight() { return (this.height - this.upMargin - this.downMargin); }

}

class Player extends Obj {
    init() {
        this.where = undefined;
        this.direction = direction.right;
        this.upSpeed = 8;
        this.downSpeed = 0.4;
        this.downMinSpeed = 0.4;
        this.downMaxSpeed = 8;
        this.downAcceleration = 0.4;
        this.horizontalSpeed = 0.4;
        this.horizontalMaxSpeed = 6;
        this.horizontalAcceleration = 0.4;
        this.actionFlag = undefined;
        this.actionTimer = undefined;
        this.leftTimer = undefined;
        this.rightTimer = undefined;
    }
}

// オブジェクトの配列
let titleBack = undefined;
let gameBack = undefined;
let gameBackList = [];
let objList = [];

// カーソル
let titleCursor = undefined;

// プレイヤー
let player = undefined;

// カメラ
let gameCamera = {
    x: undefined,
    y: undefined,
    zoom: undefined,
};

// ステージの端
let endOfStage = {
    up: 0,
    down: undefined,
    left: 0,
    right: undefined,
}

document.getElementById("bgmTitle").volume = 0.5;
document.getElementById("bgmGame").volume = 0.5;
document.getElementById("jump").volume = 1;
document.getElementById("attack").volume = 1;

function chaseAndDrawImage(obj, i) {
    ctx.drawImage(obj.img[i],
        ((obj.left() - gameCamera.x) * gameCamera.zoom + virtualSize.width / 2),
        ((obj.up() - gameCamera.y) * gameCamera.zoom + virtualSize.height / 2),
        obj.width * gameCamera.zoom, obj.height * gameCamera.zoom);
}

function repaint() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.scale(canvas.width / virtualSize.width, canvas.height / virtualSize.height);

    if (nowScene === scene.title) {
        ctx.drawImage(titleBack.img[0], titleBack.left(), titleBack.up(), titleBack.width, titleBack.height);
        ctx.fillStyle = "rgba(255, 255, 0, 0.5)";
        if (titleCursor === currentTitleCursor.mainGame) {
            ctx.fillRect(100, 100, 100, 100);
        } else if (titleCursor === currentTitleCursor.myGame) {
            ctx.fillRect(100, 200, 100, 100);
        } else if (titleCursor === currentTitleCursor.stageEdit) {
            ctx.fillRect(100, 300, 100, 100);
        }
    } else if (nowScene === scene.game) {
        // 画面端の処理
        if (endOfStage.right * gameCamera.zoom < virtualSize.width) {
            gameCamera.x = endOfStage.right / 2;
        } else if (player.centerX() <= (virtualSize.width / 2) / gameCamera.zoom) {
            gameCamera.x = (virtualSize.width / 2) / gameCamera.zoom;
        } else if (player.centerX() >= endOfStage.right - (virtualSize.width / 2) / gameCamera.zoom) {
            gameCamera.x = endOfStage.right - (virtualSize.width / 2) / gameCamera.zoom;
        } else {
            gameCamera.x = player.centerX();
        }
        if (endOfStage.down * gameCamera.zoom < virtualSize.height) {
            gameCamera.y = endOfStage.down / 2;
        } else if (player.centerY() <= (virtualSize.height / 2) / gameCamera.zoom) {
            gameCamera.y = (virtualSize.height / 2) / gameCamera.zoom;
        } else if (player.centerY() >= endOfStage.down - (virtualSize.height / 2) / gameCamera.zoom) {
            gameCamera.y = endOfStage.down - (virtualSize.height / 2) / gameCamera.zoom;
        } else {
            gameCamera.y = player.centerY();
        }

        // 黒背景
        ctx.drawImage(gameBack.img[0], gameBack.left(), gameBack.up(), gameBack.width, gameBack.height);
        // 通常背景
        for (let i = 0; i < gameBackList.length; i++) {
            if (gameBackList[i].isExist === true) {
                chaseAndDrawImage(gameBackList[i], 0);
            }
        }
        // オブジェクト
        for (let i = 0; i < objList.length; i++) {
            if (objList[i].isExist === true) {
                chaseAndDrawImage(objList[i], 0);
            }
        }
        // プレイヤー
        if (player.isExist === true) {
            if (player.direction === direction.left) {
                chaseAndDrawImage(player, 0);
            } else {
                chaseAndDrawImage(player, 1);
            }
        }
    }

    ctx.restore();

}

function changeCanvasSize() {
    if (window.innerWidth <= window.innerHeight * 16 / 9) {
        canvas.setAttribute("width", window.innerWidth);
        canvas.setAttribute("height", window.innerWidth * 9 / 16);
    } else {
        canvas.setAttribute("width", window.innerHeight * 16 / 9);
        canvas.setAttribute("height", window.innerHeight);
    }
}
