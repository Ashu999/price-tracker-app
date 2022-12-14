import { Breadcrumb, Layout, Menu, Tooltip } from 'antd';
import React from 'react';
import { TableComp } from '../components/TableComp';
import { DrawerComp } from '../components/DrawerComp';
import './appLayout.css';
const { Header, Content, Footer } = Layout;
// import EyeIcon from '../assets/icons/eye.svg';

export const AppLayout: React.FC = () => (
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
            label: (
              <>
                <Tooltip
                  placement='left'
                  title="Add Item to the List and you'll be notified when it's price is changed."
                  color='geekblue'
                >
                  <strong>Price Tracker App</strong>
                </Tooltip>
              </>
            ),
          };
        })}
      />
      <DrawerComp />
    </Header>
    <Content style={{ padding: '65px 50px' }}>
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
