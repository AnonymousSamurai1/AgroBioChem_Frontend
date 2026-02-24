import React, { useState } from "react";
import "../index.css";
import styled from "styled-components";
import NavUtils from "../utils/NavUtils";
import { Fade } from "react-reveal";
import Home from "../assets/Home_1.png";
import Service from "../assets/Abouts.png";
import Products from "../assets/Products.png";
import Contact from "../assets/Contact.png";
import Categories from "../utils/Categories";
import Mission1 from "../assets/Mission.png";
import Vision1 from "../assets/Vision.png";
import Mission from "../utils/Mission";
import Vision from "../utils/Vision";
import Location from "../utils/Location";
import Cancel from "../assets/cancel_1.png";
import MissionImage from "../assets/Mission_Image.png";
import VisionImage from "../assets/Vision_Image.png";
import LocationImage from "../assets/map.png";
import LocationLogo from "../assets/location.png";
import EnquireLogo from "../assets/enquiry.png";
import Enquiry from "../utils/Enquiry";
import FarmerImage from "../assets/Farmer.png";
import AllProducts from "../utils/AllProducts";
import Services from "../utils/Services";
import CropProtections from "../utils/CropProtection";
import Fertilizer from "../utils/Fertilizer";
import Supports from "../utils/Supports";
import CoreValues from "../utils/CoreValues";

function Navigation() {
  const [home, setHome] = useState(false);
  const [product, setProduct] = useState(false);
  const [service, setService] = useState(false);
  const [contact, setContact] = useState(false);
  const [mission, setMission] = useState(false);
  const [vision, setVision] = useState(false);
  const [corevalues, setCoreValues] = useState(false);
  const [allproducts, setAllproducts] = useState(false);
  const [cropProtection, setCropProtection] = useState(false);
  const [fertilizer, setFertilizer] = useState(false);
  const [location, setLocation] = useState(false);
  const [enquiry, setEnquiry] = useState(false);
  const [mainservices, setMainservices] = useState(false);
  const [support, setSupport] = useState(false);

  const HandleHomeIn = () => {
    setHome(true);
  };
  const HandleHomeOut = () => {
    setHome(false);
  };
  const HandleProductIn = () => {
    setProduct(true);
  };
  const HandleProductOut = () => {
    setProduct(false);
  };
  const HandleServiceIn = () => {
    setService(true);
  };
  const HandleServiceOut = () => {
    setService(false);
  };
  const HandleContactIn = () => {
    setContact(true);
  };
  const HandleContactOut = () => {
    setContact(false);
  };
  const HandleMissionIn = () => {
    setMission(true);
  };
  const HandleMissionOut = () => {
    setMission(false);
  };
  const HandleVisionIn = () => {
    setVision(true);
  };
  const HandleVisionOut = () => {
    setVision(false);
  };
  const HandleCoreValuesIn = () => {
    setCoreValues(true);
  };
  const HandleCoreValuesOut = () => {
    setCoreValues(false);
  };
  const HandleAllProductsIn = () => {
    setAllproducts(true);
  };
  const HandleAllProductsOut = () => {
    setAllproducts(false);
  };
  const HandlCropProtectionIn = () => {
    setCropProtection(true);
  };
  const HandleCropProtectionOut = () => {
    setCropProtection(false);
  };
  const HandleFertilizerIn = () => {
    setFertilizer(true);
  };
  const HandleFertilizerOut = () => {
    setFertilizer(false);
  };
  const HandleLocationIn = () => {
    setLocation(true);
  };
  const HandleLocationOut = () => {
    setLocation(false);
  };
  const HandleEnquiryIn = () => {
    setEnquiry(true);
  };
  const HandleEnquiryOut = () => {
    setEnquiry(false);
  };
  const HandleMainServiceIn = () => {
    setMainservices(true);
  };
  const HandleMainServiceOut = () => {
    setMainservices(false);
  };
  const HandleSupportIn = () => {
    setSupport(true);
  };
  const HandleSupportOut = () => {
    setSupport(false);
  };

  return (
    <Container>
      <div className="containers">
        <Fade top duration={1000}>
          <div className="m_nav" onClick={HandleHomeIn}>
            <NavUtils image={Home} title="Company" />
          </div>
        </Fade>
        {home && (
          <Fade left duration={1000}>
            <div className="home align-left">
              <div className="home-sub-a">
                <h3>Company</h3>
                <div className="cat_align" onClick={HandleMissionIn}>
                  <Categories img={Mission1} title={"Mission"} />
                </div>
                {mission && (
                  <div className="alignment">
                    <Fade bottom duration={1000}>
                      <div className="alignment_sub">
                        <img
                          src={Cancel}
                          alt="Cancel"
                          className="cancel"
                          onClick={HandleMissionOut}
                        />
                        <Mission mis={MissionImage} />
                      </div>
                    </Fade>
                  </div>
                )}
                <div className="cat_align" onClick={HandleVisionIn}>
                  <Categories img={Vision1} title={"Vision"} />
                </div>
                {vision && (
                  <div className="alignment">
                    <Fade bottom duration={1000}>
                      <div className="alignment_sub">
                        <img
                          src={Cancel}
                          alt="Cancel"
                          className="cancel"
                          onClick={HandleVisionOut}
                        />
                        <Vision mis={VisionImage} />
                      </div>
                    </Fade>
                  </div>
                )}
                <div className="cat_align" onClick={HandleCoreValuesIn}>
                  <Categories img={Mission1} title={"Core Values"} />
                </div>
                {corevalues && (
                  <div className="alignment">
                    <Fade bottom duration={1000}>
                      <div className="alignment_sub">
                        <img
                          src={Cancel}
                          alt="Cancel"
                          className="cancel"
                          onClick={HandleCoreValuesOut}
                        />
                        <CoreValues />
                      </div>
                    </Fade>
                  </div>
                )}
              </div>
              <div className="blank" onClick={HandleHomeOut}></div>
            </div>
          </Fade>
        )}

        {/* {Services} */}
        <Fade right duration={1000}>
          <div className="m_nav" onClick={HandleServiceIn}>
            <NavUtils image={Service} title="Services" />
          </div>
        </Fade>
        {service && (
          <Fade right duration={1000}>
            <div className="home align-right">
              <div className="blank" onClick={HandleServiceOut}></div>
              <div className="home-sub-b">
                <h4>Service</h4>
                <div className="cat_right">
                  <div className="cat_right_sub" onClick={HandleMainServiceIn}>
                    <Categories img={Vision1} title={"Services"} />
                  </div>
                  {mainservices && (
                    <div className="alignment">
                      <Fade bottom duration={1000}>
                        <div className="alignment_sub">
                          <img
                            src={Cancel}
                            alt="Cancel"
                            className="cancel"
                            onClick={HandleMainServiceOut}
                          />
                          <Services />
                        </div>
                      </Fade>
                    </div>
                  )}
                  <div className="cat_right_sub" onClick={HandleSupportIn}>
                    <Categories img={Vision1} title={"Support/Resources"} />
                  </div>
                  {support && (
                    <div className="alignment">
                      <Fade bottom duration={1000}>
                        <div className="alignment_sub">
                          <img
                            src={Cancel}
                            alt="Cancel"
                            className="cancel"
                            onClick={HandleSupportOut}
                          />
                          <Supports />
                        </div>
                      </Fade>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Fade>
        )}

        {/* {Product} */}
        <Fade left duration={1000}>
          <div className="m_nav" onClick={HandleProductIn}>
            <NavUtils image={Products} title="Products" />
          </div>
        </Fade>
        {product && (
          <Fade left duration={1000}>
            <div className="home align-left">
              <div className="home-sub-a">
                <h3>Products</h3>
                <div className="cat_align" onClick={HandleAllProductsIn}>
                  <Categories img={Mission1} title={"All"} />
                </div>
                {allproducts && (
                  <div className="alignment">
                    <Fade bottom duration={1000}>
                      <div className="alignment_sub">
                        <img
                          src={Cancel}
                          alt="Cancel"
                          className="cancel"
                          onClick={HandleAllProductsOut}
                        />
                        <br />
                        <AllProducts />
                      </div>
                    </Fade>
                  </div>
                )}
                <div className="cat_align" onClick={HandlCropProtectionIn}>
                  <Categories
                    img={Vision1}
                    title={"Crop Protection Chemicals"}
                  />
                </div>
                {cropProtection && (
                  <div className="alignment">
                    <Fade bottom duration={1000}>
                      <div className="alignment_sub">
                        <img
                          src={Cancel}
                          alt="Cancel"
                          className="cancel"
                          onClick={HandleCropProtectionOut}
                        />
                        <br />
                        <CropProtections remove={Cancel} />
                      </div>
                    </Fade>
                  </div>
                )}
                <div className="cat_align" onClick={HandleFertilizerIn}>
                  <Categories
                    img={Vision1}
                    title={"Fertilizer and Plant Nutrients"}
                  />
                </div>
                {fertilizer && (
                  <div className="alignment">
                    <Fade bottom duration={1000}>
                      <div className="alignment_sub">
                        <img
                          src={Cancel}
                          alt="Cancel"
                          className="cancel"
                          onClick={HandleFertilizerOut}
                        />
                        <br />
                        <Fertilizer remove={Cancel} />
                      </div>
                    </Fade>
                  </div>
                )}
                <div className="cat_align">
                  <Categories
                    img={Vision1}
                    title={"Seeds and Seed Treatments"}
                  />
                </div>
              </div>
              <div className="blank" onClick={HandleProductOut}></div>
            </div>
          </Fade>
        )}

        {/* {Contact} */}
        <Fade down duration={1000}>
          <div className="m_nav" onClick={HandleContactIn}>
            <NavUtils image={Contact} title="Contact Us" />
          </div>
        </Fade>
        {contact && (
          <Fade right duration={1000}>
            <div className="home align-right">
              <div className="blank" onClick={HandleContactOut}></div>
              <div className="home-sub-b">
                <h4>Contact</h4>
                <div className="cat_right">
                  <div className="cat_right_sub" onClick={HandleLocationIn}>
                    <Categories img={LocationLogo} title={"Location"} />
                  </div>
                  {location && (
                    <div className="alignment">
                      <Fade bottom duration={1000}>
                        <div className="alignment_sub">
                          <img
                            src={Cancel}
                            alt="Cancel"
                            className="cancel"
                            onClick={HandleLocationOut}
                          />
                          <Location map={LocationImage} />
                        </div>
                      </Fade>
                    </div>
                  )}
                  <div className="cat_right_sub" onClick={HandleEnquiryIn}>
                    <Categories img={EnquireLogo} title={"Enquiry"} />
                  </div>
                  {enquiry && (
                    <div className="alignment">
                      <Fade bottom duration={1000}>
                        <div className="alignment_sub">
                          <img
                            src={Cancel}
                            alt="Cancel"
                            className="cancel"
                            onClick={HandleEnquiryOut}
                          />
                          <Enquiry farmer={FarmerImage} />
                        </div>
                      </Fade>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Fade>
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  overflow: hidden;
  padding-left: 5%;
  padding-top: 3%;
  .containers {
   padding: 3% 32% 5% 32%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .home {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
    height: 70%;
    width: 100%;
    padding: 5% 0%;
    display: flex;
    transform: translateX(1px);
    will-change: transform;
  }

  .home.align-right {
    justify-content: flex-end;
    transform: translateX(1px);
    will-change: transform;
  }

  .home.align-left {
    justify-content: flex-start;
  }
  .home-sub-a {
    background: white;
    height: 100%;
    z-index: 3;
    width: 20%;
    border-radius: 0% 50% 50% 0%;
  }
  .home-sub-b {
    background: white;
    height: 103%;
    z-index: 3;
    border-radius: 50% 0% 0% 50%;
    min-width: 250px;
    max-width: 400px;
  }
  .bar {
    width: 100px;
    height: 20px;
    background: #66b302;
    border: none;
    padding: 2% 5%;
    :hover {
      cursor: pointer;
    }
  }
  .bar1 {
    width: 100px;
    height: 20px;
    float: right;
    background: #66b302;
    border: none;
    padding: 2% 5%;
    :hover {
      cursor: pointer;
    }
  }

  h3 {
    color: #66b302;
    font-size: 30px;
    padding: 18% 10% 5% 10%;
    font-family: 'Poppins', sans-serif;
  }
  h4 {
    color: #66b302;
    font-size: 30px;
    padding: 18% 10% 5% 31%;
    font-family: 'Poppins', sans-serif;
  }
  .cat_right {
    float: right;
    justify-content: space-between;
    padding: 3% 25%;
  }
  .cat_right_sub {
    padding: 10% 0%;
  }
  .alignment {
    background: rgba(68, 70, 65, 0.81);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100vh;
    z-index: 5;
    backdrop-filter: blur(30px);
    overflow-x: hidden;
    overflow-y: hidden;
    padding: 5% 20%;
  }
  .alignment_sub {
    background: white;
    display: block;
    width: 60%;
    height: 80%;
    border-radius: 20px;
    box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.3);
  }
    .cancel-main{
      padding 2% 0%;
    }
  .cancel {
    float: right;
    padding: 2% 1%;
    width: 30px;
    :hover {
      cursor: pointer;
    }
  }
  .blank {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100vh;
    z-index: -5;
  }
`;
export default Navigation;
