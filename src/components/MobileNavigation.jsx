import React, { useState } from "react";
import styled from "styled-components";
import { Fade } from "react-reveal";
import Product from "../assets/Products.png";
import Service from "../assets/Services.png";
import Resource from "../assets/Abouts.png";

function MobileNavigation({
  onOpenHerbicide,
  onOpenInsecticide,
  onOpenFungicide,
  onOpenFertilizer,
  onOpenHormone,
  onOpenService,
  onOpenResource,
}) {
  const [productmain, setProductmain] = useState(false);

  return (
    <Container>
      <nav className="nav">
        <ul>
          <Fade left duration={1000}>
            <div className="menu1">
              <img src={Service} alt="services" />
              <li className="list" onClick={onOpenService }>Services</li>
            </div>
          </Fade>

          <Fade left duration={1500}>
            <div className="menu2">
              <img src={Resource} alt="resources" />
              <li className="list" onClick={onOpenResource}>Resources</li>
            </div>
          </Fade>
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
                  <li onClick={onOpenHerbicide}>Herbicides</li>
                </Fade>
                <Fade top duration={1200}>
                  <li onClick={onOpenInsecticide}>Insecticide</li>
                </Fade>
                <Fade top duration={1400}>
                  <li onClick={onOpenFungicide}>Fungicide</li>
                </Fade>
                <Fade top duration={1600}>
                  <li onClick={onOpenFertilizer}>Fertilizer</li>
                </Fade>
                <Fade top duration={1800}>
                  <li onClick={onOpenHormone}>Hormone</li>
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
    .menu1 {
      display: flex;
    }
    .menu2 {
      display: flex;
    }
    .menu3 {
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
    .list_down {
      padding: 3% 30%;
      li {
        font-size: 16px;
        line-height: 40px;
        color: #ffffff;
        font-family: Poppins;
        list-style-type: none;
      }
    }
    .alignment {
      position: fixed;
      inset: 0;
      z-index: 9999;
      width: 100%;
      height: 100vh;
      display: flex;
      background: white;
    }
  }
`;
export default MobileNavigation;
