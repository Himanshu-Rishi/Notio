import React, { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    let navigate = useNavigate();
    const [credentials, setcredentials] = useState({email: "", password: ""});
    const handleSubmit = async(e)=>
    {
        e.preventDefault();
        const host = process.env.REACT_APP_BACKEND_URL;
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        if(json.success)
        {
            localStorage.setItem('token', json.token);
            navigate('/');
        }
        else
        {
            if (json.validationError) {
              toast.error(json.error[0].msg);
            } else {
              toast.error(json.error);
            }
        }
    }
    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }
  return (
    <>
      <Toaster reverseOrder={false} position="top-center" />
      <div className="login__box">
        <h2 className="login__heading">Login</h2>
        <p className="login__subheading">Happy to see you again..!</p>
        <form className="login__container login__form" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="user_email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control input__field"
              id="user_email"
              aria-describedby="emailHelp"
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="user_password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control input__field"
              id="user_password"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>
          <div style={{display: "flex", justifyContent: "center", marginTop: "1.5rem"}}>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login