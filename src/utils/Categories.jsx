import React from 'react'
import styled from 'styled-components'

function Categories(props) {
  return (
    <Container>
      <div className="cat">
        <img src={props.img} alt="" />
        <h5>{props.title}</h5>
      </div>
    </Container>
  )
}

const Container = styled.div`
.cat{
display: flex;
padding: 6% 15%;
:hover{
    cursor: pointer;
    transform: scale(1.1);
}
    img{
        width: 40px;
        height: 40px;
    }
    h5{
        font-size: 10px;
        padding: 3% 1%;
        font-weight: light;
        color: gray;
        font-family: Poppins;
    }
}
`
export default Categories
