import React, { useState, useEffect, useCallback } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import IndexLayout from "../components/IndexLayout";

import useInput from "../hooks/useInput";

const Write = () => {
  const [text, onChangeText, setText] = useInput("");

  const [term, setTerm] = useState("");
  const [termError, setTermError] = useState(false);
  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

    const onSubmit = useCallback(() => {
      if (!text || !text.trim()) {
        return alert("게시글을 작성하세요.");
      }

      if (!term) {
        return alert("자기소개서를 첨부해주세요.");
      }
    }, [text, term]);

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
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
            자기소개서를 첨부합니다<span style={{ color: "red" }}>(필수)</span>
          </Checkbox>
          <Button type="primary" style={{ float: "right" }} htmlType="submit">
            작성
          </Button>
        </div>
      </Form>
    </IndexLayout>
  );
};

export default Write;
