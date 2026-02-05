import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Fade } from "react-reveal";
import styled from "styled-components";

function CropProtection(props) {
  const [detail, setDetail] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await fetch(
        "http://localhost:5612/agrobiochem/api/products/"
      );

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      console.log("API response:", data);

      if (data.success && Array.isArray(data.data)) {
        const fungicideHerbicide = data.data.filter(
          (item) =>
            item.category &&
            ["fungicide", "herbicide"].includes(
              item.category.trim().toLowerCase()
            )
        );

        setProducts(fungicideHerbicide);
        setFilteredProducts(fungicideHerbicide);

        if (fungicideHerbicide.length === 0) {
          toast.info("No crop protection chemical found.");
        }
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
        `http://localhost:5612/agrobiochem/api/products/${id}`
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
            <div className="carder">
              <div
                key={prod._id}
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
          <p className="paragraph">No Crop Protection chemical found</p>
        )}
      </div>
      {detail && (
        <div className="inputMain">
          <Fade bottom duration={1000}>
            <div className="productMain">
              <img
                src={props.remove}
                alt="Remove"
                className="cancelProduct"
                onClick={() => setDetail(false)}
              />
              {selectedProduct ? (
                <div className="productDetail-main">
                  <div className="imageDetails">
                    {selectedProduct.image && (
                      <img
                        src={`${selectedProduct.image}`}
                        alt={selectedProduct.name}
                        width="200"
                      />
                    )}
                  </div>
                  <div className="detail-description">
                    <h2 className="product-title">{selectedProduct.name}</h2>
                    <p className= "product-description">{selectedProduct.description}</p>
                    <p className="product-category"><span>Category:</span> {selectedProduct.category}</p>
                    <p className="product-sub-category"><span>Sub-Category:</span> {selectedProduct.categoryType}</p>
                    <p className="product-ingredient"><span>Ingredients:</span> {selectedProduct.ingredient}</p>
                  </div>
                </div>
              ) : (
                <p>Click a product to view details</p>
              )}
            </div>
          </Fade>
        </div>
      )}
      ;
    </Container>
  );
}

const Container = styled.div`
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
  .productsGrid {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    max-height: 60vh;
    overflow-y: scroll;
    overflow-x: hidden;
    outline: none;
    justify-content: space-around;
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
    p{
      color: grey;
      font-size: 12px;
      font-family: Kanit;
    }
  }
  .productImg {
    width: 200px;
    height: 200px;
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
  .title {
    font-family: Poppins;
    color: gray;
    font-size: 18px;
    padding: 2% 0%;
    width: 100%;
    text-align: center;
  }
  .product-title{
    text-align: center;
    color: grey;
    font-size: 40px;
    font-family: Kanit;
  }
  .product-description{
    padding: 7% 5%;
    width: 100%;
    font-size: 13px;
    text-align: justify;
    font-family: Poppins;
  }
  .product-category{
    padding: 1% 5%;
    width: 100%;
    font-size: 12px;
    text-align: justify;
    font-family: Poppins;
  }
  .product-sub-category{
    padding: 1% 5%;
    width: 100%;
    font-size: 12px;
    text-align: justify;
    font-family: Poppins;
  }
  .product-ingredient{
    padding: 1% 5%;
    width: 100%;
    font-size: 12px;
    text-align: justify;
    font-family: Poppins;
  }
  span{
    color: #008a09ff;
  }
`;
export default CropProtection;
