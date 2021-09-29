'use strict';

function whereIsPlayer() {
    for (let i = 0; i < objList.length; i++) {
        if (player.realDown() === objList[i].realUp() &&
            player.realLeft() < objList[i].realRight() &&
            player.realRight() > objList[i].realLeft()) {
            return where.ground;
        } else if (player.realDown() === endOfStage.down) {
            return where.ground;
        }
    }
    return where.sky;
}

function moveUpUntilTouch(speed) {
    for (let i = 0; i < objList.length; i++) {
        if (objList[i].type === typeName.block &&
            player.realUp() - speed < objList[i].realDown() &&
            player.realUp() >= objList[i].realDown() &&
            player.realLeft() < objList[i].realRight() &&
            player.realRight() > objList[i].realLeft()) {
            player.jumpFlag = false;
            return objList[i].realDown() - player.upGap;
        } else if (player.up() - speed < endOfStage.up) {
            player.jumpFlag = false;
            return endOfStage.up;
        }
    }
    return player.up() - speed;
}

function moveDownUntilTouch(speed) {
    for (let i = 0; i < objList.length; i++) {
        if (
            (
                objList[i].type === typeName.block ||
                (objList[i].type === typeName.board && pressDown === keyPress.up)
            ) &&
            player.realDown() + speed > objList[i].realUp() &&
            player.realDown() <= objList[i].realUp() &&
            player.realLeft() < objList[i].realRight() &&
            player.realRight() > objList[i].realLeft()) {
            return objList[i].realUp() - player.realHeight() - player.upGap;
        } else if (player.down() + speed >= endOfStage.down) {
            return endOfStage.down - player.height;
        }
    }
    return player.up() + speed;
}

function moveLeftUntilTouch(speed) {
    for (let i = 0; i < objList.length; i++) {
        if (objList[i].type === typeName.block &&
            player.realLeft() - speed < objList[i].realRight() &&
            player.realLeft() >= objList[i].realRight() &&
            player.realUp() < objList[i].realDown() &&
            player.realDown() > objList[i].realUp()) {
            return objList[i].realRight() - player.leftGap;
        } else if (player.left() - speed < endOfStage.left) {
            return endOfStage.left;
        }
    }
    return player.left() - speed;
}

function moveRightUntilTouch(speed) {
    for (let i = 0; i < objList.length; i++) {
        if (objList[i].type === typeName.block &&
            player.realRight() + speed > objList[i].realLeft() &&
            player.realRight() <= objList[i].realLeft() &&
            player.realUp() < objList[i].realDown() &&
            player.realDown() > objList[i].realUp()) {
            return objList[i].realLeft() - player.realWidth() - player.leftGap;
        } else if (player.right() + speed >= endOfStage.right) {
            return endOfStage.right - player.width;
        }
    }
    return player.left() + speed;
}
