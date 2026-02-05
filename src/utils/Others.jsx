import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Products() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // ✅ Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5612/agrobiochem/api/products");
      const data = await res.json();

      if (data.success) {
        setProducts(data.products); // assuming API returns { success, products }
      } else {
        toast.error(data.message || "Failed to fetch products");
      }
    } catch (error) {
      toast.error("Something went wrong while fetching products");
    }
  };

  // ✅ Fetch details of a specific product
  const fetchProductDetails = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:5612/agrobiochem/api/products/${id}`
      );
      const data = await res.json();

      if (data.success) {
        setSelectedProduct(data.product); // assuming API returns { success, product }
      } else {
        toast.error(data.message || "Failed to fetch product details");
      }
    } catch (error) {
      toast.error("Something went wrong while fetching details");
    }
  };

  // ✅ Load products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {/* 📌 Product List */}
      <div>
        <h1>All Products</h1>
        <ul>
          {products.map((prod) => (
            <li
              key={prod._id}
              onClick={() => fetchProductDetails(prod._id)}
              style={{ cursor: "pointer", marginBottom: "10px" }}
            >
              {prod.name}
            </li>
          ))}
        </ul>
      </div>

      {/* 📌 Product Details */}
      <div>
        {selectedProduct ? (
          <div>
            <h2>{selectedProduct.name}</h2>
            <p>{selectedProduct.description}</p>
            <p>Category: {selectedProduct.category}</p>
            <p>Sub-Category: {selectedProduct.categoryType}</p>
            <p>Ingredients: {selectedProduct.ingredient}</p>
            {selectedProduct.image && (
              <img
                src={`http://localhost:5612/${selectedProduct.image}`}
                alt={selectedProduct.name}
                width="200"
              />
            )}
          </div>
        ) : (
          <p>Click a product to view details</p>
        )}
      </div>
    </div>
  );
}

export default Products;
