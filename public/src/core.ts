import {EventEmitter, UI, UIFrameManager, KVS, KeyValueStore, Scene, SceneManager} from "./lib/index.ts";

export class Engine extends EventEmitter {
  ui: UI;
  uiFrameManager: UIFrameManager = new UIFrameManager(this.ui);
  lastLocation: Location;
  kvs: KeyValueStore = new KVS();
  scene: Scene;
  sceneManager: SceneManager = new SceneManager();

  constructor() {
    super();
    this.ui = new UI(this);
  }

  boot() : Engine {
    this.emit("boot", this);
    this.setScene(this.sceneManager.getDefaultScene());
    return this;
  }

  save(slot: number) {
    this.kvs.set("CURRENT_SCENE", this.scene.saveName);
    this.scene.onDeactivate();
    window.localStorage.setItem("SOLACE_SLOT_" + slot.toString(), this.kvs.save());
  }

  load(slot: number) {
    this.scene = null;
    this.kvs.restore(window.localStorage.getItem("SOLACE_SLOT_" + slot.toString()));
    let targetScene = this.sceneManager.getScene(this.kvs.get("CURRENT_SCENE"));
    this.setScene(
      this.sceneManager.getScene(this.kvs.get("CURRENT_SCENE"))
    );
  }

  setScene(scene: Scene) {
    if (this.scene)
      this.scene.onDeactivate();
    this.scene = scene;

    this.scene.onActivate();

    this.cycle();
  }

  cycle() {
    this.ui.reset();
    this.scene.onRender();
  }
}

let engine = new Engine();

export default engine;
