import React from 'react';
import propTypes from 'prop-types';
import Link from 'next/link';
import { Col, Row, Menu, Layout } from 'antd';

const { Header, Content, Footer } = Layout;


const IndexLayout = ({ children }) => {
  return (
    <Menu mode="horizontal" style={{ alignItems: "center" }}>
      <Menu.Item>
        <Link href="/">인트로오브유</Link>
      </Menu.Item>
      <Menu.Item key="intro">
        <Link href="/intro">자기소개서</Link>
      </Menu.Item>
      <Menu.Item key="community">
        <Link href="/community">커뮤니티</Link>
      </Menu.Item>
      <Menu.Item key="login">
        <Link href="/login">로그인</Link>
      </Menu.Item>
      <Menu.Item key="signup">
        <Link href="/signup">회원가입</Link>
      </Menu.Item>
    </Menu>
  );
};

IndexLayout.propTypes = {
  children: propTypes.node.isRequired,
};

export default IndexLayout;