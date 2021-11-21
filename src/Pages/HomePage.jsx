import Layout from "../Layout/Layout";
import * as data from "../data/data";
import { UseCartActions, useCart } from "../Context/CartProvider";
import { checkInCart } from "../Utils/checkInCart";
import { toast } from "react-toastify";

const HomePage = () => {
  const { cart } = useCart();

  const dispatch = UseCartActions();
  const addProductHandler = (product) => {
    toast.success(
      `${product.name} Added to Cart`
    );
    dispatch({ type: 'ADD_TO_CART', payload: product })
  }
  return (
    <Layout>
      <main className="container">
        <div className="productList">
          {
            data.products.map((p) => (
              <div className="product" key={p.id}>
                <div className="productImage"><img src={p.image} alt={p.name} /></div>
                <div className="productName">
                  <p>{p.name}</p>
                  <p>$ {p.price}</p>
                  <button onClick={() => addProductHandler(p)} className="btn primary">{
                    checkInCart(cart, p) ? "InCart" : "Add To Cart"
                  }


                  </button>
                </div>
              </div>
            ))
          }
        </div>
      </main>
    </Layout>
  );
};

export default HomePage;
