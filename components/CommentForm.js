import React, { useCallback, useEffect } from "react";
import { Button, Form, Input } from "antd";
import PropTypes from "prop-types";

import useInput from "../hooks/useInput";

const CommentForm = () => {
  const [commentText, onChangeCommentText, setCommentText] = useInput("");
  
  return (
    <Form>
      <Form.Item style={{ position: "relative", margin: 0 }}>
        <Input.TextArea
          rows={4}
          value={commentText}
          onChange={onChangeCommentText}
        />
        <Button
          style={{ position: "absolute", right: 0, bottom: -40, zIndex: 1 }}
          type="primary"
          htmlType="submit"
        >
          댓글달기
        </Button>
      </Form.Item>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
