import React from 'react';
import styled from 'styled-components';
import { Fade } from 'react-reveal';

function DashQuestion() {


  return (
    <Container>
      <div className="question">
        <Fade duration={1000}>
          <h1 className="header">Questions</h1>
        </Fade>
      </div>
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
  .question {
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
    border: 2px solid rgba(128, 128, 128, 0.91);
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
    background: rgba(226, 226, 226, 0.86);
    position: absolute;
    top: 0;
    display: block;
    width: 50%;
    height: 95%;
    z-index: 5;
    backdrop-filter: blur(10px);
    overflow-x: hidden;
    overflow-y: hidden;
    padding: 1% 10%;
  }
  .questionMain {
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

export default DashQuestion;
