import React from "react";
import styled from "styled-components";
import { Fade } from "react-reveal";

function Location(props) {
  return (
    <Container>
      <div className="main-location">
        <img src={props.map} alt="location" className="map" />
        <div className="sub-location">
          <Fade top duration={3000}>
            <div className="location">
              <h1>Company Address</h1>
              <h6>
                <span>Location:</span>
                <br />
                GM-032-8747, Atomic Junction Opp. Firestone Bustop
                <br />
                <span>Email:</span>
                <br />
                Info.agrobiochem@gmail.com
                <br />
                <span>Contact:</span>
                <br />
                0243430794
              </h6>
            </div>
          </Fade>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .main-location {
    display: flex;
    width: 100%;
    height: 60vh;
  }
  .map {
    width: 100%;
  }
  .sub-location {
    position: absolute;
    top: 2;
    z-index: 2;
    width: 10%;
    padding: 3% 20% 0% 60%;
  }
  .location {
    background: #0aa815ff;
    width: 300px;
    height: 41vh;
    line-height: 30px;
    box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.3);
    border-radius: 20px;
  }

  .location h1 {
    font-family: Kanit;
    padding: 3% 4%;
    color: white;
    font-size: 25px;
  }
  .location h6 {
    color: #ffffffff;
    font-family: Kanit;
    padding: 5% 10%;
    font-size: 15px;
    span {
      color: yellow;
    }
  }
  @media (max-width: 420px) {
    .map {
      width: 107%;
    }
    .main-location {
      width: 100%;
      height: 40vh;
    }
    .sub-location {
      padding: 5% 0% 0% 40%;
    }
    .location {
      width: 250px;
      height: 35vh;
    }
  }
`;
export default Location;
