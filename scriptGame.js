'use strict';


function Game_main() {

    Game_always();

    if (pressDown !== keyPress.up) {
        Game_pressDown();
    }
    if (pressLeft !== keyPress.up) {
        Game_pressLeft();
    }
    if (pressRight !== keyPress.up) {
        Game_pressRight();
    }
    if (pressV !== keyPress.up) {
        Game_pressV();
    }
    if (pressB !== keyPress.up) {
        Game_pressB();
    }
    if (pressT !== keyPress.up) {
        Game_pressT();
    }
    if (pressZ !== keyPress.up) {
        Game_pressZ();
    }
    if (pressX !== keyPress.up) {
        Game_pressX();
    }

}

function setMap(type, xNum, yNum) {
    if (type === typeName.player) {
        player.x = size * xNum;
        player.y = size * yNum;
    } else if (type === typeName.block) {
        objList.push(new Obj(typeName.block, document.getElementById("blockSoft"), size * xNum, size * yNum, size, size, true));
    } else if (type === typeName.board) {
        objList.push(new Obj(typeName.board, document.getElementById("board"), size * xNum, size * yNum, size, size, true));
    }
}

// 処理（イニシャライズ）
function Game_init() {

    nowScene = scene.game;
    document.getElementById("bgmTitle").pause();
    document.getElementById("bgmTitle").currentTime = 0;
    document.getElementById("bgmGame").play();

    player = new Player(typeName.player, document.getElementById("player"), undefined, undefined, size, size, false);
    player.img2 = document.getElementById("playerLeft");
    player.img3 = document.getElementById("playerRight");

    camera.zoom = 1.0;

    for (let i = 0; i < backList.length; i++) {
        if (backList[i].type === typeName.titleBack) {
            backList[i].isExist = false;
        } else if (backList[i].type === typeName.gameBack) {
            backList[i].isExist = true;
        }
    }

    objList = []; // 配列のリセット
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] === 1) {
                setMap(typeName.player, j, i);
            } else if (map[i][j] === 2) {
                setMap(typeName.block, j, i);
            } else if (map[i][j] === 3) {
                setMap(typeName.board, j, i);
            }
        }
    }
    endOfStage.right = size * map[0].length;
    endOfStage.down = size * map.length;

    player.isExist = true;

}

function Game_always() {

    if (player.downSpeed < player.downMaxSpeed) {
        player.downSpeed += player.downAcceleration;
    }
    if (player.horizontalSpeed < player.horizontalMaxSpeed) {
        player.horizontalSpeed += player.horizontalAcceleration;
    }

    if (whereIsPlayer() === where.ground) {
        player.where = where.ground;
    } else {
        player.where = where.sky;
    }

    // 落下スピードのリセット
    if (player.where === where.ground) {
        player.downSpeed = player.downMinSpeed;
    }

    // アクション, ジャンプ
    if (player.actionFlag === true) {
        if (timer - player.actionTimer < fps * 2 / 3) {
            if (player.direction === direction.left) {
                player.x = moveLeftUntilTouch(player.horizontalMaxSpeed * 2);
            } else if (player.direction === direction.right) {
                player.x = moveRightUntilTouch(player.horizontalMaxSpeed * 2);
            }
        } else {
            player.actionFlag = false;
        }
        player.jumpFlag = false;
        player.downSpeed = player.downMinSpeed;
    } else if (player.jumpFlag === true) {
        if (timer - player.jumpTimer < fps / 3) {
            player.y = moveUpUntilTouch(player.upSpeed);
        } else {
            player.jumpFlag = false;
        }
        player.downSpeed = player.downMinSpeed;
    } else {
        player.y = moveDownUntilTouch(player.downSpeed);
    }
}

function Game_pressDown() {
}

function Game_pressLeft() {
    if (player.actionFlag === false) {
        if (pressLeft === keyPress.down) {
            player.leftTimer = timer;
            pressLeft = keyPress.pressed;
        }
        if (pressRight === keyPress.up ||
            player.leftTimer >= player.rightTimer) {
            player.direction = direction.left;
            player.x = moveLeftUntilTouch(player.horizontalSpeed);
        }
    }
}

function Game_pressRight() {
    if (player.actionFlag === false) {
        if (pressRight === keyPress.down) {
            player.rightTimer = timer;
            pressRight = keyPress.pressed;
        }
        if (pressLeft === keyPress.up ||
            player.rightTimer > player.leftTimer) {
            player.direction = direction.right;
            player.x = moveRightUntilTouch(player.horizontalSpeed);
        }
    }
}

function Game_pressV() {
    if (pressV === keyPress.down) {
        player.jumpFlag = true;
        player.jumpTimer = timer;
        player.actionFlag = false;
        document.getElementById("jump").load();
        document.getElementById("jump").play();
        pressV = keyPress.pressed;
    }
}

function Game_pressB() {
    if (pressB === keyPress.down) {
        player.actionFlag = true;
        player.actionTimer = timer;
        document.getElementById("attack").load();
        document.getElementById("attack").play();
        pressB = keyPress.pressed;
    }
}

function Game_pressT() {
    if (pressT === keyPress.down) {
        pressT = keyPress.pressed;
        Title_init();
    }
}

function Game_pressZ() {
    if (pressZ === keyPress.down) {
        pressZ = keyPress.pressed;
    }
    if (camera.zoom < 3) {
        camera.zoom *= 1.01;
    }
}

function Game_pressX() {
    if (pressX === keyPress.down) {
        pressX = keyPress.pressed;
    }
    if (camera.zoom > 0) {
        camera.zoom /= 1.01;
    }
}