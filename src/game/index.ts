import {Engine} from "../core.ts";
import {Scene} from "../lib/index.ts";

export class MainScreen extends Scene {

  i:number;

  constructor(engine: Engine) {
    super(engine);
    engine.on("boot", this.boot.bind(this));
  }

  boot() {
    this.e.sceneManager.addScene(this);
    this.e.sceneManager.setDefaultScene(this);
  }

  onActivate() {
    this.i = this.getLocalStore().get("incrementor") || 0;
  }

  onDeactivate() {
    this.getLocalStore().set("incrementor", this.i);
  }

  onRender() {
    let self = this;
    this.e.ui.text.write("Hello World, we're on iteration " + this.i);
    this.e.ui.text.write("Als Gregor Samsa eines Morgens aus unruhigen Träumen erwachte, fand er sich in seinem Bett zu einem ungeheueren Ungeziefer verwandelt. Er lag auf seinem panzerartig harten Rücken und sah, wenn er den Kopf ein wenig hob, seinen gewölbten, braunen, von bogenförmigen Versteifungen geteilten Bauch, auf dessen Höhe sich die Bettdecke, zum gänzlichen Niedergleiten bereit, kaum noch erhalten konnte. Seine vielen, im Vergleich zu seinem sonstigen Umfang kläglich dünnen Beine flimmerten ihm hilflos vor den Augen.")
    this.e.ui.text.write("»Was ist mit mir geschehen?«, dachte er. Es war kein Traum. Sein Zimmer, ein richtiges, nur etwas zu kleines Menschenzimmer, lag ruhig zwischen den vier wohlbekannten Wänden. Über dem Tisch, auf dem eine auseinandergepackte Musterkollektion von Tuchwaren ausgebreitet war – Samsa war Reisender – hing das Bild, das er vor kurzem aus einer illustrierten Zeitschrift ausgeschnitten und in einem hübschen, vergoldeten Rahmen untergebracht hatte. Es stellte eine Dame dar, die mit einem Pelzhut und einer Pelzboa versehen, aufrecht dasaß und einen schweren Pelzmuff, in dem ihr ganzer Unterarm verschwunden war, dem Beschauer entgegenhob.");
    this.e.ui.actionButtons.add({
      label: "Increment me!",
      cb: () => {
        self.i++;
        self.e.cycle();
      }
    })
    this.e.ui.actionButtons.add({
      label: "Switch scenes",
      cb: () => {
        self.e.setScene(
          self.e.sceneManager.getScene("SubSCENE")
        )
      }
    })
  }
}

export class SubScene extends Scene {
  constructor(engine: Engine) {
    super(engine);
    engine.on("boot", this.boot.bind(this));
  }

  boot() {
    this.e.sceneManager.addScene(this);
  }

  onRender() {
    let self = this;
    this.e.ui.text.write("I have no idea what I'm doing.");
    this.e.ui.actionButtons.add({
      label: "Start Screen",
      cb: () => {
        self.e.setScene(
          self.e.sceneManager.getDefaultScene()
        )
      }
    })
  }

  saveName = "SubSCENE"
}
