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
        let retval: any = {};
        for (let [k,v] of this.kvs) {
            retval[k] = v;
        }
        return JSON.stringify(retval);
    }
    
    restore(data: string) : void {
        var json = JSON.parse(data);
        for (let k of Object.keys(json)) {
            this.kvs.set(k, json[k]);
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
