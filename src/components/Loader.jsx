import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { BarLoader } from "react-spinners";
import Fade from "react-reveal";
import LoaderImage from "../assets/Logo.svg";
import Dashboard from "../pages/Dashboard";

function Loader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timeout); 
  }, []);

  return (
    <Container>
      {loading ? (
        <div className="loader">
          <div className="main_loader">
            <motion.img
              src={LoaderImage}
              alt="Loading..."
              transition={{ repeat: 5, duration: 1, repeatType: "reverse" }}
              className="imageloader"
            />
          </div>

          <BarLoader
            color="green"
            loading={loading}
            height={4}
            width={150}
            className="barloader"
          />
        </div>
      ) : (
        <Fade>
          <Dashboard />
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
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .main_loader {
    margin-bottom: 10%;
  }

  .imageloader {
    width: 700px;
  }

  .barloader {
    position: relative;
  }

  @media (max-width: 480px) {
    .loader {
      left: 25%;
    }

    .imageloader {
      width: 200px;
    }

    .barloader {
      left: 10%;
    }
  }
`;

export default Loader;