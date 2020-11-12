import React, { useState } from 'react';
import { loginUser } from '../lib/auth'

function LoginForm() {
  const [form, setFormState] = useState({ email: 'Sincere@april.biz', password: 'hildegard.org' })

  const handleChange = (value) => {
    setFormState({...form, ...value})
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    loginUser(form)
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
        <button type="submit">Submit</button>
      </form>
    )
}

export default LoginForm