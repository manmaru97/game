'use strict';

// canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// item
var backGround = {
    img: document.getElementById("backGround"),
    width: 1024,
    height: 576,
};

var player = {
    img: document.getElementById("player"),
    size: 32,
};

window.addEventListener('load', function () {
    ctx.drawImage(backGround.img, 0, 0);
})

function buttonClick() {
    ctx.drawImage(player.img, backGround.width / 2 - player.size / 2, backGround.height - player.size * 2);
};
