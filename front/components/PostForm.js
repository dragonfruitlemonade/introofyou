import React from "react";
import { useState, useEffect, useCallback } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { useDispatch, useSelector } from 'react-redux';

import { addPost, ADD_POST_REQUEST } from "../reducers/post";
import useInput from "../hooks/useInput";

const PostForm = () => {
  const dispatch = useDispatch();
  const [text, onChangeText, setText] = useInput("");
  const { addPostDone } = useSelector((state) => state.post);

  const [term, setTerm] = useState("");
  const [termError, setTermError] = useState(false);
  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  useEffect(() => {
    if (addPostDone) {
      setText("");
    }
  }, [addPostDone]);

  const onSubmit = useCallback(() => {
    if (!text || !text.trim()) {
      return alert("게시글을 작성하세요.");
    }

    if (!term) {
      alert("자기소개서를 첨부해주세요.");
      return setTermError(true);
    }

    dispatch(addPost(text));
  }, [text, term]);

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
        placeholder="자기소개서에 대한 내용"
      />
      <div>
        <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
          자기소개서를 첨부합니다<span style={{ color: "red" }}>(필수)</span>
        </Checkbox>
        <Button type="primary" style={{ float: "right" }} htmlType="submit">
          작성
        </Button>
      </div>
    </Form>
  );
};

export default PostForm;
