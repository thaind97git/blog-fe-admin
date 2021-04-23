import React from 'react';
import { Input as AntInput } from 'antd';

const Input = ({ label, ...rest }) => {
  return (
    <div className="form-control">
      {label && <label>{label}</label>}
      <AntInput {...rest} />
    </div>
  );
};

export default Input;
