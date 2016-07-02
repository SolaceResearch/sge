export interface EventCallback {
  (data: any) : void;
}

export class EventEmitter {
  listeners: Map<string, EventCallback[]> = new Map<string, EventCallback[]>();
  on(topic: string, cb: EventCallback) {
    if (!this.listeners.has(topic)) {
      this.listeners.set(topic, []);
    }
    this.listeners.get(topic).push(cb);
  }
  emit(topic: string, data: any) : void {
    if (!this.listeners.has(topic)) {
      this.listeners.set(topic, []);
      return;
    }
    this.listeners.get(topic).forEach(cb => cb(data));
  }
}
