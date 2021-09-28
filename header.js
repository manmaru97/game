'use strict';

// キャンバス
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// 入力判定
let pressSpace = keyPress.up;   // 押されていない
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
    constructor(type, img, x, y, width, height, isExist) {
        this.type = type;
        this.img = img;
        this.img2 = undefined;
        this.img3 = undefined;
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
        this.where = undefined;
        this.direction = direction.right;
        this.upSpeed = 8;
        this.downSpeed = 0.4;
        this.downMinSpeed = 0.4;
        this.downMaxSpeed = 8;
        this.downAcceleration = 0.4;
        this.horizontalSpeed = 0.4;
        this.horizontalMaxSpeed = 8;
        this.horizontalAcceleration = 0.4;
        this.jumpFlag = false;
        this.jumpTimer = undefined;
        this.actionFlag = false;
        this.actionTimer = undefined;
        this.leftTimer = undefined;
        this.rightTimer = undefined;
    }
}

// オブジェクトの配列
let titleBackList = [
    new Obj(typeName.titleBack, document.getElementById("title"), 0, 0, canvas.width, canvas.height, true),
];
let gameBackList = [];
let objList = [];

// プレイヤー
let player = undefined;

// カメラ
let camera = {
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

function repaint() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (nowScene === scene.title) {
        for (let i = 0; i < titleBackList.length; i++) {
            if (titleBackList[i].isExist === true) {
                ctx.drawImage(titleBackList[i].img, titleBackList[i].x, titleBackList[i].y, titleBackList[i].width, titleBackList[i].height);
            }
        }
    } else if (nowScene === scene.game) {
        // カメラ
        if (endOfStage.right * camera.zoom < canvas.width) {
            camera.x = endOfStage.right / 2;
        } else if (player.x + player.width / 2 <= (canvas.width / 2) / camera.zoom) {
            camera.x = (canvas.width / 2) / camera.zoom;
        } else if (player.x + player.width / 2 >= endOfStage.right - (canvas.width / 2) / camera.zoom) {
            camera.x = endOfStage.right - (canvas.width / 2) / camera.zoom;
        } else {
            camera.x = player.x + player.width / 2;
        }
        if (endOfStage.down * camera.zoom < canvas.height) {
            camera.y = endOfStage.down / 2;
        } else if (player.y + player.height / 2 <= (canvas.height / 2) / camera.zoom) {
            camera.y = (canvas.height / 2) / camera.zoom;
        } else if (player.y + player.height / 2 >= endOfStage.down - (canvas.height / 2) / camera.zoom) {
            camera.y = endOfStage.down - (canvas.height / 2) / camera.zoom;
        } else {
            camera.y = player.y + player.height / 2;
        }
        // 黒背景
        for (let i = 0; i < gameBackList.length; i++) {
            if (gameBackList[i].isExist === true) {
                if (gameBackList[i].type === typeName.black) {
                    ctx.drawImage(gameBackList[i].img, gameBackList[i].x, gameBackList[i].y, gameBackList[i].width, gameBackList[i].height);
                } else if (gameBackList[i].type === typeName.gameBack) {
                    ctx.drawImage(gameBackList[i].img,
                        ((gameBackList[i].x - camera.x) * camera.zoom + canvas.width / 2),
                        ((gameBackList[i].y - camera.y) * camera.zoom + canvas.height / 2),
                        gameBackList[i].width * camera.zoom, gameBackList[i].height * camera.zoom);
                }
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
            if (player.direction === direction.left) {
                ctx.drawImage(player.img,
                    ((player.x - camera.x) * camera.zoom + canvas.width / 2),
                    ((player.y - camera.y) * camera.zoom + canvas.height / 2),
                    player.width * camera.zoom, player.height * camera.zoom);
            } else {
                ctx.drawImage(player.img2,
                    ((player.x - camera.x) * camera.zoom + canvas.width / 2),
                    ((player.y - camera.y) * camera.zoom + canvas.height / 2),
                    player.width * camera.zoom, player.height * camera.zoom);
            }
        }
    }
}