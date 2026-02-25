import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import addImage from '../assets/Add.png';
import Remove from '../assets/cancel_1.png';
import { Fade } from 'react-reveal';
import { toast } from 'react-toastify';

function DashProducts() {
  const [loader, setLoader] = useState(false);
  const [detail, setDetail] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [categoryType, setCategoryType] = useState('');
  const [image, setImage] = useState(null);
  const [ingredient, setIngredient] = useState('');

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fileInputRef = useRef(null);

  const handleToggleIn = () => setLoader(true);
  const handleToggleOut = () => setLoader(false);
  
  const handleProduct = async (event) => {
    event.preventDefault();

    if (!name || !description || !category || !image || !ingredient) {
      toast.error('Please fill all the fields');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('categoryType', categoryType);
      formData.append('ingredient', ingredient);
      formData.append('image', image);

      const res = await fetch(
        'https://agrobiochemsbackend.vercel.app/agrobiochem/api/products/',
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success('Product successfully created');
        setLoader(false);
        setName('');
        setDescription('');
        setCategory('');
        setCategoryType('');
        setImage(null);
        setIngredient('');

        if (fileInputRef.current) {
          fileInputRef.current.value = null;
        }
      } else {
        toast.error(data.message || 'Product creation failed');
      }
    } catch (error) {
      toast.error('Something went wrong during product creation');
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch(
        'https://agro-bio-chem-backend.vercel.app/agrobiochem/api/products/'
      );

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      console.log('API response:', data);

      if (data.success && Array.isArray(data.data)) {
        setProducts(data.data);
        setFilteredProducts(data.data);
      } else {
        setProducts([]);
        setFilteredProducts([]);
        toast.error(data.message || 'No products available');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setProducts([]);
      setFilteredProducts([]);
      toast.error('Unable to fetch products. Please check your server.');
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
        toast.error(data.message || 'Failed to fetch product details');
      }
    } catch (error) {
      toast.error('Something went wrong while fetching details');
    }
  };

  const handleSearch = (value) => {
    setSearch(value);
    if (value.trim() === '') {
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
      <div className="product">
        <Fade duration={1000}>
          <h1 className="header">Products</h1>
          <img
            src={addImage}
            alt="add"
            className="add"
            onClick={handleToggleIn}
          />
        </Fade>
      </div>
      {loader && (
        <div className="inputMain">
          <Fade bottom duration={1000}>
            <div className="productMain">
              <img
                src={Remove}
                alt="Remove"
                className="cancelProduct"
                onClick={handleToggleOut}
              />
              <div className="productInput">
                <h1>Product Creation</h1>
                <p>All fields are required</p>
                <form onSubmit={handleProduct}>
                  <div className="main-input">
                    <label>Product Name:</label>
                    <input
                      type="text"
                      className="input-box"
                      placeholder="Enter product name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="main-input">
                    <label>Description:</label>
                    <textarea
                      placeholder="Enter your message"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="category">
                    <div className="main-input">
                      <select
                        className="input-box-sub"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option value="">Select Category</option>
                        <option value="Herbicide">Herbicide</option>
                        <option value="Fungicide">Fungicide</option>
                        <option value="Fertilizer">Fertilizer</option>
                        <option value="Others">Others</option>
                      </select>
                    </div>
                    <div className="main-input">
                      <select
                        className="input-box-sub"
                        value={categoryType}
                        onChange={(e) => setCategoryType(e.target.value)}
                      >
                        <option value="">Select Sub-Category</option>
                        <option value="Selective">Selective</option>
                        <option value="Non-Selective">Non-Selective</option>
                      </select>
                    </div>
                  </div>

                  <div className="main-input">
                    <label>Product Image</label>
                    <div className="file">
                      <input
                        type="file"
                        className="input-file"
                        ref={fileInputRef}
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                    </div>
                  </div>

                  <div className="main-input">
                    <label>Product Ingredients</label>
                    <input
                      type="text"
                      className="input-box"
                      placeholder="Enter product ingredients"
                      value={ingredient}
                      onChange={(e) => setIngredient(e.target.value)}
                    />
                  </div>

                  <div className="main-input">
                    <input
                      type="submit"
                      value="Submit"
                      className="input-submit"
                    />
                  </div>
                </form>
              </div>
            </div>
          </Fade>
        </div>
      )}
      <Fade duration={1000}>
        <form className="searchMain">
          <input
            type="text"
            className="search"
            placeholder="Search by name"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </form>
      </Fade>
      <div className="productsGrid">
        {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
          filteredProducts.map((prod) => (
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
              <p>{prod.name}</p>
              <p>Click to view details</p>
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
                src={Remove}
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
                    <h2>{selectedProduct.name}</h2>
                    <p>{selectedProduct.description}</p>
                    <p>Category: {selectedProduct.category}</p>
                    <p>Sub-Category: {selectedProduct.categoryType}</p>
                    <p>Ingredients: {selectedProduct.ingredient}</p>
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
  .add {
    width: 50px;
    height: 50px;
    border-radius: 10px;
    :hover {
      cursor: pointer;
      transform: scale(1.1);
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.8);
    }
  }
  .inputMain {
    background: rgba(199, 199, 199, 0.86);
    position: absolute;
    top: 0;
    width: 50%;
    height: 95%;
    z-index: 5;
    backdrop-filter: blur(10px);
    overflow: hidden; 
    padding: 1% 10%;
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
    width: 20px;
    height: 20px;
    cursor: pointer;
    z-index: 10;
}
.cancelProduct:hover {
    transform: scale(1.1);
}
  .productInput{
    flex: 1;
    overflow-y: auto; 
    padding: 0% 2%;
      h1{
        text-align: center;
        font-family: "Kanit";
        line-height: 90px;
        color: gray;
        overflow-y: auto;   
        padding-right: 8px; 
      }
    }
    .productInput::-webkit-scrollbar {
      width: 6px;
    }
    .productInput::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 10px;
    }
    .productInput::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
    .main-input{
    padding: 2% 0%;
    }
  .input-box{
    width: 570px;
    height: 30px;
    padding: 1% 2%;
    border: 2px solid rgba(128, 128, 128, 0.81);
    outline: none;
    resize: none;
    border-radius: 10px;
    color: gray;
    font-family: 'Poppins', sans-serif;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    cursor: pointer;
  }
  textarea{
    width: 570px;
    height: 80px;
    padding: 2%;
    border: 2px solid rgba(128, 128, 128, 0.81);
    outline: none;
    resize: none;
    border-radius: 10px;
    font-family: 'Rubik';
  }
  label{
    font-family: "Kanit";
    color: grey;
    font-size: 15px;
    font-weight: normal;
  }
  .input-box-sub{
    width: 250px;
    height: 60px;
    padding: 1% 2%;
    border: 2px solid rgba(128, 128, 128, 0.81);
    outline: none;
    resize: none;
    border-radius: 10px;
    font-family: 'Rubik';
  }
  .category{
    display: flex;
    justify-content: space-between;
  }
    .input-file {
      font-family: inherit;
      font-size: 14px;
      color: #555;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 12px;
      background: #f9fafb;
      cursor: pointer;
      transition: border 0.2s ease, box-shadow 0.2s ease;
      width: 570px;
      border: 2px solid rgba(128, 128, 128, 0.81);
    }

    .input-file::file-selector-button {
      background: linear-gradient(90deg, #6ee7b7, #3b82f6);
      color: white;
      border: none;
      border-radius: 8px;
      padding: 8px 14px;
      margin-right: 10px;
      cursor: pointer;
      font-weight: 500;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .input-file::file-selector-button:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      transform: translateY(-1px);
    }
    .input-file::file-selector-button:active {
      transform: translateY(1px);
      box-shadow: none;
    }
    .input-file:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
    }
    .input-submit{
      width: 600px;
      height: 60px;
      border: none;
      border-radius: 10px;
      font-family: 'Kanit';
      background: #44B302;
      color: white;
      font-size: 20px;
      :hover{
        cursor: pointer;
        color: #44B302;
        border: 2px solid #44B302;
        background: #ffffff03;
      }
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
  :hover{
    cursor: pointer;
    transform: scale(1.1);
  }
    img{
      width: 170px;
      height: 170px;
    }
}
.productDetail-main{
  display: flex;
  justify-content: space-between;
  padding: 20% 15%;
  img{
    width: 300px;
    height: 400px;
  }
}
`

export default DashProducts;
