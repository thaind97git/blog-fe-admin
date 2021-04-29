import React from 'react';
import { Select as AntSelect } from 'antd';

const { Option } = AntSelect;

const FormSelect = ({
  label,
  size = 'middle',
  className,
  onChange,
  options = [],
  ...rest
}) => {
  if (options.length === 0) {
    return null;
  }

  const labelClasses = ['form-control--select__label', size]
    .filter(Boolean)
    .join(' ');

  const titleClasses = ['form-control--select__title', size, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="form-control--select">
      {label && <label className={labelClasses}>{label}</label>}
      <AntSelect className={titleClasses} onChange={onChange} {...rest}>
        {options.map(option => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
      </AntSelect>
    </div>
  );
};

export default FormSelect;
