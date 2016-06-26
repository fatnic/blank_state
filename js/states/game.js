function state_Game(game) {

    var player = new Player(game);

    this.update = function(dt) {

        if (Key.isDown(Key.D)) { Events.emit('player.moveRight', dt, player); }
        if (Key.isDown(Key.A)) { Events.emit('player.moveLeft', dt, player); }
        if (Key.isDown(Key.W)) { Events.emit('player.jump', dt, player); }

        if (Key.isDown(Key.X)) { Events.emit('player.extinguish', dt, player); }
        if (Key.isDown(Key.R)) { Events.emit('player.ignite', dt, player); }

        player.update(dt);
    };

    this.draw = function() {
        Draw.clear(game.ctx, 'rgb(51,51,51)');
        player.draw(game.ctx);
    };

}
