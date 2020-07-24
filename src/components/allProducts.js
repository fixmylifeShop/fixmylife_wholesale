import React from "react";
// import products from "./products.json";
import { Link } from "react-router-dom";
import Currency from "./currency";

export default function AllProducts(props) {
  let products = props.products;
  if (props.search) {
    products = props.products.filter((obj) => {
      return (
        obj.product_name.toLowerCase().indexOf(props.search.toLowerCase()) !==
        -1
      );
    });
  }

  // const addToCart = (e) => {
  //   if (props.cart.find((item) => item.id === product.id)) {
  //     props.cart.find((item) => {
  //       item.id === product.id && item.quantity++;
  //     });
  //     props.addToCart(props.cart, true);
  //   } else {
  //     // product.image = product.image[0].image;
  //     product.quantity = 1;
  //     props.addToCart([...props.cart, product], true);
  //   }
  // };

  const card = (product) => {
    if (product) {
      return (
        <div className="card">
          <Link
            className="imgcontainer"
            to={{
              pathname: `/product/${product.id}`,
              // state: { product: "hello" },
            }}
          >
            <img src={product.image} className="cardImg" alt="product" />
            <div className="hover-message">Shop now</div>
          </Link>
          <p>{Currency(product.price)}</p>
          <p> {product.product_name.toUpperCase()}</p>
          <input/>
          <button>Add to cart</button>
        </div>
      );
    }
  };
  // console.log(
  //   products.map((product) => {
  //     return card(product);
  //   })
  // );

  // console.log(
  //   props.search &&
  //     props.products.filter((obj) => {
  //       return (
  //         obj.product_name.toLowerCase().indexOf(props.search.toLowerCase()) !== -1
  //       );
  //     }).length
  // );
  const pageLimit = () => {
    if (props.slice) {
      return products.slice(0, props.slice).map((product) => {
        return card(product);
      });
    }
    if (products.length === 0) {
      return (
        <div className="cartContainer">
          <p className="emptyCartText">No products found.</p>
        </div>
      );
    } else {
      return products.map((product) => {
        return card(product);
      });
    }
  };

  return <div className="cardContainer">{products ? pageLimit() : ""}</div>;
}
