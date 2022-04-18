import React, { useState } from "react";
import { Typography, Form, Input, Button, Card, Checkbox } from 'antd';
import { Link } from "react-router-dom";
import axios from "axios";
import { dockerUrl, boardId } from "../../util/helper"
import Swal from 'sweetalert2'

const { Title } = Typography;


const Index = () => {
    const options = [
        { label: 'รีเลย์ 1', value: '1' },
        { label: 'รีเลย์ 2', value: '2' },
        { label: 'รีเลย์ 3', value: '3' },
        { label: 'รีเลย์ 4', value: '4' },

    ];
    const [data, setData] = React.useState({ boardId: boardId })

    const handleSubmit = async (e) => {
        await axios.post(`${dockerUrl}/settings/temperature`, data)
        Swal.fire({
            icon: 'success',
            title: 'เพิ่มการตั้งค่าอุณหภูมิสำเร็จ',
            showConfirmButton: false,
            timer: 1500
        })
        setData({})
    }

    return (
        <div>
            <Title>เพิ่มการตั้งค่าอุณหภูมิ</Title>
            <Card title="เพิ่มการตั้งค่าอุณหภูมิ" bordered={false} >
                <Form layout="vertical"
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        label="อุณหภูมิ (°C)"
                    >
                        <Input placeholder="อุณหภูมิ (°C)" type={'number'}
                            value={data.temperature}

                            onChange={(e) => {
                                setData({ ...data, temperature: e.target.value })
                            }} />
                    </Form.Item>
                    <Form.Item
                        label="ทำงาน (นาที)"
                    >
                        <Input placeholder="ระยะเวลาในการทำงาน" type={'number'}
                            value={data.executeTime}

                            onChange={(e) => {
                                setData({ ...data, executeTime: e.target.value })
                            }} />
                    </Form.Item>
                    <Form.Item
                        label="รีเลย์"
                    >
                        <Checkbox.Group
                            options={options}
                            value={data.relays}
                            selected={data.relays}
                            onChange={(checkedValues) => {
                                setData({ ...data, relays: checkedValues })
                            }}
                        />
                    </Form.Item>
                    <Form.Item>
                        {/* <Link to="/relay/temperature"> */}
                        <Button type="primary" htmlType="submit" >บันทึก </Button>
                        {/* </Link> */}
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Index