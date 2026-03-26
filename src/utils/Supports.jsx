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
        <Typed
          strings={["Resources"]}
          typeSpeed={80}
          backSpeed={80}
          loop
          className="typed1_a"
        />
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
    padding 2% 20%;
  }
  .typed1{
    font-size: 35px;
    background: linear-gradient(97.24deg,rgb(63, 212, 50) 44.37%, rgba(160, 207, 167, 0.25) 113.02%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    font-weight: bolder;
    font-family: 'Poppins', sans-serif;
  }
  .typed1_a{
    display: none;
  }
  .support {
    display: flex;
    flex-wrap: wrap;
    padding: 1% 6%;
    width: 100%;
    max-height: 500px;
    overflow-y: auto;
  }
  .support-main {
    position: relative;
    text-align: center;
    padding: 1.7%;
    :hover{
      cursor: pointer;
      transform: scale(1.1);
    }
  }
  .support-image {
    width: 200px;
    height: 160px;
    transition: 0.3s ease;
  }
  .support-details-main{
    padding: 10%;
  }
  .support-details {
    position: absolute;
    top: 7%;
    width: 180px;
    height: 140px;
    background: rgba(0, 0, 0, 0.6);
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }

  .support-details h1 {
    font-size: 15px;
    margin-bottom: 10px;
    font-family: 'Kanit';
  }
  .support-details p {
    font-size: 12px;
  }
  @media (max-width: 420px){
    width: 100%;

    .support {
      max-height: 95vh;
    }
    .title {
      padding: 0%;
    }
    .typed1{
      display: none;
    }
    .typed1_a {
      display: block;
      padding: 0% 23%;
      font-size: 35px;
      background: linear-gradient(97.24deg,rgb(63, 212, 50) 44.37%, rgba(160, 207, 167, 0.25) 113.02%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
      font-weight: bolder;
      font-family: 'Poppins', sans-serif;
    }
    
    .support-main {
      padding: 0% 8%;
    }
    .support-image {
      padding: 6% 0%;
      width: 290px;
      height: 250px;
    }
    .support-details {
      top: 12.5%;
      width: 270px;
      height: 230px;
    }
    
  }
`;

export default Supports;
