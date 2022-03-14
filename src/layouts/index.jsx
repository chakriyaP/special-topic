import React from 'react'
import { Layout, Menu } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Route, Routes, Link } from 'react-router-dom'
import Dashboard from '../../src/pages/Dashboard/index'

const { Header, Content, Footer, Sider } = Layout;


const Layouts = () => {
  // const { SubMenu } = Menu;
  // const handleClick = e => {
  //   console.log('click ', e);
  //   this.setState({ current: e.key });
  // };
  const Home = () => <h1>Home lo</h1>
  const About = () => <h1>About</h1>
  const Post = () => <h1>Post</h1>
  const Project = () => <h1>Project</h1>

  return (
    <Layout style={{ "height": "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={broken => {
          console.log(broken);
        }}
      // onCollapse={(collapsed, type) => {
      //   console.log(collapsed, type);
      // }}
      >

        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
          {/* <Link to="/about"> */}
          <Menu.Item key="1" icon={<UserOutlined />}>
            hhhh
          </Menu.Item>
          {/* </Link> */}

          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            nav 2
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            nav 3
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
            nav 4
          </Menu.Item>
          <a href="/post" className="navbar-item">
            Posts
          </a>

        </Menu>
      </Sider>

      <Layout>
        <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
        <Content style={{ margin: '24px 16px 0' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            jjjjj content
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
}




export default Layouts