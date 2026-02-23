import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import styled from "styled-components";
import { motion } from "framer-motion";
import Loader from "./assets/Logo.svg";
import { BarLoader } from "react-spinners";
import Fade from "react-reveal";

function App() {
  const [loading, setLoading] = useState();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <Container>
      {loading ? (
        <div className="loader">
          <div className="main_loader">
            <motion.img
              src={Loader}
              initial={{ scale: 1 }}
              transition={{ repeat: 5, duration: 1 }}
              class="imageloader"
            />
          </div>

          <BarLoader
            color={"green"}
            loading={loading}
            size={20}
            className="barloader"
          />
        </div>
      ) : (
        <Fade>
          <Home />
        </Fade>
      )}
    </Container>
  );
}

const Container = styled.div`
  .loader {
    position: absolute;
    top: 30%;
    left: 28%;
  }
  .main_loader {
    margin-bottom: 10%;
  }
  .imageloader {
    width: 500px;
  }
  .barloader {
    position: absolute;
    left: 40%;
  }
  @media (max-width: 480px) {
    .loader {
      top: 35%;
      left: 3%;
    }
    .main_loader {
    margin-bottom: 0%;
  }
    .imageloader {
      width: 400px;
      height: 200px;
    }
  }
`;

export default App;
