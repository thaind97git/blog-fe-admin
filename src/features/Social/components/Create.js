import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, Row } from 'antd';

import { createSocial } from '@/apis/social';
import { setLoading } from '@/store/actions';

import FormItem from '@/components/Form/FormItem';
import Input from '@/components/Input';

import { errorHandler } from '@/helpers/axios';
import { functionCaller } from '@/utils';
import { toastSuccess } from '@/helpers/toast';

const CreateSocial = ({ onCallbackSuccess, onCallbackError }) => {
  const dispatch = useDispatch();

  const onSubmit = async values => {
    try {
      dispatch(setLoading(true));
      await createSocial(values);
      functionCaller(onCallbackSuccess);
      toastSuccess('Create new social successfully');
    } catch (error) {
      errorHandler(error);
      functionCaller(onCallbackError);
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <Form
      name="create-social"
      initialValues={{ remember: true }}
      onFinish={onSubmit}
    >
      <FormItem name="name" rulesName={['required']}>
        <Input label="Name" />
      </FormItem>
      <FormItem name="code" rulesName={['required']}>
        <Input label="Code" />
      </FormItem>
      <FormItem name="link" rulesName={['required']}>
        <Input label="Link" />
      </FormItem>
      <Row justify="center">
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Row>
    </Form>
  );
};

export default CreateSocial;
