import { Node } from "./node";

export class Model extends Node {
  modelPath: string;
  texturePath?: string;
  pathName?: string;

  constructor(modelPath: string) {
    super();
    this.modelPath = modelPath;
  }

  texture(path: string) {
    this.texturePath = path;
    return this;
  }

  name(name: string) {
    this.pathName = name;
    return this;
  }
}
