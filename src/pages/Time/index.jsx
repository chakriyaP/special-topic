import React from "react";
import { Divider } from "antd";
import { Table, } from "antd";

const columns = [
  {
    title: "วัน",
    dataIndex: "date",
  },
  {
    title: "เวลา",
    dataIndex: "time",
  },
  {
    title: "ทำงาน (นาที)",
    dataIndex: "work",
  },
  {
    title: "หมายเลขรีเลย์",
    dataIndex: "relyNum",
  },
];
const data = [
  {
    key: "1",
    date: "10/02/2565",
    time: "10.00 PM",
    work: "30 นาที",
    relyNum: 1,

  },
  {
    key: "2",
    date: "11/02/2565",
    time: "10.00 PM",
    work: "50 นาที",
    relyNum: 3,

  },
  {
    key: "3",
    date: "11/02/2565",
    time: "09.00 PM",
    work: "2 ชั่วโมง 40 นาที",
    relyNum: 3,

  },
  {
    key: "4",
    date: "11/02/2565",
    time: "12.00 AM",
    work: "10 นาที",
    relyNum: 3,

  },
  
];

const index = () => {
  return (
    <div>
      <Divider orientation="left">ตั้งค่าเวลา</Divider>
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
