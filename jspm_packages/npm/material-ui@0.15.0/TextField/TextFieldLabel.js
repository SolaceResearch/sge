/* */ 
'use strict';
Object.defineProperty(exports, "__esModule", {value: true});
var _simpleAssign = require('simple-assign');
var _simpleAssign2 = _interopRequireDefault(_simpleAssign);
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _transitions = require('../styles/transitions');
var _transitions2 = _interopRequireDefault(_transitions);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}
function getStyles(props) {
  var defaultStyles = {
    position: 'absolute',
    lineHeight: '22px',
    top: 38,
    transition: _transitions2.default.easeOut(),
    zIndex: 1,
    cursor: props.disabled ? 'default' : 'text',
    transform: 'scale(1) translate3d(0, 0, 0)',
    transformOrigin: 'left top',
    pointerEvents: 'auto',
    userSelect: 'none'
  };
  var shrinkStyles = props.shrink ? (0, _simpleAssign2.default)({
    transform: 'perspective(1px) scale(0.75) translate3d(0, -28px, 0)',
    pointerEvents: 'none'
  }, props.shrinkStyle) : null;
  return {root: (0, _simpleAssign2.default)(defaultStyles, props.style, shrinkStyles)};
}
var TextFieldLabel = function TextFieldLabel(props) {
  var muiTheme = props.muiTheme;
  var className = props.className;
  var children = props.children;
  var htmlFor = props.htmlFor;
  var onTouchTap = props.onTouchTap;
  var prepareStyles = muiTheme.prepareStyles;
  var styles = getStyles(props);
  return _react2.default.createElement('label', {
    className: className,
    style: prepareStyles(styles.root),
    htmlFor: htmlFor,
    onTouchTap: onTouchTap
  }, children);
};
TextFieldLabel.propTypes = {
  children: _react.PropTypes.node,
  className: _react.PropTypes.string,
  disabled: _react.PropTypes.bool,
  htmlFor: _react.PropTypes.string,
  muiTheme: _react.PropTypes.object.isRequired,
  onTouchTap: _react.PropTypes.func,
  shrink: _react.PropTypes.bool,
  shrinkStyle: _react.PropTypes.object,
  style: _react.PropTypes.object
};
TextFieldLabel.defaultProps = {
  disabled: false,
  shrink: false
};
exports.default = TextFieldLabel;
