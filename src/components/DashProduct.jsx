import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import addImage from "../assets/Add.png";
import Remove from "../assets/cancel_1.png";
import { Fade } from "react-reveal";
import { toast } from "react-toastify";
import Bin from "../assets/Bin.png";
import Rename from "../assets/Pencil.png";

function DashProducts() {
  const [loader, setLoader] = useState(false);
  const [detail, setDetail] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [activeIngredient, setActiveIngredient] = useState("");
  const [image, setImage] = useState(null);
  const [dosage, setDosage] = useState("");
  const [packageSize, setPackageSize] = useState("");

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [productToUpdate, setProductToUpdate] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const fileInputRef = useRef(null);

  const openDeleteModal = (id, e) => {
    e.stopPropagation(); // prevent opening product details
    setProductToDelete(id);
    setShowDeleteModal(true);
  };

  const openUpdateModal = async (id, e) => {
    e.stopPropagation(); // stop opening details modal

    try {
      const res = await fetch(
        `https://agrobiochemsbackend.vercel.app/agrobiochem/api/products/${id}`,
      );
      const data = await res.json();

      if (data.success) {
        const product = data.data;

        setProductToUpdate(product);

        // pre-fill form fields
        setName(product.name || "");
        setDescription(product.description || "");
        setCategory(product.category || "");
        setActiveIngredient(
          product.activeIngredient || product.ingredient || "",
        );
        setDosage(product.dosage || "");
        setPackageSize(product.packageSize || "");
        setImage(null); // optional: only change if user uploads new image

        setShowUpdateModal(true);
      } else {
        toast.error(data.message || "Failed to load product for update");
      }
    } catch (error) {
      console.error("Update fetch error:", error);
      toast.error("Something went wrong while loading product");
    }
  };

  const handleToggleIn = () => setLoader(true);
  const handleToggleOut = () => setLoader(false);

  const handleProduct = async (event) => {
    event.preventDefault();

    if (
      !name ||
      !description ||
      !category ||
      !activeIngredient ||
      !image ||
      !dosage ||
      !packageSize
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("activeIngredient", activeIngredient);
      formData.append("image", image);
      formData.append("dosage", dosage);
      formData.append("packageSize", packageSize);

      const res = await fetch(
        "https://agrobiochemsbackend.vercel.app/agrobiochem/api/products/",
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await res.json();

      if (data.success) {
        toast.success("Product successfully created");
        setLoader(false);
        setName("");
        setDescription("");
        setCategory("");
        setActiveIngredient("");
        setImage(null);
        setDosage("");
        setPackageSize("");

        if (fileInputRef.current) {
          fileInputRef.current.value = null;
        }
      } else {
        toast.error(data.message || "Product creation failed");
      }
    } catch (error) {
      toast.error("Something went wrong during product creation");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch(
        "https://agro-bio-chem-backend.vercel.app/agrobiochem/api/products/",
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
        `https://agrobiochemsbackend.vercel.app/agrobiochem/api/products/${id}`,
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

  const handleUpdateProduct = async (event) => {
    event.preventDefault();

    if (
      !name ||
      !description ||
      !category ||
      !activeIngredient ||
      !dosage ||
      !packageSize
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    if (!productToUpdate?._id) {
      toast.error("No product selected for update");
      return;
    }

    setIsUpdating(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("activeIngredient", activeIngredient);
      formData.append("dosage", dosage);
      formData.append("packageSize", packageSize);

      // only append image if a new one is selected
      if (image) {
        formData.append("image", image);
      }

      const res = await fetch(
        `https://agrobiochemsbackend.vercel.app/agrobiochem/api/products/${productToUpdate._id}`,
        {
          method: "PUT", // or "PATCH" depending on your backend
          body: formData,
        },
      );

      const data = await res.json();

      if (data.success) {
        toast.success("Product updated successfully");

        setShowUpdateModal(false);
        setProductToUpdate(null);

        // reset form
        setName("");
        setDescription("");
        setCategory("");
        setActiveIngredient("");
        setImage(null);
        setDosage("");
        setPackageSize("");

        if (fileInputRef.current) {
          fileInputRef.current.value = null;
        }

        // refresh product list
        fetchProducts();

        // if details modal is open, refresh selected product too
        if (selectedProduct?._id === productToUpdate._id) {
          fetchProductDetails(productToUpdate._id);
        }
      } else {
        toast.error(data.message || "Failed to update product");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Something went wrong while updating product");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (!productToDelete) return;

    setIsDeleting(true);

    try {
      const res = await fetch(
        `https://agrobiochemsbackend.vercel.app/agrobiochem/api/products/${productToDelete}`,
        {
          method: "DELETE",
        },
      );

      const data = await res.json();

      if (data.success) {
        toast.success("Product deleted successfully");

        const updatedProducts = products.filter(
          (prod) => prod._id !== productToDelete,
        );

        setProducts(updatedProducts);
        setFilteredProducts(updatedProducts);

        if (selectedProduct?._id === productToDelete) {
          setDetail(false);
          setSelectedProduct(null);
        }

        setShowDeleteModal(false);
        setProductToDelete(null);
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

                  <div className="main-input">
                    <select
                      className="input-box-sub"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="">Select Category</option>
                      <option value="Herbicide (Selective)">
                        Herbicide (Selective)
                      </option>
                      <option value="Herbicide (Non-Selective)">
                        Herbicide (Non-Selective)
                      </option>
                      <option value="fungicide">Fungicide</option>
                      <option value="insecticide">Insecticide</option>
                      <option value="fertilizer">Fertilizer</option>
                      <option value="plant hormone">Plant Hormone</option>
                      <option value="Others">Others</option>
                    </select>
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
                    <label>Product Ingredient:</label>
                    <input
                      type="text"
                      className="input-box"
                      placeholder="Enter product ingredient"
                      value={activeIngredient}
                      onChange={(e) => setActiveIngredient(e.target.value)}
                    />
                  </div>
                  <div className="main-input">
                    <label>Dosage:</label>
                    <input
                      type="text"
                      className="input-box"
                      placeholder="Enter product ingredient"
                      value={dosage}
                      onChange={(e) => setDosage(e.target.value)}
                    />
                  </div>
                  <div className="main-input">
                    <label>Package Size:</label>
                    <input
                      type="text"
                      className="input-box"
                      placeholder="Enter product ingredient"
                      value={packageSize}
                      onChange={(e) => setPackageSize(e.target.value)}
                    />
                  </div>

                  <div className="main-input">
                    <button
                      type="submit"
                      className="input-submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="spinner"></div>
                      ) : (
                        "Submit"
                      )}
                    </button>
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
              <p className="productname">{prod.name}</p>
              <div className="paragraph_bin">
                <p>Click to view details</p>
                <img
                  src={Rename}
                  alt="rename"
                  onClick={(e) => openUpdateModal(prod._id, e)}
                />
                <img
                  src={Bin}
                  alt="bin"
                  onClick={(e) => openDeleteModal(prod._id, e)}
                />
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
      {showUpdateModal && (
        <div className="inputMain">
          <Fade bottom duration={1000}>
            <div className="productMain">
              <img
                src={Remove}
                alt="Remove"
                className="cancelProduct"
                onClick={() => {
                  setShowUpdateModal(false);
                  setProductToUpdate(null);
                  setName("");
                  setDescription("");
                  setCategory("");
                  setActiveIngredient("");
                  setImage(null);
                  setDosage("");
                  setPackageSize("");

                  if (fileInputRef.current) {
                    fileInputRef.current.value = null;
                  }
                }}
              />

              <div className="productInput">
                <h1>Update Product</h1>
                <p>Edit the fields you want to update</p>

                <form onSubmit={handleUpdateProduct}>
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
                      placeholder="Enter product description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <div className="main-input">
                    <select
                      className="input-box-sub"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="">Select Category</option>
                      <option value="Herbicide (Selective)">
                        Herbicide (Selective)
                      </option>
                      <option value="Herbicide (Non-Selective)">
                        Herbicide (Non-Selective)
                      </option>
                      <option value="fungicide">Fungicide</option>
                      <option value="insecticide">Insecticide</option>
                      <option value="fertilizer">Fertilizer</option>
                      <option value="plant hormone">Plant Hormone</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>

                  <div className="main-input">
                    <label>Product Image (optional)</label>
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
                    <label>Product Ingredient:</label>
                    <input
                      type="text"
                      className="input-box"
                      placeholder="Enter product ingredient"
                      value={activeIngredient}
                      onChange={(e) => setActiveIngredient(e.target.value)}
                    />
                  </div>

                  <div className="main-input">
                    <label>Dosage:</label>
                    <input
                      type="text"
                      className="input-box"
                      placeholder="Enter dosage"
                      value={dosage}
                      onChange={(e) => setDosage(e.target.value)}
                    />
                  </div>

                  <div className="main-input">
                    <label>Package Size:</label>
                    <input
                      type="text"
                      className="input-box"
                      placeholder="Enter package size"
                      value={packageSize}
                      onChange={(e) => setPackageSize(e.target.value)}
                    />
                  </div>

                  <div className="main-input">
                    <button
                      type="submit"
                      className="input-submit"
                      disabled={isUpdating}
                    >
                      {isUpdating ? (
                        <div className="spinner"></div>
                      ) : (
                        "Update Product"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Fade>
        </div>
      )}

      {showDeleteModal && (
        <div className="deleteOverlay">
          <Fade bottom duration={500}>
            <div className="deleteModal">
              <div className="deleteIcon">🗑️</div>
              <h2>Delete Product</h2>
              <p>Are you sure you want to delete this product?</p>
              <p className="warningText">This action cannot be undone.</p>

              <div className="deleteButtons">
                <button
                  className="cancelBtn"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setProductToDelete(null);
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
    height: 95.7%;
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
    overflow-y: scroll;
    overflow-x: hidden;
    outline: none;
    scrollbar-width: none;
    padding: 0% 2%;
    border-radius: 20px;
      h1{
        text-align: center;
        font-family: "Kanit";
        line-height: 90px;
        color: gray;
        overflow-y: auto;   
        padding-right: 8px; 
      }
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
    color: gray;
    resize: none;
    border-radius: 10px;
    font-family: 'Poppins', sans-serif;
    -webkit-appearance: none;
    -moz-appearance: none;
    cursor: pointer;
  }
  label{
    font-family: "Kanit";
    color: grey;
    font-size: 15px;
    font-weight: normal;
  }
  .input-box-sub{
    width: 595px;
    height: 60px;
    padding: 1% 2%;
    border: 2px solid rgba(128, 128, 128, 0.81);
    outline: none;
    color: gray;
    resize: none;
    border-radius: 10px;
    font-family: 'Poppins', sans-serif;
    -webkit-appearance: none;
    -moz-appearance: none;
    cursor: pointer;
  }
    .input-file {
      font-family: 'Poppins', sans-serif;
      font-size: 14px;
      color: gray;
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
        color: #ffffff;
      }
  }
      .spinner {
        width: 22px;
        height: 22px;
        border: 3px solid white;
        border-top: 3px solid transparent;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
        margin: auto;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    .productsGrid {
      padding: 7% 5%;
      display: flex;
      flex-wrap: wrap;
      width: 143vh;
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
      padding: 3%;
      :hover{
        cursor: pointer;
        transform: scale(1.03);
      }
        img{
          width: 170px;
          height: 230px;
        }
    }
    .productname{
      font-family: 'Rubik', sans-serif;
      font-weight: bolder;
      font-size: 18px;
      color: grey;
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
    .paragraph_bin{
      display: flex;
      justify-content: space-between;
      p{
        font-family: 'Poppins', sans-serif;
        font-size: 12px;
      }
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

export default DashProducts;
