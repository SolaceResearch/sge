/// <reference path="../../typings/index.d.ts" />

import {Engine} from '../core.ts';
import {Button} from '../lib/ui.ts';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

interface UIProperties {
    engine: Engine
}

interface TextBoxProperties {
    text: string;
}

interface ActionButtonsProperties {
    buttons: Button[];
    
}

let UI = React.createClass<UIProperties, {}>({
    getInitialState: function() {
        let engine: Engine = this.props.engine;
        return {
            text: engine.ui.text.get(),
            actionButtons: engine.ui.actionButtons.buttons
        };
    },
    
    componentDidMount: function() {
        let engine: Engine = this.props.engine;
        this.state.cbmap = new Map<string, any>();
        engine.on("text", (text) => {
            this.setState({text: text});
        });
        engine.on("actionButtons", (buttons: Button[]) => {
            this.setState({actionButtons: buttons});
        })
        engine.boot();
    },
    
    render: function() {
        return <MuiThemeProvider muiTheme={getMuiTheme()}>
            <TextBox text={this.state.text} />
            <ActionButtons buttons={this.state.actionButtons} />
            <Credits />
        </MuiThemeProvider>
    }
})

export class Credits extends React.Component<{}, {}> {
    render() {
        return <div class="credits">Powered By React {React.version}</div>
    }
}

export class ActionButtons extends React.Component<ActionButtonsProperties, {}> {
    render() {
        let buttons = this.props.buttons.map<any>((btn: Button) => {
            return <div><a class="btn" href="#" key="" onClick={this.generateCbHandler(btn)}>{btn.label}</a></div>
        })
        return <div>{buttons}</div>
    }
    
    generateCbHandler(btn: Button) {
        return function(e: any) {
            btn.cb();
        }
    }
}

export class TextBox extends React.Component<TextBoxProperties, {}> {
   render() {
       return <div dangerouslySetInnerHTML={{__html: this.props.text}}></div>
   }
}

export function StartUI(engine: Engine) {
    ReactDOM.render(<UI engine={engine} />, document.getElementById("ui"));
}
