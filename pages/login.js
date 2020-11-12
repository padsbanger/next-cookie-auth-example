import React from 'react';

import LoginForm from '../components/LoginForm'
import Layout from '../components/Layout'
import { authInitialProps } from '../lib/auth'
function Login(props) {
  return (
    <Layout title="Login" {...props}>
      <LoginForm />
    </Layout>
  );
}

Login.getInitialProps = authInitialProps()

export default Login;