import React, { useState } from 'react';
import { Button, Modal, Skeleton, Space } from 'antd';

import { getResumes } from '@/apis/resume';

import useGetRequest from '@/hooks/useGetRequest';
import EmptyRecord from '@/components/Empty-Record';
import MainTitle from '@/components/Main-Title';
import ListOfResume from './components/List';
import ResumeCreate from './components/Create';

import { compareTwoObject } from '@/utils';
import { listResumeMapper } from '@/helpers/mapper';

const Resumes = () => {
  const [refreshResumes, setRefreshResume] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [isEqual, setIsEqual] = useState(true);

  const { data: resumes, fetching: fetchingResumes } = useGetRequest({
    promiseFunction: getResumes,
    refresh: refreshResumes,
  });

  const closeCreateModal = () => setOpenCreate(false);

  if (fetchingResumes) {
    return <Skeleton />;
  }

  const ResumeTitle = () => (
    <MainTitle
      title="Resume management"
      actions={
        <Space>
          <Button disabled={isEqual} type="primary" onClick={() => {}}>
            Update Position
          </Button>
          <Button type="primary" onClick={() => setOpenCreate(true)}>
            Create new section
          </Button>
        </Space>
      }
    />
  );

  const resumesResult = listResumeMapper(resumes?.results);

  return (
    <>
      <Modal
        title="Create new resume section"
        visible={openCreate}
        onCancel={closeCreateModal}
        footer={false}
        width={1000}
      >
        <ResumeCreate
          sections={resumesResult}
          onCallbackSuccess={() => {
            closeCreateModal();
            setRefreshResume(prev => !prev);
          }}
        />
      </Modal>

      <ResumeTitle />

      {resumesResult?.length === 0 ? (
        <EmptyRecord refreshAction={() => setRefreshResume(prev => !prev)} />
      ) : (
        <div>
          <ListOfResume
            onDropEnd={newItems => {
              const isEqual = compareTwoObject(newItems, resumesResult);
              setIsEqual(isEqual);
            }}
            resumes={resumesResult}
            onSuccessEdit={() => setRefreshResume(prev => !prev)}
          />
        </div>
      )}
    </>
  );
};

export default Resumes;
