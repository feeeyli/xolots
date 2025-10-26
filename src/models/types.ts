import type { Model } from "./model";

export type Fallback = string | Model;

export type DisplayContext =
  | "thirdperson_lefthand"
  | "thirdperson_righthand"
  | "firstperson_lefthand"
  | "firstperson_righthand"
  | "head"
  | "gui"
  | "ground"
  | "fixed"
  | "on_shelf";
