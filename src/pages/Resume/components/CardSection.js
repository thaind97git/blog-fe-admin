import React, { useState } from 'react';
import { Card } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  CarryOutOutlined,
  CloseOutlined,
  SaveFilled,
} from '@ant-design/icons';
import ResumeEdit from './Edit';
import { errorHandler } from '@/helpers/axios';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/store/actions';
import { updateResume } from '@/apis/resume';
import { functionCaller } from '@/utils';

const CardSection = ({ resume: resumeProp, onSuccessEdit }) => {
  const [edit, setEdit] = useState(false);
  const [resume, setResume] = useState(resumeProp);

  const dispatch = useDispatch();

  const saveResume = async resume => {
    if (!resume) {
      return;
    }
    try {
      dispatch(setLoading(true));
      await updateResume(resume.id, resume);
      functionCaller(onSuccessEdit);
    } catch (error) {
      errorHandler(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  if (!resumeProp) {
    return null;
  }

  return (
    <Card
      actions={
        edit
          ? [
              <div
                key="edit"
                onClick={() => {
                  saveResume(resume);
                }}
              >
                <SaveFilled />
                <span>&nbsp;</span> Save
              </div>,
              <div
                key="edit"
                onClick={() => {
                  setEdit(false);
                }}
              >
                <CloseOutlined />
                <span>&nbsp;</span> Cancel
              </div>,
            ]
          : [
              <div
                key="edit"
                onClick={() => {
                  setEdit(true);
                }}
              >
                <EditOutlined />
                <span>&nbsp;</span> Edit
              </div>,
              <div key="action">
                {resume.isDeleted ? (
                  <>
                    <CarryOutOutlined />
                    <span>&nbsp;</span> Active
                  </>
                ) : (
                  <>
                    <DeleteOutlined />
                    <span>&nbsp;</span> De-active
                  </>
                )}
              </div>,
            ]
      }
      title={resume.title}
    >
      {edit ? (
        <ResumeEdit
          onChange={(markdown, html) => {
            setResume(prev => ({ ...prev, markdown, html }));
          }}
          resume={resume}
        />
      ) : (
        <div dangerouslySetInnerHTML={{ __html: resume.html }}></div>
      )}
    </Card>
  );
};

export default CardSection;
