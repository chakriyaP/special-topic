import React, { useState } from "react";
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import { Layout, Menu, Row, Image } from 'antd';
import {
  PieChartOutlined,
  SettingOutlined,
  DotChartOutlined,
} from '@ant-design/icons';


import Dashboard from "../src/pages/Dashboard"
import Relay from '../src/pages/Relay'
import Temperature from '../src/pages/Temperature'
import Time from '../src/pages/Time'
import Setting from '../src/pages/Setting'
import logo from "../src/assets/images/logo.png"
import SettingSystem from "../src/pages/SettingSystem"

const { Header, Content, Footer, Sider, } = Layout;
const { SubMenu } = Menu;

function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={() => { setCollapsed(!collapsed) }}>

          <Row justify="center" align="center">
            <Image
              width={100}
              src={logo}
            />
          </Row>
          <div className="logo"> </div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              <Link to="/dashboard">
                แดชบอร์ด
              </Link>
            </Menu.Item>
            <SubMenu key="sub2" icon={<DotChartOutlined />} title="จัดการรีเลย์">
              <Menu.Item key="3">
                <Link to="/relay">
                  รีเลย์
                </Link>
              </Menu.Item>
              <Menu.Item key="4"> <Link to="/relay/time">
                ตั้งค่าเวลา
              </Link></Menu.Item>
              <Menu.Item key="5"> <Link to="/relay/temperature">
                ตั้งค่าอุณหภูมิ
              </Link></Menu.Item>
            </SubMenu>

            <SubMenu key="sub3" icon={<SettingOutlined />} title="ตั้งค่า">
              <Menu.Item key="10"> <Link to="/setting/system">
                ตั้งค่าระบบ
              </Link>
              </Menu.Item>
              <Menu.Item key="9">
                <Link to="/setting">
                  ตั้งค่า Wifi
                </Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/relay" element={<Relay />} />
                <Route path="/relay/time" element={<Time />} />
                <Route path="/relay/temperature" element={<Temperature />} />
                <Route path="/setting" element={<Setting />} />
                <Route path="/setting/system" element={<SettingSystem />} />
              </Routes>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>KKU Smart Farm ©2022 Created by La ok Mai Nueai Chang</Footer>
        </Layout>
      </Layout>
    </Router>
  );
}



export default App;