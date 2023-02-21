import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { ThemeProvider, ThemeType } from '../lib/themecontext'
import { getThemePreference, setThemePreference } from '../lib/preferences'
import '../styles/globals.css'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

export default function App({ Component, pageProps }: AppProps) {
  const propTheme: any = pageProps.themeSelected ? pageProps.themeSelected : "light"
  const theme: ThemeType = propTheme as ThemeType
  useEffect(() => {
    if (!getThemePreference()) {
      setThemePreference("light")
    }
  }, [])

  return (
    <ThemeProvider initialTheme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
