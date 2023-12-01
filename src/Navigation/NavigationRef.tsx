import { createNavigationContainerRef } from '@react-navigation/native';
import { NavigationScreens } from '../types';

export const navigationRef = createNavigationContainerRef<NavigationScreens>();

export function navigate(name: any, params: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}