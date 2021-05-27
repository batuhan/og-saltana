import { extendTheme, ThemeConfig } from '@chakra-ui/react'

const config: Partial<ThemeConfig> = {
  useSystemColorMode: false,
  initialColorMode: 'light',
}

const customTheme = extendTheme({ config })

export default customTheme
