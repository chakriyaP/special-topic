import React, { useState, useEffect } from "react";
import { Table, Typography, Button, Row, Col, Space } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { dockerUrl, boardId } from "../../util/helper"
import { DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Index = () => {
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
      dataIndex: "delete",
      render: (_, record) => (
        <DeleteOutlined onClick={deleteTime} />
      ),
    },

  ];
  const [data, setDatas] = useState([]);

  React.useEffect(() => {
    getAllTime()
  }, [])

  const getAllTime = async () => {
    const res = await axios.get(`${dockerUrl}/settings?boardId=${boardId}`)
    setDatas(res.data)
  }


  const deleteTime = async () => {
    //TO DO Fetch API DELETE
  }

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
