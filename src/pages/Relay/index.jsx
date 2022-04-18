import React, { useState } from "react";
import { Switch } from "antd";
import { Row, Col, Typography } from "antd";
import { Card } from "antd";
import axios from "axios";
import { BulbOutlined, BulbFilled } from "@ant-design/icons";
import { dockerUrl, boardId } from "../../util/helper";

const { Title } = Typography;
const Relay = (props) => {
  const [toggle, setToggle] = useState(props.toggleDefault);
  function onChange(checked) {
    setToggle(checked);
  }
  return (
    <div>
      <Col className="gutter-row" span={4}>
        <div className="site-card-border-less-wrapper">
          <Card title={props.name} bordered={false} style={{ width: 250 }}>
            <Row justify="space-around" align="middle">
              <Col>
                <Switch defaultChecked={toggle} onChange={onChange} />
              </Col>
            </Row>
            <Row justify="space-around" align="middle">
              <Col>
                {toggle ? (
                  <BulbFilled
                    style={{ fontSize: "70px", color: "#08c", margin: 20 }}
                  />
                ) : (
                  <BulbOutlined
                    style={{ fontSize: "70px", color: "#08c", margin: 20 }}
                  />
                )}
              </Col>
            </Row>
            <Row justify="space-around" align="middle">
              <Col>{toggle ? "ON" : "OFF"}</Col>
            </Row>
          </Card>
        </div>
      </Col>
    </div>
  );
};
const Index = () => {
  const [data, setData] = React.useState();

  const getRelaysStorage = React.useCallback(async () => {
    const res = await axios.get(`${dockerUrl}/relays?boardId=${boardId}`);

    setData(res.data);
  }, []);

  React.useEffect(() => {
    getRelaysStorage();
  }, [getRelaysStorage]);

  React.useEffect(() => {}, [data]);
  return (
    <div>
      <Row gutter={24}>
        <Col>
          <Title>จัดการรีเลย์</Title>
          <Switch />
        </Col>
      </Row>

      <Row gutter={24}>
        {data &&
          Object.keys(data["relays"]).map((item, key) => {
            return <Relay name={item} toggleDefault={data["relays"][key]} />;
          })}
      </Row>
    </div>
  );
};

export default Index;
