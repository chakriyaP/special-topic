import React, { useState } from "react";
import { Typography, Form, Input, Button, Card, Checkbox } from 'antd';
import { Link } from "react-router-dom";



const { Title } = Typography;
const baseUrl = "https://asia-southeast1-kku-smart-farm.cloudfunctions.net/api"
const boardId = "123"

const Index = () => {
    const options = [
        { label: 'รีเลย์ 1', value: '1' },
        { label: 'รีเลย์ 2', value: '2' },
        { label: 'รีเลย์ 3', value: '3' },
        { label: 'รีเลย์ 4', value: '4' },

    ];
    const [temperature, setTemperature] = useState("")
    const [executeTime, setExecuteTime] = useState("")
    const [relays, setRelays] = useState("")

    const datas = { boardId: boardId, temperature: temperature, executeTime: executeTime, relays: relays }

    const handleSubmit = async (e) => {

        await fetch(`${baseUrl}/settings/temperature`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datas),

        })

    }



    return (
        <div>
            <Title>เพิ่มการตั้งค่าอุณหภูมิ</Title>
            <Card title="เพิ่มการตั้งค่าอุณหภูมิ" bordered={false} >
                <Form layout="vertical">
                    <Form.Item
                        label="อุณหภูมิ (°C)"
                    >
                        <Input placeholder="อุณหภูมิ (°C)" type={'number'}
                            onChange={(e) => {
                                setTemperature(e.target.value);
                            }} />
                    </Form.Item>
                    <Form.Item
                        label="ทำงาน (นาที)"
                    >
                        <Input placeholder="ระยะเวลาในการทำงาน" type={'number'}
                            onChange={(e) => {
                                setExecuteTime(e.target.value);
                            }} />
                    </Form.Item>
                    <Form.Item
                        label="รีเลย์"
                    >
                        <Checkbox.Group
                            options={options}
                            onChange={(checkedValues) => {
                                setRelays(checkedValues);
                                // console.log('checked = ', checkedValues);
                            }}
                        />
                    </Form.Item>
                    <Form.Item>
                        {/* <Link to=""> */}
                            <Button type="primary" onClick={handleSubmit} >บันทึก </Button>
                        {/* </Link> */}
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Index