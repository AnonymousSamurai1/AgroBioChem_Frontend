import styled from "styled-components";
import Consult from "../assets/Consult.jpg";
import Person2 from "../assets/person2.png";
import Person3 from "../assets/person3.png";
import Typed from "react-typed";
import { Fade } from "react-reveal";

function Services() {
  const serviceCat = [
    {
      image: Consult,
      description:
        "Expert advice on crop management, pest control, and fertilizer application",
      name: "Crop Consulting and Advisory",
    },
    {
      image: Person2,
      description: "Research and development of new products and formulations",
      name: "Product Formulation and Development",
    },
    {
      image: Person3,
      description:
        "Ensuring products meet high standards of quality and efficacy",
      name: "Quality control and assurance",
    },
    {
      image: Person3,
      description:
        "Training programs for farmers, distributors, and other stakeholders",
      name: "Training and education",
    },
    {
      image: Person3,
      description: "Comprehensive solutions to manage pests and diseases",
      name: "Integrated pest management (IPM) solutions",
    },
  ];

  return (
    <Container>
      <div className="title">
        <Typed
          strings={["Services"]}
          typeSpeed={80}
          backSpeed={80}
          loop
          className="typed1"
        />
        <h1 className="title-main">Services</h1>
      </div>

      <div className="service">
        {serviceCat.map((each, index) => (
          <Fade mixed duration={2000} key={index}>
            <div className="service-main">
              <div className="server-image">
                <img src={each.image} alt="serve" className="service-image" />
                <div className="service-details">
                  <h1>{each.name}</h1>
                  <p>{each.description}</p>
                </div>
              </div>
            </div>
          </Fade>
        ))}
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  .title {
    padding: 0% 41%;
  }
  .typed1 {
    font-size: 35px;
    background: linear-gradient(
      97.24deg,
      rgb(63, 212, 50) 44.37%,
      rgba(160, 207, 167, 0.25) 113.02%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: bolder;
    font-family: "Poppins", sans-serif;
  }
  .title-main {
    display: none;
  }
  .service {
    display: flex;
    flex-wrap: wrap;
    padding: 1% 6%;
    width: 100%;
    max-height: 500px;
    overflow-y: auto;
  }
  .service-main {
    position: relative;
    text-align: center;
    padding: 1.7%;
    :hover {
      cursor: pointer;
      transform: scale(1.1);
    }
  }
  .service-image {
    width: 200px;
    height: 160px;
    transition: 0.3s ease;
  }
  .service-details {
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
  .service-details h1 {
    font-size: 15px;
    margin-bottom: 10px;
    font-family: "Kanit";
  }

  .service-details p {
    font-size: 12px;
  }

  @media (max-width: 420px) {
    width: 90%;

    .service {
      max-height: 95vh;
    }

    .title {
      padding: 0%;
    }

    .typed1 {
      display: none;
    }
    .title-main {
    display: block;
      font-size: 45px;
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
      padding: 0% 33%;
    }

    .service-main {
      padding: 0% 13%;
    }
    .service-image {
      width: 290px;
      height: 250px;
    }
    .service-details {
      top: 12.5%;
      width: 270px;
      height: 230px;
    }
  }
`;

export default Services;
