import React from 'react'
import { Typography, Form, Input, Button, Card, DatePicker, TimePicker, Tabs } from 'antd';
import axios from "axios";
import { dockerUrl } from "../../util/helper"
import Swal from 'sweetalert2'




const Test = () => {
    const [data, setData] = React.useState({})
    const format = 'HH:mm';

    const handleSubmit = async (e) => {
        //TODO Fetch API POST 
        Swal.fire({
            icon: 'success',
            title: 'ทำการจำลองการเปลี่ยนค่าสำเร็จ',
            showConfirmButton: false,
            timer: 1500
        })
        setData({})
    }

    function callback(key) {
        console.log(key);
    }
    return (
        <div>
            <Typography.Title>ทดสอบระบบ</Typography.Title>

            <Card title="ทดสอบระบบเปลี่ยนค่าเพื่อจำลองการทำงานเปิด-ปิด Relay" bordered={false}>
                <Tabs onChange={callback} >
                    <Tabs.TabPane tab="Set อุณหภูมิ" key="1">
                        <Form
                            layout="vertical"
                            onFinish={handleSubmit}
                        >
                            <Form.Item
                                label="อุณหภูมิ"
                            >
                                <Input placeholder="อุณหภูมิ"
                                    value={data.temperature}
                                    onChange={(e) => {
                                        setData({ ...data, temperature: e.target.value })
                                    }}
                                    type={Number} />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" >บันทึก</Button>
                            </Form.Item>
                        </Form>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Set วันเวลา" key="2">
                        <Form
                            layout="vertical"
                            onFinish={handleSubmit}
                        >
                            <Form.Item
                                label="วัน"
                            >
                                <DatePicker
                                    onChange={(date, dateString) => {
                                        setData({ ...data, date: dateString })
                                    }} />
                            </Form.Item>
                            <Form.Item
                                label="เวลา"
                            >
                                <TimePicker format={format}
                                    value={data.time}
                                    onChange={(time, timeString) => {
                                        setData({ ...data, date: time })
                                    }} />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" >บันทึก</Button>
                            </Form.Item>
                        </Form>
                    </Tabs.TabPane>
                </Tabs>
            </Card>
        </div>
    )
}

export default Test