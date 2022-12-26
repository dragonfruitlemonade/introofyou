import React from 'react';
import propTypes from 'prop-types';
import Head from 'next/head';

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

export default App;