import "../styles/imports.css";
import { ThemeProvider } from 'styled-components'
import type { AppProps } from 'next/app'

import { light } from 'styles/theme'
import { GlobalStyles } from 'styles/globalStyles'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={light}>
            <Component {...pageProps} />
            <GlobalStyles />
        </ThemeProvider>
    )
}

export default MyApp
