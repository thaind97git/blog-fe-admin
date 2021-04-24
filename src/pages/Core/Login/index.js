import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Form } from 'antd';

import { login } from '@/apis/auth';
import { setLoading } from '@/store/actions';

import Input from '@/components/Input';
import FormItem from '@/components/Form/FormItem';

import { saveToken } from '@/helpers/local-storage';
import { errorHandler } from '@/helpers/axios';

import LoginBG from '_static/image/icon/login-icon.svg';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async values => {
    if (!values?.email || !values?.password) {
      return;
    }

    try {
      dispatch(setLoading(true));
      const response = await login({ ...values });
      response.data && saveToken(response.data?.tokens?.access?.token);
      history.push('/');
    } catch (error) {
      errorHandler(error);
    }

    dispatch(setLoading(false));
  };

  return (
    <div id="login" className="login">
      <h1 className="login__challenge-title">Alden-admin</h1>
      <h2 className="login__challenge-subtitle">#thaind97</h2>
      <p className="login__challenge-part-of">
        <a
          href="https://github.com/thaind97git/blog-fe-admin"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>{' '}
      </p>

      <div className="login__card">
        <div className="login__glass">
          <img className="login__glass__logo" src={LoginBG} />
        </div>
        <div className="login-form-container">
          <h3 className="login-title">Sign in to your account</h3>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onSubmit}
          >
            <FormItem name="email" rulesName={['required', 'email']}>
              <Input id="login__input-email" label="Email" />
            </FormItem>
            <FormItem name="password" rulesName={['required']}>
              <Input type="password" label="Password" />
            </FormItem>
            <FormItem className="form-control">
              <Button
                size="large"
                className="login__btn-submit"
                type="primary"
                htmlType="submit"
                id="login__btn-submit"
              >
                Submit
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
