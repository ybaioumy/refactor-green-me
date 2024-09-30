import { useState } from 'react';
import Logo from '../assets/images/greenme.png';
import GreenMeTitle from '../assets/images/GreenMeTitle.png';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useLoginMutation } from '../redux/features/auth';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import Button from '../components/shared/Button';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { message, notification } from 'antd';
import useMediaQuery from '../hooks/useMediaQuery';
import { useSetCookiesAfterLogin } from '../hooks/useCookies';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../redux/slices/user';
function Login() {
  const navigation = useNavigate();
  // const dispatch = useDispatch();
  // const [searchParams] = useSearchParams();
  // const token = searchParams.get('token');
  // const { decodedToken } = jwtDecode(token);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  });
  const [visible, setVisible] = useState(false);

  const [login, { isLoading, error }] = useLoginMutation();
  const { setCookies, isCookiesSet } = useSetCookiesAfterLogin();
  const onSubmit = async (data) => {
    try {
      const response = await login(data).unwrap();
      const decodedToken = jwtDecode(response.token);
      const expires = response.expiry;
      const expDate = new Date(expires);
      setCookies({
        fullName: response.fullName,
        typeId: response.typeId,
        token: response.token,
        role: response.role,
        expiry: expDate,
        userId:
          decodedToken[
            'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
          ],
      });
      // if (token) {
      //   // dispatch(setCredentials({ invtationToken: token.invitaionToken }));
      // }

      const userTypeMap = {
        1: 'client',
        2: 'esco',
        3: 'expert',
      };

      const getUserType = (typeId) => userTypeMap[Number(typeId)];
      const userType = getUserType(response.typeId);
      let url = '';
      // handle invitaions redirect
      if (userType != null) {
        if (userType === 'client') {
          url = '/';
        } else if (userType === 'esco') {
          url = '/';
        } else if (userType === 'expert') {
          url = '/';
        }
      }
      navigation(url, { replace: true });
      message.success(
        'Welcome ' + response.fullName || 'Logged in successfully'
      );
    } catch (err) {
      console.error('There was a problem with the login request:', err);

      notification.error({
        message: 'Login Failed',
        description: `${err.data?.message || 'Unknown error'}`,
        placement: 'top',
      });
    }
  };

  const handlePasswordVisibilityToggle = () => {
    setVisible(!visible);
  };
  const bgColor = useMediaQuery('(max-width: 768px)')
    ? 'green-gradinat'
    : 'bg-[#1D4727]';
  return (
    <div
      className={`flex flex-col md:flex-row h-screen ${bgColor} items-center py-5 md:py-0`}>
      <div className="hidden md:flex flex-1 flex-col justify-center items-center gap-10 md:p-0">
        <img src={Logo} alt="logo" className="w-40 h-auto md:w-52 md:h-auto" />
        <p className="text-white text-2xl font-bold">Green Me</p>
      </div>
      <div className="flex md:hidden flex-col items-center justify-center flex-2 text-white font-abel py-5">
        Welcome To{' '}
        <img src={GreenMeTitle} alt="Logo" width={'50%'} height={'auto'} />
      </div>
      <div className="md:flex-1 flex flex-col justify-between p-4 md:p-10 w-[95%] rounded-2xl md:rounded-none bg-white h-full">
        <p className="text-xl font-bold text-[#1d4628] mb-4 text-center md:text-left">
          Sign In
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-6 md:gap-10">
          <div className="flex flex-col w-full gap-6 md:gap-8">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#8E8E8E] ">
                Email
              </label>
              <input
                className={`border-b-2 ${
                  errors.email ? 'border-red-500' : 'border-[#8c8c8c]'
                } w-full outline-none p-2 `}
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Invalid email address',
                  },
                })}
                placeholder="Email / Phone"
                autoComplete="email"
              />
              {errors.email && (
                <p className="text-red-500 text-base mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-gray-400">Password</p>
              <div
                className={`border-b-2 ${
                  errors.password ? 'border-red-500' : 'border-[#8c8c8c]'
                } outline-none flex justify-between w-full`}>
                <input
                  type={visible ? 'text' : 'password'}
                  {...register('password', {
                    required: 'Password is required',
                  })}
                  placeholder="Password"
                  className="w-full focus:outline-none p-2"
                  autoComplete="current-password"
                />
                <button
                  onClick={handlePasswordVisibilityToggle}
                  className="focus:outline-none"
                  type="button">
                  {visible ? <EyeInvisibleOutlined /> : <EyeTwoTone />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-base mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex justify-between items-center">
              <label
                htmlFor="rememberMe"
                className="text-sm text-gray-400 flex items-center gap-1">
                <input type="checkbox" id="rememberMe" className="mr-1" />
                <span> Remember me</span>
              </label>

              <Link to="/" className="text-sm text-gray-400 border-b-2">
                Forget password
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Button
              isLoading={isLoading}
              type="submit"
              variant="secondary"
              className="w-full md:w-40 h-10 rounded-full text-[#1d4628] text-sm font-bold"
              disabled={!isValid}>
              SIGN IN
            </Button>
            <Link
              to="/register"
              className="bg-white w-full md:w-40 h-10 rounded-full border-2 border-[#1d4628] text-sm font-bold text-[#1d4628] flex justify-center items-center hover:bg-[#1E4A28] hover:text-white transition">
              CREATE ACCOUNT
            </Link>
          </div>
        </form>

        <div className="mt-4 md:mt-0 ">
          <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 md:items-end">
            {/* <div className="flex flex-col gap-2 mt-2">
              <p className="text-[#809F87] text-center md:text-left">
                Or Sign In with
              </p>
              <div className="flex gap-2">
                {Object.entries(loginOptions).map(([name]) => (
                  <button
                    key={name}
                    className="text-sm bg-gray-200 p-2 rounded-md">
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </button>
                ))}
              </div>
            </div> */}
            <div>
              <Link
                to="/"
                className="text-sm text-[#809F87] text-center underline font-abel">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
