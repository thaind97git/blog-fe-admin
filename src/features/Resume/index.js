import React, { useCallback, useEffect, useState } from 'react';
import { Button, Modal, Skeleton, Space } from 'antd';

import { getResumes, swapPosition } from '@/apis/resume';

import useGet from '@/hooks/useGet';
import EmptyRecord from '@/components/Empty-Record';
import MainTitle from '@/components/Main-Title';
import ListOfResume from './components/List';
import ResumeCreate from './components/Create';

import { compareTwoObject } from '@/utils';
import { listResumeMapper } from '@/helpers/mapper';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/store/actions';
import { errorHandler } from '@/helpers/axios';

const getFromTo = (oldItems = [], newItems = []) => {
  const result = [];
  for (let i = 0; i < newItems.length; i++) {
    const element = newItems[i];
    if (!compareTwoObject(oldItems[i], element)) {
      result.push(element);
    }
  }
  return result;
};

const Resumes = () => {
  const dispatch = useDispatch();

  const [refreshResumes, setRefreshResume] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [positionSwap, setPositionSwap] = useState({});

  const { data: resumes, fetching: fetchingResumes } = useGet({
    func: getResumes,
    refresh: refreshResumes,
  });

  const closeCreateModal = () => setOpenCreate(false);

  const swapSection = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const { from, to } = positionSwap;
      await swapPosition(null, {
        from: from,
        to: to,
      });
    } catch (error) {
      errorHandler(error);
    }
    setPositionSwap({});
    setRefreshResume(prev => !prev);
    dispatch(setLoading(false));
  }, [positionSwap, dispatch]);

  useEffect(() => {
    if (positionSwap.from && positionSwap.to) {
      swapSection();
    }
  }, [positionSwap, swapSection]);

  if (fetchingResumes) {
    return <Skeleton />;
  }

  const ResumeTitle = () => (
    <MainTitle
      title="Resume management"
      actions={
        <Space>
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
              const twoPositions = getFromTo(resumesResult, newItems);
              setPositionSwap({
                from: twoPositions[0]?.id,
                to: twoPositions[1]?.id,
              });
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
