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

// タイトル画面のカーソルのenum
let currentTitleCursor = {
    mainGame: Symbol(),
    myGame: Symbol(),
    stageEdit: Symbol(),
    edit: Symbol(),
};

// オブジェクトのタイプのenum
let typeName = {
    player: Symbol(),
    enemy: Symbol(),
    block: Symbol(),
    board: Symbol(),
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
    jump: Symbol(),    
    attack: Symbol(),    
    kick: Symbol(),    
};