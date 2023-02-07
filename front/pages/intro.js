import React from "react";
import { useCallback, useEffect, useState } from "react";
import Router from "next/router"
import { Form, Input, Button, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";
import { END } from "redux-saga";
import axios from "axios";
import wrapper from "../store/configureStore";

import IndexLayout from "../components/IndexLayout";
import useInput from "../hooks/useInput";
import { INTRO_WRITE_REQUEST, LOAD_MY_INTRO_REQUEST } from "../reducers/user";

const Intro = () => {
  const dispatch = useDispatch();
  const { me, myIntro, introWriteLoading, introWriteError } = useSelector((state) => state.user);
  const [field, onChangeField] = useInput(myIntro?.field || "");
  const [major, onChangeMajor] = useInput(myIntro?.major || "");
  const [job, onChangeJob] = useInput(myIntro?.job || "");
  const [call, onChangeCall] = useInput(myIntro?.call || "");
  const [income, onChangeIncome] = useInput(myIntro?.income || "");
  const [portfolio, onChangePortfolio] = useInput(myIntro?.portfolio || "");
  const [academic, onChangeAcademic] = useInput(myIntro?.academic || "");
  const [intro, onChangeintro] = useInput(myIntro?.intro || "");
  const [skill, onChangeSkill] = useInput(myIntro?.skill || "");
  const [reason, onChangeReason] = useInput(myIntro?.reason || "");
  const [other, onChangeOther] = useInput(myIntro?.other || "");
  const [buttonCheck, setbuttonCheck] = useState(false);

  
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
    Router.replace("/intro");
    setbuttonCheck(true);
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
            />
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
            <label htmlFor="user-major">세부전공</label>
            <hr />
            <Input
              value={major}
              name="user-major"
              onChange={onChangeMajor}
            />
          </Col>
          <Col span={24}>
            <br />
          </Col>
          <Col span={11}>
            <label htmlFor="user-job">직업</label>
            <hr />
            <Input name="user-job" value={job} onChange={onChangeJob} />
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
            <label htmlFor="user-call">전화번호</label>
            <hr />
            <Input
              name="user-call"
              value={call}
              onChange={onChangeCall}
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
            />
          </Col>
          <Col span={24}>
            <br />
          </Col>
          <Button type="primary" htmlType="submit" loading={introWriteLoading}>
            저장하기
          </Button>
          <div>
            {buttonCheck && (
              <div style={{ color: "green" }}>저장 되었습니다.</div>
            )}
          </div>
        </Row>
      </Form>
    </IndexLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    axios.defaults.headers.Cookie = cookie;
    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch({
      type: LOAD_MY_INTRO_REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default Intro;
