// the purpose of this file is to bootstrap the application, not to include all frontend code

System.config({
    "map": {
        // let's start with out transpiler
        "typescript": "vendor/typescript/typescript.js",

        // react
        "react": "vendor/react/react.js",
        "react-dom": "vendor/react-dom/react-dom.js",
        "react-tap-event-plugin": "vendor/react-tap-event-plugin",
        "material-ui": "vendor/material-ui",

        // common dependencies
        "lodash.merge": "",

        // here comes the code
        "solace-core": "src/core.ts",
        "solace-browser": "src/browser/index.ts",
        "solace-game": "src/game/index.ts"
    },
    "transpiler": "typescript",
    "typescriptOptions": {
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "noImplicitAny": false,
        "jsx": 2 // This is an enum in typescript. It may change in newer releases.
    },
    "packages": {
        "react-tap-event-plugin": {
            "main": "injectTapEventPlugin.js",
            "defaultExtension": "js"
        },
        "material-ui": {
            "main": "index.js",
            "defaultExtension": "js"
        }
    }
});

Promise.all([
    System.import("solace-core"),
    System.import("solace-browser"),
    System.import("solace-game")
]).then((modules) => {
    let core = modules[0];
    let browser = modules[1];
    let game = modules[2];
    let engine = core.default;
    
    return browser.SRITest().then(() => {
        new game.MainScreen(engine);
        browser.StartUI(engine);
    })
}).catch((e) => {
    let css = "color:#bada55;background-color:#222;padding: 3px; line-height: 1.4;";
    console.log("%cSoulLess panic: Fatal exception in 'solacerg'", css);
    if (e.message !== null) console.log("%c" + e.message, css);
    if (e.stack !== null) console.log("%c" + e.stack, css);
    document.body.innerHTML("The game has crashed.<br>If you would like to report this issue, check the console for debug information.");
})