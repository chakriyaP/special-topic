import React from "react";
import {
  Typography,
  Form,
  Input,
  Button,
  Card,
  DatePicker,
  Tabs,
  Space,
} from "antd";
import moment from "moment";
import axios from "axios";
import { dockerUrl, boardId } from "../../util/helper";

import Swal from "sweetalert2";

const Test = () => {
  const [data, setData] = React.useState({ boardId: boardId });

  const handleSubmit = async (e) => {
    await axios.post(`${dockerUrl}/test`, data);

    Swal.fire({
      icon: "success",
      title: "ทำการจำลองการเปลี่ยนค่าสำเร็จ",
      showConfirmButton: false,
      timer: 1500,
    });
    setData({});
  };

  function callback(key) {
    console.log(key);
  }

  const dateSelected = (date) => {
    setData({ ...data, time: +date });
  };

  React.useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div>
      <Typography.Title>ทดสอบระบบ</Typography.Title>

      <Card
        title="ทดสอบระบบเปลี่ยนค่าเพื่อจำลองการทำงานเปิด-ปิด Relay"
        bordered={false}
      >
        <Tabs onChange={callback}>
          <Tabs.TabPane tab="Set อุณหภูมิ" key="1">
            <Form layout="vertical" onFinish={handleSubmit}>
              <Form.Item label="อุณหภูมิ">
                <Input
                  placeholder="อุณหภูมิ"
                  value={data.temperature}
                  onChange={(e) => {
                    setData({ ...data, temperature: e.target.value });
                  }}
                  type={Number}
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  บันทึก
                </Button>
              </Form.Item>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Set วันเวลา" key="2">
            <Form layout="vertical" onFinish={handleSubmit}>
              <Form.Item label="วัน">
                <Space direction="vertical" size={12}>
                  <DatePicker
                    format="YYYY-MM-DD HH:mm"
                    onOk={dateSelected}
                    showTime={{ defaultValue: moment("00:00", "HH:mm") }}
                  />
                </Space>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  บันทึก
                </Button>
              </Form.Item>
            </Form>
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Test;
