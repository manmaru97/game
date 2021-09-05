'use strict';

// キャンバス
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// 入力判定のenum
let keyPress = {
    up: Symbol(),
    down: Symbol(),
    pressed: Symbol(),
};

// 入力判定
let pressSpace = keyPress.up;
let pressUp = keyPress.up;
let pressDown = keyPress.up;
let pressLeft = keyPress.up;
let pressRight = keyPress.up;
let pressZ = keyPress.up;
let pressX = keyPress.up;

// 基本サイズ
const size = 32;

// タイマー
let timer;
const fps = 60;

// シーン
let scene = { title: 0, game: 1 };
let nowScene;

// オブジェクトのタイプのenum
let typeName = {
    player: Symbol(),
    enemy: Symbol(),
    block: Symbol(),
    item: Symbol(),
    titleBack: Symbol(),
    gameBack: Symbol(),
};

// オブジェクトの要素
class Obj {
    constructor(type, img, x, y, width, height, isExist) {
        this.type = type;
        this.img = img;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.isExist = isExist;
        this.init();
    }
    init() { };
}

class Player extends Obj {
    init() {
        this.freeFallSpeed = 8;
        this.horizontalSpeed = 8;
        this.upSpeed = 16;
        this.downSpeed = 8;
        this.jumpTimer = {
            flag: false,
            counter: 0,
        };
    }
}

class Enemy extends Obj {

}

// オブジェクトの配列
let backList = [
    new Obj(typeName.titleBack, document.getElementById("title"), 0, 0, canvas.width, canvas.height, false),
    new Obj(typeName.gameBack, document.getElementById("game"), 0, 0, canvas.width, canvas.height, false)
];
let objList = [];
let player = new Player(typeName.player, document.getElementById("player"), 0, 0, size, size, false);

// カメラ
let camera = { x: player.x, y: player.y, zoom: 1.0 }

// ステージの端
let endOfStage = {
    up: 0,
    down: canvas.height * 2, // 1024 * 2 = 2048 = 32 * 64
    left: 0,
    right: canvas.width * 2, // 576 * 2 = 1152 = 32 * 36
}

function repaint() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    camera.x = player.x + player.width / 2;
    camera.y = player.y + player.height / 2;

    if (nowScene === scene.title) {
        for (let i = 0; i < backList.length; i++) {
            if (backList[i].isExist === true) {
                ctx.drawImage(backList[i].img, backList[i].x, backList[i].y, backList[i].width, backList[i].height);
            }
        }
    } else if (nowScene === scene.game) {
        // 背景
        for (let i = 0; i < backList.length; i++) {
            if (backList[i].isExist === true) {
                ctx.drawImage(backList[i].img, backList[i].x, backList[i].y, backList[i].width, backList[i].height);
            }
        }
        // オブジェクト
        for (let i = 0; i < objList.length; i++) {
            if (objList[i].isExist === true) {
                ctx.drawImage(objList[i].img,
                    ((objList[i].x - camera.x) * camera.zoom + canvas.width / 2),
                    ((objList[i].y - camera.y) * camera.zoom + canvas.height / 2),
                    objList[i].width * camera.zoom, objList[i].height * camera.zoom);
            }
        }
        // プレイヤー
        if (player.isExist === true) {
            ctx.drawImage(player.img,
                ((player.x - camera.x) * camera.zoom + canvas.width / 2),
                ((player.y - camera.y) * camera.zoom + canvas.height / 2),
                player.width * camera.zoom, player.height * camera.zoom);
        }
    }
}