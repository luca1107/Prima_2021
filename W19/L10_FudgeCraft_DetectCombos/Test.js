"use strict";
var L10_FudgeCraft_DetectCombos;
(function (L10_FudgeCraft_DetectCombos) {
    function startTests() {
        if (false)
            testGrid();
        if (true)
            testCombos();
    }
    L10_FudgeCraft_DetectCombos.startTests = startTests;
    function testCombos() {
        let setup = [
            { type: L10_FudgeCraft_DetectCombos.CUBE_TYPE.RED, positions: [[0, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, -1], [-1, 0, 0]] },
            { type: L10_FudgeCraft_DetectCombos.CUBE_TYPE.GREEN, positions: [[-5, 0, 0], [-5, 0, 1], [-5, 1, 2], [-5, -1, 2], [-5, 0, 2]] },
            { type: L10_FudgeCraft_DetectCombos.CUBE_TYPE.CYAN, positions: [[3, 0, 0], [3, 0, 1], [3, 0, 2], [3, 0, 3], [3, 0, 4], [3, 0, 5], [3, 0, 6], [3, 0, -1], [3, 0, -2]] },
            { type: L10_FudgeCraft_DetectCombos.CUBE_TYPE.BLUE, positions: [[0, 3, 0], [0, 3, 1], [0, 3, 2], [1, 3, 2], [2, 3, 2], [2, 3, 1], [2, 3, 0], [1, 3, 0], [0, 3, 0]] }
        ];
        setup.forEach((_combo) => {
            _combo.positions.forEach((_position) => {
                let position = new L10_FudgeCraft_DetectCombos.ƒ.Vector3(..._position);
                let cube = new L10_FudgeCraft_DetectCombos.Cube(_combo.type, position);
                L10_FudgeCraft_DetectCombos.grid.push(position, new L10_FudgeCraft_DetectCombos.GridElement(cube));
            });
        });
        let startElements = setup.map((_combo) => {
            return L10_FudgeCraft_DetectCombos.grid.pull(new L10_FudgeCraft_DetectCombos.ƒ.Vector3(..._combo.positions[1]));
        });
        let combos = new L10_FudgeCraft_DetectCombos.Combos(startElements);
        for (let combo of combos.found)
            for (let element of combo) {
                let mtxLocal = element.cube.cmpTransform.local;
                L10_FudgeCraft_DetectCombos.ƒ.Debug.log(element.cube.name, mtxLocal.translation.getMutator());
                // mtxLocal.rotateX(45);
                // mtxLocal.rotateY(45);
                // mtxLocal.rotateY(45, true);
                // mtxLocal.translateX(1);
                mtxLocal.scale(L10_FudgeCraft_DetectCombos.ƒ.Vector3.ONE(0.5));
            }
        L10_FudgeCraft_DetectCombos.updateDisplay();
    }
    function testGrid() {
        let cube = new L10_FudgeCraft_DetectCombos.Cube(L10_FudgeCraft_DetectCombos.CUBE_TYPE.GREEN, L10_FudgeCraft_DetectCombos.ƒ.Vector3.ZERO());
        L10_FudgeCraft_DetectCombos.grid.push(cube.cmpTransform.local.translation, new L10_FudgeCraft_DetectCombos.GridElement(cube));
        let pulled = L10_FudgeCraft_DetectCombos.grid.pull(cube.cmpTransform.local.translation);
        logResult(cube == pulled.cube, "Grid push and pull", cube, pulled.cube, pulled);
        let popped = L10_FudgeCraft_DetectCombos.grid.pop(cube.cmpTransform.local.translation);
        logResult(cube == popped.cube, "Grid pop", cube, popped.cube, popped);
        let empty = L10_FudgeCraft_DetectCombos.grid.pull(cube.cmpTransform.local.translation);
        logResult(empty == undefined, "Grid element deleted");
    }
    function logResult(_success, ..._args) {
        let log = _success ? L10_FudgeCraft_DetectCombos.ƒ.Debug.log : L10_FudgeCraft_DetectCombos.ƒ.Debug.warn;
        log(`Test success: ${_success}`, _args);
    }
})(L10_FudgeCraft_DetectCombos || (L10_FudgeCraft_DetectCombos = {}));
//# sourceMappingURL=Test.js.map