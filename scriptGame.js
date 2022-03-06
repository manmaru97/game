'use strict';

function setMap(type, xNum, yNum) {
    if (type === typeName.player) {
        player.x = size * xNum;
        player.y = size * yNum;
    } else if (type === typeName.block) {
        objList.push(new Obj(typeName.block, [document.getElementById("blockSoft")], size * xNum, size * yNum, size, size, 0, 0, 0, 0, true));
    } else if (type === typeName.board) {
        objList.push(new Obj(typeName.board, [document.getElementById("board")], size * xNum, size * yNum, size, size, 0, 0, 0, 0, true));
    }
}

// 処理（イニシャライズ）
function Game_init() {

    nowScene = scene.game;
    document.getElementById("bgmTitle").pause();
    document.getElementById("bgmTitle").currentTime = 0;
    document.getElementById("bgmGame").play();

    gameCamera.zoom = 2.0;

    let playerImgList = [document.getElementById("playerLeft"), document.getElementById("playerRight")];

    // プレイヤーは必ず1人になるようにfor文の外で生成する
    player = new Player(typeName.player, playerImgList, undefined, undefined, size, size, 12, 0, 6, 6, true);

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

    gameBack = new Obj(typeName.gameBack, [document.getElementById("gameBack")], 0, 0, virtualSize.width, virtualSize.height, 0, 0, 0, 0, true);
    gameBackList.push(new Obj(typeName.gameBack, [document.getElementById("gameBack_0")], 0, 0, endOfStage.right, endOfStage.down, 0, 0, 0, 0, true));

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
    if (player.actionFlag === action.attack) {
        if (timer - player.actionTimer < fps * 2 / 3) {
            if (player.direction === direction.left) {
                player.x = moveLeftUntilTouch(player.horizontalMaxSpeed * 2);
            } else if (player.direction === direction.right) {
                player.x = moveRightUntilTouch(player.horizontalMaxSpeed * 2);
            }
        } else {
            player.actionFlag = undefined;
        }
        player.downSpeed = player.downMinSpeed;
    } else if (player.actionFlag === action.kick) {
        if (player.where === where.ground) {
            player.actionFlag = undefined;
        } else if (timer - player.actionTimer < fps * 2 / 3) {
            if (player.direction === direction.left) {
                player.x = moveLeftUntilTouch(player.horizontalMaxSpeed * 1.2);
                player.y = moveDownUntilTouch(player.horizontalMaxSpeed * 1.2);
            } else if (player.direction === direction.right) {
                player.x = moveRightUntilTouch(player.horizontalMaxSpeed * 1.2);
                player.y = moveDownUntilTouch(player.horizontalMaxSpeed * 1.2);
            }
        } else {
            player.actionFlag = undefined;
        }
        player.downSpeed = player.downMinSpeed;
    } else if (player.actionFlag === action.jump) {
        if (timer - player.actionTimer < fps / 3) {
            player.y = moveUpUntilTouch(player.upSpeed);
        } else {
            player.actionFlag = undefined;
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
    if (player.actionFlag !== action.attack && player.actionFlag !== action.kick) {
        player.leftTimer = timer;
    }
}
function Game_pressingLeft() {
    if (pressRight === keyPress.up ||
        player.leftTimer >= player.rightTimer) {
        if (player.actionFlag !== action.attack && player.actionFlag !== action.kick) {
            player.direction = direction.left;
            player.x = moveLeftUntilTouch(player.horizontalSpeed);
        }
    }
}

function Game_firstPressRight() {
    if (player.actionFlag !== action.attack && player.actionFlag !== action.kick) {
        player.rightTimer = timer;
    }
}
function Game_pressingRight() {
    if (pressLeft === keyPress.up ||
        player.rightTimer > player.leftTimer) {
        if (player.actionFlag !== action.attack && player.actionFlag !== action.kick) {
            player.direction = direction.right;
            player.x = moveRightUntilTouch(player.horizontalSpeed);
        }
    }
}

function Game_firstPressV() {
    if (player.where === where.ground) {
        player.actionFlag = action.jump;
        player.actionTimer = timer;
        document.getElementById("jump").load();
        document.getElementById("jump").play();
    }
}
function Game_pressingV() {
}

function Game_firstPressB() {
    if (
        (pressLeft !== keyPress.up || pressRight !== keyPress.up) &&
        pressDown === keyPress.up
    ) {
        player.actionFlag = action.attack;
        player.actionTimer = timer;
        document.getElementById("attack").load();
        document.getElementById("attack").play();
    } else if (
        (pressLeft === keyPress.up || pressRight === keyPress.up) &&
        pressDown !== keyPress.up
    ) {
        player.actionFlag = action.kick;
        player.actionTimer = timer;
        document.getElementById("attack").load();
        document.getElementById("attack").play();
    }
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
    if (gameCamera.zoom < 8) {
        gameCamera.zoom *= 1.01;
    }
}

function Game_firstPressX() {
}
function Game_pressingX() {
    if (gameCamera.zoom > 0) {
        gameCamera.zoom /= 1.01;
    }
}