import React from 'react';
import { Form } from 'antd';

const { Item } = Form;

const defaultRules = {
  required: {
    required: true,
    message: 'Please fill on this field !',
  },
  email: {
    type: 'email',
    message: 'Please enter a correct email address !',
  },
  // password: {
  //   type: 'password',
  //   message: 'Please enter a correct password !',
  // },
};

const FormItem = ({ children, rules = [], rulesName = [], ...rest }) => {
  let defaultRulesMapped;
  if (typeof rulesName === 'string') {
    defaultRulesMapped = [defaultRules[rulesName]];
  } else {
    defaultRulesMapped = rulesName.map(ruleName => ({
      ...defaultRules[ruleName],
    }));
  }
  const rulesCombine = [...defaultRulesMapped, ...rules].filter(Boolean);

  return (
    <Item name="email" rules={[...rulesCombine]} {...rest}>
      {children}
    </Item>
  );
};

export default FormItem;
