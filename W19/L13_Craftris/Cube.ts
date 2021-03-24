namespace L13_Craftris {
  import ƒ = FudgeCore;

  export enum CUBE_TYPE {
    GREEN = "Green",
    RED = "Red",
    BLUE = "Blue",
    YELLOW = "Yellow",
    MAGENTA = "Magenta",
    CYAN = "Cyan",
    BLACK = "Black"
  }
  type Materials = Map<CUBE_TYPE, ƒ.Material>;

  export class Cube extends ƒ.Node {
    private static mesh: ƒ.MeshCube = new ƒ.MeshCube();
    private static materials: Materials = Cube.createMaterials();

    constructor(_type: CUBE_TYPE, _position: ƒ.Vector3) {
      super("Cube." + _type);

      let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(Cube.mesh);
      cmpMesh.pivot.scale(ƒ.Vector3.ONE(0.9));
      this.addComponent(cmpMesh);

      let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(Cube.materials.get(_type));
      this.addComponent(cmpMaterial);

      let cmpTransform: ƒ.ComponentTransform = new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(_position));
      this.addComponent(cmpTransform);
    }

    private static createMaterials(): Materials {
      let alpha: number = 0.9;
      return new Map([
        [CUBE_TYPE.RED, new ƒ.Material(CUBE_TYPE.RED, ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("RED", alpha)))],
        [CUBE_TYPE.GREEN, new ƒ.Material(CUBE_TYPE.GREEN, ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("LIME", alpha)))],
        [CUBE_TYPE.BLUE, new ƒ.Material(CUBE_TYPE.BLUE, ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("BLUE", alpha)))],
        [CUBE_TYPE.MAGENTA, new ƒ.Material(CUBE_TYPE.MAGENTA, ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("MAGENTA", alpha)))],
        [CUBE_TYPE.YELLOW, new ƒ.Material(CUBE_TYPE.YELLOW, ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("YELLOW", alpha)))],
        [CUBE_TYPE.CYAN, new ƒ.Material(CUBE_TYPE.CYAN, ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("CYAN", alpha)))],
        [CUBE_TYPE.BLACK, new ƒ.Material(CUBE_TYPE.BLACK, ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("BLACK", alpha)))]
      ]);
    }

    public getColor(): ƒ.Color {
      return (<ƒ.CoatColored>this.getComponent(ƒ.ComponentMaterial).material.getCoat()).color;
    }
  }
}