import React, { useState } from "react";
import styled from "styled-components";
import { Fade } from "react-reveal";
import Product from "../assets/Products.png";
import Service from "../assets/Services.png";
import Resource from "../assets/About.png";
import ServiceMain from "../utils/Services";
import ResourceMain from "../utils/Supports";
import Cancel from "../assets/cancel_1.png";
function MobileNavigation() {
  const [productmain, setProductmain] = useState(false);
  const [servicemain, setServicemain] = useState(false);
  const [resourcemain, setResourcemain] = useState(false);

  return (
    <Container>
      <nav className="nav">
        <ul>
          <Fade left duration={1000}>
            <div
              className="menu1"
              onClick={() => {
                setServicemain(true);
              }}
            >
              <img src={Service} alt="services" />
              <li className="list">Services</li>
            </div>
          </Fade>
          {servicemain && (
            <div className="products">
              <Fade bottom duration={1000}>
                <div className="details">
                  <div className="cancel">
                    <img
                      src={Cancel}
                      alt="remove"
                      onClick={() => {
                        setServicemain(false);
                      }}
                    />
                  </div>
                  <ServiceMain />
                </div>
              </Fade>
            </div>
          )}
          <Fade left duration={1500}>
            <div
              className="menu2"
              onClick={() => {
                setResourcemain(true);
              }}
            >
              <img src={Resource} alt="resources" />
              <li className="list">Resources</li>
            </div>
          </Fade>
          {resourcemain && (
            <div className="products">
              <Fade bottom duration={1000}>
                <div className="details">
                  <div className="cancel">
                    <img
                      src={Cancel}
                      alt="remove"
                      onClick={() => {
                        setResourcemain(false);
                      }}
                    />
                  </div>
                  <ResourceMain />
                </div>
              </Fade>
            </div>
          )}

          <Fade left duration={2000}>
            <div
              className="menu3"
              onClick={() => {
                setProductmain(true);
              }}
            >
              <img src={Product} alt="products" />
              <li className="list">Products</li>
            </div>
          </Fade>
          {productmain && (
              <div className="list_down">
                <ul>
                  <Fade top duration={1000}>
                    <li>Herbicides</li>
                  </Fade>
                  <Fade top duration={1200}>
                    <li>Insecticide</li>
                  </Fade>
                  <Fade top duration={1400}>
                    <li>Fungicide</li>
                  </Fade>
                  <Fade top duration={1600}>
                    <li>Fertilizer</li>
                  </Fade>
                  <Fade top duration={1800}>
                    <li>Hormone</li>
                  </Fade>
                </ul>
              </div>
          )}
        </ul>
      </nav>
    </Container>
  );
}

const Container = styled.div`
  @media (max-width: 420px) {
  .nav {
      width: 100%;
      height: 100%;
      padding: 50% 20%;
    }
    .menu1{
      display: flex;
    }
    .menu2{
      display: flex;
    }
    .menu3{
      display: flex;
    }
    img {
      padding: 15% 0%;
        width: 50px;
        height: 50px;
    }
    .list {
      padding: 25% 10%;
      color: rgba(135, 251, 52, 1);
      list-style-type: none;
      text-decoration: none;
      font-family: "Poppins";
      font-size: 18px;
      font-weight: bolder;
    }
    .list_down{
      padding: 3% 30%;
      li{
        font-size: 16px;
        line-height: 40px;
        color: gray;
        font-family: Poppins;
        list-style-type: none;
      }
    }
    .products{
      background: rgba(17, 17, 17, 0.67);
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      width: 100%;
      height: 107vh;
      z-index: 5;
      backdrop-filter: blur(70px);
      overflow: hidden;
      padding: 0% 0%;
    }
    .details{
      background: white;
      width: 100%;
      height: 100%;
    }
  }
  .cancel{
    width: 30px;
    height: 30px;
    float: right;
    padding: 1%;
    img{
      width: 20px;
      height: 20px;
    }
  }
}
`;
export default MobileNavigation;
