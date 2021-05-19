import React, { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import marked from 'marked';

import { functionCaller } from '@/utils';

const Markdown = ({
  onChange,
  defaultValue = '',
  height = 400,
  value,
  ...others
}) => {
  const [mdValue, setMDValue] = useState(defaultValue || value || '');
  return (
    <div className="container">
      <MDEditor
        height={height}
        value={mdValue}
        onChange={value => {
          setMDValue(value);
          functionCaller(onChange, value, marked(value));
        }}
        {...others}
      />
    </div>
  );
};

export default Markdown;
