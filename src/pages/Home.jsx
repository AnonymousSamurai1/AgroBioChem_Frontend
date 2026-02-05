import React from "react";
import styled from "styled-components";
import Introduction from "../screens/Introduction";

function Home() {
  return (
    <Container>
      <Introduction />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  .nav_bar {
    position: fixed;
  }
`;

export default Home;
