import React from 'react';

import { useDispatch, useSelector } from "react-redux";
import { LOAD_MY_INTRO_REQUEST } from "../reducers/user";
import { END } from "redux-saga";
import axios from "axios";
import wrapper from "../store/configureStore";

const IntroPreview = () => {
  return (
    <table border="1" width="560">
      <tr>
        <td bgcolor="silver">지원분야</td>
        <td>웹 프론트엔드</td>
        <td bgcolor="silver">세부전공</td>
        <td>소프트웨어</td>
      </tr>
      <tr>
        <td bgcolor="silver">직업</td>
        <td>취업 준비생</td>
        <td bgcolor="silver">이메일</td>
        <td colspan="3">tpghks9245@gmail.com</td>
      </tr>
      <tr>
        <td bgcolor="silver">희망 연봉</td>
        <td>8000</td>
        <td bgcolor="silver">포트폴리오</td>
        <td>www.introofyou.com</td>
      </tr>
      <tr>
        <td bgcolor="silver">학력</td>
        <td colspan="3">컴퓨터공학 학사</td>
      </tr>
      <tr>
        <td height="50" bgcolor="silver">
          한줄 자기소개
        </td>
        <td colspan="4">안녕하세요 인트로오브유입니다.</td>
      </tr>
      <tr>
        <td height="100" bgcolor="silver">
          skill
        </td>
        <td colspan="4">javascript</td>
      </tr>
      <tr>
        <td height="200" bgcolor="silver">
          지원동기
        </td>
        <td colspan="4">발전하고 싶습니다!</td>
      </tr>
      <tr>
        <td height="200" bgcolor="silver">
          자격증 및 수상내역
        </td>
        <td colspan="4"></td>
      </tr>
    </table>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    axios.defaults.headers.Cookie = cookie;
    context.store.dispatch({
      type: LOAD_MY_INTRO_REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default IntroPreview;