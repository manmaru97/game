// シーンのenum
let scene = {
    title: Symbol(),
    game: Symbol(),
};

// 入力判定のenum
let keyPress = {
    up: Symbol(),
    down: Symbol(),
    pressed: Symbol(),
};

// オブジェクトのタイプのenum
let typeName = {
    player: Symbol(),
    enemy: Symbol(),
    block: Symbol(),
    item: Symbol(),
    titleBack: Symbol(),
    gameBack: Symbol(),
};

// プレイヤーの位置のenum
let where = {
    ground: Symbol(),
    sky: Symbol(),
};

// プレイヤーの方向のenum
let direction = {
    left: Symbol(),
    right: Symbol(),
};

// プレイヤーの行動のenum
let action = {
    stop: Symbol(),
    walk: Symbol(),
    jump: Symbol(),
    down: Symbol(),
};