

var MainGameLayer = cc.Layer.extend({
    Objs: {
        hook: null,
        hookRoll: [],
        anchorHook: null,
        bg_layer: null
    },
    xRotation: 0,
    xRotationRad: 0,
    currentDirection: 0,
    maxRotationX: 45,
    rotationSpeed: 0.1,
    distance: 0,
    rollOrigin: {
        x: 0,
        y: 0
    },
    hookOrigin: {
        x: 0,
        y: 0
    },
    minerOrigin: {
        x: 0,
        y: 0
    }
    ,
    worldCenter: {
        x: 0,
        y: 0
    },
    ctor: function () {
        this._super();
        this.initScene();
        this.createBackground();
        this.createMiner();
        this.createRollHook();

        //using lambda instead of new function which caused (is not a function);
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: (k, e) => {
                if (k == cc.KEY.space)
                {
                    this.drop();
                }
            }
        }, this);

        this.scheduleUpdate();
   },
    update: function(dt) {
        this.swing(dt);
    },
    initScene: function() {

        this.worldCenter.x = cc.winSize.width / 2;
        this.worldCenter.y = cc.winSize.height / 2;

        this.minerOrigin.x = this.worldCenter.x + 50;
        this.minerOrigin.y = this.worldCenter.y + 90;

        this.rollOrigin.x = this.worldCenter.x;
        this.rollOrigin.y = this.worldCenter.y + 80;

        this.hookOrigin.x = this.rollOrigin.x;
        this.hookOrigin.y = this.rollOrigin.y - 300;
    }
    ,
    createBackground: function() {
        // var tint_to_action = cc.tintTo(0, 255, 255, 255);

        var purple_tile = cc.Sprite.create("res/Ground/purple_tile.png");
        purple_tile.setAnchorPoint(0.5, 0.5);
        purple_tile.setPosition(this.worldCenter.x, this.worldCenter.y + 160);
        purple_tile.setScale(10, 5);
        this.addChild(purple_tile, 1);

        var purple_tile = cc.Sprite.create("res/Ground/purple_tile.png");
        purple_tile.setAnchorPoint(0.5, 0.5);
        purple_tile.setPosition(this.worldCenter.x, this.worldCenter.y + 160);
        purple_tile.setScale(10, 5);
        this.addChild(purple_tile, 1);

        for (var i = 0; i < 3; ++i)
        {
            var game_top_bg = cc.Sprite.create("res/Ground/game_top_bg.png");
            game_top_bg.setAnchorPoint(0, 0.5);
            game_top_bg.setPosition(400 * i, this.worldCenter.y + 150);
            game_top_bg.setScale(1, 1);
            this.addChild(game_top_bg, 1);

            var ground = cc.Sprite.create("res/Ground/ground_tile.png");
            ground.setAnchorPoint(0, 0.5);
            ground.setPosition(400 * i, this.worldCenter.y + 50);
            ground.setScale(1, 1);
            // ground.runAction(tint_to_action);
            this.addChild(ground, 1);

            var menu_bg = cc.Sprite.create("res/Ground/menu_bg.png");
            menu_bg.setAnchorPoint(0, 0);
            menu_bg.setPosition(500 * i, 0);
            menu_bg.setScale(1, 1);
            this.addChild(menu_bg, 0);

            var bg_layer01 = cc.Sprite.create("res/Ground/bg_layer01.png");
            bg_layer01.setAnchorPoint(0, 0.5);
            bg_layer01.setPosition(400 * i, this.worldCenter.y);
            bg_layer01.setScale(1, 1);
            this.addChild(bg_layer01, 1);

            var bg_layer02 = cc.Sprite.create("res/Ground/bg_layer02.png");
            bg_layer02.setAnchorPoint(0, 0.5);
            bg_layer02.setPosition(500 * i, this.worldCenter.y - 100);
            bg_layer02.setScale(1, 1);
            this.addChild(bg_layer02, 1);

            var bg_layer03 = cc.Sprite.create("res/Ground/bg_layer03.png");
            bg_layer03.setAnchorPoint(0, 0.5);
            bg_layer03.setPosition(500 * i, this.worldCenter.y - 200);
            bg_layer03.setScale(1, 1);
            this.addChild(bg_layer03, 1);
        }
    },
    createMiner: function() {
        var minerBody = cc.Sprite.create("res/Miner/miner_body.png");
        minerBody.setAnchorPoint(0.5, 0.5);
        minerBody.setPosition(this.minerOrigin.x, this.minerOrigin.y);
        minerBody.setScale(1, 1);
        this.addChild(minerBody, 5);

        var minerHead = cc.Sprite.create("res/Miner/miner_head_1.png");
        minerHead.setAnchorPoint(0.5, 0.5);
        minerHead.setPosition(this.minerOrigin.x, this.minerOrigin.y + 50);
        minerHead.setScale(1, 1);
        this.addChild(minerHead, 5);

        var minerHand = cc.Sprite.create("res/Miner/miner_hand.png");
        minerHand.setAnchorPoint(0.5, 0.5);
        minerHand.setPosition(this.minerOrigin.x, this.minerOrigin.y);
        minerHand.setScale(1, 1);
        this.addChild(minerHand, 5);
    },
    createRollHook: function() {

        var minerRoll = cc.Sprite.create("res/Miner/miner_roll.png");
        minerRoll.setAnchorPoint(0.5, 0.5);
        minerRoll.setPosition(this.rollOrigin.x, this.rollOrigin.y);
        minerRoll.setScale(1, 1);
        this.addChild(minerRoll, 5);

        this.xRotationRad = (3/4) * Math.PI;

        //Create Hook
        var hook = cc.Sprite.create("res/hook.png");
        hook.setPosition(this.hookOrigin.x, this.hookOrigin.y);
        hook.setAnchorPoint(0.5, 1);
        hook.setRotation(90 - cc.radiansToDegrees(this.xRotationRad));

        this.xRotation = 0;
        this.currentDirection = 1;
        this.Objs.hookRoll[0] = hook;
        this.Objs.hook = this.Objs.hookRoll[0];

        this.addChild(this.Objs.hookRoll[0], 5);

        this.distance = Math.sqrt(Math.pow(-this.Objs.hookRoll[0].getPosition().x + this.rollOrigin.x, 2) + Math.pow(-this.Objs.hookRoll[0].getPosition().y + this.rollOrigin.y, 2));


        for (var i = 1; i <= this.distance / 5; ++i)
        {
            var ropeTile = cc.Sprite.create("res/rope_tile.png");
            ropeTile.setAnchorPoint(0.5, 0.5);
            ropeTile.setPosition(this.Objs.hookRoll[i - 1].getPosition().x, this.Objs.hookRoll[i - 1].getPosition().y + (this.rollOrigin.y - 20 - this.hookOrigin.y) / 20);
            ropeTile.setScale(1, 1);
            this.Objs.hookRoll[i] = ropeTile;
            this.addChild(ropeTile, 5);
        }
    },
    swing: function(dt) {
        // var directionVector = {
        //     x: -this.Objs.hookRoll[0].getPosition().x + this.rollOrigin.x,
        //     y: -this.Objs.hookRoll[0].getPosition().y + this.rollOrigin.y
        // }


        // var distance = Math.sqrt(Math.pow(-this.Objs.hookRoll[0].getPosition().x + this.rollOrigin.x, 2) + Math.pow(-this.Objs.hookRoll[0].getPosition().y + this.rollOrigin.y, 2))
        //
        // if (this.xRotationRad >= (4/5) * Math.PI || this.xRotationRad <= (3/10) * Math.PI)
        // {
        //     this.currentDirection = -this.currentDirection;
        // }
        //
        // this.xRotationRad += this.rotationSpeed * this.currentDirection;
        //
        // var position = {
        //     x: 0,
        //     y: 0
        // }
        //
        // position.x = this.rollOrigin.x - distance * Math.cos(this.xRotationRad);
        // position.y = this.rollOrigin.y - distance * Math.sin(this.xRotationRad);
        //
        // this.Objs.hookRoll[0].setRotation(90 - cc.radiansToDegrees(this.xRotationRad));
        // this.Objs.hookRoll[0].setPosition(position.x, position.y);

        for (var i = 0; i < this.Objs.hookRoll.length; ++i)
        {
            this.distance = Math.sqrt(Math.pow(-this.Objs.hookRoll[i].getPosition().x + this.rollOrigin.x, 2) + Math.pow(-this.Objs.hookRoll[i].getPosition().y + this.rollOrigin.y, 2))

            if (this.xRotationRad >= (4/5) * Math.PI || this.xRotationRad <= (3/10) * Math.PI)
            {
                this.currentDirection = -this.currentDirection;
            }

            this.xRotationRad +=  (this.rotationSpeed * this.currentDirection) * dt;

            var position = {
                x: 0,
                y: 0
            }

            position.x = this.rollOrigin.x - this.distance * Math.cos(this.xRotationRad);
            position.y = this.rollOrigin.y - this.distance * Math.sin(this.xRotationRad);

            this.Objs.hookRoll[i].setRotation(90 - cc.radiansToDegrees(this.xRotationRad));
            this.Objs.hookRoll[i].setPosition(position.x, position.y);
        }



        // console.log(distance, (this.xRotationRad / Math.PI) * 180);
    },
    drop: function() {
        console.log("Dropped");
        this.currentDirection = 0;
        var moveBy = cc.MoveBy.create(5, cc.p(this.Objs.hook.getPosition().x - cc.winSize.width / 2, this.Objs.hook.getPosition().y - cc.winSize.height / 2));
        this.Objs.hook.runAction(moveBy);
    }
});

var MainGameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MainGameLayer();
        this.addChild(layer);
    }
});
