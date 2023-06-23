import React, { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
const SignUp = () => {
  const [loading, setloading] = useState(false);
    let navigate = useNavigate();
    const [credentials, setcredentials] = useState({name: "", email: "", password: ""});
    const handleSubmit = async (e) => {
        e.preventDefault();
        const host = process.env.REACT_APP_BACKEND_URL;
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
            navigate('/');
        }
        else {
          setloading(false);
            if(json.validationError)
            {
                toast.error(json.error[0].msg)
            }
            else
            {
                toast.error(json.error)
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
        <h2 className="login__heading">Register</h2>
        <p className="login__subheading">Join us to explore more stuff..!</p>
        <form className="login__container login__form" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="user_name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="user_name"
              aria-describedby="emailHelp"
              name="name"
              value={credentials.name}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="user_email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
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
              className="form-control"
              id="user_password"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "1.5rem",
            }}
          >
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                backgroundColor: "#e0e0e0",
                color: "black",
                border: "none",
              }}
              onClick={()=>{
                setloading(true)
              }}
            >
              {loading ? (
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
        <p className="bottom__heading">
          Already Member?
          <Link className="bottom__heading_link" to="/login">
            Login
          </Link>
        </p>
      </div>
    </>
  );
}

export default SignUp