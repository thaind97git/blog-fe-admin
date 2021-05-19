import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, Row, Skeleton } from 'antd';

import { getTags } from '@/apis/tag';
import { createNewPost } from '@/apis/post';

import useGetRequest from '@/hooks/useGetRequest';
import { useShallowEqualSelector } from '@/hooks/useShallowEqualSelector';
import FormInput from '@/components/Input';
import Markdown from '@/components/Markdown';
import FormItem from '@/components/Form/FormItem';
import FormSelect from '@/components/Form/Form-Select';

import { ensureArray } from '@/utils';
import { setLoading } from '@/store/actions';
import { getCurrentUser } from '@/store/selectors/auth';
import { errorHandler } from '@/helpers/axios';
import { goURL } from '@/helpers/router';

const CreatePost = () => {
  const [createPostForm] = Form.useForm();
  const dispatch = useDispatch();
  const currentUser = useShallowEqualSelector(getCurrentUser);

  const { data: tags = [], fetching: fetchingTags } = useGetRequest({
    promiseFunction: getTags,
  });

  if (fetchingTags) {
    return <Skeleton />;
  }

  const onSubmit = async values => {
    values.authorId = currentUser.id;
    dispatch(setLoading(true));
    try {
      await createNewPost(values);
      goURL('/posts/manage');
    } catch (error) {
      errorHandler(error);
    }

    dispatch(setLoading(false));
  };

  return (
    <div className="post-create">
      <Form name="create-resume" onFinish={onSubmit} form={createPostForm}>
        <FormItem name="title">
          <FormInput placeholder="Title" label="Title" />
        </FormItem>
        <FormItem name="metaTitle">
          <FormInput placeholder="Meta Title" label="Meta Title" />
        </FormItem>
        <FormItem name="slug">
          <FormInput placeholder="Slug" label="Slug" />
        </FormItem>
        <FormItem name="tags">
          <FormSelect
            options={ensureArray(tags.results).map(tag => ({
              value: tag.id,
              label: tag.title,
            }))}
            label="Select Tags"
            mode="tags"
          />
        </FormItem>

        <FormItem name="content">
          <Markdown height={1000} />
        </FormItem>

        <Row justify="center">
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Row>
      </Form>
    </div>
  );
};

export default CreatePost;
