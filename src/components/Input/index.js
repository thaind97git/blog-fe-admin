import React from 'react';
import { Input as AntInput } from 'antd';

const FormInput = ({ label, size = 'middle', className, ...rest }) => {
  const labelClasses = ['form-control--label', size].filter(Boolean).join(' ');

  const titleClasses = ['form-control--title', size, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="form-control">
      {label && <label className={labelClasses}>{label}</label>}
      <AntInput className={titleClasses} {...rest} />
    </div>
  );
};

export default FormInput;
