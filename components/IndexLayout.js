import React from 'react';
import propTypes from 'prop-types';
import Link from 'next/link';
import { Col, Row, Menu, Layout } from 'antd';

const IndexLayout = ({ children }) => {
  const me = false;
  return (
    <Row>
      <Col span={20}>
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
        </Menu>
      </Col>
      <Col span={4}>
        {me ? (
          <Menu mode="horizontal" style={{ alignItems: "center" }}>
            <Menu.Item key="login">
              <Link href="/login">로그인</Link>
            </Menu.Item>
            <Menu.Item key="signup">
              <Link href="/signup">회원가입</Link>
            </Menu.Item>
          </Menu>
        ) : (
          <Menu mode="horizontal">
            <Menu.Item key="login">
              <Link href="/login">로그아웃</Link>
            </Menu.Item>
            <Menu.Item key="signup">
              <Link href="/signup">내 프로필</Link>
            </Menu.Item>
          </Menu>
        )}
      </Col>
      <Col span={6}></Col>
      <Col span={12}>{children}</Col>
      <Col span={6}></Col>
    </Row>
  );
};

IndexLayout.propTypes = {
  children: propTypes.node.isRequired,
};

export default IndexLayout;