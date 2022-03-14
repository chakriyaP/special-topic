import React from 'react'
import { Typography, Card, Col, Row } from 'antd';
import {
    ExperimentOutlined,
    DotChartOutlined, CloudSyncOutlined, CoffeeOutlined
} from '@ant-design/icons';


const { Title } = Typography;

const index = () => {
    // const
    return (
        <div>
            <Title>แดชบอร์ด</Title>
            <Row gutter={[16, 24]}>
                <Col span={24} >
                    <Card title="อุณหภูมิ" bordered={false}>
                        <Row align={"middle"} justify={'center'} >
                            <Col xs={{ span: 0 }} md={{ span: 8 }} lg={{ span: 4 }}>
                                <ExperimentOutlined style={{ fontSize: '80px', color: '#08c' }} />
                            </Col>
                            {/* <Col xs={{ span: 8 }} md={{ span: 0 }} >
                                <ExperimentOutlined style={{ fontSize: '60px', color: '#08c' }} />
                            </Col> */}
                            <Col span={16} >
                                <Title level={2} >27 °C</Title>
                            </Col>

                        </Row>
                    </Card>
                </Col>
                <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                    <Card title="ความชื้นอากาศ" bordered={false}>
                        <Row align={"middle"} justify={'center'} >
                            <Col span={8} >
                                <CoffeeOutlined style={{ fontSize: '80px', color: '#08c' }} />
                            </Col>
                            <Col span={16} >
                                <Title level={2} >0 %</Title>
                                {/* <ExperimentOutlined style={{ fontSize: '80px', color: '#08c' }} /> */}
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                    <Card title="ความชื้นดิน" bordered={false}>
                        <Row align={"middle"} justify={'center'} >
                            <Col span={8} >
                                <DotChartOutlined style={{ fontSize: '80px', color: '#08c' }} />
                            </Col>
                            <Col span={16} >
                                <Title level={2} >0 %</Title>
                                {/* <ExperimentOutlined style={{ fontSize: '80px', color: '#08c' }} /> */}
                            </Col>
                        </Row>

                    </Card>
                </Col>
                <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                    <Card title="ความเร็วลม" bordered={false}>
                        <Row align={"middle"} justify={'center'} >
                            <Col span={8} >
                                <CloudSyncOutlined style={{ fontSize: '80px', color: '#08c' }} />
                            </Col>
                            <Col span={16} >
                                <Title level={2} >0 m/s</Title>
                                {/* <ExperimentOutlined style={{ fontSize: '80px', color: '#08c' }} /> */}
                            </Col>
                        </Row>

                    </Card>
                </Col>
            </Row>
        </div>
    )
}
export default index