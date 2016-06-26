var width = 1000;
var height = width / 16*9;

var game = new Game(width, height);

var asset_config = {
    base: '../assets/',
    paths:[]
};

game.assets = new AssetManager(asset_config);
game.assets.downloadAll(loop);

game.pushState(new state_Game(game));

function loop() {
    game.gameLoop();
    requestAnimationFrame(loop);
}
