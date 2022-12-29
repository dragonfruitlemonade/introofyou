import React from 'react';
import { useEffect } from 'react';
import Router from 'next/router';
import { useSelector } from 'react-redux';

import IndexLayout from '../components/IndexLayout';

const Profile = () => {
  const { me } = useSelector((state) => state.user);
  useEffect(() => {
    if (!(me && me.id)) {
      Router.push("/");
    }
  }, [me && me.id]);
  if (!me) {
    return null;
  }

  return (
    <IndexLayout>
      내 프로필
    </IndexLayout>
  );
};

export default Profile;
