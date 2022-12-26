import React from 'react';
import propTypes from 'prop-types';
import { Layout } from 'antd';

const IndexLayout = ({ children }) => {
  return (
    <Layout>
      {children}
    </Layout>
  );
};

IndexLayout.propTypes = {
  children: propTypes.node.isRequired,
};

export default IndexLayout;