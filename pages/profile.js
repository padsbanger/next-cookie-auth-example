import React, { useEffect, useState } from 'react'

import Layout from '../components/Layout'
import { getUserProfile, authInitialProps } from '../lib/auth'

export default function Profile(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserProfile().then(({ user }) => {
      setUser(user)
    })
  }, [])
  return (
    <Layout title="profile" {...props}>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </Layout>
  )
}

Profile.getInitialProps = authInitialProps()