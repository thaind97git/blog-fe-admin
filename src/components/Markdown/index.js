import React, { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import marked from 'marked';
import { debounce } from 'lodash';

import { functionCaller } from '@/utils';

const Markdown = ({
  onChange,
  defaultValue = '',
  height = 400,
  value,
  ...others
}) => {
  const [mdValue, setMDValue] = useState(defaultValue || value || '');

  const debounceFunction = debounce(value => {
    setMDValue(value);
    functionCaller(onChange, value, marked(value));
  }, 1000);

  return (
    <div className="container">
      <MDEditor
        height={height}
        value={mdValue}
        onChange={value => {
          debounceFunction(value);
        }}
        {...others}
      />
    </div>
  );
};

export default Markdown;
