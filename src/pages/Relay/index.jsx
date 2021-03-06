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
    props.onSelect(checked);
  }

  return (
    <div>
      <Col className="gutter-row" span={4}>
        <div className="site-card-border-less-wrapper">
          <Card title={props.name} bordered={false} style={{ width: 250 }}>
            <Row justify="space-around" align="middle">
              <Col>
                {props.status === "auto" ? (
                  <Switch
                    defaultChecked={toggle}

                    disabled
                  />
                ) : (
                  <Switch defaultChecked={toggle} onChange={onChange} />
                )}
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
  const [status, setStatus] = React.useState("auto");
  const [relays, setRelays] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const getRelaysStorage = React.useCallback(async () => {
    const res = await axios.get(`${dockerUrl}/relays?boardId=${boardId}`);
    setData(res.data);
    setStatus(res.data["status"]);
    setRelays(res.data["relays"])
  }, []);

  React.useEffect(() => {
    getRelaysStorage();
  }, [getRelaysStorage]);

  React.useEffect(() => {
    onUpdateRelay()

  }, [relays, status]);

  const onUpdateRelay = async () => {
    const data = {
      boardId: boardId,
      status: status,
      relays: { ...relays }

    }
    if (status === "auto") delete data?.relays



    await axios.patch(
      `${dockerUrl}/relays`, {
      ...data
    });
  }

  const options = [
    { label: "Manual", value: "manual" },
    { label: "Auto", value: "auto" },
  ];

  const onChangeStatus = (e) => {

    setStatus(e.target.value);

  };

  return (
    <div>
      <Row gutter={24}>
        <Col span={24}>
          <Row justify="space-between" align="middle">
            <Title>????????????????????????????????????</Title>
            <Radio.Group
              options={options}
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
            return (
              <Relay
                status={status}
                name={item.replace(
                  item.charAt(0),
                  item.charAt(0).toUpperCase()
                )}
                toggleDefault={data["relays"][item] === "on" ? true : false}
                onSelect={(e) => {
                  setRelays({ ...relays, [item]: e ? "on" : "off" });
                  onUpdateRelay();

                }}
              />
            );
          })}
      </Row>
    </div>
  );
};

export default Index;
