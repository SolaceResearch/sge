import "./style.css!";
import "es6-shim";

import * as core from "solace-core";
import * as browser from  "solace-browser";
import * as game from "solace-game";
import relinfo from "release.json!json";

try {
  let engine = core.default;
  engine.buildInfo = relinfo;
  console.dir(relinfo);
  window.e = function() {
    let css = "color:#fff;padding:3px;line-height: 1.4;background-color: #000; font-size: 18px; font-family:\"Roboto\"";
    console.log("%cYour warranty has been voided.", css);
    return engine;
  }
  new game.MainScreen(engine);
  new game.SubScene(engine);
  browser.StartUI(engine);
} catch (e) {
  let css = "color:#bada55;background-color:#222;padding: 3px; line-height: 1.4;";
  console.log("%panic: Fatal exception in 'solacerg'", css);
  if (e.message !== null) console.log("%c" + e.message, css);
  if (e.stack !== null) console.log("%c" + e.stack, css);
  document.body.innerHTML = "The game has crashed.<br>If you would like to report this issue, check the console for debug information.";
}
