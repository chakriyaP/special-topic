import React, { useState } from "react";
import { Typography, Form, Input, Button, Card } from 'antd';
import axios from "axios";
import { dockerUrl } from "../../util/helper"
import Swal from 'sweetalert2'

const { Title } = Typography;

const Index = () => {
    const [data, setData] = React.useState({})

    const handleSubmit = async (e) => {
        await axios.post(`${dockerUrl}/boards`, data)
        Swal.fire({
            icon: 'success',
            title: 'บันทึกการตั้งค่าระบบสำเร็จ',
            showConfirmButton: false,
            timer: 1500
        })
        setData({})
    }

    return (
        <div>
            <Title>ตั้งค่าระบบ</Title>
            <Card title="ตั้งค่าระบบ" bordered={false}>
                <Form
                    layout="vertical"
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        label="ชนิดของพืช"
                    >
                        <Input placeholder="ชนิดของพืช"
                            value={data.plantType}
                            onChange={(e) => {
                                setData({ ...data, plantType: e.target.value })

                            }} />
                    </Form.Item>
                    <Form.Item
                        label="หมายเลขบอร์ด"
                    >
                        <Input placeholder="หมายเลขที่อ่านได้จากอุปกรณ์"
                            value={data.boardId}
                            onChange={(e) => {

                                setData({ ...data, boardId: e.target.value })
                            }} />
                    </Form.Item>
                    <Form.Item
                        label="ชื่อบอร์ด"
                    >
                        <Input placeholder="ชื่อของอุปกรณ์"
                            value={data.boardName}
                            onChange={(e) => {
                                setData({ ...data, boardName: e.target.value })
                            }} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" >บันทึก</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}

export default Index