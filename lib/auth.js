import axios from 'axios';

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

export const authInitialProps = () => ({ req, res }) => {
  const auth = req ? getServerSideToken(req) : getClientSideToken();

  return { auth };
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
