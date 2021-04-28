import React from 'react';
import { Tag } from 'antd';

import { functionCaller } from '@/utils';

const SkillItem = ({
  title,
  className,
  onClose,
  closable = true,
  ...others
}) => {
  if (!title) {
    return null;
  }

  const skillItemClasses = ['skill-tag', className].filter(Boolean).join(' ');

  const onCloseItem = e => {
    e.preventDefault();
    functionCaller(onClose);
  };

  return (
    <Tag
      className={skillItemClasses}
      closable={closable}
      onClose={onCloseItem}
      {...others}
    >
      {title}
    </Tag>
  );
};

export default SkillItem;
