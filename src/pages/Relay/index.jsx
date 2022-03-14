import React, { useState } from "react";
import { Switch } from "antd";
import { Row, Col } from "antd";
import { Card } from "antd";
import { BulbOutlined, BulbFilled } from "@ant-design/icons";

const Relay = (props) => {
  const [toggle, setToggle] = useState(false);

  const [on, setOn] = useState("ON");

  function onChange(checked) {
    setToggle(!checked);
    if (toggle) {
      setOn("ON");
    } else {
      setOn("OFF");
    }
  }
  return (
    <div>
      <Col className="gutter-row" span={4}>
        <div className="site-card-border-less-wrapper">
          <Card title={props.name} bordered={false} style={{ width: 250 }}>
            <Row justify="space-around" align="middle">
              <Col>
                <Switch defaultChecked onChange={onChange} />
              </Col>
            </Row>
            <Row justify="space-around" align="middle">
              <Col>
                {toggle ? (
                  <BulbOutlined
                    style={{ fontSize: "70px", color: "#08c", margin: 20 }}
                  />
                ) : (
                  <BulbFilled
                    style={{ fontSize: "70px", color: "#08c", margin: 20 }}
                  />
                )}
              </Col>
            </Row>
            <Row justify="space-around" align="middle">
              <Col>
                <b>{on}</b>
              </Col>
            </Row>
          </Card>
        </div>
      </Col>
    </div>
  );
};
const Index = () => {
  return (
    <Row gutter={24}>
      <Relay name="รีเลย์1" />
      <Relay name="รีเลย์2" />
      <Relay name="รีเลย์3" />
      <Relay name="รีเลย์4" />
    </Row>
  );
};

export default Index;
