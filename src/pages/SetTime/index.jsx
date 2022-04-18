import React, { useState } from "react";
import {
  Typography,
  Form,
  Button,
  Card,
  Checkbox,
  DatePicker,
  Space,
} from "antd";

import axios from "axios";
import { dockerUrl, boardId } from "../../util/helper";
import Swal from "sweetalert2";

const Index = () => {
  const options = [
    { label: 'panda', value: 'panda' },
    { label: 'puppy', value: 'puppy' },
    { label: 'kitten', value: 'kitten' },
    { label: 'bunny', value: 'bunny' },
  ];

  const [data, setData] = React.useState({ boardId: boardId });
  const { RangePicker } = DatePicker;
  // const datas = { boardId: boardId, time: time, date: date, executeTime: executeTime, relays: relays }
  const handleSubmit = async (e) => {
    await axios.post(`${dockerUrl}/settings/time`, data);
    Swal.fire({
      icon: "success",
      title: "เพิ่มการตั้งค่าเวลาสำเร็จ",
      showConfirmButton: false,
      timer: 1500,
    });
    setData({});
  };
  React.useEffect(() => {
    console.log("data", data);
  }, [data]);

  const onChange = (time) => {
    const startTime = +time[0];
    const endTime = +time[1];
    setData({ ...data, startTime, endTime });
  };

  return (
    <div>
      <Typography.Title>เพิ่มการตั้งค่าเวลา</Typography.Title>
      <Card title="เพิ่มการตั้งค่าเวลา" bordered={false}>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="วันเริ่ม/สิ้นสุดของการทำงาน">
            <Space direction="vertical" size={12}>
              <RangePicker
                showTime={{ format: "HH:mm" }}
                format="YYYY-MM-DD HH:mm"
                onChange={onChange}
              />
            </Space>
          </Form.Item>

          <Form.Item label="รีเลย์">
            <Checkbox.Group
              options={options}
              value={data.relays}
              onChange={(relays) => {
                setData({ ...data, relays: relays });
              }}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              บันทึก
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Index;
