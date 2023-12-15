type BrandTheme = {
  colors: {
    background: string,
    card: string,
    text: string,
    border: string,
    notification: string,
    primary: string,
    secondary: string,
    primaryText: string,
    secondaryText: string,
    danger: string,
    primaryButtonText: string,
    surface1: string,
    surface2: string,
    surface3: string;
  },
  dark: boolean;
};

export const LightTheme: BrandTheme = {
  colors: {
    background: '#F4F6F0',
    card: '#F4F6F0',
    text: '#20202A',
    border: '#fff',
    notification: '#000',
    primary: '#608E06',
    secondary: '#D2E5AB',
    primaryText: '#292C24',
    secondaryText: '#888D7F',
    danger: '#FF3D00',
    primaryButtonText: '#608E06',
    surface1: '#F4F6F0',
    surface2: '#ffffff',
    surface3: '#DDE1D4'
  },
  dark: false
};