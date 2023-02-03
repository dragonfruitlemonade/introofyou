import React, { useCallback, useEffect } from "react";
import { Form, Input, Button } from "antd";
import Link from "next/link";
import styled from "styled-components";
import Router from "next/router";
import { useDispatch, useSelector } from "react-redux";

import useInput from "../hooks/useInput";
import IndexLayout from "../components/IndexLayout";
import { loginRequestAction } from "../reducers/user";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";
import { END } from "redux-saga";
import axios from "axios";
import wrapper from "../store/configureStore";

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const FormWrapper = styled(Form)`
  padding: 10px;
`;

const Login = () => {
  const dispatch = useDispatch();
  const { me, logInLoading, logInError } = useSelector((state) => state.user);
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");

  const onSubmitForm = useCallback(() => {
    console.log(email, password);
    dispatch(loginRequestAction({ email, password }));
  }, [email, password]);

  useEffect(() => {
    if (logInError) {
      alert(logInError);
    }
  }, [logInError]);

  useEffect(() => {
    if (me) {
      Router.push("/");
    }
  }, [me && me.id]);

  return (
    <IndexLayout>
      <FormWrapper onFinish={onSubmitForm}>
        <div>
          <label htmlFor="user-email">이메일</label>
          <br />
          <Input
            name="user-email"
            type="email"
            value={email}
            onChange={onChangeEmail}
            required
          />
        </div>
        <div>
          <label htmlFor="user-password">패스워드</label>
          <br />
          <Input
            name="user-password"
            type="password"
            value={password}
            onChange={onChangePassword}
            required
          />
        </div>
        <ButtonWrapper>
          <Button type="primary" htmlType="submit" loading={logInLoading}>
            로그인
          </Button>
          <Link href="/signup">
            <Button>회원가입</Button>
          </Link>
        </ButtonWrapper>
      </FormWrapper>
    </IndexLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default Login;
