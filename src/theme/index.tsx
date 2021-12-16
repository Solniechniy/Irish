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
  globalBlack: string;
  globalWhite: string;
}

export const colors: ThemeColors = {
  globalBlack: '#131313',
  globalWhite: '#FFFFFF',
};

function theme(): DefaultTheme {
  return {
    ...colors,

    // media queries
    mediaWidth: mediaWidthTemplates,

    fontSizes: {
      xl: '4rem',
      l: '2rem',
      m: '1rem',
      s: '0.9rem',
      xs: '0.75rem',
    },

    fontWeight: {
      light: 200,
      normal: 400,
      bold: 700,
    },

  };
}

export default theme;
