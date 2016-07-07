/// <reference path="../../../typings/index.d.ts" />

import {Engine} from '../core.ts';
import {Button} from '../lib/ui.ts';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Credits} from "./credits.tsx";

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {solaceTheme} from './muiTheme.ts';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import injectTapEventPlugin from 'react-tap-event-plugin';

var e: Engine = null;

interface TextBoxProperties {
  text: string;
}

interface ActionButtonsProperties {
  buttons: Button[];
}

interface CreditsProperties {
  open: boolean;
}

let UIWrapper: any = React.createClass<{}, {}>({
  getInitialState: function() {
    return {};
  },

  render: () => (
    <MuiThemeProvider muiTheme={getMuiTheme(solaceTheme)}>
      <UI />
    </MuiThemeProvider>
  )
});

export class UI extends React.Component<{},any> {
  constructor(props: {}) {
    super(props);
    let engine: Engine = e;
    this.state = {
      text: engine.ui.text.get(),
      actionButtons: engine.ui.actionButtons.buttons,
      open: false,
      creditsOpen: false
    };
  }

  componentDidMount() {
    let engine: Engine = e;
    this.state.cbmap = new Map<string, any>();
    engine.on("text", (text) => {
      this.setState({text: text});
    });
    engine.on("actionButtons", (buttons: Button[]) => {
      this.setState({actionButtons: buttons});
    })
    engine.boot();
  };

  handleToggle() {
    this.setState({open: !(this.state.open)});
  }

  openCredits() {
    this.setState({creditsOpen: true, creditsOpenCallback: function() {
      this.setState({creditsOpen: false});
    }.bind(this)});
  }

  render() {
    return <div>
      <AppBar title="Solace" style={{position: "fixed"}} onLeftIconButtonTouchTap={this.handleToggle.bind(this)} />
      <Drawer open={this.state.open}>
        <AppBar title="Menu" onLeftIconButtonTouchTap={this.handleToggle.bind(this)} />
        <MenuItem onClick={this.openCredits.bind(this)}>Credits</MenuItem>
      </Drawer>
      <div>
        <div className={"content" + (this.state.open ? ' menu' : '')} style={{paddingTop: "76px"}}>
          <Card>
            <CardTitle title="Solace" subtitle="Main Menu" />
            <TextBox text={this.state.text} />
            <ActionButtons buttons={this.state.actionButtons} />
          </Card>
        </div>
      </div>
      <Credits open={this.state.creditsOpen} e={e} callback={this.state.creditsOpenCallback} />
    </div>
  };
}

export class ActionButtons extends React.Component<ActionButtonsProperties, {}> {
  i:number = 0;

  render() {
    let self = this;
    let buttons = this.props.buttons.map<any>((btn: Button) => {
      let cbd = this.generateCbHandler(btn);
      return <FlatButton label={btn.label} onClick={cbd.fn.bind(this)} key={cbd.id} />
    })
    return <CardActions>{buttons}</CardActions>
  }

  generateCbHandler(btn: Button) {
    return {
      fn: function(e: any) {
        btn.cb();
      },
      id: this.i++
    }
  }
}

export class TextBox extends React.Component<TextBoxProperties, {}> {
   render() {
     return <CardText dangerouslySetInnerHTML={{__html: this.props.text}}></CardText>
   }
}

export function StartUI(engine: Engine) {
  e = engine;
  injectTapEventPlugin();
  ReactDOM.render(<UIWrapper />, document.getElementById("ui"));
}
