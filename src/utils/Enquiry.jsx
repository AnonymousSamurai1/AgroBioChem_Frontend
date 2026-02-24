import React, { useState } from "react";
import styled from "styled-components";
import { Fade } from "react-reveal";
import { toast } from "react-toastify";

function Enquiry(props) {
  const [fullname, setFullname] = useState();
  const [email, setEmail] = useState();
  const [question, setQuestion] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = {
      fullname: fullname,
      email: email,
      question: question,
    };
    const result = await fetch(
      "https://agro-bio-chem-backend.vercel.app/agrobiochem/api/questions/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    let value = result.json();
    console.warn(value);
    if (fullname || email || question) {
      toast.success(
        "Thanks for your question. We will get back to you shortly"
      );
      setFullname("");
      setEmail("");
      setQuestion("");
    } else {
      toast.error("Please fill all the fields");
      setFullname("");
      setEmail("");
      setQuestion("");
      return false;
    }
  };
  return (
    <Container>
      <div className="main-location">
        <div className="contact-info">
          <div className="question">
            <h2 className="enquiry-title">How can we help you?</h2>
            <h6 className="enquiry-description">
              Thank you for your interest in AgroBioChem. If you have any
              questions about our products or services, please let us know
              below, our team will get back to you as soon as possible.
            </h6>
            <form onSubmit={handleSubmit}>
              <div className="main-input">
                <input
                  type="text"
                  placeholder="Enter your fullname"
                  className="input-box"
                  name="fullname"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
              </div>

              <div className="main-input">
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="input-box"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="main-input">
                <textarea
                  placeholder="Enter your message"
                  name="message"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </div>
              <button className="submit">Send</button>
            </form>
          </div>

          <Fade right duration={2000}>
            <img src={props.farmer} alt="Farmer" className="farmer" />
          </Fade>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .main-location {
    display: flex;
    width: 100%;
    height: 60vh;
  }
  .contact-info {
    display: flex;
    padding: 1% 0%;
  }
  .question {
    width: 100%;
    padding: 2% 5%;
  }
  .enquiry-title {
    font-size: 25px;
    font-family: "Kanit";
    font-weight: 700;
    color: gray;
  }
  .enquiry-description {
    font-family: "Rubik";
    font-size: 12px;
    color: grey;
  }
  .main-input {
    padding: 2% 0%;
  }
  .input-box {
    width: 400px;
    height: 25px;
    padding: 1% 2%;
    border: 2px solid rgba(128, 128, 128, 0.81);
    outline: none;
    resize: none;
    border-radius: 10px;
    font-family: "Rubik";
  }
  textarea {
    width: 400px;
    height: 70px;
    padding: 2%;
    border: 2px solid rgba(128, 128, 128, 0.81);
    outline: none;
    resize: none;
    border-radius: 10px;
    font-family: "Rubik";
  }
  .submit {
    width: 200px;
    height: 40px;
    border: none;
    border-radius: 10px;
    background-color: rgba(67, 184, 3, 0.72);
    color: white;
    font-family: "Poppins";
    font-size: 17px;
    font-weight: 600;
  }
  .submit: hover {
    background-color: rgba(128, 128, 128, 0);
    cursor: pointer;
    border: 2px solid rgba(95, 249, 12, 0.97);
    transition: all 0.3s ease-in-out;
    transform: scale(1.1);
    color: gray;
  }
  .farmer {
    width: 250px;
    height: 250px;
    padding: 6% 2%;
  }
  @media (max-width: 480px) {
    .main-location {
      display: block;
    }
    .contact-info {
      display: block;
    }
    .enquiry-title {
      color: #ffffff;
      text-align: center;
      font-size: 35px;
    }
    .enquiry-description {
      font-family: "Rubik";
      font-size: 12px;
      padding: 3% 0%;
      text-align: center;
      color: #ffffff;
    }
    .question {
      width: 90%;
      padding: 2% 3.5%;
    }
    .input-box {
      width: 400px;
      height: 60px;
    }
    textarea {
      width: 400px;
      height: 60px;
    }
    .farmer {
      display: none;
    }
    .submit {
      width: 420px;
    }
    .submit: hover {
    cursor: none;
    border: none;
    transition: none;
    transform: none;
    border-radius: 10px;
    background-color: rgba(67, 184, 3, 0.72);
    color: white;
  }
  }
`;
export default Enquiry;
