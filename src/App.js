import React, { useState, useEffect } from "react";
import "./CSS/App.css";
// import products from "./components/products.json";
import { Route, useLocation, useHistory } from "react-router-dom";
import { Footer, Header } from "./components/navigations/";
import axios from "axios";
import {
  axiosWithAuth,
  axiosViewsSession,
} from "./components/config/axiosConfig";
import AuthenticationPage from "./components/auth/authenticationPage";
import {
  ContactPage,
  IndividualProductPage,
  CartPage,
  ProductsPage,
  Homepage,
  InstagramPage,
} from "./components/pages";
import PrivateRoute from './components/config/privateRoute'
// import PageRouter from "./components/pageRouter";

function App() {
  const [products, setProducts] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartInfo, setCartInfo] = useState({ itemCount: 0, subtotal: 0 });
  const [search, setSearch] = useState(false);
  let history = useHistory();
  const { pathname } = useLocation();
  // console.log("cart", cart);
  if (!products) {
    axios
      .get(
        `${process.env.REACT_APP_DOMAIN_NAME}/shops/${process.env.REACT_APP_USER_ID}`
      )
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => console.log(err));
  }

  const getCart = () => {
    axiosWithAuth()
      .get("/cart/")
      .then((res) => {
        setCart(res.data.cart);
        console.log(res.data);
        getTotal(res.data.cart);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    axiosViewsSession();
    axiosWithAuth()
      .get("/cart/")
      .then((res) => {
        setCart(res.data.cart);
        console.log(res.data);
        getTotal(res.data.cart);
      })
      .catch((err) => console.log(err));
    // getTotal(cart);
  }, [pathname]);

  // useEffect(() => {
  //   getCart();
  // }, [purchaseComplete]);

  // console.log(cartInfo);
  const getTotal = (e) => {
    let subtotal = 0;
    let itemsCount = 0;
    e.forEach((product) => {
      itemsCount += product.quantity;
      let itemTotal = product.price * product.quantity;
      subtotal = subtotal + itemTotal;
    });
    setCartInfo({ subtotal, itemsCount });
  };

  const addToCart = (update, push) => {
    axiosWithAuth()
      .post("/cart/", update)
      .then((res) => {
        console.log(res);
        localStorage.setItem("cart", res.data.token);
        getCart();
        // setCartChange(true);
        if (push) {
          history.push("/cart");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <PrivateRoute
        exact
        path="/"
        component={() => <Header cartInfo={cartInfo} setSearch={setSearch} />} />
      {/* <Route
        exact
        path="/"
        component={() => (
          <PageRouter
            products={products}
            addToCart={addToCart}
            cart={cart}
            search={search}
            cartInfo={cartInfo}
            setCart= {setCart}
          />
        )}
      /> */}
      <Route path="/auth" component={AuthenticationPage} />
      <PrivateRoute
        exact
        path="/"
        component={() => <Homepage products={products} addToCart={addToCart} />}
      />
      <PrivateRoute
        exact
        path="/products"
        component={() => (
          <ProductsPage products={products} addToCart={addToCart} />
        )}
      />
      <Route
        path="/search"
        component={() => (
          <ProductsPage
            products={products}
            search={search}
            addToCart={addToCart}
          />
        )}
      />
      <PrivateRoute
        exact
        path="/cart"
        component={() => (
          <CartPage
            cart={cart}
            addToCart={addToCart}
            cartInfo={cartInfo}
            setCart={setCart}
          />
        )}
      />
      <PrivateRoute
        path="/product/:id"
        component={() => (
          <IndividualProductPage
            addToCart={addToCart}
            cart={cart}
            setCart={setCart}
          />
        )}
      />
      <Route exact path="/contact" component={() => <ContactPage />} />
      <Route exact path="/instagram" component={() => <InstagramPage />} />
      <Footer />
    </div>
  );
}

export default App;
