import styled from "styled-components";
import Consult from "../assets/Consult.jpg";
import Person2 from "../assets/person2.png";
import Person3 from "../assets/person3.png";
import Typed from "react-typed";
import { Fade } from "react-reveal";

function Supports() {
  const supportCat = [
    {
      image: Consult,
      description: "Expert technical support for farmers and distributors",
      name: "Technical support",
    },
    {
      image: Person2,
      description: "Clear and accurate product information and labelling",
      name: "Product information and labelling",
    },

    {
      image: Person3,
      description:
        "Initiatives to promote sustainable agriculture practices and reduce environment impact",
      name: "Environmental sustainability initiatives",
    },
  ];

  return (
    <Container>
      <div className="title">
        <Typed
          strings={["Supports and Resources"]}
          typeSpeed={80}
          backSpeed={80}
          loop
          className="typed1"
        />
        <h1 className="title-main">Supports and Resources</h1>
      </div>
      <div className="support">
        {supportCat.map((each, index) => (
          <Fade mixed duration={2000}>
            <div key={index} className="support-main">
              <div className="support-image">
                <img src={each.image} alt="support" className="support-image" />
                <div className="support-details">
                  <h1>{each.name}</h1>
                  <p>{each.description}</p>
                </div>
              </div>
              <div className="support_detail-main"></div>
            </div>
          </Fade>
        ))}
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  .title{
    padding 2% 17%;
  }
  .typed1{
    font-size: 45px;
    background: linear-gradient(97.24deg,rgb(63, 212, 50) 44.37%, rgba(160, 207, 167, 0.25) 113.02%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    font-weight: bolder;
    font-family: 'Poppins', sans-serif;
  }
  .title-main{
    display: none;
  }
  .support {
    display: flex;
    flex-wrap: wrap;
    padding: 6% 4.7%;
    width: 100%;
    overflow-y: auto;
  }
  .support-main {
    position: relative;
    text-align: center;
    padding: 2% 2%;
    justify-content: space-between;
    :hover{
      cursor: pointer;
      transform: scale(1.1);
    }
  }
  .support-image {
    width: 240px;
    height: 200px;
    transition: 0.3s ease;
  }
  .support-details-main{
    padding: 10%;
  }
  .support-details {
    position: absolute;
    top: 7.5%;
    width: 220px;
    height: 180px;
    background: rgba(0, 0, 0, 0.6);
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }

  .support-details h1 {
    font-size: 20px;
    margin-bottom: 10px;
    font-family: 'Kanit';
  }
  .support-details p {
    font-size: 15px;
  }
  @media (max-width: 420px){
    .title{
      padding 1% 17%;
    }
    .typed1 {
      display: none;
    }
    .title-main {
    display: block;
      font-size: 40px;
      background: linear-gradient(
        97.24deg,
        rgb(63, 212, 50) 44.37%,
        rgba(160, 207, 167, 0.25) 113.02%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight: bolder;
      font-family: "Poppins", sans-serif;
      text-align: center;
      padding: 0% 15%;
    }
    .support {
      padding: 0% 6%;
      max-height: 95vh;
    }
   .support-main {
      padding: 2% 13%;
    }
    .support-image {
      width: 270px;
      height: 230px;
      transition: 0.3s ease;
    }
    .support-details {
      top: 19.5%;
      width: 250px;
      height: 210px;
    }
    
  }
`;

export default Supports;
