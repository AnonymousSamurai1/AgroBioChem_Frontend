import React from "react";
import styled from "styled-components";
import Typed from "react-typed";
import { Fade } from "react-reveal";

function Mission(props) {
  return (
    <Container>
      <div className="main-mission">
        <div className="mission-image">
          <Fade left duration={2000}>
            <img src={props.mis} alt="mission" />
          </Fade>
        </div>
        <div className="mission-description">
          <Typed
            strings={["Mission"]}
            typeSpeed={80}
            backSpeed={80}
            loop
            className="typed1"
          />
          <h6>
            AGROBIOCHEM is dedicated to drive transformation and improving
            agricultural productivity and production with eco-friendly,
            efficient and sustainable agri-business solutions
          </h6>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .main-mission {
    display: flex;
    width: 100%;
    height: 60vh;
  }
  .mission-image {
    width: 100%;
    height: 100%;
    img {
      padding: 20% 10%;
      width: 95%;
      height: 70%;
    }
  }
  .mission-description {
    width: 80%;
    padding: 10% 5%;
    .typed1 {
      font-size: 49px;
      background: linear-gradient(
        97.24deg,
        rgb(63, 212, 50) 44.37%,
        rgba(160, 207, 167, 0.25) 113.02%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
      font-weight: bolder;
      font-family: "Poppins", sans-serif;
      padding: 25%;
    }
    h6 {
      color: rgb(71, 71, 71);
      font-size: 15px;
      padding: 5% 0%;
      text-align: left;
      font-family: "Poppins", sans-serif;
    }
  }
`;
export default Mission;
