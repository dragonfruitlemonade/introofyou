import React, { useEffect, useCallback } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import IndexLayout from "../components/IndexLayout";

import useInput from "../hooks/useInput";

const Write = () => {
  const [text, onChangeText, setText] = useInput("");

  const onSubmit = useCallback(() => {
    if (!text || !text.trim()) {
      return alert("게시글을 작성하세요.");
    }
  }, [text]);

  return (
    <IndexLayout>
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
          <Checkbox>자기소개서를 첨부합니다<span style={{ color: "red" }}>(필수)</span></Checkbox>
          <Button type="primary" style={{ float: "right" }} htmlType="submit">
            작성
          </Button>
        </div>
      </Form>
    </IndexLayout>
  );
};

export default Write;
