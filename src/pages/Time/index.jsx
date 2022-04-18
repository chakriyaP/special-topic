import React, { useState, useEffect } from "react";
import { Table, Typography, Button, Row, Col, Tag } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { dockerUrl, boardId } from "../../util/helper";
import { DeleteOutlined } from "@ant-design/icons";

import Swal from "sweetalert2";

const { Title } = Typography;

const Index = () => {
  const columns = [
    {
      title: "วันเริ่มต้น",
      dataIndex: "startTime",
      render: (_, record) =>
        moment(record.startTime).format("D/MM/YYYY, HH:mm"),
    },
    {
      title: "วันสิ้นสุด",
      dataIndex: "endTime",
      render: (_, record) => moment(record.endTime).format("D/MM/YYYY,HH:mm"),
    },
    {
      title: "รีเลย์",
      dataIndex: "relays",
      render: (_, record) =>
        record.relays.map((relay) => {
          return <Tag color="blue">{relay}</Tag>;
        }),
    },
    {
      title: "ลบการตั้งค่า",
      dataIndex: "delete",
      render: (_, record) => (
        <DeleteOutlined onClick={(e) => deleteTime(record.id)} />
      ),
    },
  ];
  const [data, setData] = useState([]);

  React.useEffect(() => {
    getAllTime();
  }, []);

  const getAllTime = async () => {
    const res = await axios.get(
      `${dockerUrl}/settings?boardId=${boardId}&type=time`
    );
    setData(res.data);
  };

  const deleteTime = async (id) => {
    //TODO Fetch API DELETE
    await axios.delete(`${dockerUrl}/settings?schedualId=${id}`);
    Swal.fire({
      icon: "success",
      title: "ลบการตั้งค่าอุณหภูมิเรียบร้อย",
      showConfirmButton: false,
      timer: 1500,
    });
    getAllTime();
  };

  return (
    <div>
      <Title>ตั้งค่าเวลา</Title>
      <Row gutter={[16, 8]} justify={"end"}>
        <Col>
          <Button>
            <Link to="/relay/Settime">เพิ่มการตั้งค่าเวลา</Link>
          </Button>
        </Col>

        <Col span={24}>
          <Table
            columns={columns}
            rowKey={(obj) => obj.id}
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
