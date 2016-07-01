import {Engine} from "../core.ts";
import {Scene} from "../lib/index.ts";

export class MainScreen extends Scene {
  i:number;
  constructor(engine: Engine) {
    super(engine);
    engine.on("boot", this.boot.bind(this));
  }

  boot() {
    this.e.sceneManager.addScene(this);
    this.e.sceneManager.setDefaultScene(this);

  }

  onActivate() {
    this.i = this.getLocalStore().get("incrementor") || 0;
  }

  onLoad() {
    this.i = this.getLocalStore().get("incrementor") || 0;
  }

  onRender() {
    let self = this;
    this.e.ui.text.append("Hello World, we're on iteration " + this.i);
    this.e.ui.actionButtons.add({
      label: "Increment me!",
      cb: () => {
        self.i++;
        self.e.cycle();
      }
    })
  }

  onSave() {
    this.persist();
  }

  onSwitchAway() {
    this.persist();
  }

  persist() {
    this.getLocalStore().set("incrementor", this.i);
  }
}
