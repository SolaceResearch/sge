/// <reference path="../../../typings/index.d.ts" />

import {EventEmitter} from "./events.ts";

export class UI {
  actionButtons: ButtonPanel;
  text: TextPipeline;

  constructor(private engine: EventEmitter) {
    this.actionButtons = new ButtonPanel(this.engine);
    this.text = new TextPipeline(this.engine);
  }

  save() : any {
    return {
      text: this.text.save(),
      actionButtons: this.actionButtons.save()
    }
  }

  restore(data: any) : any {
    this.actionButtons.restore(data.actionButtons);
    this.text.restore(data.text);
  }

  reset() {
    this.actionButtons.clear();
    this.text.clear();
  }
}

export interface ButtonClickedCallback {
  ():void;
}

export class ButtonPanel {
  constructor(private engine: EventEmitter) {}

  buttons: Button[] = [];

  clear() {
    this.buttons = [];
    this.engine.emit("actionButtons", this.buttons);
  }

  add(button: Button) {
    this.buttons.push(button);
    this.engine.emit("actionButtons", this.buttons);
  }

  save() : any {
    return this.buttons;
  }

  restore(data: any) : any {
    this.buttons = data;
    this.engine.emit("actionButtons", this.buttons);
  }
}

export interface Button {
  label: string;
  disabled?: boolean;
  role?: string;
  cb: ButtonClickedCallback;
}

export class TextPipeline {
  segments: string[] = [];

  constructor(private engine: EventEmitter) {}

  get() : string {
    return this.segments.map(value => TextPipeline.WRAP_RE + value + TextPipeline.WRAP_OST).join("");
  }

  write(text: string) : void {
    this.segments.push(text);
    this.engine.emit("text", this.get());
  }

  append(text: string) {
    if (this.segments.length < 1) {
      this.write(text);
    } else {
      this.segments[this.segments.length - 1] = this.segments[this.segments.length - 1] + TextPipeline.SEP + text;
    }
    this.engine.emit("text", this.get());
  }

  clear() {
    this.segments = [];
    this.engine.emit("text", this.get());
  }

  save() : any {
    return this.segments;
  }

  restore(data: any) : any {
    this.segments = data;
  }

  static WRAP_RE = "<p>";
  static WRAP_OST = "</p>";
  static NL = "<br>";
  static SEP = " ";
}

export interface UIFrame {
  text: string[],
  actionButtons: Button[]
}

export class UIFrameManager {
  constructor(private ui: UI) {}
  frames: UIFrame[] = [];
  push() {
    this.frames.push(this.ui.save());
    this.ui.reset();
  }
  pop() {
    this.ui.restore(this.frames.pop());
  }
}
