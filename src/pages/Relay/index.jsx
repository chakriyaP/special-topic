import React, { useState } from "react";
import { Switch } from "antd";
import { Row, Col, Typography, Radio } from "antd";
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
  const [status, setStatus] = React.useState("manual");

  const getRelaysStorage = React.useCallback(async () => {
    const res = await axios.get(`${dockerUrl}/relays?boardId=${boardId}`);
    setData(res.data);
  }, []);

  React.useEffect(() => {
    getRelaysStorage();
  }, [getRelaysStorage]);



  const optionsWithDisabled = [
    { label: 'Manual', value: 'manual' },
    { label: 'Auto', value: 'auto' },
  ];

  const onChangeStatus = (e) => {
    setStatus(e.target.value);
  }

  return (
    <div>
      <Row gutter={24}>
        <Col span={24}>
          <Row justify="space-between" align="middle">
            <Title>จัดการรีเลย์</Title>
            <Radio.Group
              options={optionsWithDisabled}
              onChange={onChangeStatus}
              value={status}
              optionType="button"
              buttonStyle="solid"
            />
          </Row>
        </Col>

      </Row>

      <Row gutter={[16, 24]}>
        {data &&
          Object.keys(data["relays"]).map((item, key) => {
            return <Relay name={item.replace(item.charAt(0), item.charAt(0).toUpperCase())} toggleDefault={data["relays"][key]} />;
          })}
      </Row>
    </div>
  );
};

export default Index;
