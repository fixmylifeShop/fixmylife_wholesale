import React from "react";
import { Route } from "react-router-dom";
import {
  ContactPage,
  IndividualProductPage,
  CartPage,
  ProductsPage,
  Homepage,
  InstagramPage,
} from "./pages";

export default function PageRouter(props) {

  const { products, addToCart, cart, search, cartInfo,setCart } = props;
  return (
    <div>
      <Route
        exact
        path="/"
        component={() => <Homepage products={products} addToCart={addToCart} />}
      />
      <Route
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
      <Route
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
      <Route
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
    </div>
  );
}
