import React, { useState } from 'react';
import { Button, Modal, Skeleton } from 'antd';

import { getTags } from '@/apis/tag';

import useGetRequest from '@/hooks/useGetRequest';
import EmptyRecord from '@/components/Empty-Record';
import MainTitle from '@/components/Main-Title';
import CreateTag from './components/Create';
import ListOfTag from './components/List';

const Tags = () => {
  const [refreshTags, setRefreshTag] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

  const { data: tags, fetching: fetchingTags } = useGetRequest({
    promiseFunction: getTags,
    refresh: refreshTags,
  });

  const closeCreateModal = () => setOpenCreate(false);

  if (fetchingTags) {
    return <Skeleton />;
  }

  const TagTitle = () => (
    <MainTitle
      title="Tags management"
      actions={
        <>
          <Button type="primary" onClick={() => setOpenCreate(true)}>
            Create new Tag
          </Button>
        </>
      }
    />
  );

  const tagsResult = tags?.results;

  return (
    <>
      <Modal
        title="Create new tag"
        visible={openCreate}
        onCancel={closeCreateModal}
        footer={false}
      >
        <CreateTag
          onCallbackSuccess={() => {
            closeCreateModal();
            setRefreshTag(prev => !prev);
          }}
        />
      </Modal>

      <TagTitle />

      {tagsResult?.length === 0 ? (
        <EmptyRecord refreshAction={() => setRefreshTag(prev => !prev)} />
      ) : (
        <ListOfTag
          tags={tagsResult}
          onSuccessEdit={() => setRefreshTag(prev => !prev)}
        />
      )}
    </>
  );
};

export default Tags;
