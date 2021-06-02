import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, Row, Skeleton } from 'antd';

import { getTags } from '@/apis/tag';
import { updatePost, getPost } from '@/apis/post';
import { setLoading } from '@/store/actions';
import { getCurrentUser } from '@/store/selectors/auth';

import { getQuery } from '@/hooks/useQuery';
import useGet from '@/hooks/useGet';
import { useShallowEqualSelector } from '@/hooks/useShallowEqualSelector';
import FormInput from '@/components/Input';
import Markdown from '@/components/Markdown';
import FormItem from '@/components/Form/FormItem';
import EmptyRecord from '@/components/Empty-Record';
import FormSelect from '@/components/Form/Form-Select';

import { ensureArray } from '@/utils';
import { errorHandler } from '@/helpers/axios';
import { goURL } from '@/helpers/router';

const EditPost = () => {
  const postId = getQuery('id');

  const [editPostForm] = Form.useForm();
  const dispatch = useDispatch();
  const currentUser = useShallowEqualSelector(getCurrentUser);

  const { data: post, fetching: fetchingPost } = useGet({
    func: () => getPost({ id: postId }),
    triggerCondition: !!postId,
  });

  const { data: tags = [], fetching: fetchingTags } = useGet({
    func: getTags,
  });

  if (fetchingPost || fetchingTags) {
    return <Skeleton />;
  }

  if (!post) {
    return <EmptyRecord />;
  }

  const onSubmit = async values => {
    values.authorId = currentUser.id;
    dispatch(setLoading(true));
    try {
      await updatePost(post.id, values);
      goURL('/posts/manage');
    } catch (error) {
      errorHandler(error);
    }

    dispatch(setLoading(false));
  };

  return (
    <div className="post-edit">
      <Form
        name="update-resume"
        initialValues={{
          ...post,
          skills: '',
          markdown: '',
          tags: post.tags.map(tag => tag.id),
        }}
        onFinish={onSubmit}
        form={editPostForm}
      >
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
            Update
          </Button>
        </Row>
      </Form>
    </div>
  );
};

export default EditPost;
