import React, {
	useState,
	useEffect,
} from "react";
import "./style/main.css";
import { GiShoppingBag } from "react-icons/gi";
import RatingStars from "./components/RatingStars";
import ShoppingCart from "./components/ShoppingCart";

const products = [
	{
		id: 1,
		name: "Samsung S21 Ultra",
		rating: 4.3,
		description:
			"Flaunt your style and confidently handle your phone with a grip-friendly material that stays in your hand.",
		price: 70000,
		image: require("./assets/images/product-1.png"),
	},
	{
		id: 2,
		name: "Iphone 13 pro max",
		rating: 4.2,
		description:
			"Silicone cover Designed by Apple to complement iPhone 14, the Silicone Case with MagSafe is a delightful way to protect your iPhone.",
		price: 110000,
		image: require("./assets/images/product-2.png"),
	},
	{
		id: 3,
		name: "Samsung Smart Watch",
		rating: 3.2,
		description:
			"The Samsung Galaxy Watch is a timeless companion that seamlessly integrates into your daily life.",
		price: 20000,
		image: require("./assets/images/product-3.png"),
	},
	{
		id: 4,
		name: "BoAt Smart Watch",
		rating: 4.8,
		description:
			"BoAt's sleek fitness smartwatch, Enigma X600, is loaded with features that make it the epitome of modern smartwatches.",
		price: 1190,
		image: require("./assets/images/product-4.png"),
	},
	{
		id: 5,
		name: "Iphone XR",
		rating: 4.5,
		description:
    "Silicone cover Designed by Apple to complement iPhone 14, the Silicone Case with MagSafe is a delightful way to protect your iPhone.",
		price: 35000,
		image: require("./assets/images/product-5.jpg"),
	},
	{
		id: 6,
		name: "AirPods Max",
		rating: 3.8,
		description:
			" Introducing AirPods Max — a perfect balance of exhilarating high-fidelity audio and the effortless magic of AirPods.",
		price: 60000,
		image: require("./assets/images/product-6.png"),
	},
];

function App() {
	const [cartsVisibilty, setCartVisible] =
		useState(false);
	const [productsInCart, setProducts] =
		useState(
			JSON.parse(
				localStorage.getItem(
					"shopping-cart"
				)
			) || []
		);
	useEffect(() => {
		localStorage.setItem(
			"shopping-cart",
			JSON.stringify(productsInCart)
		);
	}, [productsInCart]);
	const addProductToCart = (product) => {
		const newProduct = {
			...product,
			count: 1,
		};
		setProducts([
			...productsInCart,
			newProduct,
		]);
	};

	const onQuantityChange = (
		productId,
		count
	) => {
		setProducts((oldState) => {
			const productsIndex =
				oldState.findIndex(
					(item) =>
						item.id === productId
				);
			if (productsIndex !== -1) {
				oldState[productsIndex].count =
					count;
			}
			return [...oldState];
		});
	};

	const onProductRemove = (product) => {
		setProducts((oldState) => {
			const productsIndex =
				oldState.findIndex(
					(item) =>
						item.id === product.id
				);
			if (productsIndex !== -1) {
				oldState.splice(productsIndex, 1);
			}
			return [...oldState];
		});
	};

	return (
		<div className="App">
			<ShoppingCart
				visibilty={cartsVisibilty}
				products={productsInCart}
				onClose={() =>
					setCartVisible(false)
				}
				onQuantityChange={
					onQuantityChange
				}
				onProductRemove={onProductRemove}
			/>
			<div className="navbar">
				<h3 className="logo">Logo</h3>
				<button
					className="btn shopping-cart-btn"
					onClick={() =>
						setCartVisible(true)
					}>
					<GiShoppingBag size={24} />
					{productsInCart.length >
						0 && (
						<span className="product-count">
							{
								productsInCart.length
							}
						</span>
					)}
				</button>
			</div>
			<main>
				<h2 className="title">
					Products
				</h2>
				<div className="products">
					{products.map((product) => (
						<div
							className="product"
							key={product.id}>
							<img
								className="product-image"
								src={
									product.image
								}
								alt={
									product.image
								}
							/>
							<h4 className="product-name">
								{product.name}
							</h4>
							<RatingStars
								rating={
									product.rating
								}
							/>
							<p>
								{
									product.description
								}
							</p>
							<span className="product-price">
               ₹ {product.price}
							</span>
							<div className="buttons">
								<button className="btn">
									Detail
								</button>
								<button
									className="btn"
									onClick={() =>
										addProductToCart(
											product
										)
									}>
									Add to cart
								</button>
							</div>
						</div>
					))}
				</div>
			</main>
		</div>
	);
}

export default App;