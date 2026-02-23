import React from 'react'
import styled from 'styled-components'

function Nav_Utils(props) {
  return (
    <Container>
        <div className='nav'>
            <img src={props.image} alt="images" />
            <h2>{props.title}</h2>
        </div>
    </Container>

  )
}

const Container = styled.div`
padding: 5%;
.nav{
    box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.3);
    border-radius: 20px;
    background-color: white;
    width: 180px;
    height: 180px;
    :hover{
        cursor: pointer;
        transform: scale(1.1);
    }
    img{
        width: 55px;
        padding: 30% 35% 5% 35%;
    }
    h2{
        font-size: 15px;
        color: grey;
        text-align: center;
        font-family: 'Poppins';
    }
}
`
export default Nav_Utils
