import React, { useState } from "react";
import styled from "styled-components";
import { Fade } from "react-reveal";
import Product from "../assets/Product.png";
import Service from "../assets/Service.png";
import Resource from "../assets/About.png";
import AllProducts from "../utils/AllProducts";
import ServiceMain from "../utils/Services";
import ResourceMain from "../utils/Supports";
import Cancel from "../assets/cancel_1.png";
function MobileNavigation() {
  const [productmain, setProductmain] = useState(false);
  const [servicemain, setServicemain] = useState(false);
  const [resourcemain, setResourcemain] = useState(false);

  const handleProMenuIn = () => {
    setProductmain(true);
  };
  const handleProMenuOut = () => {
    setProductmain(false);
  };
  const handleServiceMenuIn = () => {
    setServicemain(true);
  };
  const handleServiceMenuOut = () => {
    setServicemain(false);
  };
  const handleResourceMenuIn = () => {
    setResourcemain(true);
  };
  const handleResourceMenuOut = () => {
    setResourcemain(false);
  };
  return (
    <Container>
      <nav className="nav">
        <ul>
          <Fade left duration={1000}>
            <div className="menu1" onClick={handleServiceMenuIn}>
              <img src={Service} alt="services" />
              <li>Services</li>
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
                      onClick={handleServiceMenuOut}
                    />
                  </div>
                  <ServiceMain />
                </div>
              </Fade>
            </div>
          )}
          <Fade left duration={1500}>
            <div className="menu2" onClick={handleResourceMenuIn}>
              <img src={Resource} alt="resources" />
              <li>Resources</li>
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
                      onClick={handleResourceMenuOut}
                    />
                  </div>
                  <ResourceMain />
                </div>
              </Fade>
            </div>
          )}

          <Fade left duration={2000}>
            <div className="menu3" onClick={handleProMenuIn}>
              <img src={Product} alt="products" />
              <li>Products</li>
            </div>
          </Fade>
          {productmain && (
            <div className="products">
              <Fade bottom duration={1000}>
                <div className="details">
                  <div className="cancel">
                    <img src={Cancel} alt="remove" onClick={handleProMenuOut} />
                  </div>
                  <AllProducts />
                </div>
              </Fade>
            </div>
          )}
        </ul>
      </nav>
    </Container>
  );
}

const Container = styled.div`
  @media (max-width: 480px) {
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
        width: 80px;
        height: 80px;
    }
    ul li {
      padding: 25% 10%;
      color: rgba(135, 251, 52, 1);
      list-style-type: none;
      text-decoration: none;
      font-family: "Poppins";
      font-size: 25px;
      font-weight: bolder;
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
