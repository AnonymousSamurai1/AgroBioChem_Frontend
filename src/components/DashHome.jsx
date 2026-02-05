import React from 'react'
import styled from 'styled-components'

function DashHome() {
  return (
    <Container>
      <h1 className="header">Home</h1>
    </Container>
  )
}

const Container = styled.div`
width: 70vh;
.header{
  padding: 2% 100%;
  color: gray;
  font-family: "Kanit", sans-serif;
}
`
export default DashHome
