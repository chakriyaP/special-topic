import React, { useState, useEffect } from "react";
import { Table, Typography, Button, Row, Col, Modal } from "antd";
import { Link } from "react-router-dom";

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
      key: 'delete',
      render: () => {
        return (
          <>
            <a onClick={onDelete}>ลบ</a>
          </>
        )
      }
    },

  ];

  const [datas, setDatas] = useState([]);
  // console.log(data.id);

  const onDelete = () => {
    Modal.confirm({
      title: "คุณยืนยันที่จะลบการตั้งค่าอุณหภูมิหรือไม่",
      onOk: () => {
        // onHandleDelete()
      }
    })
  }

  // const onHandleDelete = async (e) => {
  //   await fetch(`${baseUrl}/settings?schedualId=${datas.id}&type=temperature`, {
  //     method: 'DELETE',
  //   })
  //     .then(res => {
  //       res.json().then(data => {
  //         console.log(data);
  //       })
  //     })
  // }

  useEffect(async () => {
    await fetch(`${baseUrl}/settings?boardId=${boardId}&type=temperature`, {
    })
      .then(res => {
        res.json().then(data => {
          setDatas(data)
        })
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
            size="large"
            pagination={{ pageSize: 5 }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Index;
