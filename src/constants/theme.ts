import { convertHexToRGB, convertRGBToHex, getHexFromColorString, RGB } from './../utils/colors';

export const THEME_PRIMARY = 'rebeccapurple';
export const THEME_PRIMARY_HEX = getHexFromColorString(THEME_PRIMARY);
export const THEME_PRIMARY_RGB = convertHexToRGB(THEME_PRIMARY_HEX);

export const MIDDLE_GRAY_RGB: RGB = [127, 127, 127];
export const MIDDLE_GRAY_HEX = convertRGBToHex(MIDDLE_GRAY_RGB);
