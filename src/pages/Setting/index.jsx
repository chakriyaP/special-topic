import React from 'react'
import { Typography, Form, Input, Button, Card } from 'antd';

const { Title } = Typography;

const index = () => {
    return (
        <div>
            <Title>ตั้งค่า Wifi</Title>
            <Card title="ตั้งค่า Wifi" bordered={false}>
                <Form
                    layout="vertical"
                >
                    <Form.Item
                        label="ชื่อ Wifi"
                    >
                        <Input placeholder="ชื่อ Wifi" />
                    </Form.Item>
                    <Form.Item
                        label="รหัสผ่าน"
                    >
                        <Input placeholder="รหัสผ่าน" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary">บันทึก</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default index