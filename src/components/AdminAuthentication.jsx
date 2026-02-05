import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Loader from "../assets/Logo.svg";
import { BarLoader } from "react-spinners";
import Fade from "react-reveal";
import AuthenticationUtils from "../utils/AuthenticationUtils";

function AdminAuthentication() {
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
          <AuthenticationUtils log = {Loader}/>
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
    width: 700px;
  }
  .barloader {
    position: absolute;
    left: 40%;
  }
  @media (max-width: 760px) {
    .loader {
      top: 30%;
      left: 25%;
    }
    .imageloader {
      width: 200px;
    }
  }
`;

export default AdminAuthentication;
