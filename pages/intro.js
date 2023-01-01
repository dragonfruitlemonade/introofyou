import React from "react";
import { useCallback } from "react";
import { Form, Input, Button, Select, Row, Col } from "antd";

const { Option } = Select;
import IndexLayout from "../components/IndexLayout";


const Intro = () => {
  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <IndexLayout>
      <Form style={{ padding: 10 }} onFinish={onFinish}>
        <Row>
          <Col span={11}>
            지원분야
            <hr />
            <Input />
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
            세부전공
            <hr />
            <Input />
          </Col>
          <Col span={24}>
            <br />
          </Col>
          <Col span={11}>
            직업
            <hr />
            <Input />
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
            이메일
            <hr />
            <Input />
          </Col>
          <Col span={24}>
            <br />
          </Col>
          <Col span={11}>
            희망연봉
            <hr />
            <Input />
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
            포트폴리오
            <hr />
            <Input />
          </Col>
          <Col span={24}>
            <br />
          </Col>
          <Col span={11}>
            학력
            <hr />
            <Input />
          </Col>
          <Col span={13}></Col>
          <Col span={24}>
            <br />
          </Col>
          <Col span={24}>
            한줄 자기소개
            <hr />
            <Input />
          </Col>
          <Col span={24}>
            <br />
          </Col>
          <Col span={24}>
            skill
            <hr />
            <Input />
          </Col>
          <Col span={24}>
            <br />
          </Col>
          <Col span={24}>
            지원동기
            <hr />
            <Input.TextArea />
          </Col>
          <Col span={24}>
            <br />
          </Col>
          <Col span={24}>
            자격증 및 수상내역
            <hr />
            <Input.TextArea />
          </Col>
          <Col span={24}>
            <br />
          </Col>
          <Button type="primary" htmlType="submit">
            저장하기
          </Button>
        </Row>
      </Form>
    </IndexLayout>
  );
};

export default Intro;
