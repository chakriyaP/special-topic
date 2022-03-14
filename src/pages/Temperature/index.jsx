import React from "react";
import { Divider } from "antd";
import { Table} from "antd";

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
      <Divider orientation="left">ตั้งค่าอุณหภูมิ</Divider>
      <Table
        columns={columns}
        dataSource={data}
        size="large"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default index;
