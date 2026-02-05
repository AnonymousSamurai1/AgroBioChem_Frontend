import React, { useState } from 'react';
import styled from 'styled-components';
import Logo from '../assets/logo2.png';
import { Fade } from 'react-reveal';
import Username from '../assets/username.png';
import Password from '../assets/password.png';
import Email from '../assets/mail.png';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Credentials = () => {
  const [register, setRegister] = useState(false);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [fullname, setFullname] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!loginEmail || !loginPassword) {
      toast.error('Email or Password must be provided');
      return;
    }

    try {
      const res = await fetch(
        'http://localhost:5612/agrobiochem/api/admins/login',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: loginEmail, password: loginPassword }),
        }
      );

      const data = await res.json();

      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('fullname', data.admin.fullname);
        toast.success('Login Successful');
        navigate('/dash');
      } else {
        toast.error('Invalid Email or Password');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoginPassword('');
    }
  };

  const handleSignup = async (event) => {
    event.preventDefault();

    if (
      !fullname ||
      !dob ||
      !gender ||
      !location ||
      !contact ||
      !signupEmail ||
      !signupPassword
    ) {
      toast.error('Please fill all the fields');
      return;
    }

    try {
      const res = await fetch('http://localhost:5612/agrobiochem/api/admins/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullname,
          dob,
          gender,
          location,
          contact,
          email: signupEmail,
          password: signupPassword,
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success('Signup Successful');
        setRegister(false);
        setFullname("");
        setDob("");
        setGender("");
        setLocation("");
        setContact("");
        setSignupEmail("");
        setSignupPassword("");
      } else {
        toast.error(data.message || 'Signup failed');
      }
    } catch (error) {
      toast.error('Something went wrong during signup');
    }
  };

  return (
    <Container>
      <Fade>
        <div className="Logo">
          <Fade left duration={1000}>
            <img src={Logo} alt="logo" className="logo" />
          </Fade>
        </div>
        <div className="credentials" id="login">
          <h1 className="title">Login</h1>

          <form onSubmit={handleLogin} className="login">
            <div className="credential-main">
              <div className="credential-image">
                <img src={Username} alt="username" />
              </div>
              <input
                type="email"
                name="loginEmail"
                className="username"
                placeholder="username / email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div className="credential-main">
              <div className="credential-image">
                <img src={Password} alt="password" />
              </div>
              <input
                type="password"
                name="loginPassword"
                placeholder="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <div className="submit">
              <input type="submit" value="Login" className="login-button" />
            </div>
          </form>

          <p className="register-link">
            New as an admin?{' '}
            <span onClick={() => setRegister(true)}>Register</span>
          </p>

          {register && (
            <div className="registration">
              <h1 className="title1">SignUp</h1>

              <form onSubmit={handleSignup} className="login">
                <div className="credential-main1">
                  <div className="credential-image1">
                    <img src={Username} alt="fullname" />
                  </div>
                  <input
                    type="text"
                    name="fullname"
                    placeholder="Fullname"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                  />
                </div>

                <div className="credential-main2">
                  <div className="date">
                    <input
                      type="date"
                      name="dob"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                    />
                  </div>
                  <div className="select">
                    <select
                      name="gender"
                      className="gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>

                <div className="credential-main2">
                  <div className="date">
                    <input
                      type="text"
                      name="location"
                      placeholder="Enter your Location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                  <div className="select">
                    <input
                      type="text"
                      name="contact"
                      placeholder="Contact"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                    />
                  </div>
                </div>

                <div className="credential-main1">
                  <div className="credential-image1">
                    <img src={Email} alt="email" />
                  </div>
                  <input
                    type="email"
                    name="signupEmail"
                    placeholder="Email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                  />
                </div>

                <div className="credential-main1">
                  <div className="credential-image1">
                    <img src={Password} alt="password" />
                  </div>
                  <input
                    type="password"
                    name="signupPassword"
                    placeholder="Password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                  />
                </div>

                <div className="submit1">
                  <input
                    type="submit"
                    value="Register"
                    className="login-button"
                  />
                </div>
              </form>

              <p className="register-link">
                Already Registered?{' '}
                <span onClick={() => setRegister(false)}>Sign In</span>
              </p>
            </div>
          )}
        </div>
      </Fade>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  .Logo {
    width: 100%;
  }
  .logo {
    width: 600px;
    padding: 40% 10% 10% 10%;
  }
  .credentials {
    background: green;
    width: 100%;
    height: 100vh;
  }
  .title {
    color: white;
    font-family: 'Poppins', sans-serif;
    text-align: center;
    padding: 20% 0% 3% 0%;
    font-size: 50px;
  }
  .login {
    padding: 0% 16%;
  }
  .credential-main {
    display: flex;
    width: 100%;
    padding: 4% 0%;
    input {
      width: 400px;
      height: 55px;
      padding: 0% 3%;
      border: none;
      border-radius: 10px;
      outline: none;
      color: gray;
      font-family: 'Poppins', sans-serif;
    }
  }
  .credential-image {
    padding: 2% 2%;
    img {
      width: 30px;
    }
  }
  .submit {
    padding: 7% 23%;
    .login-button {
      width: 300px;
      height: 55px;
      border: none;
      border-radius: 10px;
      font-size: 25px;
      font-weight: bold;
      color: green;
    }
  }
  .login-button:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
  .register-link {
    text-align: center;
    color: white;
    font-family: 'Poppins', sans-serif;
    span {
      color: yellow;
    }
    span:hover {
      cursor: pointer;
      transform: scale(1.1);
    }
  }
  .registration {
    position: absolute;
    top: 0;
    background: green;
    width: 100%;
    height: 100%;
  }
  .title1 {
    color: white;
    font-family: 'Poppins', sans-serif;
    text-align: center;
    padding: 5% 0% 1% 0%;
    font-size: 50px;
  }
  .credential-main1 {
    display: flex;
    width: 100%;
    padding: 4% 0%;
    input {
      width: 400px;
      height: 50px;
      padding: 0% 3%;
      border: none;
      border-radius: 10px;
      outline: none;
      color: gray;
      font-family: 'Poppins', sans-serif;
    }
  }
  .credential-main2 {
    display: flex;
    width: 30%;
    padding: 4% 6.5%;
    .date {
      padding: 0% 10%;
      input {
        width: 200px;
        height: 50px;
        padding: 0% 5%;
        border: none;
        border-radius: 10px;
        outline: none;
        color: gray;
        font-family: 'Poppins', sans-serif;
      }
    }
    .select {
      padding: 0% 10%;
      .gender {
        width: 200px;
        height: 50px;
        padding: 0% 10% 0% 5%;
        border: none;
        border-radius: 10px;
        outline: none;
        color: gray;
        font-family: 'Poppins', sans-serif;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        background-color: white;
        background-size: 20px;
        cursor: pointer;
      }
      input {
        width: 190px;
        height: 50px;
        padding: 0% 0% 0% 5%;
        border: none;
        border-radius: 10px;
        outline: none;
        color: gray;
        font-family: 'Poppins', sans-serif;
      }
    }
  }
  .credential-image1 {
    padding: 2% 2%;
    img {
      width: 30px;
    }
  }
  .submit1 {
    padding: 3% 23%;
    .login-button {
      width: 300px;
      height: 55px;
      border: none;
      border-radius: 10px;
      font-size: 25px;
      font-weight: bold;
      color: green;
    }
  }
`;

export default Credentials;
