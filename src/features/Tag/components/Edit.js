import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, Row, Skeleton, Space } from 'antd';
import { UndoOutlined, SaveOutlined } from '@ant-design/icons';

import { getTagById, updateTag } from '@/apis/tag';
import { setLoading } from '@/store/actions';

import useGet from '@/hooks/useGet';
import Input from '@/components/Input';
import FormItem from '@/components/Form/FormItem';
import EmptyRecord from '@/components/Empty-Record';

import { errorHandler } from '@/helpers/axios';
import { toastSuccess } from '@/helpers/toast';
import { functionCaller, compareTwoObject } from '@/utils';

const EditTag = ({ onCallbackSuccess, onCallbackError, tagId }) => {
  const [formUpdate] = Form.useForm();
  const [tag, setTag] = useState(null);
  const [defaultForm, setDefaultForm] = useState(null);

  const dispatch = useDispatch();

  const onChangeInputForm = event => {
    setTag(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const { data: tagDetails, fetching: fetchingTag } = useGet({
    func: () => getTagById({ id: tagId }),
    triggerCondition: !!tagId,
    refresh: tagId,
  });

  const onSubmit = async values => {
    try {
      dispatch(setLoading(true));
      await updateTag(tagId, values);
      functionCaller(onCallbackSuccess);
      toastSuccess('Update tag successfully');
    } catch (error) {
      errorHandler(error);
      functionCaller(onCallbackError);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (tagDetails) {
      setTag(tagDetails);
      setDefaultForm(tagDetails);
    }
  }, [tagDetails]);

  useEffect(() => {
    return () => {
      setTag(null);
      setDefaultForm(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (fetchingTag) {
    return <Skeleton />;
  }

  if (!tag) {
    return <EmptyRecord />;
  }

  const isEqualData = compareTwoObject(tag, defaultForm);

  return (
    <Form
      form={formUpdate}
      name="create-tag"
      initialValues={tag}
      onFinish={onSubmit}
    >
      <FormItem name="title" rulesName={['required']}>
        <Input onChange={onChangeInputForm} label="Title" />
      </FormItem>
      <FormItem name="metaTitle" rulesName={['required']}>
        <Input onChange={onChangeInputForm} label="Meta Title" />
      </FormItem>
      <FormItem name="slug" rulesName={['required']}>
        <Input onChange={onChangeInputForm} label="Slug" />
      </FormItem>
      <Row justify="center">
        <Space>
          <Button
            icon={<UndoOutlined />}
            disabled={isEqualData}
            onClick={() => {
              setTag({ ...defaultForm });
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

export default EditTag;
