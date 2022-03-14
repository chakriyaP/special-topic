import React from 'react'
import { Typography, Form, Input, Button, Card, Checkbox } from 'antd';


const { Title } = Typography;

const index = () => {
    const options = [
        { label: 'รีเลย์ 1', value: 'relay1' },
        { label: 'รีเลย์ 2', value: 'relay2' },
        { label: 'รีเลย์ 3', value: 'relay3' },
        { label: 'รีเลย์ 4', value: 'relay4' },

    ];

    return (
        <div>
            <Title>เพิ่มการตั้งค่าอุณหภูมิ</Title>
            <Card title="เพิ่มการตั้งค่าอุณหภูมิ" bordered={false}>
                <Form layout="vertical">
                    <Form.Item
                        label="อุณหภูมิ (°C)"
                    >
                        <Input placeholder="อุณหภูมิ (°C)" type={'number'} />
                    </Form.Item>
                    <Form.Item
                        label="ทำงาน (นาที)"
                    >
                        <Input placeholder="ระยะเวลาในการทำงาน" type={'number'} />
                    </Form.Item>
                    <Form.Item
                        label="รีเลย์"
                    >
                        <Checkbox.Group
                            options={options}
                        />
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