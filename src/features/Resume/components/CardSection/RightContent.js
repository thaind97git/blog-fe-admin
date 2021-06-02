import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import { setLoading } from '@/store/actions';
import { swapSubPosition } from '@/apis/resume';

import ListOfSubSection from './ListSubSection';

import { htmlDecode } from '@/helpers/html';
import { errorHandler } from '@/helpers/axios';
import { ensureArray, functionCaller, compareTwoObject } from '@/utils';

const EditButton = ({ onClick }) => {
  return (
    <Button
      style={{ width: 'fit-content' }}
      size="small"
      icon={<EditOutlined />}
      onClick={() => {
        functionCaller(onClick);
      }}
    >
      Edit
    </Button>
  );
};

export const NormalContent = ({ resume, setEdit, setCurrentResume }) => {
  if (!resume) {
    return null;
  }

  return (
    <>
      {!resume?.subSections ? (
        <EditButton
          onClick={() => {
            setEdit(true);
            setCurrentResume(resume);
          }}
        />
      ) : null}
      {resume.title ? (
        <h2 className="resume--section--right--title">{resume.title}</h2>
      ) : null}
      {resume.subTitle ? (
        <span className="resume--section--right--sub-title">
          {resume.subTitle}
        </span>
      ) : null}
      {resume.html ? (
        <div
          dangerouslySetInnerHTML={{
            __html: htmlDecode(resume.html),
          }}
        />
      ) : null}
    </>
  );
};

const NormalSkill = ({ resume, setEdit, setCurrentResume }) => {
  return (
    <>
      <EditButton
        onClick={() => {
          setEdit(true);
          setCurrentResume(resume);
        }}
      />
      <ul>
        {ensureArray(resume.skills).map(skill => (
          <li key={skill}> {skill}</li>
        ))}
      </ul>
    </>
  );
};

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

const RightContent = ({ resume, onSuccessEdit, setEdit, setCurrentResume }) => {
  const [positionSwap, setPositionSwap] = useState({});

  const dispatch = useDispatch();

  const swapSubSection = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const { from, to } = positionSwap;
      await swapSubPosition(null, {
        from: from,
        to: to,
      });
    } catch (error) {
      errorHandler(error);
    }
    setPositionSwap({});
    functionCaller(onSuccessEdit);
    dispatch(setLoading(false));
  }, [positionSwap, dispatch, onSuccessEdit]);

  useEffect(() => {
    if (positionSwap.from && positionSwap.to) {
      swapSubSection();
    }
  }, [positionSwap, swapSubSection]);

  if (!resume) {
    return null;
  }
  const subSections = ensureArray(resume.subSections);

  return (
    <>
      <hr />
      {ensureArray(resume.skills).length ? (
        <NormalSkill
          setEdit={setEdit}
          setCurrentResume={setCurrentResume}
          resume={resume}
        />
      ) : (
        <NormalContent
          setCurrentResume={setCurrentResume}
          setEdit={setEdit}
          resume={resume}
        />
      )}
      <ListOfSubSection
        setCurrentResume={setCurrentResume}
        setEdit={setEdit}
        onDropEnd={newItems => {
          const twoPositions = getFromTo(subSections, newItems);
          setPositionSwap({
            from: twoPositions[0]?.id,
            to: twoPositions[1]?.id,
          });
        }}
        subSections={subSections.sort((x, y) => x.subPosition - y.subPosition)}
      />
    </>
  );
};

export default RightContent;
