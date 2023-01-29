import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Row, Select } from 'antd';
import React, { useState } from 'react';
import { z } from 'zod';

type Props = {
  addNewItem: Function;
};

export const DrawerComp: React.FC<Props> = ({ addNewItem }) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const nameSchema = z.string().max(255);
  const urlSchema = z.string().url().max(511);
  const onFinish = (values: any) => {
    //send data to Parent i.e Home
    addNewItem(values);
    setOpen(false);
    form.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {
    // console.log('Failed:', errorInfo);
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
          form={form}
          layout='vertical'
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Row gutter={16}>
            <Col span={22}>
              <Form.Item
                name='name'
                label='Name'
                rules={[
                  { required: true, message: 'Please enter the name' },
                  {
                    message: 'Invalid Name',
                    validator: (_, value) => {
                      try {
                        value && nameSchema.parse(value);
                        return Promise.resolve();
                      } catch (err) {
                        return Promise.reject('invalid Name');
                      }
                    },
                  },
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
                rules={[
                  {
                    required: true,
                    message: 'Please enter the url',
                  },
                  {
                    message: 'Invalid URL',
                    validator: (_, value) => {
                      try {
                        value && urlSchema.parse(value);
                        return Promise.resolve();
                      } catch (err) {
                        return Promise.reject('invalid URL');
                      }
                    },
                  },
                ]}
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
