import React, { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import marked from 'marked';

import { functionCaller } from '@/utils';

const Markdown = ({ onChange, defaultValue = '', ...others }) => {
  const [value, setValue] = useState(defaultValue);
  return (
    <div className="container">
      <MDEditor
        height={400}
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
