import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Apparel from "./components/Apparel";
import Accessories from "./components/Accessories";

const App = () => {
  const { page } = useParams();
  const [productList, setProductList] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [cartLen, setCartLen] = useState(0);

  function addBag(e) {
    const prodId = e.currentTarget.getAttribute("data-id");
    const productAdded = productList.find(
      (product) => product.id === Number(prodId)
    );

    setCartList((prevCart) => {
      const existingProd = prevCart.find(
        (product) => product.id === productAdded.id
      );
      if (existingProd) {
        return prevCart.map((product) =>
          product.id === productAdded.id
            ? {
                ...product,
                quantity: product.quantity + 1,
              }
            : product
        );
      } else {
        return [...prevCart, productAdded];
      }
    });
  }

  function updateQty(itemId, itemQty) {
    setCartList((cart) =>
      cart.map((item) =>
        item.id === itemId ? { ...item, quantity: Number(itemQty) } : item
      )
    );
  }

  useEffect(() => {
    const totalQuantity = cartList.reduce(
      (accum, prod) => accum + prod.quantity,
      0
    );
    setCartLen(totalQuantity);
  }, [cartList]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        const updatedData = data.map((product) => ({
          ...product,
          quantity: 1,
          category: product.id === 1 ? "Men's Backpack" : product.category,
        }));
        setProductList(updatedData);
        // console.log("list", updatedData);
      } catch (error) {
        console.log("Error fetching products", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <div className="menuBar">
        <div>
          <ul className="topBar">
            <li className="loginLink">
              <a className="login" href="#">
                Login / Register
              </a>
            </li>
            <li>
              <Link className="cart" to="/cart">
                <svg
                  className="cartSVG"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z"
                      stroke="#1C274C"
                      stroke-width="1.5"
                    ></path>{" "}
                    <path
                      d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z"
                      stroke="#1C274C"
                      stroke-width="1.5"
                    ></path>{" "}
                    <path
                      d="M2 3L2.26121 3.09184C3.5628 3.54945 4.2136 3.77826 4.58584 4.32298C4.95808 4.86771 4.95808 5.59126 4.95808 7.03836V9.76C4.95808 12.7016 5.02132 13.6723 5.88772 14.5862C6.75412 15.5 8.14857 15.5 10.9375 15.5H12M16.2404 15.5C17.8014 15.5 18.5819 15.5 19.1336 15.0504C19.6853 14.6008 19.8429 13.8364 20.158 12.3075L20.6578 9.88275C21.0049 8.14369 21.1784 7.27417 20.7345 6.69708C20.2906 6.12 18.7738 6.12 17.0888 6.12H11.0235M4.95808 6.12H7"
                      stroke="#1C274C"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    ></path>{" "}
                  </g>
                </svg>{" "}
                <p className="cartLen">{cartLen}</p>
              </Link>
            </li>
          </ul>
        </div>
        <Link className="logoLink" to="/">
          <img className="logoImg" src="/ReShopLogo.jpeg" alt="" />
        </Link>
        <nav>
          <div>
            <ul className="navlinks">
              <li>
                <Link className="links" to="/home">
                  Home
                </Link>
              </li>
              <li>
                <Link className="links" to="/apparel">
                  Apparel
                </Link>
              </li>
              <li>
                <Link className="links cart" to="/accessories">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {page === "cart" ? (
        <Cart cartList={cartList} updateQty={updateQty} />
      ) : page === "apparel" ? (
        <Apparel productList={productList} addBag={addBag} />
      ) : page === "accessories" ? (
        <Accessories productList={productList} addBag={addBag} />
      ) : (
        <Home productList={productList} addBag={addBag} />
      )}
    </>
  );
};

export default App;

// 1. We can have 3 pages (clothing, accessories, checkout)
// Home page just a top nav bar (no search for now)
// Just links and shopping cart icon (with number) on the nav bar
// Some stuff to make it look nice

// 2. For other pages like tops, we will just use maps to list them all out as card elements
// much like pokemon cards

// 3. connect all the pages through router config and we are done
