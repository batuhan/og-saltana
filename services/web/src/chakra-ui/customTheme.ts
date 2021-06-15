import { extendTheme, ThemeConfig } from '@chakra-ui/react'

const config: Partial<ThemeConfig> = {
  useSystemColorMode: false,
  initialColorMode: 'light',
}

const customTheme = extendTheme({
  config,
  colors: {
    brand: {
      100: '#FCFCFC',
      200: '#F3F3F3',
      300: '#E3E3E3',
      400: '#CDCDCD',
      500: '#B1B1B1',
      600: '#8E8E8E',
      700: '#656565',
      800: '#363636',
      900: '#000000',
    },
  },
})

export default customTheme
