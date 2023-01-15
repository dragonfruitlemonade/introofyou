import React from 'react';
import { useCallback, useEffect } from 'react';
import propTypes from 'prop-types';
import Link from 'next/link';
import { Col, Row, Menu, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { logoutRequestAction } from '../reducers/user';

const IndexLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { me, logOutLoading, logOutError } = useSelector((state) => state.user);

  const onLogout = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  useEffect(() => {
    if (logOutError) {
      alert(logOutError);
    }
  }, [logOutError]);


  return (
    <Row style={{ width: "1100px", margin: "0 auto" }}>
      <Col span={4}></Col>
      <Col span={12} defaultChecked>
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
              <div onClick={onLogout} loading={logOutLoading}>
                로그아웃
              </div>
            </Menu.Item>
            <Menu.Item key="profile">
              <Link href="/profile">내 프로필</Link>
            </Menu.Item>
          </Menu>
        ) : (
          <Menu mode="horizontal">
            <Menu.Item key="login">
              <Link href="/login">로그인</Link>
            </Menu.Item>
            <Menu.Item key="signup">
              <Link href="/signup">회원가입</Link>
            </Menu.Item>
          </Menu>
        )}
      </Col>
      <Col span={4}></Col>

      <Col span={4}></Col>
      <Col span={16}>{children}</Col>
      <Col span={4}></Col>
    </Row>
  );
};

IndexLayout.propTypes = {
  children: propTypes.node.isRequired,
};

export default IndexLayout;