function state_Game(game) {

    var flameConfig = game.assets.get('json.flame');

    var player = Object.create(new Rect());
    player.position.set(canvas.width/2,0);
    player.size.set(5,5);

    player.velocity = new Vec2();
    player.speed = 30;
    player.grounded = false;
    player.jumping = false;

    player.flame = new Particles(player.position, flameConfig.flame);
    player.smoke = new Particles(player.position, flameConfig.smoke);

    player.update = function(dt) {
        var friction = (this.grounded) ? new Vec2(0.8, 1) : new Vec2(0.85, 1);
        this.velocity.multiply(friction);

        if (this.grounded) { this.velocity.y = 0; }

        this.position.add(this.velocity);
        this.velocity.add(new Vec2(0, 0.5)); // GRAVITY

        if (this.position.y > game.canvas.height) { this.position.y = game.canvas.height - this.height; this.grounded = true; this.jumping = false;}

        this.flame.origin = this.position.clone();
        this.smoke.origin = this.flame.origin.clone();
        this.smoke.origin.y =   this.flame.origin.y - 5;
        this.smoke.update(dt);
        this.flame.update(dt);

    };

    player.draw = function() {
        this.smoke.draw(game.ctx);
        this.flame.draw(game.ctx);
    };


    this.update = function(dt) {
        if (Key.isDown(Key.D)) { player.velocity.add(new Vec2(player.speed * dt, 0)); }
        if (Key.isDown(Key.A)) { player.velocity.add(new Vec2(-player.speed * dt, 0)); }
        if (Key.isDown(Key.W)) {
        if (!player.jumping && player.grounded) {
           player.jumping = true;
           player.grounded = false;
           player.velocity.add(new Vec2(0, -player.speed * 20 * dt));
            }
        }
        player.update(dt);
    };

    this.draw = function(ctx) {
        Draw.clear(game.ctx, 'rgb(51,51,51)');
        player.draw();
    };

}
