import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { ThemeProvider, ThemeType } from '../lib/themecontext'
import { getThemePreference, setThemePreference } from '../lib/preferences'
import '../styles/globals.css'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

export default function App({ Component, pageProps }: AppProps) {
  const theme: ThemeType = pageProps.themeSelected as ThemeType
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
