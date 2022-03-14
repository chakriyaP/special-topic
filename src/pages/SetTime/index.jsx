import React from 'react'
import { Typography, Form, Input, Button, Card, Checkbox, DatePicker, TimePicker } from 'antd';


const { Title } = Typography;

const index = () => {
    const options = [
        { label: 'รีเลย์ 1', value: 'relay1' },
        { label: 'รีเลย์ 2', value: 'relay2' },
        { label: 'รีเลย์ 3', value: 'relay3' },
        { label: 'รีเลย์ 4', value: 'relay4' },
    ];
    const format = 'HH:mm';
    return (
        <div>
            <Title>เพิ่มการตั้งค่าเวลา</Title>
            <Card title="เพิ่มการตั้งค่าเวลา" bordered={false}>
                <Form layout="vertical">
                    <Form.Item
                        label="วัน"
                    >
                        <DatePicker />
                    </Form.Item>

                    <Form.Item
                        label="เวลา"
                    >
                        <TimePicker format={format} />
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