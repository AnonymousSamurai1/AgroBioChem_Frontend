import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Fade } from "react-reveal";
import styled from "styled-components";
import Typed from "react-typed";

function Herbicides(props) {
  const [detail, setDetail] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await fetch(
        "https://agrobiochemsbackend.vercel.app/agrobiochem/api/products/",
      );

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      console.log("API response:", data);

      if (data.success && Array.isArray(data.data)) {
        const herbicides = data.data.filter(
          (item) =>
            item.category &&
            item.category.trim().toLowerCase().startsWith("herbicide"),
        );

        setProducts(herbicides);
        setFilteredProducts(herbicides);

        if (herbicides.length === 0) {
          toast.info("No herbicide found.");
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
        `https://agro-bio-chem-backend.vercel.app/agrobiochem/api/products/${id}`,
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
        p.name.toLowerCase().includes(value.toLowerCase()),
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
          <Typed
            strings={["Herbicides"]}
            typeSpeed={80}
            backSpeed={80}
            loop
            className="typed1"
          />
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
          <p className="paragraph">No Herbicide found</p>
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
                    <p className="product-description">
                      {selectedProduct.description}
                    </p>
                    <p className="product-category">
                      <span>Category:</span> {selectedProduct.category}
                    </p>
                    <p className="product-ingredient">
                      <span>Active Ingredient:</span>{" "}
                      {selectedProduct.activeIngredient}
                    </p>
                    <p className="product-ingredient">
                      <span>Dosage:</span> {selectedProduct.dosage}
                    </p>
                    <p className="product-ingredient">
                      <span>Package Size:</span> {selectedProduct.packageSize}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="paragraph">Click a product to view details</p>
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
    padding: 1% 5%;
  }
  .typed1 {
    font-size: 30px;
    background: linear-gradient(
      97.24deg,
      rgb(63, 212, 50) 44.37%,
      rgba(160, 207, 167, 0.25) 113.02%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    font-weight: bolder;
    font-family: "Poppins", sans-serif;
    padding: 0% 33%;
  }
  .search {
    width: 680px;
    height: 30px;
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
  .productsGrid {
    width: 95%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    max-height: 50vh;
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
    padding: 10%;
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
    width: 170px;
    height: 270px;
  }
  .inputMain {
    position: absolute;
    top: 0;
    width: 80%;
    height: 97%;
    z-index: 1;
    backdrop-filter: blur(5px);
    overflow: hidden;
    padding: 5% 2%;
    border-radius: 20px;
  }
  .productMain {
    background: white;
    width: 57%;
    height: 75%;
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
    width: 20px;
    height: 20px;
    cursor: pointer;
    z-index: 10;
  }
  .cancelProduct:hover {
    transform: scale(1.1);
  }
  .productDetail-main {
    display: flex;
    padding: 8% 8%;
    justify-content: space-between;
    img {
      padding: 0%;
      width: 210px;
      height: 360px;
      border: none;
    }
  }
  .title {
    font-family: Poppins;
    color: gray;
    font-size: 15px;
    padding: 2% 0%;
    width: 100%;
    text-align: center;
  }
  .product-title {
    padding: 5% 0% 1% 0%;
    text-align: center;
    color: grey;
    font-size: 28px;
    font-family: Kanit;
  }
  .product-description {
    padding: 2% 5%;
    width: 100%;
    font-size: 10.5px;
    text-align: justify;
    font-family: Poppins;
  }
  .product-category,
  .product-sub-category,
  .product-ingredient {
    padding: 1% 5%;
    width: 100%;
    font-size: 10.5px;
    text-align: justify;
    font-family: Poppins;
  }
  span {
    color: #008a09ff;
  }
  @media (max-width: 420px){
    .typed1 {
      padding: 0% 23%;
    }
    .search {
      width: 360px;
      height: 40px;
    }
    .productsGrid {
      width: 95%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      max-height: 65vh;
      overflow-y: scroll;
      overflow-x: hidden;
      outline: none;
      justify-content: space-around;
      scrollbar-width: none;
    }
    
    .carder {
      padding: 2% 4%;
    }
    .productCard {
      border-radius: 10px;
      width: 100%;
      padding: 10%;
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
      width: 100px;
      height: 200px;
    }
    .inputMain {
      width: 90.5%;
      backdrop-filter: blur(10px);
      padding: 5% 0%;
    }
    .productMain {
      width: 100%;
      height: 91%;
    }
    .productDetail-main {
      display: block;
      img {
        padding: 0% 25%;
        width: 150px;
        height: 270px;
      }
    }
    .product-title {
      padding: 0% 0% 1% 0%;
      color: grey;
      font-size: 30px;
    }
    .product-description {
      padding: 2% 2%;
      font-size: 14px;
    }
    .product-category,
    .product-sub-category,
    .product-ingredient {
      padding: 1% 2%;
      font-size: 13px;
    }
    span {
      color: #008a09ff;
    }
  }
`;
export default Herbicides;
