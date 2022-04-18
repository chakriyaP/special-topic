import React, { useState, useEffect } from "react";
import { Table, Typography, Button, Row, Col, Modal } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { dockerUrl, boardId } from "../../util/helper"
import { DeleteOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2'



const { Title } = Typography;


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
      dataIndex: "delete",
      render: (_, record) => (
        <DeleteOutlined onClick={(e) => deleteTemperature(record.id)} />
      ),
    },
  ];

  const [datas, setDatas] = useState([]);

  React.useEffect(() => {
    getTemperature()
  }, [])

  const getTemperature = async () => {
    const res = await axios.get(`${dockerUrl}/settings?boardId=${boardId}&type=temperature`)
    setDatas(res.data)
  }

  const deleteTemperature = async (id) => {
    //TO DO Fetch API DELETE
    await axios.delete(`${dockerUrl}/settings?schedualId=${id}`)
    Swal.fire({
      icon: 'success',
      title: 'ลบการตั้งค่าอุณหภูมิเรียบร้อย',
      showConfirmButton: false,
      timer: 1500
    })
    getTemperature()

  }

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
            rowKey={datas => datas.id}
            size="large"
            pagination={{ pageSize: 10 }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Index;
