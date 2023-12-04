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
    background: '#FFF',
    card: '#fff',
    text: '#20202A',
    border: '#fff',
    notification: '#000',
    primary: '#3338A8',
    secondary: '#FF159C',
    primaryText: '#000',
    secondaryText: '#868686',
    danger: '#F70F1D',
    primaryButtonText: '#fff',
    surface1: '#fff',
    surface2: '#EFEFEF',
    surface3: '#D3D3D3'
  },
  dark: false
};