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
import Navbar from "../components/WebNavigation";
import { Link } from "react-router-dom";
import MobileNavigation from "../components/MobileNavigation";
import Facebook from "../assets/Facebook1.png"
import Instagram from "../assets/Instagram1.png"
import WhatsApp from "../assets/WhatsApp1.png"

const GlobalStyle = createGlobalStyle`
  body.lock-scroll {
    overflow: hidden;
    touch-action: none;
    overscroll-behavior: none;
  }
`;

function Introduction() {
  const [click, setClick] = useState(false);

  const HandleClick = () => {
    return setClick(true);
  };

  const HandleUnclick = () => {
    return setClick(false);
  };

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
          <video src={IntroPage} autoPlay loop muted className="video"/>

          <div className="description">
            <div className="icons">
              <img src={Logo} alt="Logo" className="logo" />
              <div className="button-container">
                <button onClick={HandleClick} className="button">
                  {" "}
                  GET STARTED
                </button>
                {click && (
                  <div className="menu-main">
                    <img
                      src={Cancel}
                      alt="Cancel"
                      className="cancel-main"
                      onClick={HandleUnclick}
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
              <div className="toggle-background">
                <div className="menu-cancel">
                  <img
                    src={Cancel}
                    alt="Cancel"
                    className="remove"
                    onClick={() => setToggle(false)}
                  />
                </div>
                <br />
                <MobileNavigation />
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
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing</p>
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
    background: rgba(255, 255, 255, 0.18);
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
      padding: 10% 0%;
      .mission-details {
        width: 107%;
        padding: 10% 0%;
        font-family: "Kanit";
        text-align: justify;
        font-size: 20px;
        font-weight: bold;
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
        padding: 0% 10%;
      }
      .vision-details {
        padding: 10% 0%;
        font-family: "Kanit";
        text-align: justify;
        font-size: 20px;
        font-weight: bold;
        color: white;
      }
    }
    .testimony {
      padding: 10% 15%;
    }
    .details-sub {
      border-radius: 20px;
      padding: 6% 10%;
    }
    .slide {
      border: none;
      img {
        width: 250px;
        height: 200px;
      }
      .main-slide {
        padding: 3%;
        border: none;
      }
      h2 {
        text-align: center;
        padding: 3% 0%;
        color: gray;
        width: 240px;
        font-size: 14px;
        font-family: "Poppins", sans-serif;
      }
      p {
        color: grey;
        text-align: center;
        font-family: Kanit;
      }
    }
    .testimony-main {
      font-size: 45px;
      background: linear-gradient(rgb(63, 212, 50) 44.37%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight: bolder;
      font-family: "Poppins", sans-serif;
      padding: 10% 13%;
    }
    .testimony-details {
      padding: 2% 0% 10% 0%;
    }
    .toggle-background {
      background: rgba(41, 41, 41, 0.43);
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      width: 100%;
      height: 107vh;
      z-index: 5;
      backdrop-filter: blur(30px);
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
    
  }
`;

export default Introduction;
