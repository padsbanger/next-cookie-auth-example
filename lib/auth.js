import axios from 'axios';
import Router from 'next/router'

axios.defaults.withCredentials = true;

export const getServerSideToken = req => {
  if (req && req.signedCookies && req.signedCookies.token) {
    return { user: req.signedCookies.token }
  }
  return {}
}

const WINDOW_USER_SCRIPT_VARIABLE = '__USER__';

export const getUserScript = user => {
  return `${WINDOW_USER_SCRIPT_VARIABLE} = ${JSON.stringify(user)};`
}

export const getClientSideToken = () => {
  if (typeof window !== 'undefined') {
    const user = window[WINDOW_USER_SCRIPT_VARIABLE] || {};
    return { user };
  }
  return { user: {}}
}

export const authInitialProps = (isProtectedRoute) => ({ req, res }) => {
  console.log(isProtectedRoute)
  const auth = req ? getServerSideToken(req) : getClientSideToken();
  const user = auth.user;
  const currentPath = req ? req.url : window.location.pathname;
  const isAnon = !user || user.type !== "authentiacted";
  if (isProtectedRoute && isAnon && currentPath !=='/login') {
    return redirectUser(res, "/login");
  }
  return { auth };
}

const redirectUser = (res, path) => {
  if (res) {
    res.redirect(302, path)
    res.finished = true;
    return {}
  }
  Router.replace(path);
  return {};
}

export const loginUser =  async (form) => {
  const { data } = await axios.post('/api/login', form)
  if (typeof window !== undefined) {
    window[WINDOW_USER_SCRIPT_VARIABLE] = data || {}
  }
}

export const getUserProfile = async () => {
  const { data } = await axios.get('/api/profile');
  return data
}

export const logoutUser = async () => {
  if (typeof window !== undefined) {
    window[WINDOW_USER_SCRIPT_VARIABLE] = {}
  }
  await axios.post('/api/logout');
  Router.push('/login');
}