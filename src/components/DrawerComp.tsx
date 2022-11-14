import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Row, Select } from 'antd';
import React, { useState } from 'react';

const { Option } = Select;

const DrawerComp: React.FC = () => {
  const [open, setOpen] = useState(true);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Button type='primary' onClick={showDrawer} icon={<PlusOutlined />}>
        Add New Item
      </Button>
      <Drawer
        title='Add a new Item'
        width={480}
        onClose={onClose}
        open={open}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form
          layout='vertical'
          hideRequiredMark
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Row gutter={16}>
            <Col span={22}>
              <Form.Item
                name='name'
                label='Name'
                rules={[
                  { required: true, message: 'Please enter name for the item' },
                ]}
              >
                <Input placeholder='Peanut Butter (Crunchy)' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={22}>
              <Form.Item
                name='url'
                label='Url'
                rules={[{ required: true, message: 'Please enter url' }]}
              >
                <Input
                  style={{ width: '100%' }}
                  placeholder='https://amzn.eu/d/9eHdFry'
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={22}>
              <Button type='primary' htmlType='submit'>
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default DrawerComp;
