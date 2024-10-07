import { useState } from 'react';
import Cookies from 'js-cookie';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { projectApi } from '../redux/features/project';
import { clearInvitaion } from '../redux/slices/invitaion';
import { expertApi } from '../redux/features/expert';
const useLogout = () => {
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies([
    'typeId', 'expiry', 'token', 'userName', 'role', 'userId', 'clientId', 'escoId', 'expertId'
  ]);

  const logout = () => {
    dispatch(projectApi.util.resetApiState());
    dispatch(expertApi.util.resetApiState());
    dispatch(clearInvitaion())

    removeCookie('userName', { path: '/' });
    removeCookie('typeId', { path: '/' });
    removeCookie('token', { path: '/' });
    removeCookie('expiry', { path: '/' });
    removeCookie('role', { path: '/' });
    removeCookie('userId', { path: '/' });
    removeCookie('expertId', { path: '/' });
    removeCookie('clientId', { path: '/' });
    removeCookie('escoId', { path: '/' });
    setTimeout(() => {

      window.location.reload();
    }, 200)
  };

  return logout;
};
const useGetToken = () => {
  const [cookies] = useCookies(['token']);
  return cookies.token;
};
const useTypeId = () => {
  try {
    return Cookies.get('typeId');
  } catch (error) {
    console.error('Error fetching type id:', error);
    return null;
  }
};


const useTokenExpiration = () => {
  return Cookies.get('expiry')
};


const useSetCookiesAfterLogin = () => {
  const [isCookiesSet, setIsCookiesSet] = useState(false);

  const setCookies = ({ fullName, typeId, token, expiry, role, userId, escoid, clientid, expertId }) => {
    try {
      const cookieOptions = {
        expires: new Date(expiry),
        secure: true,
        sameSite: 'Strict',
        httpOnly: false,
        path: '/',
      }

      Cookies.set('userName', fullName, cookieOptions);
      Cookies.set('typeId', typeId, cookieOptions);
      Cookies.set('token', token, cookieOptions);
      Cookies.set('expiry', expiry, cookieOptions);
      Cookies.set('role', role, cookieOptions);
      Cookies.set('userId', userId, cookieOptions);
      if (escoid) {
        Cookies.set('escoId', escoid, cookieOptions);
      }
      if (clientid) {
        Cookies.set('clientid', clientid, cookieOptions);
      }
      if (expertId) {
        Cookies.set('expertId', expertId, cookieOptions);
      }


      setIsCookiesSet(true);
    } catch (error) {
      console.error('Error setting cookies:', error);
      setIsCookiesSet(false);
    }
  };

  return { setCookies, isCookiesSet };
};


const useGetUserName = () => {
  const [cookies] = useCookies(['userName']);
  return cookies.userName;
}
const useGetuserId = () => {
  const [cookies] = useCookies(['userId']);
  return cookies.userId;
}
const useGetId = () => {
  const [cookies] = useCookies(['id']);
  return cookies.id;
}
export {
  useGetToken,
  useTokenExpiration,
  useLogout,
  useSetCookiesAfterLogin,
  useTypeId,
  useGetUserName,
  useGetuserId,
  useGetId,
};
