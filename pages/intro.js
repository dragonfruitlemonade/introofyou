import React from "react";
import { useCallback } from "react";
import { Form, Input, Button, Checkbox, Select, Row, Col, DatePicker } from "antd";

const { Option } = Select;
import IndexLayout from "../components/IndexLayout";


const Intro = () => {
  const onChange = (date, dateString) => {
    console.log(dateString);
  };

  return (
    <IndexLayout>
      <Form style={{ padding: 10 }}>
        <Row>
          <Col span={11}>
            <div>
              <label htmlFor="user-sex">성별</label>
              <hr />
              <Input.Group>
                <Select defaultValue="선택하기">
                  <Option>남</Option>
                  <Option>여</Option>
                </Select>
              </Input.Group>
            </div>
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
            출생년도
            <hr />
            <DatePicker onChange={onChange} />
          </Col>
          <Col span={24}><br/></Col>
          <Col span={24}>
            이메일
            <hr />
            tpghks9245@gmail.com
          </Col>
        </Row>
      </Form>
    </IndexLayout>
  );
};

export default Intro;
