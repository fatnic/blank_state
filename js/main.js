var width = 1000;
var height = width / 16*9;

var game = new Game(width, height);

var asset_config = {
    base: '../assets/',
    paths:[
        "json/flame.json",
    ]
};

game.assets = new AssetManager(asset_config);
game.assets.downloadAll(init);

function init() {
    game.pushState(new state_Game(game));
    loop();
}


var now = null;
var delta = 0;
var last = Tools.timestamp();
var fps = 60;
var step = 1/fps;

function loop() {
    now = Tools.timestamp();
    delta = delta + Math.min(1, (now - last) / 1000);
    while (delta > step) {
        delta = delta - step;
        game.gameLoop(step);
    }
    last = now;
    requestAnimationFrame(loop, canvas);
}
