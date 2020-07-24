import React, { useState } from "react";
import Banner from "../banner.js";
import { Link } from "react-router-dom";
import Currency from "../currency.js";
import { useHistory } from "react-router-dom";
import CancelIcon from "@material-ui/icons/Cancel";
import PaypalCheckoutButton from "../paypal/paypal";
import Dialog from "@material-ui/core/Dialog";
// import ItemCard from "../cart/itemCard";
export default function CartPage(props) {
  const [quantity, setQuantity] = useState();
  const [open, setOpen] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);
  let history = useHistory();
  let subtotal = parseInt(props.cartInfo.subtotal);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const editCart = (id) => {
    let array = [];
    props.cart
      .filter((item) => item.id !== id)
      .forEach((item) => {
        if (item) {
          array.push(item);
        }
      });
    return array;
  };
  const deleteItem = (id) => {
    let array = editCart(id);
    console.log(array);
    props.addToCart(array);
  };

  const handleChange = (e) => {
    setQuantity(e.target.value);
    // console.log(e.target.value)
    // editQuantity(id, e.target.value)
  };
  const editQuantity = (id, count) => {
    let num = parseInt(count);
    if (Number.isInteger(num)) {
      if (count <= 0) {
        deleteItem(id);
      } else {
        props.cart.map((item) => {
          if (item.id === id) {
            item.quantity = num;
          }
        });
        props.addToCart(props.cart);
      }
    }
  };

  const card = (product) => {
    return (
      <div className="cartCard">
        <div
          className="cartCardImageContainer"
          style={{ backgroundImage: `url(${product.image})` }}
        >
          <button onClick={() => deleteItem(product.id)}>
            <CancelIcon fontSize="medium" />
          </button>
        </div>
        <div className="cartCardDescription">
          <div>
            <p className="cartCardCurrency">{Currency(product.price)}</p>
            <p className="cartCardName">{product.product_name.toUpperCase()}</p>
            <p className="cartCartOption">
              {product.choice ? product.choice : ""}
            </p>
          </div>
        </div>
        <div className="cartCardQuantityContainer">
          <form
            className="quantityContainer"
            onSubmit={(e) => {
              e.preventDefault();
              console.log(e);
              editQuantity(product.id, quantity || product.id);
            }}
          >
            <span>QTY. </span>
            <input
              defaultValue={parseInt(product.quantity)}
              onChange={handleChange}
              // onMouseDownCapture={() => editQuantity(product.id, quantity || product.id)}
            />
          </form>
        </div>
      </div>
    );
  };
  const cartContent = () => {
    if (purchaseComplete) {
      return (
        <div className="cartContainer">
          <p className="emptyCartText">
            Thank your for your order.
            {/* <Link to="/products"> Return to </Link>. */}
          </p>
        </div>
      );
    }
    if (props.cart.length > 0 && localStorage.getItem("cart")) {
      return (
        <div className="cartContainer">
          {props.cart.map((product) => {
            return card(product);
          })}
          <div
            className={props.cart.length > 0 ? "cartTotalCheckout" : "hidden"}
          >
            <div className="cartSubtotal">SUBTOTAL {Currency(subtotal)}</div>
            <div className="cartOptions">
              <button
                onClick={() => {
                  history.push("/products");
                }}
              >
                CONTINUE SHOPPING
              </button>
              {/* <CustomizedDialogs total={props.cart.subtotal} /> */}
              <button onClick={handleClickOpen}>CHECKOUT</button>
              <Dialog
                onClose={handleClose}
                // aria-labelledby="customized-dialog-title"
                open={open}
              >
                <PaypalCheckoutButton
                  total={subtotal}
                  handleClose={handleClose}
                  cart={props.cart}
                  setPurchaseComplete={setPurchaseComplete}
                />
              </Dialog>
            </div>
          </div>
        </div>
      );
      // return (
      //   <ItemCard
      //     handleChange={handleChange}
      //     quantity
      //     deleteItem={deleteItem}
      //     editQuantity={editQuantity}
      //     product={product}
      //   />
      // );
    } else {
      return (
        <div className="cartContainer">
          <p className="emptyCartText">
            Your cart is empty! Sounds like a good time to
            <Link to="/products"> start shopping</Link>.
          </p>
        </div>
      );
    }
  };

  return (
    <div>
      <Banner title="Cart" />

      {cartContent()}
    </div>
  );
}
