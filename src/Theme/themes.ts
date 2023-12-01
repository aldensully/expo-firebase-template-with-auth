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
    background: '#C4E3FF',
    card: '#C4E3FF',
    text: '#20202A',
    border: '#fff',
    notification: '#000',
    primary: '#00A4DD',
    secondary: '#F9C23C',
    primaryText: '#174773',
    secondaryText: '#627D97',
    danger: '#E94663',
    primaryButtonText: '#fff',
    surface1: '#C4E3FF',
    surface2: '#EDF6FF',
    surface3: '#E2EAF2'
  },
  dark: false
};