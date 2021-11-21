import { Link } from "react-router-dom";
import {
  useCart,
  UseCartActions,
} from "../Context/CartProvider";
import Layout from "../Layout/Layout";
import "./cartPage.css";

const CartPage = () => {
  const { cart } = useCart();
  const { total } = useCart();
  const dispatch = UseCartActions();

  const decrementHandler = (product) => {
    dispatch({
      type: "DECREMENT",
      payload: product,
    });
  };

  const addToCartHandler = (product) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: product,
    });
  };

  if (!cart.length) {
    return (
      <Layout>
        <h1>Cart is Empty</h1>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className='container'>
        <div className='cartCenter'>
          <Facture />
          <section className='cartItemList'>
            {cart.map((item) => (
              <div className='cartItem'>
                <div className='itemImage'>
                  <img
                    src={item.image}
                    alt={item.name}
                  />
                </div>
                <div>{item.name}</div>
                <div>
                  {item.offPrice * item.quantity}
                </div>
                <div className='btnGroup'>
                  <button
                    onClick={() =>
                      decrementHandler(item)
                    }>
                    -
                  </button>
                  <button>{item.quantity}</button>
                  <button
                    onClick={() =>
                      addToCartHandler(item)
                    }>
                    +
                  </button>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;

const Facture = () => {
  const { total, cart } = useCart();
  const originalTotalPrice = cart.length
    ? cart.reduce(
        (acc, curr) =>
          acc + curr.quantity * curr.price,
        0
      )
    : 0;
  console.log(originalTotalPrice);

  return (
    <section className='cartOrder'>
      <h1>Cart Order Summery</h1>
      <div className='orderPrice'>
        <p>cart total</p>
        <p>{originalTotalPrice} $</p>
      </div>
      <div className='orderPrice'>
        <p>cart discount</p>
        <p>{originalTotalPrice - total} $</p>
      </div>
      <div className='orderPrice'>
        <p>net price</p>
        <p>{total} $</p>
      </div>
      <Link to='/signup?redirect=checkout'>
        <button className='btnCheckout'>
          Go To Checkout
        </button>
      </Link>
    </section>
  );
};
