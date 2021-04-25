import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Col, Form, Radio, Row } from 'antd';
import marked from 'marked';

import { createResume } from '@/apis/resume';
import { setLoading } from '@/store/actions';

import FormItem from '@/components/Form/FormItem';
import Input from '@/components/Input';
import Markdown from '@/components/Markdown';

import { errorHandler } from '@/helpers/axios';
import { toastSuccess } from '@/helpers/toast';
import { functionCaller } from '@/utils';

const optionsType = [
  { label: 'Normal', value: false },
  { label: 'Skill', value: true },
];

const optionsSectionTitle = [
  { label: 'Section Title', value: false },
  { label: 'No Section', value: true },
];
const ResumeCreate = ({ onCallbackSuccess, onCallbackError }) => {
  const dispatch = useDispatch();

  const [isSkill, setIsSkill] = useState(false);
  const [noSection, setNoSection] = useState(false);

  const onSubmit = async values => {
    if (!values) {
      return;
    }

    values.html = marked(values.markdown);

    try {
      dispatch(setLoading(true));
      await createResume(values);
      functionCaller(onCallbackSuccess);
      toastSuccess('Create new resume section successfully');
    } catch (error) {
      errorHandler(error);
      functionCaller(onCallbackError);
    } finally {
      dispatch(setLoading(false));
    }
  };
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
        name="create-resume"
        initialValues={{ markdown: '', skills: '' }}
        onFinish={onSubmit}
      >
        <FormItem name="sessionTitle" rulesName={['required']}>
          <Input
            placeholder="Education, Employment History, Technical Skills, ..."
            label="Section Title"
          />
        </FormItem>
        <FormItem name="title" rulesName={['required']}>
          <Input
            placeholder="Software Engineer, Web Developer, ..."
            label="Title"
          />
        </FormItem>
        <FormItem name="subTitle" rulesName={['required']}>
          <Input
            placeholder="FPT University - Ho Chi Minh City, Binh Thanh District"
            label="Sub Title"
          />
        </FormItem>
        <FormItem name="dateRange" rulesName={['required']}>
          <Input placeholder="05/2019 - Present" label="Date Range" />
        </FormItem>
        {isSkill ? (
          <FormItem name="skills" rulesName={['required']}>
            <Markdown />
          </FormItem>
        ) : (
          <FormItem name="markdown" rulesName={['required']}>
            <Markdown />
          </FormItem>
        )}

        <Row justify="center">
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Row>
      </Form>
    </>
  );
};

export default ResumeCreate;
