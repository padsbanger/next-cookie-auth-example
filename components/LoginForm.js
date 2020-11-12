import { useRouter } from 'next/router'
import React, { useState } from 'react';
import { loginUser } from '../lib/auth'

function LoginForm() {
  const [form, setFormState] = useState({ email: 'Sincere@april.biz', password: 'hildegard.org' })
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter()
  const handleChange = (value) => {
    setFormState({...form, ...value})
  }

  const handleSubmit = (event) => {
    setLoading(true)
    event.preventDefault();
    loginUser(form).then(() => {
      router.push('/profile')
      setError('')
      setLoading(false)
    })
      .catch((err) => {
        setError(err.response && err.response.data || err.message)
        setLoading(false)
    })
  }

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            type="email"
            value={form.email}
            name="email"
            placeholder="email"
            onChange={(event) => {
              handleChange({'email': event.target.value})
          }}/>
        </div>
        <div>
          <input
            type="text"
            type="password"
            value={form.password}
            name="password"
            placeholder="password"
            onChange={(event) => {
              handleChange({'password': event.target.value})
          }}/>
        </div>
        <button disabled={loading} type="submit">{loading ?'Loading' : 'Login'}</button>
        <div>{error ? error : ''}</div>
      </form>
    )
}

export default LoginForm