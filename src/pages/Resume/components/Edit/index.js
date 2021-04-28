import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Col, Form, Radio, Row } from 'antd';
import marked from 'marked';

import { updateResume } from '@/apis/resume';
import { setLoading } from '@/store/actions';

import FormItem from '@/components/Form/FormItem';
import FormInput from '@/components/Form/Form-Input';
import FormSelect from '@/components/Form/Form-Select';
import Markdown from '@/components/Markdown';
import SkillEdit from '../Create/SkillEdit';

import { errorHandler } from '@/helpers/axios';
import { toastSuccess } from '@/helpers/toast';
import { functionCaller, ensureArray } from '@/utils';

const optionsType = [
  { label: 'Normal', value: false },
  { label: 'Skill', value: true },
];

const optionsSectionTitle = [
  { label: 'Section Title', value: false },
  { label: 'No Section', value: true },
];
const ResumeEdit = ({
  onCallbackSuccess,
  onCallbackError,
  sections = [],
  resume,
}) => {
  const dispatch = useDispatch();

  const [updateSkillForm] = Form.useForm();
  const [isSkill, setIsSkill] = useState(!!resume?.skills?.length);
  const [noSection, setNoSection] = useState(false);
  const [skills, setSkills] = useState(ensureArray(resume?.skills));

  const onSubmit = async values => {
    if (!values) {
      return;
    }

    if (isSkill) {
      values.skills = skills;
    } else {
      values.skills = [];
      values.html = marked(values.markdown);
    }

    try {
      dispatch(setLoading(true));
      await updateResume(resume.id, values);
      functionCaller(onCallbackSuccess);
      toastSuccess('Update resume section successfully');
    } catch (error) {
      errorHandler(error);
      functionCaller(onCallbackError);
    } finally {
      dispatch(setLoading(false));
    }
  };

  if (!resume) {
    return null;
  }

  return (
    <>
      <Row justify="center" gutter={12}>
        <Col>
          <Radio.Group
            options={optionsType}
            onChange={event => setIsSkill(event.target.value)}
            value={isSkill}
            optionType="button"
            buttonStyle="solid"
          />
        </Col>
        <Col>
          <Radio.Group
            options={optionsSectionTitle}
            onChange={event => setNoSection(event.target.value)}
            value={noSection}
            optionType="button"
            buttonStyle="solid"
          />
        </Col>
      </Row>
      <Form
        name="update-resume"
        initialValues={{ ...resume, skills: '' }}
        onFinish={onSubmit}
        form={updateSkillForm}
      >
        {noSection ? (
          <FormItem name="sectionId" rulesName={['required']}>
            <FormSelect
              options={sections.map(section => ({
                value: section.id,
                label: section.sectionTitle,
              }))}
              label="Select Section"
            />
          </FormItem>
        ) : (
          <FormItem name="sectionTitle" rulesName={['required']}>
            <FormInput
              placeholder="Education, Employment History, Technical Skills, ..."
              label="Section Title"
            />
          </FormItem>
        )}
        {!isSkill && (
          <>
            <FormItem name="title">
              <FormInput
                placeholder="Software Engineer, Web Developer, ..."
                label="Title"
              />
            </FormItem>
            <FormItem name="subTitle">
              <FormInput
                placeholder="FPT University - Ho Chi Minh City, Binh Thanh District"
                label="Sub Title"
              />
            </FormItem>
            <FormItem name="dateRange">
              <FormInput placeholder="05/2019 - Present" label="Date Range" />
            </FormItem>
          </>
        )}
        {isSkill ? (
          <SkillEdit
            formRef={updateSkillForm}
            display={isSkill}
            skills={skills}
            setSkills={setSkills}
          />
        ) : (
          <FormItem name="markdown">
            <Markdown />
          </FormItem>
        )}

        <Row justify="center">
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Row>
      </Form>
    </>
  );
};

export default ResumeEdit;
