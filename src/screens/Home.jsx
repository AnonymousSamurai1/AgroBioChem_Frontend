import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import IntroPage from "../assets/AgroBioChem.mp4";
import IntroDescription from "../components/IntroDescription";
import Logo from "../assets/logo2.png";
import Mission from "../assets/Mission_Image.png";
import Vision from "../assets/Vision_Image.png";
import Menu from "../assets/Menu.png";
import Typed from "react-typed";
import { Slide } from "react-slideshow-image";
import Person1 from "../assets/person1.png";
import Person2 from "../assets/person2.png";
import Person3 from "../assets/person3.png";
import { Fade } from "react-reveal";
import Enquiry from "../utils/Enquiry";
import Location from "../utils/Location";
import LocationImage from "../assets/map.png";
import Cancel from "../assets/cancel.png";
import Cancel1 from "../assets/cancel_1.png";
import Navbar from "../components/WebNavigation";
import { Link } from "react-router-dom";
import MobileNavigation from "../components/MobileNavigation";
import Facebook from "../assets/Facebook1.png";
import Instagram from "../assets/Instagram1.png";
import WhatsApp from "../assets/WhatsApp1.png";
import Herbicides from "../utils/Herbicides";
import Insecticides from "../utils/Insecticides";
import Fungicides from "../utils/Fungicides";
import Fertilizers from "../utils/Fertilizers";
import Hormones from "../utils/Hormones";
import Services from "../utils/Services";
import Resources from "../utils/Supports";

const GlobalStyle = createGlobalStyle`
  body.lock-scroll {
    overflow: hidden;
    touch-action: none;
    overscroll-behavior: none;
  }
`;

function Home() {
  const [click, setClick] = useState(false);
  const [showHerbicide, setShowHerbicide] = useState(false);
  const [showInsecticide, setShowInsecticide] = useState(false);
  const [showFungicide, setShowFungicide] = useState(false);
  const [showFertilizer, setShowFertilizer] = useState(false);
  const [showHormone, setShowHormone] = useState(false);
  const [showService, setShowService] = useState(false);
  const [showResource, setShowResource] = useState(false);

  const slideImages = [
    {
      image: Person1,
      description:
        '"AGROBIOCHEM transformed our crop yield in one season. Reliable and science-driven!"',
      name: "Esther M., Agripreneur",
    },
    {
      image: Person2,
      description:
        '"Their biocontrol solutions saved my farm from devastating disease. Highly recommend!"',
      name: "Kwame A., Plantain Farmer",
    },
    {
      image: Person3,
      description:
        '"Professional, innovative, and effective — AGROBIOCHEM is a game-changer for agriculture."',
      name: "Daniel T., Extension Officer",
    },
  ];

  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (toggle) {
      document.body.classList.add("lock-scroll");
    } else {
      document.body.classList.remove("lock-scroll");
    }
    return () => document.body.classList.remove("lock-scroll");
  }, [toggle]);

  return (
    <>
      <GlobalStyle />
      <Container>
        <div className="introduction">
          <video src={IntroPage} autoPlay loop muted className="video" />

          <div className="description">
            <div className="icons">
              <img src={Logo} alt="Logo" className="logo" />
              <div className="button-container">
                <button onClick={() => setClick(true)} className="button">
                  {" "}
                  GET STARTED
                </button>
                {click && (
                  <div className="menu-main">
                    <img
                      src={Cancel}
                      alt="Cancel"
                      className="cancel-main"
                      onClick={() => setClick(false)}
                    />
                    <Navbar />
                    <Link to="/authen">
                      <h3 className="h3">For Admins Only</h3>
                    </Link>
                  </div>
                )}
              </div>

              <img
                src={Menu}
                alt="menu"
                className="menu"
                onClick={() => setToggle(true)}
              />
            </div>

            {toggle && (
              <div className="toggle_main">
                <Fade left duration={1000}>
                  <div className="toggle-background">
                    <MobileNavigation
                      onOpenService={() => setShowService(true)}
                      onOpenResource={() => setShowResource(true)}
                      onOpenHerbicide={() => setShowHerbicide(true)}
                      onOpenInsecticide={() => setShowInsecticide(true)}
                      onOpenFungicide={() => setShowFungicide(true)}
                      onOpenFertilizer={() => setShowFertilizer(true)}
                      onOpenHormone={() => setShowHormone(true)}
                    />
                  </div>
                </Fade>
                <div className="blank" onClick={() => setToggle(false)} />
              </div>
            )}
            <IntroDescription />
          </div>
        </div>

        <div className="other-details">
          <div className="mission-background">
            <Typed
              strings={["Mission"]}
              typeSpeed={80}
              backSpeed={80}
              loop
              className="typed-mission"
            />
            <div className="mission">
              <Fade left duration={1000}>
                <img src={Mission} alt="mission" />
              </Fade>
              <p className="mission-details">
                AGROBIOCHEM is dedicated to driving transformation and improving
                agricultural productivity and production with eco-friendly,
                efficient, and sustainable agri-business solutions.
              </p>
            </div>
          </div>

          <div className="vision-background">
            <div className="vision-main">
              <Typed
                strings={["Vision"]}
                typeSpeed={80}
                backSpeed={80}
                loop
                className="typed-vision"
              />
              <div className="vision">
                <Fade right duration={1000}>
                  <img src={Vision} alt="vision" />
                </Fade>
                <p className="vision-details">
                  AGROBIOCHEM aims to be a reputable Modern Agriculture
                  Technology and Agri-business firm and leader within Africa
                  that offers cutting-edge technology and standard practices for
                  a sustainable environment, industry, livelihood, and family.
                </p>
              </div>
            </div>
          </div>

          <div className="testimony">
            <Typed
              strings={["Testimonies"]}
              typeSpeed={80}
              backSpeed={80}
              loop
              className="testimony-main"
            />
            <div className="testimony-details">
              <p>
                Discover the experiences of farmers who have improved their
                harvests using our products.
              </p>
            </div>
            <div className="details-sub">
              <Slide
                arrows={false}
                indicators={true}
                duration={3000}
                transitionDuration={500}
              >
                {slideImages.map((each, index) => (
                  <div key={index} className="slide">
                    <div className="main-slide">
                      <img
                        src={each.image}
                        alt="testimonial"
                        className="slider"
                      />
                      <h2>{each.description}</h2>
                      <p>{each.name}</p>
                    </div>
                  </div>
                ))}
              </Slide>
            </div>
          </div>

          <div className="enquire">
            <Enquiry />
          </div>

          <div className="location">
            <Location map={LocationImage} />
          </div>
        </div>
        <footer>
          <div className="logos-footer">
            <img src={Facebook} alt="facebook" />
            <img src={Instagram} alt="Instagram" />
            <img src={WhatsApp} alt="whatsapp" />
          </div>
          <p>&copy; 2025 AgroBioChem. All rights reserved.</p>
        </footer>

        {showService && (
          <div className="global-modal">
            <div
              className="blank_a"
              onClick={() => {
                setShowService(false);
              }}
            />
            <br />
            <Fade bottom duration={1000}>
              <div className="global-modal-box">
              <img
                src={Cancel1}
                alt="cancel1"
                className="cancel1"
                onClick={() => {
                setShowService(false);
              }}
              />
              <br />
              <Services remove={Cancel1}/>
              </div>
            </Fade>
          </div>
        )}

        {showResource && (
          <div className="global-modal">
            <div
              className="blank_a"
              onClick={() => {
                setShowResource(false);
              }}
            />
            <br />
            <Fade bottom duration={1000}>
              <div className="global-modal-box">
              <img
                src={Cancel1}
                alt="cancel1"
                className="cancel1"
                onClick={() => {
                setShowResource(false);
              }}
              />
              <br />
              <Resources remove={Cancel1}/>
              </div>
            </Fade>
          </div>
        )}

        {showHerbicide && (
          <div className="global-modal">
            <div
              className="blank_a"
              onClick={() => {
                setShowHerbicide(false);
              }}
            />
            <br />
            <Fade bottom duration={1000}>
              <div className="global-modal-box">
              <img
                src={Cancel1}
                alt="cancel1"
                className="cancel1"
                onClick={() => {
                setShowHerbicide(false);
              }}
              />
              <br />
              <Herbicides remove={Cancel1}/>
              </div>
            </Fade>
          </div>
        )}

        {showInsecticide && (
          <div className="global-modal">
            <div
              className="blank_a"
              onClick={() => {
                setShowInsecticide(false);
              }}
            />
            <br />
            <Fade bottom duration={1000}>
              <div className="global-modal-box">
              <img
                src={Cancel1}
                alt="cancel1"
                className="cancel1"
                onClick={() => {
                setShowInsecticide(false);
              }}
              />
              <br />
              <Insecticides remove={Cancel1}/>
              </div>
            </Fade>
          </div>
        )}

        {showFungicide && (
          <div className="global-modal">
            <div
              className="blank_a"
              onClick={() => {
                setShowFungicide(false);
              }}
            />
            <br />
            <Fade bottom duration={1000}>
              <div className="global-modal-box">
              <img
                src={Cancel1}
                alt="cancel1"
                className="cancel1"
                onClick={() => {
                setShowFungicide(false);
              }}
              />
              <br />
              <Fungicides remove={Cancel1}/>
              </div>
            </Fade>
          </div>
        )}

        {showFertilizer && (
          <div className="global-modal">
            <div
              className="blank_a"
              onClick={() => {
                setShowFertilizer(false);
              }}
            />
            <br />
            <Fade bottom duration={1000}>
              <div className="global-modal-box">
              <img
                src={Cancel1}
                alt="cancel1"
                className="cancel1"
                onClick={() => {
                setShowFertilizer(false);
                }}
              />
              <br />
              <Fertilizers remove={Cancel1}/>
              </div>
            </Fade>
          </div>
        )}

        {showHormone && (
          <div className="global-modal">
            <div
              className="blank_a"
              onClick={() => {
                setShowHormone(false);
              }}
            />
            <br />
            <Fade bottom duration={1000}>
              <div className="global-modal-box">
              <img
                src={Cancel1}
                alt="cancel1"
                className="cancel1"
                onClick={() => {
                setShowHormone(false);
              }}
              />
              <br />
              <Hormones remove={Cancel1}/>
              </div>
            </Fade>
          </div>
        )}
      </Container>
    </>
  );
}

const Container = styled.div`
  .introduction {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-wrap: wrap;
  }
  .menu {
    display: none;
  }
  .video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .description {
    position: absolute;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.8);
    .logo {
      padding: 1%;
      width: 210px;
      height: 55px;
    }
  }
  .icons {
    display: flex;
    justify-content: space-between;
  }
  .button-container {
    padding: 2%;
  }
  .cancel-main {
    float: right;
    padding: 2% 1%;
    width: 30px;
    height: 30px;
    :hover {
      cursor: pointer;
    }
  }
  .button {
    width: 200px;
    height: 50px;
    border-radius: 10px;
    border: none;
    background: rgba(255, 251, 251, 0.39);
    font-family: "Poppins", sans-serif;
    font-style: normal;
    font-weight: 600;
    display: block;
    font-size: 18px;
    line-height: 36px;
    :hover {
      background: transparent;
      cursor: pointer;
      color: rgba(230, 227, 227, 0.989);
      border: 3px solid rgba(230, 227, 227, 0.989);
      transition: 1s;
      transform: scale(1.1);
    }
  }
  .menu-main {
    
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: block;
    width: 100%;
    height: 100%;
    z-index: 5;
    backdrop-filter: blur(10px);
    overflow-x: hidden;
    overflow-y: hidden;
  }
  .h3 {
    float: right;
    padding: 1%;
    font-family: Poppins;
    color: white;
    :hover {
      cursor: pointer;
      color: rgba(79, 204, 44, 0.91);
    }
  }
  .other-details {
    display: none;
  }
  .toggle-background {
    display: none;
  }
  footer{
    display: none;
  }
  .global-modal{
    display: none;
  }
  
  @media (max-width: 420px) {
    .introduction {
      max-height: 100vh;
      max-width: 100%;
    }
    .video{
      width: 106%;
      height: 107vh;
      object-fit: cover;
    }
    .icons {
      display: flex;
      justify-content: space-between;
      padding: 5% 0%;
    }
    .menu {
      display: block;
      width: 60px;
      height: 60px;
      padding-right: 4%;b
    }
    .description {
      width: 107%;
      height: 107vh;
    }
    .other-details {
      display: block;
    }
    .mission-background {
      padding: 20% 10%;
    }
    .typed-mission {
      font-size: 50px;
      background: linear-gradient(rgb(63, 212, 50) 44.37%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight: bolder;
      font-family: "Poppins", sans-serif;
      padding: 10% 25%;
    }
    .mission {
      img {
        padding: 0% 0%;
        width: 350px;
        height: 250px;
      }
      padding: 10% 0%;
      .mission-details {
        width: 107%;
        padding: 10% 0%;
        font-family: "Kanit";
        text-align: left;
        font-size: 20px;
      }
    }
    .vision-background {
      background: rgba(6, 42, 2, 1);
      width: 107%;
    }
    .vision-main {
      padding: 10%;
    }
    .typed-vision {
      font-size: 50px;
      background: linear-gradient(rgba(255, 255, 255, 1) 44.37%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight: bolder;
      font-family: "Poppins", sans-serif;
      padding: 10% 30%;
    }
    .vision {
      padding: 10% 0%;
      img {
        padding: 0% 5%;
      }
      .vision-details {
        padding: 10% 0%;
        font-family: "Kanit";
        text-align: left;
        font-size: 20px;
        color: white;
      }
    }
    .testimony {
      padding: 10% 7% 10% 15%;
    }
    .details-sub {
      border-radius: 20px;
      padding: 6% 0%;
    }
    .slide {
      border: none;
      text-align: center;
      img {
        width: 40%;
        height: 200px;
      }
      .main-slide {
        padding: 0%;
        width: 80%;
        border: none;
        
      }
      .slider{
        width: 370px;
        height: 270px;
      }
      h2 {
        text-align: center;
        padding: 3% 12%;
        color: gray;
        width: 260px;
        font-size: 14px;
        font-family: "Poppins", sans-serif;
      }
      p {
        width: 260px;
        padding: 3% 10%;
        color: grey;
        font-family: Kanit;
      }
    }
    .testimony-main {
      font-size: 40px;
      background: linear-gradient(rgb(63, 212, 50) 44.37%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight: bolder;
      font-family: "Poppins", sans-serif;
      padding: 10% 8%;
    }
    .testimony-details {
      padding: 2% 0% 5% 0%;
      p{
        color: grey;
        font-family: Kanit;
      }
    }
    .toggle_main{
      display: flex;
    }
    .toggle-background {
      background: rgba(7, 7, 7, 0.26);
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      width: 50%;
      height: 107vh;
      z-index: 3;
      backdrop-filter: blur(30px);
      overflow: hidden;
      border-radius: 20px;
    }
    .blank{
      width: 50%;
      height: 107vh;
      position: absolute;
      top: 0;
      left: 50%;
      z-index: 5;
      overflow: hidden;
    }
    .enquire {
      background: rgba(6, 42, 2, 1);
      width: 107%;
    }
    .menu-cancel{
    position: absolute;
    padding: 2% 90%;
      
    }
    .remove {
    position: absolute;
    
      width: 30px;
      height: 30px;
      :hover {
        cursor: pointer;
      }
    }
    .button-container {
      display: none;
    }
    footer {
      display: block;
      background: rgba(6, 42, 2, 1);
      width: 107%;
      height: 20vh;
      p{
        text-align: center;
        padding: 8% 0% 0% 0%;
        color: white;
        font-family: kanit;
      }
    }
    .logos-footer{
      display: flex;
      justify-content: space-between;
      padding: 10% 20% 0% 15%;
      img{
        width: 60px;
        height: 60px;
      }
    }
    .global-modal {
      display: block;
      position: fixed;
      inset: 0;
      z-index: 99999;
      width: 107vw;
      height: 107vh;
      align-items: end;
      background: rgba(0, 0, 0, 0.55);
      backdrop-filter: blur(10px);
      overflow: hidden;
    }
    .blank_a{
      width: 107vw;
      height: 7vh;
    }
    .global-modal-box {
      background: white;
      width: 90.8%;
      min-height: 95vh;
      border-radius: 20px;
      padding: 20px;
      border-radius: 20px 20px 0px 0px;
    }

    .global-cancel {
      width: 30px;
      height: 30px;
      cursor: pointer;
      float: right;
    }
    .cancel1 {
      width: 30px;
      height: 30px;
      float: right;
    }
    
  }
`;

export default Home;
