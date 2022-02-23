import "../styles/imports.css";
import { ThemeProvider } from 'styled-components'
import type { AppProps } from 'next/app'

import { GlobalStyles } from 'styles/globalStyles'
import { Content } from "components/Content";
import { Header } from "components/Header";
import { Footer } from "components/Footer";
import { light } from 'styles/theme'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={light}>
            <Header />
            <Content>
                <Component {...pageProps} />
            </Content>
            <Footer />
            <GlobalStyles />
        </ThemeProvider>
    )
}

export default MyApp
