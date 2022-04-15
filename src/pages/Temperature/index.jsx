import React, { useState, useEffect } from "react";
import { Table, Typography, Button, Row, Col, Modal } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

const { Title } = Typography;
const baseUrl = "https://asia-southeast1-kku-smart-farm.cloudfunctions.net/api"
const boardId = "123"

const Index = (props) => {
  const columns = [
    {
      title: "อุณหภูมิ (°C)",
      dataIndex: "temperature",
    },
    {
      title: "ทำงาน (นาที)",
      dataIndex: "executeTime",
    },
    {
      title: "รีเลย์",
      dataIndex: "relays",
    },
    {
      title: 'ลบการตั้งค่า',
    },

  ];

  const [datas, setDatas] = useState([]);

  useEffect(async () => {
    const response = await axios.get(`${baseUrl}/settings?boardId=${boardId}&type=temperature`)
      .then((response) => {
        setDatas(response.data)
      })
  }, [])

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
            dataSource={datas}
            rowKey={obj => obj.id}
            size="large"
            pagination={{ pageSize: 5 }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Index;
