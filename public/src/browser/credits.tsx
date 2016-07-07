import * as React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export class Credits extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      relinfo: props.e.buildInfo
    };
  }

  handleClose = () => {
    this.props.callback();
  };

  render() {
    const actions = [
      <FlatButton
        label="Close"
        onTouchTap={this.handleClose.bind(this)}
      />,
    ];

    let deps = Object.keys(this.props.e.buildInfo.deps).map((key: string) => {
      let v = this.props.e.buildInfo.deps[key].split("@")[1]
      return <span>{key} ({v}) </span>
    })

    return <Dialog open={this.props.open} title={"Solace Game Engine \"" + this.props.e.buildInfo.codename + "\" " + this.props.e.buildInfo.version} modal={true} actions={actions}>
      <p><strong>JSPM:</strong> {this.props.e.buildInfo.jspm}</p>
      <p><strong>Dependent Packages:</strong> {deps}</p>
    </Dialog>
  }
}
