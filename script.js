'use strict';


// canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


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


// 処理（イニシャライズ）
window.addEventListener('load', function () {
    ctx.drawImage(backGround.img, 0, 0);
})

// 処理（クリック）
canvas.addEventListener('click', function (e) {

    const x = e.clientX - e.target.getBoundingClientRect().left;
    const y = e.clientY - e.target.getBoundingClientRect().top;

    ctx.drawImage(player.img, x - player.size / 2, y - player.size / 2);
})
