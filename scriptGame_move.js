'use strict';

function moveUpUntilTouch(speed) {
    for (let i = 0; i < objList.length; i++) {
        if (player.y - speed < objList[i].y + objList[i].height &&
            player.y >= objList[i].y + objList[i].height &&
            player.x < objList[i].x + objList[i].width &&
            player.x + player.width > objList[i].x) {
            player.jumpTimer.flag = false;
            player.jumpTimer.counter = 0;
            return objList[i].y + objList[i].height;
        }else if(player.y - speed < endOfStage.up){
            player.jumpTimer.flag = false;
            player.jumpTimer.counter = 0;
            return endOfStage.up;
        }
    }
    return player.y -= speed;
}

function moveDownUntilTouch(speed) {
    for (let i = 0; i < objList.length; i++) {
        if (player.y + player.height + speed > objList[i].y &&
            player.y + player.height <= objList[i].y &&
            player.x < objList[i].x + objList[i].width &&
            player.x + player.width > objList[i].x) {
            return objList[i].y - player.height;
        }else if(player.y + player.height + speed > endOfStage.down){
            return endOfStage.down - player.height;
        }
    }
    return player.y += speed;
}

function moveLeftUntilTouch(speed) {
    for (let i = 0; i < objList.length; i++) {
        if (player.x - speed < objList[i].x + objList[i].width &&
            player.x >= objList[i].x + objList[i].width &&
            player.y < objList[i].y + objList[i].height &&
            player.y + player.height > objList[i].y) {
            return objList[i].x + objList[i].width;
        }else if(player.x - speed < endOfStage.left){
            return endOfStage.left;
        }
    }
    return player.x -= speed;
}

function moveRightUntilTouch(speed) {
    for (let i = 0; i < objList.length; i++) {
        if (player.x + player.width + speed > objList[i].x &&
            player.x + player.width <= objList[i].x &&
            player.y < objList[i].y + objList[i].height &&
            player.y + player.height > objList[i].y) {
            return objList[i].x - player.width;
        }else if(player.x + player.width + speed > endOfStage.right){
            return endOfStage.right - player.width;
        }
    }
    return player.x += speed;
}
