import styled from "styled-components";
import "../index.css";
import Typed from "react-typed";
import { Fade } from "react-reveal";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Person1 from "../assets/person1.png";
import Person2 from "../assets/person2.png";
import Person3 from "../assets/person3.png";

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

function Introduction() {
  return (
    <Container>
      <div className="title">
        <Fade duration={1000} distance="40px">
          <h1>
            <span className="span">AGROBIOCHEM</span>
            <br />
            THE MOST <br className="break" />
            <Typed
              strings={["RELIABLE", "EFFECTIVE"]}
              typeSpeed={80}
              backSpeed={80}
              loop
              className="typed"
            />
            <br />
            AGROCHEMICAL COMPANY
            <br />
            IN GHANA
          </h1>
        </Fade>
        <p>
          AgroBioChem is a pioneering agricultural biotechnology company
          dedicated to advancing sustainable farming. We combine biological
          innovation with chemical precision to enhance crop productivity and
          soil health.
        </p>
      </div>

      <div className="details">
        <div className="details-sub">
          <Slide
            arrows={false}
            indicators={true}
            duration={3000}
            transitionDuration={500}
          >
            {slideImages.map((each, index) => (
              <div key={index} className="slide">
                <img src={each.image} alt="testimonial" className="slider" />
                <h2>{each.description}</h2>
                <p>{each.name}</p>
              </div>
            ))}
          </Slide>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 5% 6%;

  .title {
    width: 60%;
  }

  .title h1 {
    font-family: "Poppins", sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 49px;
    line-height: 76px;
    color: rgba(230, 227, 227, 0.989);
  }
  .span {
    color: rgb(102, 179, 2);
    font-weight: bold;
    font-size: 75px;
  }
  .agro {
    font-size: 45px;
  }
  .break {
    display: none;
  }
  .typed {
    font-size: 50px;
    background: linear-gradient(
      97.24deg,
      rgb(255, 255, 255) 44.37%,
      rgba(243, 193, 95, 0) 113.02%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
  .title p {
    color: white;
    padding-top: 2%;
    padding-right: 30%;
    text-align: left;
    font-family: "Kanit";
    font-size: 15px;
  }
  .button-container {
    padding-top: 5%;
    display: block;
  }
  .cancel {
    float: right;
    padding: 2% 1%;
    width: 30px;
    :hover {
      cursor: pointer;
    }
  }
  .details {
    width: 40%;
    padding: 1% 0%;
  }
  .details-sub {
    width: 46%;
    height: 80%;
    border-radius: 20px;
    background: rgba(99, 145, 38, 0.67);
    padding: 6% 20%;
  }
  .slide {
    width: 100%;
    img {
      width: 270px;
      height: 200px;
      box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.3);
    }
    h2 {
      text-align: center;
      padding: 3% 0%;
      color: white;
      width: 240px;
      font-size: 14px;
      font-family: "Poppins", sans-serif;
    }
    p {
      color: white;
      text-align: center;
    }
  }

  @media (max-width: 1024px) {
  }

  @media (max-width: 768px) {
  }

  @media (max-width: 420px) {
    .agro {
      font-size: 50px;
    }
    .span {
      font-size: 50px;
    }
    .title {
      width: 100%;
    }
    .title h1 {
      font-size: 45px;
    }
    .title p {
      padding-top: 10%;
      padding-right: 0%;
      font-size: 19px;
    }
    .break {
      display: block;
    }
    .details {
      display: none;
    }
  }
`;
export default Introduction;
