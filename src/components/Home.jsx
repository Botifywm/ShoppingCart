import { useState, useEffect } from "react";

const Home = ({ productList, addBag }) => {
  return (
    <>
      <div className="productsAll">
        {productList.map((product) => (
          <div key={product.id} className="productCard">
            <div className="cardImgContainer">
              <img className="productImg" src={product.image} alt="" />
            </div>
            <p className="productTitle">{product.title}</p>
            <p className="productPrice">${product.price}</p>
            <button data-id={product.id} onClick={addBag} className="addBtn">
              Add to Bag
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
