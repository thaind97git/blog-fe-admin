import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  CarryOutOutlined,
  CloseOutlined,
  SaveFilled,
} from '@ant-design/icons';

import { setLoading } from '@/store/actions';
import { updateResume } from '@/apis/resume';

import ResumeEdit from '../Edit';

import { errorHandler } from '@/helpers/axios';
import { functionCaller } from '@/utils';
import RightContent from './RightContent';

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
    >
      {edit ? (
        resume?.skills ? (
          <ResumeEdit
            onCallbackSuccess={() => {
              setEdit(false);
              functionCaller(onSuccessEdit);
            }}
            resume={resume}
          />
        ) : (
          <ResumeEdit
            onChange={(markdown, html) => {
              setResume(prev => ({ ...prev, markdown, html }));
            }}
            resume={resume}
          />
        )
      ) : (
        <div className="resume">
          <section className="resume--section">
            <div className="resume--section--left">{resume.sectionTitle}</div>
            <div className="resume--section--right">
              <RightContent resume={resume} onSuccessEdit={onSuccessEdit} />
            </div>
          </section>
        </div>
      )}
    </Card>
  );
};

export default CardSection;
