const Cart = ({ cartList, updateQty }) => {
  const total = cartList.reduce(
    (accum, item) => accum + item.quantity * item.price,
    0
  );

  return (
    <>
      <div className="cartSection">
        <p className="bagHeader">MY BAG</p>
        {cartList.length === 0 ? (
          <p className="emptyCart">Your Cart is empty ~</p>
        ) : (
          <>
            <div className="cartAll">
              {cartList.map((item) => (
                <div key={item.id} className="cartProduct">
                  <div className="cardImgContainer">
                    <img className="productImg" src={item.image} alt="" />
                  </div>
                  <div className="prodDetails">
                    <div>
                      <label htmlFor="qty">Quantity: </label>
                      <input
                        type="number"
                        value={item.quantity}
                        name="qty"
                        className="qtyInput"
                        onChange={(e) => updateQty(item.id, e.target.value)}
                        min="1"
                      />
                    </div>
                    <p>{item.title}</p>
                    <p>${item.price}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="orderSummary">
              <h2 className="totalHeader">Total</h2>
              <div className="totalPrice">
                <p>Order Summary:</p>
                <p className="total">${total}</p>
              </div>
              <button className="checkout">CHECKOUT</button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
