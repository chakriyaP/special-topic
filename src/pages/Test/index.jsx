import React from 'react'
import { Typography, Form, Input, Button, Card } from 'antd';
import axios from "axios";
import { dockerUrl } from "../../util/helper"
import Swal from 'sweetalert2'




const Test = () => {
    const [data, setData] = React.useState({})

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
    return (
        <div>
            <Typography.Title>ทดสอบระบบ</Typography.Title>

            <Card title="ทดสอบระบบเปลี่ยนค่าเพื่อจำลองการทำงานเปิด-ปิด Relay" bordered={false}>
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
                    <Form.Item
                        label="ความชื้นอากาศ"
                    >
                        <Input placeholder="ความชื้นอากาศ
"
                            value={data.boardId}
                            disabled />
                    </Form.Item>
                    <Form.Item
                        label="ความชื้นดิน"
                    >
                        <Input placeholder="ความชื้นดิน"
                            disabled />
                    </Form.Item>
                    <Form.Item
                        label="ความเร็วลม"
                    >
                        <Input placeholder="ความเร็วลม"
                            disabled
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" >บันทึก</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Test