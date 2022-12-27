import React from "react";
import { useCallback } from "react";
import { Form, Input, Button, Checkbox, Select } from "antd";

const { Option } = Select;
import IndexLayout from "../components/IndexLayout";


const Intro = () => {
  return (
    <IndexLayout>
      <Form style={{ padding: 10 }}>
        <div>
          <label htmlFor="user-sex">성별</label>
          <br />
          <Input.Group>
            <Select defaultValue="선택하기">
              <Option>남</Option>
              <Option>여</Option>
            </Select>
          </Input.Group>
        </div>
       
      </Form>
    </IndexLayout>
  );
};

export default Intro;
