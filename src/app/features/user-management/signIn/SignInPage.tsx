import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useContext, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/auth.context';
import { formatErrorMessage } from '../../../lib/helpers/format.error';
import { useQuery } from '../../../lib/hooks';
import { storage } from '../../../lib/services/storage.service';
import { loginApi } from '../apis/account.apis';

function SignInPage() {

  const authContext = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginForm] = Form.useForm();
  const intl = useIntl();
  const params = useQuery();
  const navigate = useNavigate();

  const auth = params.get('auth');

  const onSignIn = async (values: any) => {
    try {

      setLoading(true);
      setMessage('');

      loginApi(values.username, values.password).then(
        (data: any) => {

          storage.setItem('accessToken', data?.token);

          if (auth) {
            window.opener.postMessage(
              {
                token: data?.token,
                user: data?.user,
                expiresAt: (
                  Date.now() +
                  data?.expiresIn * 1000
                ).toString(),
              },
              '*'
            );
            return window.close();
          }

          authContext.setAuthState && authContext.setAuthState({
            token: data?.token,
            user: data?.user,
            expiresAt: (
              Date.now() +
              data?.expiresIn * 1000
            ).toString(),
          });
          console.log("authContext", authContext);

          navigate('/home', { replace: true });
        },
        (error: any) => {
          setLoading(false);
          setMessage(formatErrorMessage(error));
        }
      );
    } catch (err) {
      setLoading(false);
      setMessage('There is  a problem with network');
    }
  };

  return <>

    <div className="flex w-full h-full" style={{ minHeight: '600px' }}>
      <div className="flex items-center justify-center flex-grow min-h-screen bg-accent md:w-3/5">
        <div className="relative flex flex-col justify-center w-2/3 min-h-full md:w-2/3 lg:w-1/4">
          <div className='rounded-sm bg-white p-6 shadow-md'>
            <div className="flex justify-center">
              <span className="text-4xl font-semibold text-primary-500">
                Trakker
              </span>
            </div>
            <div className="text-xl text-center font-bold my-6">
              <FormattedMessage
                id="login.welcome"
                defaultMessage="Sign In"
              />
            </div>

            <Form form={loginForm} layout="vertical" onFinish={onSignIn}>
              <div>
                <div className="mb-0">
                  <Form.Item
                    name="username"
                    rules={[
                      {
                        type: 'email',
                        message: (
                          <FormattedMessage
                            id="register.email.invalid"
                            defaultMessage="Invalid email address"
                          />
                        ),
                      },
                      {
                        required: true,
                        message: (
                          <FormattedMessage
                            id="login.required.field"
                            defaultMessage="This field is required"
                          />
                        ),
                      },
                    ]}
                  >
                    <Input
                      type="email"
                      autoComplete="email"
                      placeholder={intl.formatMessage({
                        id: 'login.email',
                        defaultMessage: 'Email',
                      })}
                      size="large"
                      name="username"
                    />
                  </Form.Item>
                </div>

                <div className="mb-0">
                  <Form.Item
                    className="py-3"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: (
                          <FormattedMessage
                            id="login.required.field"
                            defaultMessage="This field is required"
                          />
                        ),
                      },
                    ]}
                  >
                    <Input.Password
                      type="password"
                      placeholder={intl.formatMessage({
                        id: 'login.password',
                        defaultMessage: 'Password',
                      })}
                      size="large"
                      autoComplete="current-password"
                      iconRender={(visible: boolean) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                  </Form.Item>
                </div>

                {message ? (
                  <div className="bg-red-200 border-y-error-red p-3 text-error-red my-3 text-center rounded">
                    Username or Password incorrect!
                  </div>
                ) : null}

                <div>
                  <Button
                    loading={loading}
                    type='primary'
                    className="w-full bg-primary border-primary hover:bg-primary hover:border-primary focus:bg-primary"
                    htmlType="submit"
                    size="large"
                  >
                    <FormattedMessage id="login.btn.text" defaultMessage="Login" />
                  </Button>
                </div>

                <div className="my-1">
                  <Link
                    className="text-primary-500"
                    to={{ pathname: '/account/forgot' }}
                  >
                    <Button type="link" style={{ marginLeft: -15 }} className="text-primary hover:text-primary">
                      <FormattedMessage
                        id="login.forgot.password"
                        defaultMessage="Forgot password?"
                      />
                    </Button>
                  </Link>
                </div>

              </div>
              <div className='form-footer mt-4'>
                <p>Don't have an account yet? <span className='external-link'>
                  <a href="mailto:kirubelabr@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer">Contact the administrators.</a>
                </span> </p>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </>
}

export default SignInPage;
