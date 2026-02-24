import styled from "styled-components";
import Typed from 'react-typed';
import { Fade } from "react-reveal";

function CoreValues() {
const Corelist = [
    {
      description:
        'Lead by example, put self in action',
      name: "Lead",
    },
    {
      description:
        'Embrace diversity of the human ability',
      name: "Diversity",
    },
    {
      description:
        'Provide quality results',
      name: "Quality",
    },
    {
      description:
        'Perfect profession with teamwork',
      name: "Teamwork",
    },
    {
      description:
        'Engage ethically and honesty on duty and out of duty',
      name: "Integrity",
    },
    {
      description:
        'Give respect',
      name: "Respect",
    },
  ];

  return (
    <Container>
          <div className="title">
            <Typed strings={["Core Values"]} typeSpeed = {80} backSpeed={80} loop  className='typed1'/>
          </div>
          <div className="core">
            {Corelist.map((each, index) => (
              <Fade mixed duration={2000}>
              <div key={index} className="core-main">
                <div className="core-details">
                    <h1>{each.name}</h1>
                    <p>{each.description}</p>
                </div>
              </div>
              </Fade>
            ))}
          </div>
        </Container>
      );
    }
    
    const Container = styled.div`
      
      .title{
        padding 0% 35%;
        width: 100%;
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
        width: 100%;
      }
      .core {
        display: flex;
        flex-wrap: wrap;
        padding: 2% 6%;
        width: 100%;
      }
      .core-main {
        position: relative;
        text-align: center;
        padding: 1.5%;
        justify-content: space-between;
        
      }
      .core-details-main{
        padding: 5% 9%;
      }
      .core-details {
        width: 180px;
        height: 140px;
        color: #ffffffff;
        background: rgb(63, 212, 50) 44.37%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 10px;
        box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.3);
        border-radius: 20px;
        border: none;
      }
    
      .core-details h1 {
        font-size: 23px;
        padding-bottom: 10px;
        font-family: 'Poppins';
      }
      .core-details p {
        font-size: 13px;
        font-family: 'Kanit';
      }
    `;

export default CoreValues;
