import React, { useEffect, useCallback } from "react";
import { Form, Input, Button, Checkbox } from "antd";

import useInput from "../hooks/useInput";

const PostForm = () => {
  const [text, onChangeText, setText] = useInput("");

  const onSubmit = useCallback(() => {
    if (!text || !text.trim()) {
      return alert("게시글을 작성하세요.");
    }
  }, [text]);

  return (
    <Form
      style={{ margin: "10px 0 20px" }}
      encType="multipart/form-data"
      onFinish={onSubmit}
    >
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="글"
      />
      <div>
        <Checkbox>자기소개서를 첨부합니다.</Checkbox>
        <Button type="primary" style={{ float: "right" }} htmlType="submit">
          작성
        </Button>
      </div>
    </Form>
  );
};

export default PostForm;
