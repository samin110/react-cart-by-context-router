export function checkInCart(cart, prouduct) {
  return cart.find(
    (item) => item.id === prouduct.id
  );
}
