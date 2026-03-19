import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Fade } from "react-reveal";
import { toast } from "react-toastify";
import Bin from "../assets/Bin.png";

function DashQuestion() {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const openDeleteModal = (id, e) => {
    e.stopPropagation(); // prevent opening product details
    setQuestionToDelete(id);
    setShowDeleteModal(true);
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch(
        "https://agro-bio-chem-backend.vercel.app/agrobiochem/api/questions/",
      );

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      console.log("API response:", data);

      if (data.success && Array.isArray(data.data)) {
        setQuestions(data.data);
        setFilteredQuestions(data.data);
      } else {
        setQuestions([]);
        setFilteredQuestions([]);
        toast.error(data.message || "No question available");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setQuestions([]);
      setFilteredQuestions([]);
      toast.error("Unable to fetch products. Please check your server.");
    }
  };

  const handleDeleteProduct = async () => {
    if (!questionToDelete) return;

    setIsDeleting(true);

    try {
      const res = await fetch(
        `https://agrobiochemsbackend.vercel.app/agrobiochem/api/questions/${questionToDelete}`,
        {
          method: "DELETE",
        },
      );

      const data = await res.json();

      if (data.success) {
        toast.success("Question deleted successfully");

        const updatedProducts = questions.filter(
          (prod) => prod._id !== questionToDelete,
        );

        setQuestions(updatedProducts);
        setFilteredQuestions(updatedProducts);

        if (selectedQuestion?._id === questionToDelete) {
          setSelectedQuestion(null);
        }

        setShowDeleteModal(false);
        setQuestionToDelete(null);
      } else {
        toast.error(data.message || "Failed to delete product");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Something went wrong while deleting product");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSearch = (value) => {
    setSearch(value);

    if (value.trim() === "") {
      setFilteredQuestions(questions);
    } else {
      const filtered = questions.filter(
        (q) =>
          q.fullname?.toLowerCase().includes(value.toLowerCase()) ||
          q.email?.toLowerCase().includes(value.toLowerCase()) ||
          q.question?.toLowerCase().includes(value.toLowerCase()),
      );

      setFilteredQuestions(filtered);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container>
      <div className="product">
        <Fade duration={1000}>
          <h1 className="header">Question</h1>
        </Fade>
      </div>
      <Fade duration={1000}>
        <form className="searchMain">
          <input
            type="text"
            className="search"
            placeholder="Search by name, email or question"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </form>
      </Fade>
      <div className="productsGrid">
        {Array.isArray(filteredQuestions) && filteredQuestions.length > 0 ? (
          filteredQuestions.map((prod) => (
            <div key={prod._id} className="productCard">
              <h1 className="fullname">{prod.fullname}</h1>
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${prod.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="questionemail"
              >
                {prod.email}
              </a>
              <p className="question">
                <span>Question:</span> <br />
                {prod.question}
              </p>
              <div className="paragraph_bin">
                <img
                  src={Bin}
                  alt="bin"
                  onClick={(e) => openDeleteModal(prod._id, e)}
                />
              </div>
            </div>
          ))
        ) : (
          <p className="paragraph">No question found</p>
        )}
      </div>
      ;
      {showDeleteModal && (
        <div className="deleteOverlay">
          <Fade bottom duration={500}>
            <div className="deleteModal">
              <div className="deleteIcon">🗑️</div>
              <h2>Delete Question</h2>
              <p>Are you sure you want to delete this question?</p>
              <p className="warningText">This action cannot be undone.</p>

              <div className="deleteButtons">
                <button
                  className="cancelBtn"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setQuestionToDelete(null);
                  }}
                  disabled={isDeleting}
                >
                  Cancel
                </button>

                <button
                  className="deleteBtn"
                  onClick={handleDeleteProduct}
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <div className="smallSpinner"></div>
                  ) : (
                    "Yes, Delete"
                  )}
                </button>
              </div>
            </div>
          </Fade>
        </div>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 59vh;
  padding: 2% 0%;
  .product {
    display: flex;
  }
  .header {
    padding: 5% 99%;
    color: gray;
    font-family: 'Poppins', sans-serif;
  }
  .searchMain{
    padding: 2% 50%;
  }
  .inputs {
      width: 300px;
      height: 35px;
      border: 2px solid rgba(128, 128, 128, 0.91);
      outline: none;
      resize: none;
      border-radius: 10px;
      font-family: 'Rubik';
      text-indent: 3%;
      color: gray;
    }
  }
  .search {
    width: 600px;
    height: 35px;
    padding: 5% 5%;
    border: 2px solid rgba(128, 128, 128, 0.91);
    outline: none;
    resize: none;
    border-radius: 10px;
    font-family: 'Rubik';
    text-indent: 3%;
    color: gray;
  }
  
    .productsGrid {
      padding: 7% 5%;
      display: flex;
      flex-wrap: wrap;
      width: 137vh;
      height: 137vh
      background: red;
      justify-content: space-evenly; 
      max-height: 60vh;     
      overflow-y: scroll;   
      overflow-x: hidden;   
      scrollbar-width: none; 
      .paragraph{
        padding: 20% 0%;
        font-family: 'Kanit';
        color: gray;
      }
    }
    .productsGrid::-webkit-scrollbar {
      display: none;
    }
    .productCard{
      border-radius: 10px;
      box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.3);
      padding: 2%;
        img{
          width: 170px;
          height: 230px;
        }
    }
    .fullname{
      font-family: 'Kanit', sans-serif;
      font-size: 25px;
      color: green;
    }
    .questionemail{
      font-family: 'Poppins', sans-serif;
      font-size: 12px;
      color: grey;
      line-height: 40px;
      :hover{
        cursor: pointer;
        transform: scale(1.1);
      }
    }
    span{
      color: green;
      font-weight: bold;
    }
    .question{
      font-family: 'Rubik', sans-serif;
      font-size: 14px;
      color: grey;
      line-height: 40px;
    }
    
    .paragraph_bin{
      display: flex;
      justify-content: right;
      
      img{
        width: 20px;
        height: 20px;
        :hover{
          cursor: pointer;
          transform: scale(1.1);
        }
      }
    }
    .deleteOverlay {
      background: rgba(0, 0, 0, 0.58);
      position: absolute;
      top: 0;
      width: 30%;
      height: 56.7%;
      justify-content: center;
      align-items: center;
      z-index: 999;
      backdrop-filter: blur(5px);
      overflow: hidden; 
      padding: 10% 20%;
    }

    .deleteModal {
      width: 300px;
      background: #ffffff;
      border-radius: 20px;
      padding: 30px 25px;
      box-shadow: 0 10px 35px rgba(0, 0, 0, 0.25);
      text-align: center;
      animation: popIn 0.25s ease-in-out;

      h2 {
        font-family: 'Kanit', sans-serif;
        color: #222;
        margin-bottom: 10px;
      }

      p {
        font-family: 'Poppins', sans-serif;
        color: #666;
        margin: 6px 0;
        font-size: 14px;
      }
    }

    .deleteIcon {
      font-size: 42px;
      margin-bottom: 10px;
    }

    .warningText {
      color: #d11a2a !important;
      font-weight: 500;
    }

    .deleteButtons {
      display: flex;
      justify-content: center;
      gap: 15px;
      margin-top: 22px;
    }

    .cancelBtn,
    .deleteBtn {
      width: 140px;
      height: 45px;
      border: none;
      border-radius: 12px;
      font-family: 'Poppins', sans-serif;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.25s ease;
    }

    .cancelBtn {
      background: #f1f3f5;
      color: #444;
    }

    .cancelBtn:hover {
      background: #e5e7eb;
      transform: translateY(-2px);
    }

    .deleteBtn {
      background: linear-gradient(90deg, #ff4d4f, #d90429);
      color: white;
    }

    .deleteBtn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 18px rgba(217, 4, 41, 0.35);
    }

    .cancelBtn:disabled,
    .deleteBtn:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    .smallSpinner {
      width: 18px;
      height: 18px;
      border: 3px solid white;
      border-top: 3px solid transparent;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin: auto;
    }

`;

export default DashQuestion;
