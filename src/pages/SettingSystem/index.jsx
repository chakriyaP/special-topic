import React, { useState } from "react";
import { Typography, Form, Input, Button, Card } from 'antd';
import axios from "axios";

const { Title } = Typography;

const baseUrl = "https://asia-southeast1-kku-smart-farm.cloudfunctions.net/api"

const Index = () => {
    const [boardName, setฺBoardName] = useState("")
    const [plantType, setPlantType] = useState("")
    const [boardId, setBoardId] = useState("")
    const datas = { boardId: boardId, boardName: boardName, plantType: plantType }
    const handleSubmit = async (e) => {
        const response = await axios.post(`${baseUrl}/boards`, datas)
    }
    return (
        <div>
            <Title>ตั้งค่าระบบ</Title>
            <Card title="ตั้งค่าระบบ" bordered={false}>
                <Form
                    layout="vertical"
                >
                    <Form.Item
                        label="ชนิดของพืช"
                    >
                        <Input placeholder="ชนิดของพืช"
                            onChange={(e) => {
                                setPlantType(e.target.value);
                            }} />
                    </Form.Item>
                    <Form.Item
                        label="หมายเลขบอร์ด"
                    >
                        <Input placeholder="หมายเลขที่อ่านได้จากอุปกรณ์"
                            onChange={(e) => {
                                setBoardId(e.target.value);
                            }} />
                    </Form.Item>
                    <Form.Item
                        label="ชื่อบอร์ด"
                    >
                        <Input placeholder="ชื่อของอุปกรณ์"
                            onChange={(e) => {
                                setฺBoardName(e.target.value);
                            }} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={handleSubmit}>บันทึก</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}

export default Index