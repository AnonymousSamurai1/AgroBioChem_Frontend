import React, { useState } from 'react';
import styled from 'styled-components';
import addImage from '../assets/Add.png';
import Cancel from '../assets/cancel_1.png';
import { Fade } from 'react-reveal';

function DashService() {
  const [load, setLoader] = useState(false);

  const handleToggleIn = () => {
    setLoader(true);
  };
  const handleToggleOut = () => {
    setLoader(false);
  };

  return (
    <Container>
      <div className="service">
        <Fade duration={1000}>
          <h1 className="header">Services</h1>
          <img
            src={addImage}
            alt="add"
            className="add"
            onClick={handleToggleIn}
          />
        </Fade>
      </div>
      {load && (
        <div className="inputMain">
          <Fade bottom duration={1000}>
            <div className="serviceMain">
              <img
                src={Cancel}
                alt="Cancel"
                className="cancel"
                onClick={handleToggleOut}
              />
              <h1>Hello</h1>
            </div>
          </Fade>
        </div>
      )}
      <Fade duration={1000}>
        <form action="">
          <input
            type="text"
            name=""
            className="search"
            placeholder="Search by name"
          />
        </form>
      </Fade>
    </Container>
  );
}

const Container = styled.div`
  width: 58vh;
  padding: 4% 0%;
  .service {
    display: flex;
  }
  .header {
    padding: 5% 100%;
    color: gray;
    font-family: 'Poppins', sans-serif;
  }
  form {
    padding: 2% 60%;
  }
  .search {
    width: 500px;
    height: 35px;
    padding: 1% 10%;
    border: 2px solid rgba(82, 81, 81, 0.81);
    outline: none;
    resize: none;
    border-radius: 10px;
    font-family: 'Rubik';
    text-indent: 3%;
    color: gray;
  }
  .add {
    width: 50px;
    height: 50px;
    border-radius: 10px;
    :hover {
      cursor: pointer;
      transform: scale(1.1);
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.8);
    }
  }
  .inputMain {
    background: rgba(199, 199, 199, 0.86);
    position: absolute;
    top: 0;
    display: block;
    width: 50%;
    height: 95.7%;
    z-index: 5;
    backdrop-filter: blur(10px);
    overflow-x: hidden;
    overflow-y: hidden;
    padding: 1% 10%;
  }
  .serviceMain {
    background: white;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.3);
  }
  .cancel {
    float: right;
    padding: 2% 1%;
    width: 30px;
    :hover {
      cursor: pointer;
    }
  }
`;

export default DashService;
