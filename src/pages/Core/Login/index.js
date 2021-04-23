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
        <div className="login-glass">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 483.78649 574">
            <path d="M161.8744,333.99309V261.04868h28.95383a7.0387,7.0387,0,0,0,6.44692-4.21373L235.912,168.66036a3.83521,3.83521,0,0,0-3.51277-5.37445H161.8744V12.72515a14.808,14.808,0,0,0-2.51427-8.993,8.83976,8.83976,0,0,0-7.34924-3.288,23.28046,23.28046,0,0,0-5.22213.96676L69.81655,31.58162c-7.25244,2.51368-10.82908,7.54223-10.82908,15.08505V163.28591H12.66816C4.2542,163.28591,0,167.5407,0,176.05028v72.234c0,8.50958,4.2542,12.76437,12.66816,12.76437h46.8021v302.0484c0,11.68509,15.90325,15.16355,20.78154,4.54548l80.14288-226.8843A16.20471,16.20471,0,0,0,161.8744,333.99309Z" />
            <path d="M274.4304,250.56552a66.78174,66.78174,0,0,0-3.57579,21.55939V560.42968c0,4.0612,1.06355,7.25244,3.28863,9.47634,2.22389,2.1271,5.31775,3.28744,9.47633,3.28744H360.979c8.218,0,12.281-4.25479,12.281-12.76378v-299.381h97.76159a12.765,12.765,0,0,0,12.765-12.765V176.05087a12.765,12.765,0,0,0-12.765-12.765H373.25994V7.82606c0-8.39561-11.43241-10.88495-14.9231-3.24943Z" />
          </svg>
        </div>
        <div className="login-form-container">
          <h3 className="login-title">Sign in to your account</h3>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onSubmit}
          >
            <FormItem name="email" rulesName={['required', 'email']}>
              <Input label="Email" />
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
