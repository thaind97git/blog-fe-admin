import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, Row } from 'antd';

import { createTag } from '@/apis/tag';
import { setLoading } from '@/store/actions';

import FormItem from '@/components/Form/FormItem';
import Input from '@/components/Input';

import { errorHandler } from '@/helpers/axios';
import { functionCaller } from '@/utils';
import { toastSuccess } from '@/helpers/toast';

const CreateTag = ({ onCallbackSuccess, onCallbackError }) => {
  const dispatch = useDispatch();

  const onSubmit = async values => {
    try {
      dispatch(setLoading(true));
      await createTag(values);
      functionCaller(onCallbackSuccess);
      toastSuccess('Create new tag successfully');
    } catch (error) {
      errorHandler(error);
      functionCaller(onCallbackError);
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <Form
      name="create-tag"
      initialValues={{ remember: true }}
      onFinish={onSubmit}
    >
      <FormItem name="title" rulesName={['required']}>
        <Input label="Title" />
      </FormItem>
      <FormItem name="metaTitle" rulesName={['required']}>
        <Input label="Meta Title" />
      </FormItem>
      <FormItem name="slug" rulesName={['required']}>
        <Input label="Slug" />
      </FormItem>
      <Row justify="center">
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Row>
    </Form>
  );
};

export default CreateTag;
