import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const SignUp = () => {
    let navigate = useNavigate();
    const [credentials, setcredentials] = useState({name: "", email: "", password: "", cpassword: ""});
    const handleSubmit = async (e) => {
        e.preventDefault();
        const host = 'http://localhost:5000'
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem('token', json.token);
            console.log(json)
            navigate('/');
        }
        else {
            alert("Error")
        }
    }
    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }
  return (
      <form onSubmit={handleSubmit}>
          <div className="mb-3">
              <label htmlFor="user_name" className="form-label">Name</label>
              <input type="text" className="form-control" id="user_name" aria-describedby="emailHelp" name='name' value={credentials.name} onChange={onChange} />
          </div>
          <div className="mb-3">
              <label htmlFor="user_email" className="form-label">Email address</label>
              <input type="email" className="form-control" id="user_email" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange} />
          </div>
          <div className="mb-3">
              <label htmlFor="user_password" className="form-label">Password</label>
              <input type="password" className="form-control" id="user_password" name='password' value={credentials.password} onChange={onChange} />
          </div>
          <div className="mb-3">
              <label htmlFor="cpassword" className="form-label">Confirm Password</label>
              <input type="password" className="form-control" id="cpassword" name='cpassword' value={credentials.cpassword} onChange={onChange} />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
      </form>
  )
}

export default SignUp