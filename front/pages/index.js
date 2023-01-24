import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import IndexLayout from '../components/IndexLayout';
import { LOAD_USER_REQUEST } from '../reducers/user';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOAD_USER_REQUEST,
    });
  }, []);

  return (
    <IndexLayout>
      <div>메인</div>
    </IndexLayout>
  );
};

export default Home;