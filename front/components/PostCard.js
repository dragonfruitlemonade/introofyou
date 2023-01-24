import React from "react";
import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from 'react-redux';
import {
  FireOutlined,
  FireTwoTone,
  MessageOutlined,
  EllipsisOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import { Card, Popover, Button, Avatar, List } from "antd";

import CommentForm from "./CommentForm";
import IntroPreview from "./IntroPreview";
import { LIKE_POST_REQUEST, UNLIKE_POST_REQUEST, REMOVE_POST_REQUEST } from "../reducers/post";

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const [previewOpened, setPreviewOpened] = useState(false);
  const { removePostLoading } = useSelector((state) => state.post);
  const id = useSelector((state) => state.user.me?.id);

  const onLike = useCallback(() => {
    if (!id) {
      return alert("로그인이 필요하다.");
    }
    return dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  const onUnLike = useCallback(() => {
    if (!id) {
      return alert("로그인이 필요하다.");
    }
    return dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  const onTogglePreview = useCallback(() => {
    setPreviewOpened((prev) => !prev);
  }, []);

  const onRemovePost = useCallback(() => {
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  const liked = post.Likers.find((v) => v.id === id);
  return (
    <div style={{ marginBottom: 20 }} key={post.id}>
      <Card
        actions={[
          liked ? (
            <FireTwoTone
              twoToneColor="#cc0000"
              key="heart"
              onClick={onUnLike}
            />
          ) : (
            <FireOutlined key="heart" onClick={onLike} />
          ),
          <MessageOutlined key="comment" onClick={onToggleComment} />,
          <ArrowDownOutlined key="preview" onClick={onTogglePreview} />,
          <Popover
            key="more"
            content={
              <Button.Group>
                {id && post.UserId === id ? (
                  <>
                    <Button>수정</Button>
                    <Button
                      type="danger"
                      loading={removePostLoading}
                      onClick={onRemovePost}
                    >
                      삭제
                    </Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.id}</Avatar>}
          title={post.User.id}
          postData={post.content}
        />
      </Card>
      {commentFormOpened && (
        <div>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  author={item.User.id}
                  avatar={<Avatar>{item.User.id[0]}</Avatar>}
                  content={item.content}
                />
              </List.Item>
            )}
          />
        </div>
      )}
      {previewOpened && (
        <div>
          <IntroPreview />
        </div>
      )}
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Likers: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};


export default PostCard;
