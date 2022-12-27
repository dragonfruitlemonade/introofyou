import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  FireOutlined,
  FireTwoTone,
  MessageOutlined,
  EllipsisOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import { Card, Popover, Button, Avatar, List, Comment } from "antd";

import CommentForm from "./CommentForm";

const PostCard = () => {
  const [commentFormOpened, setCommentFormOpened] = useState(false);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  return (
    <div style={{ marginBottom: 20 }}>
      <Card
        actions={[
          <FireTwoTone twoToneColor="#cc0000" key="heart" />,
          <MessageOutlined key="comment" onClick={onToggleComment} />,
          <ArrowDownOutlined />,
          <Popover
            key="more"
            content={
              <Button.Group>
                <Button>수정</Button>
                <Button>삭제</Button>
                <Button>신고</Button>
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
      >
        <Card.Meta avatar={<Avatar>1</Avatar>} />
      </Card>
      {commentFormOpened && (
        <div>
          <CommentForm />
          <List
            itemLayout="horizontal"
            renderItem={(item) => (
              <li>
                <Comment
                  author="sehwan"
                  avatar={<Avatar>S</Avatar>}
                  content="잘좀하자"
                />
              </li>
            )}
          />
        </div>
      )}
    </div>
  );
};


export default PostCard;
