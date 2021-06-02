import React, { Fragment, useState } from 'react';
import { Card } from 'antd';
import {
  DeleteOutlined,
  CarryOutOutlined,
  CloseOutlined,
} from '@ant-design/icons';

import ResumeEdit from '../Edit';
import RightContent from './RightContent';

import { functionCaller } from '@/utils';

const CardSection = ({ resume, onSuccessEdit }) => {
  const [edit, setEdit] = useState(false);
  const [currentResume, setCurrentResume] = useState(null);

  if (!resume) {
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
                  setEdit(false);
                }}
              >
                <CloseOutlined />
                <span>&nbsp;</span> Cancel
              </div>,
            ]
          : [
              <div key="edit" onClick={() => {}}>
                <DeleteOutlined />
                <span>&nbsp;</span> Delete
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
      {edit && currentResume ? (
        <ResumeEdit
          onCallbackSuccess={() => {
            setEdit(false);
            functionCaller(onSuccessEdit);
          }}
          resume={currentResume}
        />
      ) : (
        <div className="resume">
          <section className="resume--section">
            <div className="resume--section--left">{resume.sectionTitle}</div>
            <div className="resume--section--right">
              <RightContent
                setCurrentResume={setCurrentResume}
                setEdit={setEdit}
                resume={resume}
                onSuccessEdit={onSuccessEdit}
              />
            </div>
          </section>
        </div>
      )}
    </Card>
  );
};

export default CardSection;
