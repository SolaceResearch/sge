import {Engine} from "../core.ts";

export class MainScreen {
    constructor(private engine: Engine) {
        engine.on("boot", this.boot.bind(this));
    }
    boot() {
        this.engine.ui.text.write("Hello, World");
        this.engine.ui.actionButtons.add({label: "Start the game", cb: () => {console.log("start the game now")}});
        this.engine.ui.actionButtons.add({label: "Save Game", cb: () => this.engine.save(1)});
        this.engine.ui.actionButtons.add({label: "Load Game", cb: () => this.engine.load(1)});
    }
}