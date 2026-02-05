import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function AuthenticationUtils(props) {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSecret = async (event) => {
    event.preventDefault();

    if (!password) {
      toast.error("Password must be provided");
      setPassword("");
      return;
    }

    try {
      const res = await fetch(
        "https://agro-bio-chem-backend.vercel.app/agrobiochem/api/keys/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        }
      );

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        toast.success("Login Successful");
        navigate("/adminkey");
      } else {
        toast.error("Invalid Password");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setPassword("");
    }
  };
  return (
    <Container>
      <div className="key-main">
        <img src={props.log} alt="logo" className="logo-main" />
        <form onSubmit={handleSecret}>
          <div className="key-sub">
            <input
              type="password"
              name="key"
              className="key"
              placeholder="Enter the Key"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="key-sub1">
            <input type="submit" value="Connect" className="key-button" />
          </div>
        </form>
        <div className="link">
          <Link to="/" className="link-main">
            <h5> Go back</h5>
          </Link>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  margin: 0;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  .logo-main {
    width: 600px;
  }
  .key-sub {
    padding: 5% 20%;
    .key {
      width: 380px;
      height: 55px;
      padding: 0% 10%;
      border: none;
      border-radius: 10px;
      outline: none;
      color: grey;
      text-align: center;
      background: rgb(255, 255, 255);
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.8);
      font-family: "Poppins", sans-serif;
    }
    .key::placeholder {
      color: grey;
    }
  }
  .key-sub1 {
    padding: 5% 33%;
    .key-button {
      width: 300px;
      height: 55px;
      padding: 0% 10%;
      border: none;
      border-radius: 10px;
      outline: none;
      color: white;
      text-align: center;
      background: rgba(78, 148, 12, 0.84);
      font-family: "Poppins", sans-serif;
    }
    .key-sub1::placeholder {
      color: white;
    }
    .key-button:hover {
      cursor: pointer;
      transform: scale(1.1);
    }
  }
  .link {
    width: 100%;
    padding: 0% 8%;
  }
  .link-main {
    text-decoration: none;
    text-align: center;
    color: grey;
    h5:hover{
      cursor: pointer;
      transform: scale(1.1);
    }
  }
`;
export default AuthenticationUtils;
