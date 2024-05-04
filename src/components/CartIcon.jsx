import React from "react";
import { FaCartShopping } from "react-icons/fa6";

const CartIcon = ({ itemCount }) => {
  return (
    <div style={styles.container}>
      <FaCartShopping style={styles.cartIcon} />
      {itemCount > 0 && <span style={styles.itemCount}>{itemCount}</span>}
    </div>
  );
};

const styles = {
  container: {
    position: "relative",
    display: "inline-block",
  },
  cartIcon: {
    fontSize: "28px",
    color: "#888",
  },
  itemCount: {
    position: "absolute",
    top: "-8px",
    right: "-8px",
    backgroundColor: "red",
    color: "white",
    borderRadius: "50%",
    padding: "4px 6px",
    fontSize: "10px",
    fontWeight: "bold",
  },
};

export default CartIcon;
