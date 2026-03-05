import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DashHome from '../components/DashHome';
import DashQuestion from '../components/DashQuestion';
import DashProduct from '../components/DashProduct';
import DashService from '../components/DashService';
import Home from '../assets/Home.png';
import Question from '../assets/Question.png';
import Product from '../assets/Product.png';
import Service from '../assets/Service.png';
import Logout from '../assets/Logout.png';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navi = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navi('/authen');
    }
  }, [navi]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navi('/authen');
  };

  const [currentPage, setCurrentPage] = useState('home');
  const navigate = (page) => {
    setCurrentPage(page);
  };

  const fullname = localStorage.getItem('fullname');

  const abbreviation = fullname
    ? fullname
        .split(' ')
        .map((word) => word[0].toUpperCase())
        .join('')
        .slice(0, 2)
    : 'U';

  return (
    <Container>
      <div className="navigation">
        <nav>
          <div className="logoMain">
            <div className="logo">{abbreviation}</div>
            <p className='logoP'>Welcome, {fullname || ''} 🥳🥳</p>
            </div>
        
          <ol>
            <li onClick={() => navigate('home')}>
              <div className="icons">
                <img src={Home} alt="home" />
              </div>
              <div className="list">
                <p>Home</p>
              </div>
            </li>

            <li onClick={() => navigate('question')}>
              <div className="icons">
                <img src={Question} alt="home" />
              </div>
              <div className="list">
                <p>Question</p>
              </div>
            </li>

            <li onClick={() => navigate('product')}>
              <div className="icons">
                <img src={Product} alt="home" />
              </div>
              <div className="list">
                <p>Product</p>
              </div>
            </li>
            <li onClick={() => navigate('service')}>
              <div className="icons">
                <img src={Service} alt="home" />
              </div>
              <div className="list">
                <p>Service</p>
              </div>
            </li>
            <div className="logout">
              <li onClick={handleLogout}>
                <div className="icons">
                  <img src={Logout} alt="home" />
                </div>
                <div className="list">
                  <p>Logout</p>
                </div>
              </li>
            </div>
          </ol>
        </nav>
      </div>

      <div className="category">
        {currentPage === 'home' && <DashHome />}
        {currentPage === 'question' && <DashQuestion />}
        {currentPage === 'product' && <DashProduct />}
        {currentPage === 'service' && <DashService />}
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  .navigation {
    background: green;
    width: 30%;
    height: 100vh;
  }
  nav {
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
    .logoMain{
      position: absolute;
      left: 0;
      top: 0;
      padding: 1%;
      width: 50%;
      display: flex;
      .logo{
        background: white;
        padding: 2%;
        border: none;
        border-radius: 50px;
        width: 20px;
        height: 20px;
        font-family: "Kanit";
        font-weight: bolder;
        color: gray;
      }
      .logoP{
        padding: 2%;
        color: white;
        font-family: "Kanit";
      }
    }
    ol {
      text-decoration: none;
      list-style-type: none;
      width: 50%;
      li {
        display: flex;
        color: white;
        padding: 8% 0%;
        width: 100%;
        font-family: 'Poppins', sans-serif;
      }
      li:hover {
        cursor: pointer;
        color: yellow;
        transform: scale(1.1);
        transition: 0.3s (ease-in-out);
      }
      .icons img {
        width: 30px;
        height: 30px;
        padding: 0% 2%;
      }
      .list {
        padding: 3% 5%;
        p {
          font-family: 'Poppins', sans-serif;
        }
      }
      .logout {
        left: 0;
        padding-top: 40%;
      }
    }
  }
`;
export default Dashboard;
