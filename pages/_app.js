import { Fragment } from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import createStore from '../redux/store';

import '../assets/self-styles.less';


class NextApp extends App {

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
          <link rel='shortcut icon' href='/static/seedling-solid.svg' type='image/svg' />

        </Head>
        <Container>
          <Provider store={store}>

            <Component {...pageProps} router={router} />

          </Provider>
        </Container>
      </Fragment>
    );
  }
}

export default withRedux(createStore)(withReduxSaga({ async: true })(NextApp));