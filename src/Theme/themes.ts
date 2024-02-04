
/* 
Themes used in the app. They are extensions of the react navigation theme (for type errors) but
the brand color system is used which is in the following format:
surface1: background color
surface2: card color
surface3: chip/surface on top of card color 
primaryText: primary text color
secondaryText: secondary text color
primary: primary color
secondary: secondary color
danger: danger color
primaryButton: primary button text color
primaryButtonText: primary button text color
*/




export type BrandTheme = {
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
    primaryButton: string,
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
    primaryButton: '#608E06',
    primaryButtonText: '#608E06',
    surface1: '#F4F6F0',
    surface2: '#ffffff',
    surface3: '#DDE1D4'
  },
  dark: false
};

export const DarkTheme: BrandTheme = {
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
    primaryButton: '#608E06',
    primaryButtonText: '#608E06',
    surface1: '#F4F6F0',
    surface2: '#ffffff',
    surface3: '#DDE1D4'
  },
  dark: true
};