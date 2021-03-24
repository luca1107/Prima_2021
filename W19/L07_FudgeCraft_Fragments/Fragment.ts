namespace L07_FudgeCraft_Fragments {
    import ƒ = FudgeCore;

    export class Fragment extends ƒ.Node {
        private static shapes: number[][][] = Fragment.getShapeArray();
        public position: ƒ.Vector3 = new ƒ.Vector3(0, 0, 0);

        constructor(_shape: number, _position: ƒ.Vector3 = ƒ.Vector3.ZERO()) {
            super("Fragment-Type" + _shape);
            let shape: number [][] = Fragment.shapes[_shape];
            for (let position of shape) {
                let type: CUBE_TYPE =  Fragment.getRandomEnum(CUBE_TYPE);
                let vctPosition: ƒ.Vector3 = ƒ.Vector3.ZERO();
                vctPosition.set(position[0], position[1], position[2]);
                let cube: Cube = new Cube(type, vctPosition);
                this.appendChild(cube);
            }
            
            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(_position)));
        }

        private static getShapeArray(): number[][][] {
            return [
                // corner
                [[0, 0, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1]],
                // quad
                [[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0]],
                // s
                [[0, 0, 0], [0, 1, 0], [1, 0, 0], [1, -1, 0]]
            ];
        }

        private static getRandomEnum<T>(_enum: {[key: string]: T}): T {
            let randomKey: string = Object.keys(_enum)[Math.floor(Math.random() * Object.keys(_enum).length)];
            return _enum[randomKey];
        }
    }
}