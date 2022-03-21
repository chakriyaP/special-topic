import React, { useState, useEffect } from "react";
import { Table, Typography, Button, Row, Col, Space } from "antd";
import { Link } from "react-router-dom";


const { Title } = Typography;

const baseUrl = "https://asia-southeast1-kku-smart-farm.cloudfunctions.net/api"
const boardId = "123"

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
    dataIndex: "executeTime",
  },
  {
    title: "หมายเลขรีเลย์",
    dataIndex: "relays",
  },
  {
    title: 'ลบการตั้งค่า',
    key: 'delete',
    render: (text, record) => (
      <Space size="middle">
        <a>ลบ</a>
      </Space>
    ),
  },

];


const Index = () => {
  const [data, setData] = useState([]);

  useEffect(async () => {
    await fetch(`${baseUrl}/settings?boardId=${boardId}&type=time`, {
    }).then(res => {
      res.json().then(data => {
        setData(data)
        console.log(data);
      })
    })
  },[])

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

export default Index;
