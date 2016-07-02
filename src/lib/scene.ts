import {Engine} from "../core.ts";

export class SceneManager {
  scenes: Scene[] = [];
  sceneMap: Map<string, Scene> = new Map<string, Scene>();
  defaultScene: Scene;

  addScene(scene: Scene) {
    if (this.sceneMap.has(scene.saveName)) {
      throw new Error("Scene name `" + scene.saveName + "` used more than once.")
    }
    this.sceneMap.set(scene.saveName, scene);
    this.scenes.push();
  }

  getScene(name: string) {
    return this.sceneMap.get(name);
  }

  setDefaultScene(scene: Scene) {
    this.defaultScene = scene;
  }

  getDefaultScene() {
    return this.defaultScene;
  }
}

export abstract class Scene {
  constructor(engine: Engine) {
    this.e = engine;
  }

  //
  // EVENT HANDLERS
  //////////////////

  // Ran when the scene is activated through another scene
  onActivate() {

  }

  // Here's the place to render stuff
  onRender() {

  }

  // When the Engine receives a signal to switch away from here
  // persist to kvs here
  onDeactivate() {

  }

  //
  // CONDITIONALS
  ////////////////

  // can the user save here?
  canSave() : boolean {
    return true;
  }

  //
  // HELPERS
  ///////////

  // return the global KVS event

  getStore() {
    return this.e.kvs;
  }

  // return the character scoped store

  getCharacterStore() {
    return this.e.kvs.getScopedInstance("character");
  }

  // return the local KVS (it's scoped and stuff)

  getLocalStore() {
    return this.e.kvs
      .getScopedInstance("scenes")
      .getScopedInstance(this.saveName);
  }

  // How the engine loads a scene from a save
  public saveName: string = "GENERIC_SCENE";
  protected e: Engine;
}
