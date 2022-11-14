import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from 'antd';
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
        title='Create a new account'
        width={480}
        onClose={onClose}
        open={open}
        bodyStyle={{ paddingBottom: 80 }}
        // extra={
        //   <Space>
        //     <Button onClick={onClose}>Cancel</Button>
        //     <Button onClick={onClose} type='primary'>
        //       Submit
        //     </Button>
        //   </Space>
        // }
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
                <Input placeholder='Please enter name for the item' />
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
                  addonBefore='http://'
                  addonAfter='.com'
                  placeholder='Please enter url'
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
