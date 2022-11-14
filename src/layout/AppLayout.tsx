import { Breadcrumb, Layout, Menu } from 'antd';
import React from 'react';
import TableComp from '../components/TableComp';
import DrawerComp from '../components/DrawerComp';
import './appLayout.css';
const { Header, Content, Footer } = Layout;

const AppLayout: React.FC = () => (
  <Layout className='layout'>
    <Header>
      <div className='logo' />
      <Menu
        theme='dark'
        mode='horizontal'
        defaultSelectedKeys={['1']}
        items={new Array(1).fill(null).map((_, index) => {
          const key = index + 1;
          return {
            key,
            label: `🐱‍👤Price Tracker App🐱‍🏍`,
          };
        })}
      />
      <DrawerComp />
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
      </Breadcrumb>
      <div className='site-layout-content'>
        <TableComp />
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>
      Ashutosh Sharma © 2022 |{' '}
      <a href='https://github.com/Ashu999/price-tracker-app'>GitHub</a>
    </Footer>
  </Layout>
);

export default AppLayout;
