import React from "react";
import { Table, Typography, Button, Row, Col } from "antd";
import { Link } from "react-router-dom";


const { Title } = Typography;


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
      <Title>ตั้งค่าเวลา</Title>
      <Row gutter={[16, 8]} justify={'end'}>
        <Col >
          <Button>
            <Link to="/relay/Settime">
              เพิ่มการตั้งค่าเวลา
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
