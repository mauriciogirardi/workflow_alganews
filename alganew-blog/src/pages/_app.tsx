import "../styles/imports.css";
import { ThemeProvider } from "styled-components";
import type { AppProps as NextAppProps } from "next/app";
import ProgressBar from "@badrap/bar-of-progress";
import Error from "next/error";

import { GlobalStyles } from "styles/globalStyles";
import { Content } from "components/Content";
import { Header } from "components/Header";
import { Footer } from "components/Footer";
import { light } from "styles/theme";

import Router from "next/router";
import "../../httpConfig";

interface CustomAppProps extends NextPageProps {}

type AppProps<P = any> = {
    pageProps: P;
} & Omit<NextAppProps<P>, "pageProps">;

const progress = new ProgressBar({
    size: 2,
    color: light.primaryBackground,
    delay: 100,
});

function MyApp({ Component, pageProps }: AppProps<CustomAppProps>) {
    if (pageProps.error) {
        return (
            <Error
                statusCode={pageProps.error.statusCode}
                title={pageProps.error.message}
            />
        );
    }

    return (
        <ThemeProvider theme={light}>
            <Header />
            <Content>
                <Component {...pageProps} />
            </Content>
            <Footer />
            <GlobalStyles />
        </ThemeProvider>
    );
}

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

export default MyApp;
