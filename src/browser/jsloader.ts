interface HTMLSRIElement {
  integrity: string;
}

interface HTMLSRIScriptElement extends HTMLScriptElement, HTMLSRIElement {}

export function SRITest() {
  return new Promise(function(resolve, reject) {
    let sriScript: HTMLSRIScriptElement = <HTMLSRIScriptElement>document.createElement("script");
    sriScript.integrity = "sha-256-notevenclose";
    sriScript.src = "/sri.js";
    sriScript.onerror = function() {
      console.log("%c[SRI test successful]", "color:#555;")
      resolve();
    }
    sriScript.onload = function() {
      console.log("%c[SRI test failed]", "color:#555;")
      reject(new Error("SRI test failed."));
    }
    console.log("%c[Testing if SRI works, ignore errors from here on]", "color:#555;")
    document.body.appendChild(sriScript);
  })
}
