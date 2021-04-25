import React, { useState } from 'react';
import { Button, Modal, Skeleton } from 'antd';

import { getResumes } from '@/apis/resume';

import useGetRequest from '@/hooks/useGetRequest';
import EmptyRecord from '@/components/Empty-Record';
import MainTitle from '@/components/Main-Title';
import ListOfResume from './components/List';
import ResumeCreate from './components/Create';
// import CreateResume from './components/Create';
// import ListOfResume from './components/List';

const Resumes = () => {
  const [refreshResumes, setRefreshResume] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

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
        <>
          <Button type="primary" onClick={() => setOpenCreate(true)}>
            Create new section
          </Button>
        </>
      }
    />
  );

  const resumesResult = resumes?.results;

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
          onCallbackSuccess={() => {
            closeCreateModal();
            setRefreshResume(prev => !prev);
          }}
        />
      </Modal>

      <ResumeTitle />

      {resumesResult?.length !== 0 ? (
        <EmptyRecord refreshAction={() => setRefreshResume(prev => !prev)} />
      ) : (
        <div>
          <ListOfResume
            // resumes={resumesResult}
            onSuccessEdit={() => setRefreshResume(prev => !prev)}
          />
          <ResumeCreate />
        </div>
      )}
    </>
  );
};

export default Resumes;
