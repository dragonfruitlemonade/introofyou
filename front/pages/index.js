import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import IndexLayout from '../components/IndexLayout';
import { LOAD_USER_REQUEST } from '../reducers/user';
import { END } from "redux-saga";
import wrapper from "../store/configureStore";

const Home = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch({
  //     type: LOAD_USER_REQUEST,
  //   });
  // }, []);

  return (
    <IndexLayout>
      <div>메인</div>
    </IndexLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  context.store.dispatch({
    type: LOAD_USER_REQUEST,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});
// 화면 그리기전에 서버쪽에서 먼저 실행
// context안에 store가 들어있다.
// 화면이 렌더링 될때 리덕스에 데이터가 채워진상태로 렌더링 됨.

export default Home;