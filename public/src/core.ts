import {EventEmitter, UI, UIFrameManager, KVS} from "./lib/index.ts";

export class Engine extends EventEmitter {
    ui: UI;
    uiFrameManager: UIFrameManager = new UIFrameManager(this.ui);
    lastLocation: Location;
    kvs: KVS = new KVS();
    
    constructor() {
        super();
        this.ui = new UI(this);
    }
    
    boot() : Engine {
        this.emit("boot", this);
        return this;
    }
    
    save(slot: number) {
        window.localStorage.setItem("SOLACE_SLOT_" + slot.toString(), this.kvs.save());
    }
    
    load(slot: number) {
        // todo check if slot is occupied
        this.kvs.restore(window.localStorage.getItem("SOLACE_SLOT_" + slot.toString()));
    }
}

let engine = new Engine();

export default engine;