import { Divider } from 'antd';
import React from 'react';
import CardSection from './CardSection';
const mock = [
  {
    id: 1,
    title: 'Education',
    markdown: '## Content',
    html: '<h2>Content</h2>',
    position: 1,
    idDeleted: false,
  },
  {
    id: 2,
    title: 'Education',
    markdown: '## Content',
    html: '<h2>Content</h2>',
    position: 2,
    idDeleted: false,
  },
];
const ListOfResume = ({ resumes = mock, onSuccessEdit }) => {
  if (!resumes?.length) {
    return null;
  }

  return (
    <div className="list-of-resume">
      {resumes.map(resume => {
        return (
          <div key={resume.id}>
            <CardSection resume={resume} onSuccessEdit={onSuccessEdit} />
            <Divider />
          </div>
        );
      })}
    </div>
  );
};

export default ListOfResume;
