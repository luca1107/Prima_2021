"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var ƒ = FudgeCore;
    window.addEventListener("load", init);
    let viewport = new ƒ.Viewport();
    let ship;
    let speedShip = 5;
    let projectiles = new ƒ.Node("Projectiles");
    let invaders = new ƒ.Node("Invaders");
    let borderRight;
    let borderLeft;
    let direction = 1;
    let verticalShift = false;
    function init(_event) {
        const canvas = document.querySelector("canvas");
        borderRight = new SpaceInvaders.QuadNode("borderRight", new ƒ.Vector2(8.5, 6), new ƒ.Vector2(.3, 14));
        borderLeft = new SpaceInvaders.QuadNode("borderLeft", new ƒ.Vector2(-8.5, 6), new ƒ.Vector2(.3, 14));
        let space = new ƒ.Node("Space");
        ship = SpaceInvaders.Ship.getInstance();
        space.addChild(ship);
        space.addChild(SpaceInvaders.MotherShip.getInstance());
        space.addChild(projectiles);
        space.addChild(borderRight);
        invaders.addComponent(new ƒ.ComponentTransform());
        let columnCount = 11;
        let rowCount = 5;
        for (let row = 0; row < rowCount; ++row) {
            for (let column = 0; column < columnCount; ++column) {
                let pos = new ƒ.Vector2();
                pos.x = (column - (columnCount - 1) / 2) * 15 / 13;
                pos.y = (row * 15 + 65) / 13;
                invaders.addChild(new SpaceInvaders.Invader(pos));
            }
        }
        space.addChild(invaders);
        let barricades = new ƒ.Node("Barricades");
        let nBarricade = 4;
        for (let iBarricade = 0; iBarricade < nBarricade; ++iBarricade) {
            let pos = new ƒ.Vector2();
            pos.x = (iBarricade - (nBarricade - 1) / 2) * 53 / 13;
            pos.y = 24 / 13;
            barricades.addChild(new SpaceInvaders.Barricade(pos));
        }
        space.addChild(barricades);
        /*
            let projectile0Pos: ƒ.Vector2 = new ƒ.Vector2();
            projectile0Pos.x = 0;
            projectile0Pos.y = 1;
        
            projectiles.addChild(new Projectile(projectile0Pos));
        
            let projectile1Pos: ƒ.Vector2 = new ƒ.Vector2();
            projectile1Pos.x = -45 / 13;
            projectile1Pos.y = 4;
        
            projectiles.addChild(new Projectile(projectile1Pos));
        
            space.addChild(projectiles);
            */
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.mtxPivot.translateZ(18);
        cmpCamera.mtxPivot.translateY(77 / 13);
        cmpCamera.mtxPivot.rotateY(180);
        console.log(cmpCamera);
        viewport.initialize("Viewport", space, cmpCamera, canvas);
        viewport.draw();
        console.log(space);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 30);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
    }
    function update(_event) {
        // console.log(_event);
        let offset = speedShip * ƒ.Loop.timeFrameReal / 1000;
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT]))
            ship.mtxLocal.translateX(-offset);
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT]))
            ship.mtxLocal.translateX(+offset);
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SPACE])) {
            let projectile = new SpaceInvaders.Projectile(ship.mtxLocal.translation.toVector2());
            projectiles.addChild(projectile);
        }
        for (let projectile of projectiles.getChildren()) {
            projectile.move();
            if (projectile.mtxLocal.translation.y > 13) {
                projectiles.removeChild(projectile);
            }
        }
        moveInvaders();
        checkProjectileCollision();
        viewport.draw();
    }
    function moveInvaders() {
        invaders.mtxLocal.translateX(0.02 * direction);
        for (let invader of invaders.getChildren()) {
            //invader.mtxLocal.translateX(0.02 * direction);
            invader.setRectPosition(invaders.mtxLocal.translation.toVector2());
            if (invader.checkCollision(borderRight)) {
                if (!verticalShift)
                    invaders.mtxLocal.translateY(-0.3);
                verticalShift = true;
                direction = -1;
                /*for (let invader of invaders.getChildren() as Invader[]) {
                  invader.mtxLocal.translateY(-0.3);
                invader.setRectPosition();
                }*/
            }
            else if (invader.checkCollision(borderLeft)) {
                if (verticalShift)
                    invaders.mtxLocal.translateY(-0.3);
                verticalShift = false;
                direction = 1;
                /*for (let invader of invaders.getChildren() as Invader[]) {
                  invader.mtxLocal.translateY(-0.3);
                invader.setRectPosition();
                }*/
            }
        }
    }
    function checkProjectileCollision() {
        for (let projectile of projectiles.getChildren()) {
            for (let invader of invaders.getChildren()) {
                if (projectile.checkCollision(invader)) {
                    projectiles.removeChild(projectile);
                    invaders.removeChild(invader);
                }
            }
        }
    }
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=SpaceInvaders.js.map