import React from 'react';
import Markdown from '@/components/Markdown';
import { functionCaller } from '@/utils';

const ResumeEdit = ({ resume, onChange }) => {
  if (!resume) {
    return null;
  }
  return (
    <Markdown
      defaultValue={resume.markdown}
      onChange={(markdown, html) => {
        console.log({ markdown, html });
        functionCaller(onChange, markdown, html);
      }}
    />
  );
};

export default ResumeEdit;
