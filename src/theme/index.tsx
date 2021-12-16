import { css, DefaultTheme } from 'styled-components/macro';

export const MEDIA_WIDTHS = {
  upToExtraSmall: 500,
  upToSmall: 720,
  upToMedium: 960,
  upToLarge: 1280,
};

const mediaWidthTemplates: {
  [width in keyof typeof MEDIA_WIDTHS]: typeof css;
} = Object.keys(MEDIA_WIDTHS).reduce((accumulator, size) => {
  (accumulator as any)[size] = (a: any, b: any, c: any) => css`
    @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
      ${css(a, b, c)}
    }
  `;
  return accumulator;
}, {}) as any;

export interface ThemeColors {
  layoutBlack: string;
  globalBlack: string;
  globalWhite: string;
  globalGrey: string;
  globalLightGrey: string;
  BgCardGrey: string;
  orange: string;
  exchangeBorder: string;
}

export const colors: ThemeColors = {
  layoutBlack: 'rgba(0, 0, 0, 0.4)',
  globalBlack: '#000000',
  globalWhite: '#FFFFFF',
  globalGrey: '#666666',
  globalLightGrey: '#8991A3',
  BgCardGrey: '#E7E9ED',
  orange: '#FF7A00',
  exchangeBorder: '#D4D7DE',
};

function theme(): DefaultTheme {
  return {
    ...colors,

    // media queries
    mediaWidth: mediaWidthTemplates,

    fontWeight: {
      light: 200,
      normal: 400,
      bold: 700,
    },

  };
}

export default theme;
