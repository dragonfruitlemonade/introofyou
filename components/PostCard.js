import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  FireOutlined,
  MessageOutlined,
  EllipsisOutlined,
  FireTwoTone,
} from "@ant-design/icons";
import { Card, Popover, Button, Avatar, List, Comment } from "antd";

const PostCard = () => {
  const [commentFormOpened, setCommentFormOpened] = useState(false);

  return (
    <div style={{ marginBottom: 20 }}>
      <Card
        actions={[
          <FireTwoTone
            twoToneColor="#cc0000"
            key="heart"
          />,
          <MessageOutlined key="comment" />,
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
    </div>
  );
};


export default PostCard;
