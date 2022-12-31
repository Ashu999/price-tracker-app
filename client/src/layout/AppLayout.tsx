import { Layout, Menu, Tooltip } from 'antd';
import React from 'react';
import './appLayout.css';
import { Home } from '../pages/Home';

const { Header, Content, Footer } = Layout;
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
                  title="Add Item to the List and you'll be notified when it's price drops."
                  color='geekblue'
                >
                  <strong>Price Tracker App</strong>
                </Tooltip>
              </>
            ),
          };
        })}
      />
    </Header>

    <Content style={{ padding: '30px 50px' }}>
      <Home />
    </Content>

    <Footer style={{ textAlign: 'center' }}>
      Ashutosh Sharma © 2022 |{' '}
      <a
        href='https://github.com/Ashu999/price-tracker-app'
        target='_blank'
        rel='noreferrer noopener'
      >
        GitHub
      </a>
    </Footer>
  </Layout>
);
