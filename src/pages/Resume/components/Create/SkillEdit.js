import React, { useState } from 'react';

import FormInput from '@/components/Input';
import SkillDragDrop from '../Skill-Drag-Drop';
import FormItem from '@/components/Form/FormItem';

const SkillEdit = ({ display = true, skills, setSkills, formRef }) => {
  const [error, setError] = useState({
    validateStatus: 'success',
    errorMsg: null,
  });

  if (!display) {
    return null;
  }

  const validateSkills = () => {
    if (skills?.length === 0) {
      setError({
        validateStatus: 'error',
        errorMsg: 'Please fill on this field !',
      });
    }
  };

  const isRequired = display && skills?.length === 0;

  return (
    <>
      <FormItem
        name="skills"
        rulesName={[isRequired ? 'required' : null]}
        validateStatus={error.validateStatus}
        help={error.errorMsg}
      >
        <FormInput
          placeholder="What are your stand-out skills?"
          label="Skill"
          onBlur={validateSkills}
          onKeyDown={event => {
            if (event.keyCode === 13) {
              event.preventDefault();
              const { value } = event.target;
              if (!value || skills.includes(value)) {
                return;
              }
              setSkills(prev => [...prev, event.target.value]);
              formRef?.setFieldsValue({ skills: '' });
            }
          }}
        />
      </FormItem>
      {skills?.length ? (
        <SkillDragDrop
          onAfterChange={skills => setSkills(skills)}
          skills={skills}
        />
      ) : null}
    </>
  );
};

export default SkillEdit;
