import {EventEmitter} from "./events.ts";

export interface KeyValueStore {
  save() : string;
  restore(data: string) : void;
  set(key: string, data: any) : void;
  get(key: string) : any;
  getScopedInstance(scope: string) : KeyValueStore;
}

export class KVS extends EventEmitter implements KeyValueStore {
  private kvs: Map<string, any> = new Map<string, any>();

  save() : string {
    return JSON.stringify(Array.from(this.kvs.entries()));
  }

  restore(data: string) : void {
    var json = JSON.parse(data);
    for (let k of (json)) {
        this.kvs.set(k[0], k[1]);
    }
  }

  set(key: string, data:any) : void {
    this.emit(key, data);
    this.kvs.set(key, data);
  }

  get(key: string) : any {
    if (this.kvs.has(key)) {
      return this.kvs.get(key);
    } else {
      return null;
    }
  }

  getScopedInstance(scope: string) : KeyValueStore {
    let self = this;
    return {
      save() : string { return self.save(); },
      restore(data: string) : void { self.restore(data); },
      set(key: string, data: any) : void { self.set(scope + "_" + key, data) },
      get(key: string) : any { return self.get(scope + "_" + key); },
      getScopedInstance(newScope: string) : KeyValueStore { return self.getScopedInstance(scope + "_" + newScope); }
    };
  }
}
