import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Space, Tag } from 'antd';

import { getPostPaging, updatePostStatus } from '@/apis/post';

import MainTitle from '@/components/Main-Title';
import TablePaging from '@/components/Table/Table-Paging';

import { setLoading } from '@/store/actions';
import { ensureArray, displayTime } from '@/utils';
import { generatePath, goURL } from '@/helpers/router';
import { errorHandler } from '@/helpers/axios';

const HEADER = [
  {
    title: 'Date Publish',
    dataIndex: 'datePublish',
    key: 'datePublish',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Published',
    dataIndex: 'published',
    key: 'published',
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    key: 'actions',
  },
];

const transform = (data = [], updatePostStatus) =>
  ensureArray(data).map(({ id, publishedAt, published, title }) => ({
    key: id,
    datePublish: displayTime(publishedAt),
    title: title,
    published: published ? (
      <Tag color="#87d068">Published</Tag>
    ) : (
      <Tag color="orange">Pending</Tag>
    ),
    actions: (
      <Space>
        <Button
          onClick={() => {
            goURL(generatePath(['posts', 'details'], { id }));
          }}
          type="link"
        >
          View
        </Button>
        {published ? (
          <Button
            onClick={() => {
              updatePostStatus(id, false);
            }}
            danger
            size="small"
            type="primary"
          >
            Un-Publish
          </Button>
        ) : (
          <Button
            onClick={() => {
              updatePostStatus(id, true);
            }}
            size="small"
            type="primary"
          >
            Publish
          </Button>
        )}
      </Space>
    ),
  }));

const Posts = () => {
  const dispatch = useDispatch();

  const [dateRange, setDateRange] = useState({});
  const [dataSource, setDataSource] = useState([]);
  const [refreshTable, setRefreshTable] = useState(null);

  const updateStatus = async (id, isPublish) => {
    dispatch(setLoading(true));
    try {
      await updatePostStatus(id, { isPublish });
      setRefreshTable(prev => !prev);
    } catch (error) {
      errorHandler(error);
    }
    dispatch(setLoading(false));
  };

  const PostTitle = () => (
    <MainTitle
      title="Post management"
      actions={
        <Button type="primary" onClick={() => goURL('/posts/create')}>
          Create new Post
        </Button>
      }
    />
  );

  return (
    <div>
      <PostTitle />
      <TablePaging
        data={dataSource}
        onGetResponse={resp => {
          setDataSource(transform(resp.results, updateStatus));
        }}
        promiseFunc={getPostPaging}
        columns={HEADER}
        dateRangeProps={{
          dateRange,
          setDateRange,
        }}
        searchProps={{
          exCondition: [refreshTable],
        }}
      />
    </div>
  );
};

export default Posts;
