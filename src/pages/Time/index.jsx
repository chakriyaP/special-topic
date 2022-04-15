import React, { useState, useEffect } from "react";
import { Table, Typography, Button, Row, Col, Space } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

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
  },

];


const Index = () => {
  const [data, setDatas] = useState([]);

  useEffect(async () => {
    const response = await axios.get(`${baseUrl}/settings?boardId=${boardId}&type=time`)
      .then((response) => {
        setDatas(response.data)
      })
  }, [])

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
            rowKey={obj => obj.id}
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
