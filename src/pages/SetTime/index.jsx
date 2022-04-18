import React, { useState } from "react";
import {
  Typography,
  Form,
  Input,
  Button,
  Card,
  Checkbox,
  DatePicker,
  TimePicker,
} from "antd";
import moment from "moment";
import { Link } from "react-router-dom";
import axios from "axios";
import { dockerUrl, boardId } from "../../util/helper";
import Swal from "sweetalert2";

const Index = () => {
  const options = [
    { label: "รีเลย์ 1", value: "relay1" },
    { label: "รีเลย์ 2", value: "relay2" },
    { label: "รีเลย์ 3", value: "relay3" },
    { label: "รีเลย์ 4", value: "relay4" },
  ];

  const [data, setData] = React.useState({ boardId: boardId });

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

  const dateSelected = (date) => {
    const dateData = date.format("DD/MM/YYYY");
    const arrayDate = dateData.split("/");
    arrayDate[2] = parseInt(arrayDate[2]) + 543;
    const newDate = arrayDate.join("/");
    setData({ ...data, date: newDate });
  };

  const timeSelected = (time) => {
    const timeData = time.format("HH:mm");
    setData({ ...data, time: timeData });
  };

  const executeTimeSelected = (e) => {
    const excuteTime = parseInt(e.target.value);
    setData({ ...data, executeTime: excuteTime });
  };
  return (
    <div>
      <Typography.Title>เพิ่มการตั้งค่าเวลา</Typography.Title>
      <Card title="เพิ่มการตั้งค่าเวลา" bordered={false}>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="วัน">
            <DatePicker onChange={dateSelected} />
          </Form.Item>

          <Form.Item label="เวลา">
            <TimePicker onChange={timeSelected} />
          </Form.Item>
          <Form.Item label="ทำงาน (นาที)">
            <Input
              placeholder="ระยะเวลาในการทำงาน"
              type={"number"}
              defaultValue={0}
              value={data.executeTime}
              onChange={executeTimeSelected}
            />
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
            {/* <Link to="/relay/time"> */}
            <Button type="primary" htmlType="submit">
              บันทึก
            </Button>
            {/* </Link > */}
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Index;
