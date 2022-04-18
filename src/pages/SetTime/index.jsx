import React, { useState } from "react";
import { Typography, Form, Input, Button, Card, Checkbox, DatePicker, TimePicker } from 'antd';
import { Link } from "react-router-dom";
import axios from "axios";
import { dockerUrl, boardId } from "../../util/helper"
import Swal from 'sweetalert2'






const Index = () => {
    const options = [
        { label: 'รีเลย์ 1', value: '1' },
        { label: 'รีเลย์ 2', value: '2' },
        { label: 'รีเลย์ 3', value: '3' },
        { label: 'รีเลย์ 4', value: '4' },
    ];
    const format = 'HH:mm';
    // const [time, setTime] = useState("")
    // const [date, setDate] = useState("")
    // const [executeTime, setExecuteTime] = useState("")
    // const [relays, setRelays] = useState("")
    const [data, setData] = React.useState({ boardId: boardId })

    // const datas = { boardId: boardId, time: time, date: date, executeTime: executeTime, relays: relays }
    const handleSubmit = async (e) => {
        await axios.post(`${dockerUrl}/settings/time`, data)
        Swal.fire({
            icon: 'success',
            title: 'เพิ่มการตั้งค่าเวลาสำเร็จ',
            showConfirmButton: false,
            timer: 1500
        })
        setData({})
    }
    React.useEffect(() => {
        console.log("data", data);
    }, [data])

    return (
        <div>
            <Typography.Title>เพิ่มการตั้งค่าเวลา</Typography.Title>
            <Card title="เพิ่มการตั้งค่าเวลา" bordered={false}>
                <Form layout="vertical" onFinish={handleSubmit}>
                    <Form.Item
                        label="วัน"
                    >
                        <DatePicker
                            value={data.date}
                            onChange={(date, dateString) => {
                                setData({ ...data, date: dateString })
                                console.log("dateString", dateString);
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
                            onChange={(relays) => {
                                setData({ ...data, relays: relays })
                            }}
                        />
                    </Form.Item>
                    <Form.Item>
                        {/* <Link to="/relay/time"> */}
                        <Button type="primary" htmlType="submit" >บันทึก</Button>
                        {/* </Link > */}
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Index