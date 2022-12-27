import React from "react";
import IndexLayout from "../components/IndexLayout";
import { Form, Input, Button } from "antd";

import PostCard from "../components/PostCard";


const Community = () => {

  return (
    <IndexLayout>
      <Button href="write">글쓰기</Button>
      <PostCard />
    </IndexLayout>
  );
};

export default Community;
