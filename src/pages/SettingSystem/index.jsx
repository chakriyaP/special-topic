import React from 'react'
import { Typography, Form, Input, Button, Card } from 'antd';


const { Title } = Typography;

const index = () => {
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
                        <Input placeholder="ชนิดของพืช" />
                    </Form.Item>
                    <Form.Item
                        label="หมายเลขบอร์ด"
                    >
                        <Input placeholder="หมายเลขที่อ่านได้จากอุปกรณ์" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary">บันทึก</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}

export default index