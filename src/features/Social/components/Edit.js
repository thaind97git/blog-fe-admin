import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, Row, Skeleton, Space } from 'antd';
import { UndoOutlined, SaveOutlined } from '@ant-design/icons';

import { getSocialById, updateSocial } from '@/apis/social';
import { setLoading } from '@/store/actions';

import useGet from '@/hooks/useGet';
import Input from '@/components/Input';
import FormItem from '@/components/Form/FormItem';
import EmptyRecord from '@/components/Empty-Record';

import { errorHandler } from '@/helpers/axios';
import { toastSuccess } from '@/helpers/toast';
import { functionCaller, compareTwoObject } from '@/utils';

const EditSocial = ({ onCallbackSuccess, onCallbackError, socialId }) => {
  const [formUpdate] = Form.useForm();
  const [social, setSocial] = useState(null);
  const [defaultForm, setDefaultForm] = useState(null);

  const dispatch = useDispatch();

  const onChangeInputForm = event => {
    setSocial(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const { data: socialDetails, fetching: fetchingSocial } = useGet({
    func: () => getSocialById({ id: socialId }),
    triggerCondition: !!socialId,
    refresh: socialId,
  });

  const onSubmit = async values => {
    try {
      dispatch(setLoading(true));
      await updateSocial(socialId, values);
      functionCaller(onCallbackSuccess);
      toastSuccess('Update social successfully');
    } catch (error) {
      errorHandler(error);
      functionCaller(onCallbackError);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (socialDetails) {
      setSocial(socialDetails);
      setDefaultForm(socialDetails);
    }
  }, [socialDetails]);

  useEffect(() => {
    return () => {
      setSocial(null);
      setDefaultForm(null);
    };
  }, []);

  if (fetchingSocial) {
    return <Skeleton />;
  }

  if (!social) {
    return <EmptyRecord />;
  }

  const isEqualData = compareTwoObject(social, defaultForm);

  return (
    <Form
      form={formUpdate}
      name="create-social"
      initialValues={social}
      onFinish={onSubmit}
    >
      <FormItem name="name" rulesName={['required']}>
        <Input onChange={onChangeInputForm} label="Name" />
      </FormItem>
      <FormItem name="code" rulesName={['required']}>
        <Input onChange={onChangeInputForm} label="Code" />
      </FormItem>
      <FormItem name="link" rulesName={['required']}>
        <Input onChange={onChangeInputForm} label="Link" />
      </FormItem>
      <Row justify="center">
        <Space>
          <Button
            icon={<UndoOutlined />}
            disabled={isEqualData}
            onClick={() => {
              setSocial({ ...defaultForm });
              formUpdate.resetFields();
            }}
          >
            Un-do
          </Button>
          <Button
            icon={<SaveOutlined />}
            disabled={isEqualData}
            type="primary"
            htmlType="submit"
          >
            Update
          </Button>
        </Space>
      </Row>
    </Form>
  );
};

export default EditSocial;
