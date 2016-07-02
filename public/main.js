import * as core from "solace-core";
import * as browser from  "solace-browser";
import * as game from "solace-game";

browser.SRITest().then(() => {
  let engine = core.default;
  console.dir(engine);
  new game.MainScreen(engine);
  new game.SubScene(engine);
  browser.StartUI(engine);
}).catch((e) => {
  let css = "color:#bada55;background-color:#222;padding: 3px; line-height: 1.4;";
  console.log("%panic: Fatal exception in 'solacerg'", css);
  if (e.message !== null) console.log("%c" + e.message, css);
  if (e.stack !== null) console.log("%c" + e.stack, css);
  document.body.innerHTML = "The game has crashed.<br>If you would like to report this issue, check the console for debug information.";
})
