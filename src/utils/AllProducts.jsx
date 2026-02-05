import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Fade } from "react-reveal";
import styled from "styled-components";
import Cancel from "../assets/cancel_1.png"

function AllProducts(props) {
  const [detail, setDetail] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await fetch(
        "https://agro-bio-chem-backend.vercel.app/agrobiochem/api/products/"
      );

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      console.log("API response:", data);

      if (data.success && Array.isArray(data.data)) {
        setProducts(data.data);
        setFilteredProducts(data.data);
      } else {
        setProducts([]);
        setFilteredProducts([]);
        toast.error(data.message || "No products available");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setProducts([]);
      setFilteredProducts([]);
      toast.error("Unable to fetch products. Please check your server.");
    }
  };

  const fetchProductDetails = async (id) => {
    setDetail(true);
    try {
      const res = await fetch(
        `https://agro-bio-chem-backend.vercel.app/agrobiochem/api/products/${id}`
      );
      const data = await res.json();

      if (data.success) {
        setSelectedProduct(data.data);
      } else {
        toast.error(data.message || "Failed to fetch product details");
      }
    } catch (error) {
      toast.error("Something went wrong while fetching details");
    }
  };

  const handleSearch = (value) => {
    setSearch(value);
    if (value.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((p) =>
        p.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container>
      <Fade duration={1000}>
        <div className="search-bar">
          <form>
            <input
              type="text"
              className="search"
              placeholder="Search by name"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </form>
        </div>
      </Fade>
      <div className="productsGrid">
        {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
          filteredProducts.map((prod) => (
            <div className="carder" key={prod._id}>
              <div
                className="productCard"
                onClick={() => fetchProductDetails(prod._id)}
              >
                <img
                  src={`${prod.image}`}
                  alt={prod.name}
                  className="productImg"
                />
                <h5 className="title">{prod.name}</h5>
                <p>Click to view details</p>
              </div>
            </div>
          ))
        ) : (
          <p className="paragraph">No products found</p>
        )}
      </div>

      {detail && (
        <div className="inputMain">
          <Fade bottom duration={1000}>
            <div className="productMain">
              <img
                src={Cancel}
                alt="Remove"
                className="cancelProduct"
                onClick={() => setDetail(false)}
              />
              {selectedProduct ? (
                <div className="productDetail-main">
                  <div className="cancelDetail">
                    <img
                      src={Cancel}
                      alt="Remove"
                      onClick={() => setDetail(false)}
                    />
                  </div>
                  
                  <div className="imageDetails">
                    {selectedProduct.image && (
                      <img
                        src={`${selectedProduct.image}`}
                        alt={selectedProduct.name}
                      />
                    )}
                  </div>

                  <div className="detail-description">
                    <div className="cancel_image">
                      <img src={Cancel} alt="cancel" onClick={() => setDetail(false)}/>
                    </div>
                    <div className="detail-image">
                      {selectedProduct.image && (
                        <img
                          src={`${selectedProduct.image}`}
                          alt={selectedProduct.name}
                        />
                      )}
                    </div>
                    <h2 className="product-title">{selectedProduct.name}</h2>
                    <p className="product-description">
                      {selectedProduct.description}
                    </p>
                    <p className="product-category">
                      <span>Category:</span> {selectedProduct.category}
                    </p>
                    <p className="product-sub-category">
                      <span>Sub-Category:</span> {selectedProduct.categoryType}
                    </p>
                    <p className="product-ingredient">
                      <span>Ingredients:</span> {selectedProduct.ingredient}
                    </p>
                  </div>
                </div>
              ) : (
                <p>Click a product to view details</p>
              )}
            </div>
          </Fade>
        </div>
      )}
    </Container>
  );
}

const Container = styled.div`
display: block;
  .search-bar {
    margin-top: 3%;
    padding: 1% 10%;
  }
  .search {
    width: 700px;
    height: 35px;
    padding: 1% 0%;
    border: none;
    box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.3);
    outline: none;
    resize: none;
    border-radius: 10px;
    font-family: "Rubik";
    text-indent: 3%;
    color: gray;
  }
  .cancelProduct {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 30px;
    height: 30px;
    cursor: pointer;
    z-index: 10;
  }
  .cancelProduct:hover {
    transform: scale(1.1);
  }
  .cancelDetail{
    display:none;
  }
  .productsGrid {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    max-height: 60vh;
    overflow-y: scroll;
    overflow-x: hidden;
    outline: none;
    scrollbar-width: none;
    .paragraph {
      font-family: "Kanit";
      color: gray;
    }
  }
  .carder {
    padding: 2% 4%;
  }
  .productCard {
    border-radius: 10px;
    width: 100%;
    padding: 3%;
    box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.3);
    :hover {
      cursor: pointer;
      transform: scale(1.1);
    }
    p {
      color: grey;
      font-size: 12px;
      font-family: Kanit;
    }
  }
  .productImg {
    width: 200px;
    height: 200px;
  }
  .inputMain {
    position: absolute;
    top: 0;
    width: 80%;
    height: 97%;
    z-index: 5;
    backdrop-filter: blur(10px);
    overflow: hidden;
    padding: 1% 10%;
    border-radius: 20px;
  }
  .productMain {
    background: white;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    position: relative;
    
  }
  .productDetail-main {
    display: flex;
    padding: 15% 10%;
    justify-content: space-between;
    img {
      width: 300px;
      height: 350px;
      border: none;
    }
  }
  .detail-image {
    display: none;
  }
  .title {
    font-family: Poppins;
    color: gray;
    font-size: 18px;
    padding: 2% 0%;
    width: 100%;
    text-align: center;
  }
  .product-title {
    text-align: center;
    color: grey;
    font-size: 40px;
    font-family: Kanit;
  }
  .product-description {
    padding: 7% 5%;
    width: 100%;
    font-size: 13px;
    text-align: justify;
    font-family: Poppins;
  }
  .product-category,
  .product-sub-category,
  .product-ingredient {
    padding: 1% 5%;
    width: 100%;
    font-size: 12px;
    text-align: justify;
    font-family: Poppins;
  }
  span {
    color: #008a09ff;
  }
  .cancel_image{
    display: none;
  }

  @media (max-width: 420px) {
    .search-bar {
      margin-top: 10%;
      padding: 1% 3%;
    }
    .search {
      width: 445px;
    }
    .productsGrid {
      max-height: 93vh;
      justify-content: left;
      padding: 0% 8%;
    }
    .carder {
      padding: 1% 1%;
    }
    .productCard {
      width: 359px;
      :hover {
      cursor: pointer;
      transform: none;
    }
    }
    .productImg {
      width: 360px;
      height: 300px;
      border-radius: 30px;
    }
    .title{
      font-size: 30px;
    }

    .imageDetails img {
      display: none;
    }

    .detail-image {
      display: block ;
      width: 200px;
      height: 200px;
      padding: 0% 12% 20% 12% ;
      border: none;
    }
    .detail-image img {
      width: 150%;
      height: 150%;
      object-fit: contain;
    }
    .productDetail-main {
      display: block;
      padding: 0% 0%;
    }
    
    .inputMain {
      position: absolute;
      top: 0;
      left: 0;
      width: 93%;
      height: 95%;
      z-index: 5;
      backdrop-filter: blur(10px);
      overflow: hidden;
      padding: 4% 3% 4% 4%;
      border-radius: 20px;
    }
    .productMain {
      position: relative;
      background: white;
      width: 100%;
      height: 99%;
      border-radius: 20px;
      box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.3);
      display: block;
      padding: 0% 0%;
    }
    .detail-description{
      display: block 
    }
    .product-title {
    text-align: center;
    color: grey;
    font-size: 40px;
    font-family: Kanit;
  }
    .product-title {
      padding: 10% 0% 0% 0%;
    }
    .product-description {
      padding: 4% 5%;
      width: 90%;
      font-size: 13px;
      text-align: justify;
      font-family: Poppins;
    }
    .cancelProduct {
      top: 1%;
      right: 1%;
      width: 30px;
      height: 30px;
      cursor: pointer;
      z-index: 10;
      display: none;
    }
    .cancel_image{
    display: block;
    width: 30px;
    height: 30px;
    float: right;
    padding: 1%;
    img{
      width: 20px;
      height: 20px;
    }
  }
  }
`;

export default AllProducts;
