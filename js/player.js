function Player(game) {

    var flameConfig = game.assets.get('json.flame');

    this.position = new Vec2(game.canvas.width/2, canvas.height/2);
    this.velocity = new Vec2();
    this.size = new Vec2(5, 5);
    this.speed = 30;
    this.jumpHeight = 6.5;
    this.grounded = false;
    this.jumping = false;

    this.flame = new Particles(this.position, flameConfig.flame);
    this.smoke = new Particles(this.position, flameConfig.smoke);

    this.moveLeft = function(dt) { this.velocity.add(new Vec2(-this.speed * dt, 0)); };
    Events.on('player.moveLeft', this.moveLeft);

    this.moveRight = function(dt) { this.velocity.add(new Vec2(this.speed * dt, 0)); };
    Events.on('player.moveRight', this.moveRight);

    this.jump = function(dt) {
        if (this.jumping === false && this.grounded) {
            this.jumping = true;
            this.grounded = false;
            this.velocity.add(new Vec2(0, -this.jumpHeight));
            console.log(dt);
        }
    };
    Events.on('player.jump', this.jump);

    this.ignite = function() {
        this.smoke.setConfig(flameConfig.smoke);
        this.flame.setConfig(flameConfig.flame);
    };
    Events.on('player.ignite', this.ignite);

    this.extinguish = function() {
        this.smoke.setConfig({size: 0, rate: 0});
        this.flame.setConfig({size: 0, rate: 0});
    };
    Events.on('player.extinguish', this.extinguish);

    this.update = function(dt) {

        this.velocity.x *= 0.8; // FRICTION
        this.velocity.add(new Vec2(0, 10 * dt)); // GRAVITY
        if (this.grounded) { this.velocity.y = 0; }


        this.position.add(this.velocity);

        if (this.position.y > game.canvas.height) {
            this.position.y = game.canvas.height;
            this.grounded = true;
            this.jumping = false;
        }

        this.flame.origin = this.position.clone();
        this.smoke.origin = this.flame.origin.clone();
        this.smoke.origin.y = this.flame.origin.y - 5;

        this.smoke.update(dt);
        this.flame.update(dt);
    };

    this.draw = function() {
        this.smoke.draw(game.ctx);
        this.flame.draw(game.ctx);
    };

}
