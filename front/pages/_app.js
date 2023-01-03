import React from 'react';
import propTypes from 'prop-types';
import Head from 'next/head';

import wrapper from "../store/configureStore";

const App = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <title>introofyou</title>
      </Head>
      <Component />
    </>
  );
};

App.propTypes = {
  Component: propTypes.elementType.isRequired,
}

export default wrapper.withRedux(App);
