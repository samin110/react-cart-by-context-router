import { NavLink } from "react-router-dom";
import { useAuth } from "../../Context/AuthProvider";
import { useCart } from "../../Context/CartProvider";
import "./navigation.css"
const Navigation = () => {
	const { cart } = useCart();
	const userData = useAuth();
	return (
		<header>
			<nav className="menu">
				<ul className="menuList">
					<div>Amin Shop</div>
					<li className="menuListItem">
						<NavLink to="/" className={(navData) => navData.isActive ? "activeLink" : ""} exact="true" >
							Home
						</NavLink>
					</li>
				</ul>
				<ul className="menuList">
					<li className="menuListItem cartShop" >
						<NavLink exact="true" to="/cart" className={(navData) => navData.isActive ? "activeLink" : ""}>
							Cart
							<span>{cart.length}</span>
						</NavLink>
					</li>
					<li className="menuListItem" >
						<NavLink exact="true" to={userData ? "/profile" : "/login"} className={(navData) => navData.isActive ? "activeLink" : ""}>
							{userData ? 'profile' : "login / signup"}
						</NavLink>
					</li>
				</ul>

			</nav>
		</header>
	);
}

export default Navigation;