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
    this.scene.onSave();
    window.localStorage.setItem("SOLACE_SLOT_" + slot.toString(), this.kvs.save());
  }

  load(slot: number) {
    this.kvs.restore(window.localStorage.getItem("SOLACE_SLOT_" + slot.toString()));
    this.setScene(
      this.sceneManager.getScene(this.kvs.get("CURRENT_SCENE")),
      true
    );
  }

  setScene(scene: Scene, load?: boolean) {
    if (this.scene && !load)
    this.scene.onSwitchAway();
    this.scene = scene;

    if (load) {
    this.scene.onLoad();
    } else {
    this.scene.onActivate();
    }
    this.cycle();
  }

  cycle() {
    this.ui.reset();
    this.scene.onRender();
  }
}

let engine = new Engine();

export default engine;
