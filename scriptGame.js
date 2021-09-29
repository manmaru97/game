'use strict';


function Game_main() {

    Game_always();

    if (pressDown !== keyPress.up) {
        if (pressDown === keyPress.down) {
            Game_firstPressDown();
            pressDown = keyPress.pressed;
        }
        Game_pressingDown();
    }
    if (pressLeft !== keyPress.up) {
        if (pressLeft === keyPress.down) {
            Game_firstPressLeft();
            pressLeft = keyPress.pressed;
        }
        Game_pressingLeft();
    }
    if (pressRight !== keyPress.up) {
        if (pressRight === keyPress.down) {
            Game_firstPressRight();
            pressRight = keyPress.pressed;
        }
        Game_pressingRight();
    }
    if (pressV !== keyPress.up) {
        if (pressV === keyPress.down) {
            Game_firstPressV();
            pressV = keyPress.pressed;
        }
        Game_pressingV();
    }
    if (pressB !== keyPress.up) {
        if (pressB === keyPress.down) {
            Game_firstPressB();
            pressB = keyPress.pressed;
        }
        Game_pressingB();
    }
    if (pressT !== keyPress.up) {
        if (pressT === keyPress.down) {
            Game_firstPressT();
            pressT = keyPress.pressed;
        }
        Game_pressingT();
    }
    if (pressZ !== keyPress.up) {
        if (pressZ === keyPress.down) {
            Game_firstPressZ();
            pressZ = keyPress.pressed;
        }
        Game_pressingZ();
    }
    if (pressX !== keyPress.up) {
        if (pressX === keyPress.down) {
            Game_firstPressX();
            pressX = keyPress.pressed;
        }
        Game_pressingX();
    }

}

function setMap(type, xNum, yNum) {
    if (type === typeName.player) {
        player.x = size * xNum;
        player.y = size * yNum;
    } else if (type === typeName.block) {
        objList.push(new Obj(typeName.block, document.getElementById("blockSoft"), size * xNum, size * yNum, size, size, 0, 0, 0, 0, true));
    } else if (type === typeName.board) {
        objList.push(new Obj(typeName.board, document.getElementById("board"), size * xNum, size * yNum, size, size, 0, 0, 0, 0, true));
    }
}

// 処理（イニシャライズ）
function Game_init() {

    nowScene = scene.game;
    document.getElementById("bgmTitle").pause();
    document.getElementById("bgmTitle").currentTime = 0;
    document.getElementById("bgmGame").play();

    player = new Player(typeName.player, document.getElementById("playerLeft"), undefined, undefined, size, size, 8, 0, 4, 4, true);
    player.img2 = document.getElementById("playerRight");

    camera.zoom = 1.0;

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

    gameBackList.push(new Obj(typeName.black, document.getElementById("black"), 0, 0, endOfStage.right, endOfStage.down, 0, 0, 0, 0, true));
    gameBackList.push(new Obj(typeName.gameBack, document.getElementById("game"), 0, 0, endOfStage.right, endOfStage.down, 0, 0, 0, 0, true));

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

function Game_firstPressDown() {
}
function Game_pressingDown() {
}

function Game_firstPressLeft() {
    if (player.actionFlag === false) {
        player.leftTimer = timer;
    }
}
function Game_pressingLeft() {
    if (pressRight === keyPress.up ||
        player.leftTimer >= player.rightTimer) {
        if (player.actionFlag === false) {
            player.direction = direction.left;
            player.x = moveLeftUntilTouch(player.horizontalSpeed);
        }
    }
}

function Game_firstPressRight() {
    if (player.actionFlag === false) {
        player.rightTimer = timer;
    }
}
function Game_pressingRight() {
    if (pressLeft === keyPress.up ||
        player.rightTimer > player.leftTimer) {
        if (player.actionFlag === false) {
            player.direction = direction.right;
            player.x = moveRightUntilTouch(player.horizontalSpeed);
        }
    }
}

function Game_firstPressV() {
    player.jumpFlag = true;
    player.jumpTimer = timer;
    player.actionFlag = false;
    document.getElementById("jump").load();
    document.getElementById("jump").play();
}
function Game_pressingV() {
}

function Game_firstPressB() {
    player.actionFlag = true;
    player.actionTimer = timer;
    document.getElementById("attack").load();
    document.getElementById("attack").play();
}
function Game_pressingB() {
}

function Game_firstPressT() {
    Title_init();
}
function Game_pressingT() {
}

function Game_firstPressZ() {
}
function Game_pressingZ() {
    if (camera.zoom < 3) {
        camera.zoom *= 1.01;
    }
}

function Game_firstPressX() {
}
function Game_pressingX() {
    if (camera.zoom > 0) {
        camera.zoom /= 1.01;
    }
}