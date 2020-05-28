import { Fragment } from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';

import Layout from '../components/Layout';

import '../assets/self-styles.less';


export default class NextApp extends App {

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx });
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, store, router } = this.props;
    return (
      <Fragment>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta charSet='utf-8' />
          <title>bowdawn</title>
          <link rel='shortcut icon' href='/static/favicon.ico' type='image/ico' />

        </Head>
        <Container>
          <Provider store={store}>
            <Layout >
              <Component {...pageProps} router={router} />
            </Layout>
          </Provider>
        </Container>
      </Fragment>
    );
  }
}

