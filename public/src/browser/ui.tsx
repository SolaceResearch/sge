/// <reference path="../../../typings/index.d.ts" />

import {Engine} from '../core.ts';
import {Button} from '../lib/ui.ts';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {solaceTheme} from './muiTheme.ts';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import injectTapEventPlugin from 'react-tap-event-plugin';

var e: Engine = null;

interface TextBoxProperties {
  text: string;
}

interface ActionButtonsProperties {
  buttons: Button[];
}

let UIWrapper = React.createClass<{}, {}>({
  getInitialState: function() {
    console.dir(this.props);
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
      open: false
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

  handleToggle() { this.setState({open: !(this.state.open)}); }

  render() {
    return <div>
      <AppBar title="Solace" onLeftIconButtonTouchTap={this.handleToggle.bind(this)} />
      <Drawer open={this.state.open}>
        <AppBar title="Menu" onLeftIconButtonTouchTap={this.handleToggle.bind(this)} />
        <MenuItem>Menu Item</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
      </Drawer>
      <div className={"content" + (this.state.open ? ' menu' : '')}>
        <Card>
          <TextBox text={this.state.text} />
          <ActionButtons buttons={this.state.actionButtons} />
        </Card>
        <Credits />
      </div>
    </div>
  };
}

export class Credits extends React.Component<{}, {}> {
  render() {
    return <Card>
      <CardText>Powered By React {React.version}</CardText>
    </Card>
  }
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
