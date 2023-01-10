import React from "react";
import { useCallback, useEffect } from "react";
import Router from "next/router"
import { Form, Input, Button, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";

import IndexLayout from "../components/IndexLayout";
import useInput from "../hooks/useInput";
import { INTRO_WRITE_REQUEST } from "../reducers/user";


const Intro = () => {
  const dispatch = useDispatch();
  const { me, introWriteLoading, introWriteError } = useSelector((state) => state.user);
  const [field, onChangeField] = useInput("");
  const [major, onChangeMajor] = useInput("");
  const [job, onChangeJob] = useInput("");
  const [call, onChangeCall] = useInput("");
  const [income, onChangeIncome] = useInput("");
  const [portfolio, onChangePortfolio] = useInput("");
  const [academic, onChangeAcademic] = useInput("");
  const [intro, onChangeintro] = useInput("");
  const [skill, onChangeSkill] = useInput("");
  const [reason, onChangeReason] = useInput("");
  const [other, onChangeOther] = useInput("");
  
  useEffect(() => {
    if (!(me && me.id)) {
      alert("잘못된 접근입니다.");
      Router.replace("/");
    }
  }, [me && me.id]);

  useEffect(() => {
    if (introWriteError) {
      alert(introWriteError);
    }
  }, [introWriteError]);

  const onSubmit = useCallback(() => {
    console.log(
      field,
      major,
      job,
      call,
      income,
      portfolio,
      academic,
      intro,
      skill,
      reason,
      other
    );
    return dispatch({
      type: INTRO_WRITE_REQUEST,
      data: {
        field,
        major,
        job,
        call,
        income,
        portfolio,
        academic,
        intro,
        skill,
        reason,
        other,
      },
    });
  }, [
    field,
    major,
    job,
    call,
    income,
    portfolio,
    academic,
    intro,
    skill,
    reason,
    other,
  ]);

  return (
    <IndexLayout>
      <Form style={{ padding: 10 }} onFinish={onSubmit}>
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
            <label htmlFor="user-income">희망연봉</label>
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
            <label htmlFor="user-intro">한줄 자기소개</label>
            <hr />
            <Input
              name="user-intro"
              value={intro}
              onChange={onChangeintro}
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
          <Button type="primary" htmlType="submit" loading={introWriteLoading}>
            저장하기
          </Button>
        </Row>
      </Form>
    </IndexLayout>
  );
};

export default Intro;
