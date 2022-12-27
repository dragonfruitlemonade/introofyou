import React from "react";
import IndexLayout from "../components/IndexLayout";

import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";

const Community = () => {

  return (
    <IndexLayout>
      <PostForm />
      <PostCard />
    </IndexLayout>
  );
};

export default Community;
