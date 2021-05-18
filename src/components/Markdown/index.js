import React, { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import marked from 'marked';

import { functionCaller } from '@/utils';

const Markdown = ({ onChange, defaultValue = '', height = 400, ...others }) => {
  const [value, setValue] = useState(defaultValue);
  return (
    <div className="container">
      <MDEditor
        height={height}
        value={value}
        onChange={value => {
          setValue(value);
          functionCaller(onChange, value, marked(value));
        }}
        {...others}
      />
    </div>
  );
};

export default Markdown;
