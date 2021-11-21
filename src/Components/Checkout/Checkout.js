import { useAuth } from "../../Context/AuthProvider";
import { useCart } from "../../Context/CartProvider";

const Checkout = () => {
  const userData = useAuth();
  const { cart, total } = useCart();
  console.log(cart, total);
  return (
    <main className='container'>
      <section className='cartCenter'>
        <section className='cartOrder'>
          {cart &&
            cart.map((c) => {
              return (
                <div key={c.id}>
                  {c.name} * {c.quantity} ={" "}
                  {c.quantity * c.offPrice}
                </div>
              );
            })}
          <br />
          <div className='detailCart'>
            Total is : {"  "}
            <span style={{ color: "#7125fc" }}>
              {total}
            </span>
          </div>
        </section>
        <section className='cartItemList'>
          {userData ? (
            <>
              <p>
                Name :{" "}
                <span
                  style={{
                    color: "#7125fc",
                    fontSize: "20px",
                  }}>
                  {userData.name}
                </span>
              </p>
              <p>
                Email :{" "}
                <span
                  style={{
                    color: "#7125fc",
                    fontSize: "20px",
                  }}>
                  {userData.email}
                </span>
              </p>
              <p>
                Phone Number :{" "}
                <span
                  style={{
                    color: "#7125fc",
                    fontSize: "20px",
                  }}>
                  {userData.phoneNumber}
                </span>
              </p>
            </>
          ) : (
            <h1>Checkout is Empty</h1>
          )}
        </section>
      </section>
    </main>
  );
};

export default Checkout;
