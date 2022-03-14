import React from "react";
import { Table, Typography, Button, Row, Col } from "antd";
import { Link } from "react-router-dom";



const { Title } = Typography;

const columns = [
  {
    title: "อุณหภูมิ (°C)",
    dataIndex: "temperature",
  },
  {
    title: "ทำงาน (นาที)",
    dataIndex: "work",
  },
  {
    title: "รีเลย์",
    dataIndex: "relay",
  },
];
const data = [
  {
    key: "1",
    temperature: 35,
    work: 10,
    relay: 1,
  },
  {
    key: "2",
    temperature: 35,
    work: 10,
    relay: 1,
  },
  {
    key: "3",
    temperature: 35,
    work: 10,
    relay: 1,
  },
  {
    key: "4",
    temperature: 35,
    work: 10,
    relay: 1,
  },
  {
    key: "5",
    temperature: 35,
    work: 10,
    relay: 1,
  },
  {
    key: "6",
    temperature: 35,
    work: 10,
    relay: 1,
  },
  {
    key: "7",
    temperature: 35,
    work: 10,
    relay: 1,
  },
];

const index = () => {
  return (
    <div>
      <Title>ตั้งค่าอุณหภูมิ</Title>

      <Row gutter={[16, 8]} justify={'end'}>
        <Col >
          <Button>
            <Link to="/relay/SetTemperature">
              เพิ่มการตั้งค่าอุณหภูมิ
            </Link>
          </Button>
        </Col>

        <Col span={24}>
          <Table
            columns={columns}
            dataSource={data}
            size="large"
            pagination={{ pageSize: 5 }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default index;
