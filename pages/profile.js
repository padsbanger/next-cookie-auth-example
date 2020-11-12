import React, { useEffect, useState } from 'react'
import { getUserProfile } from '../lib/auth'

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserProfile().then(({ user }) => {
      setUser(user)
    })
  }, [])
  return (
    <div>{JSON.stringify(user, null, 2)}</div>
  )
}