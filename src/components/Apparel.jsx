const Apparel = ({ productList, addBag }) => {
  const filteredProductList = productList.filter((product) => {
    const category = product.category;
    return category.includes("clothing");
  });

  return (
    <>
      <div className="productsAll">
        {filteredProductList.map((product) => (
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

export default Apparel;
