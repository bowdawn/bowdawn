import { Fragment } from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';


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
    const { Component, pageProps, router } = this.props;
    return (
      <Fragment>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta charSet='utf-8' />
          <title>bowdawn</title>
          <link rel='shortcut icon' href='/static/seedling-solid.svg' type='image/svg' />

        </Head>
        <Container>

          <Layout >
            <Component {...pageProps} router={router} />
          </Layout>

        </Container>
      </Fragment>
    );
  }
}

