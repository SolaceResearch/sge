import {
orange500, orange700,
blueGray100, blueGray300, blueGray400, blueGray500,
tealA200,
white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';

export const solaceTheme = {
  spacing: {
  iconSize: 24,
  desktopGutter: 24,
  desktopGutterMore: 32,
  desktopGutterLess: 16,
  desktopGutterMini: 8,
  desktopKeylineIncrement: 64,
  desktopDropDownMenuItemHeight: 32,
  desktopDropDownMenuFontSize: 15,
  desktopDrawerMenuItemHeight: 48,
  desktopSubheaderHeight: 48,
  desktopToolbarHeight: 56,
  },
  fontFamily: 'Roboto, sans-serif',
  palette: {
  primary1Color: orange500,
  primary2Color: orange700,
  primary3Color: blueGray400,
  accent1Color: tealA200,
  accent2Color: blueGray100,
  accent3Color: blueGray500,
  textColor: darkBlack,
  alternateTextColor: white,
  canvasColor: white,
  borderColor: blueGray300,
  disabledColor: fade(darkBlack, 0.3),
  pickerHeaderColor: orange500,
  clockCircleColor: fade(darkBlack, 0.07),
  shadowColor: fullBlack,
  },
};
