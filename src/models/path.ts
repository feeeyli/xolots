import { Model } from "./model";

export class Path extends Model {
  modelPath: string;
  texturePath?: string;
  pathName?: string;

  constructor(modelPath: string) {
    super("path");
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
