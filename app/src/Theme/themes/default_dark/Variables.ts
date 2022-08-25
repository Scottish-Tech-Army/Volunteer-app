import { ThemeColors, ThemeNavigationColors } from '@/Theme/theme.type'

const Colors: ThemeColors = {
  primary: 'lightblue',
  text: 'white',
  inputBackground: 'gray',
  dotActive: '#ffffff',
  dot: '#707070',
}

const NavigationColors: Partial<ThemeNavigationColors> = {
  primary: Colors.primary,
}

export default {
  Colors,
  NavigationColors,
}
