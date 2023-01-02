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
            <label htmlFor="user-field">지원분야</label>
            <hr />
            <Input
              name="user-field"
              value={field}
              onChange={onChangeField}
              required
            />
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
            <label htmlFor="user-major">세부전공</label>
            <hr />
            <Input
              name="user-major"
              value={major}
              onChange={onChangeMajor}
              required
            />
          </Col>
          <Col span={24}>
            <br />
          </Col>
          <Col span={11}>
            <label htmlFor="user-job">직업</label>
            <hr />
            <Input
              name="user-job"
              value={job}
              onChange={onChangeJob}
              required
            />
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
            <label htmlFor="user-call">이메일</label>
            <hr />
            <Input
              name="user-call"
              value={call}
              onChange={onChangeCall}
              required
            />
          </Col>
          <Col span={24}>
            <br />
          </Col>
          <Col span={11}>
            <label htmlFor="user-income">이메일</label>
            <hr />
            <Input
              name="user-income"
              value={income}
              onChange={onChangeIncome}
              required
            />
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
            <label htmlFor="user-portfolio">포트폴리오</label>
            <hr />
            <Input
              name="user-portfolio"
              value={portfolio}
              onChange={onChangePortfolio}
              required
            />
          </Col>
          <Col span={24}>
            <br />
          </Col>
          <Col span={11}>
            <label htmlFor="user-academic">학력</label>
            <hr />
            <Input
              name="user-academic"
              value={academic}
              onChange={onChangeAcademic}
              required
            />
          </Col>
          <Col span={13}></Col>
          <Col span={24}>
            <br />
          </Col>
          <Col span={24}>
            <label htmlFor="user-sentence">한줄 자기소개</label>
            <hr />
            <Input
              name="user-sentence"
              value={sentence}
              onChange={onChangeSentence}
              required
            />
          </Col>
          <Col span={24}>
            <br />
          </Col>
          <Col span={24}>
            <label htmlFor="user-skill">skill</label>
            <hr />
            <Input
              name="user-skill"
              value={skill}
              onChange={onChangeSkill}
              required
            />
          </Col>
          <Col span={24}>
            <br />
          </Col>
          <Col span={24}>
            <label htmlFor="user-reason">지원동기</label>
            <hr />
            <Input.TextArea
              name="user-reason"
              value={reason}
              onChange={onChangeReason}
              required
            />
          </Col>
          <Col span={24}>
            <br />
          </Col>
          <Col span={24}>
            <label htmlFor="user-other">자격증 및 수상내역</label>
            <hr />
            <Input.TextArea
              name="user-other"
              value={other}
              onChange={onChangeOther}
              required
            />
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
