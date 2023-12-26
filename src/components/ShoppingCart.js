import React, { useState, useEffect } from "react";
import "../style/shoppingCart.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";

function ShoppingCart({
    visibilty,
    products,
    onProductRemove,
    onClose,
    onQuantityChange,
}) {
    const [totalCount, setTotalCount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        const uniqueProducts = [...new Set(products.map(product => product.id))];
        const newTotalCount = products.reduce((count, product) => {
            console.log("Product Count:", count, "Product:", product); // Log intermediate values
            return count + parseInt(product.count, 10); // Ensure the count is parsed as a base-10 integer
        }, 0);
    
        const newTotalAmount = uniqueProducts.reduce((amount, productId) => {
            const product = products.find(product => product.id === productId);
            return amount + product.price * product.count;
        }, 0);
    
        console.log("New Total Count:", newTotalCount);
        console.log("New Total Amount:", newTotalAmount);
    
        setTotalCount(newTotalCount);
        setTotalAmount(newTotalAmount);
    }, [products]);
    
    
    return (
        <div
            className="modal"
            style={{
                display: visibilty
                    ? "block"
                    : "none",
            }}>
            <div className="shoppingCart">
                <div className="header">
                    <h2>Shopping cart</h2>
                    <button
                        className="btn close-btn"
                        onClick={onClose}>
                        <AiFillCloseCircle
                            size={30}
                        />
                    </button>
                </div>
                <div className="cart-products">
                    {products.length === 0 && (
                        <span className="empty-text">
                            Your basket is
                            currently empty
                        </span>
                    )}
                    {products.map((product) => (
                        <div
                            className="cart-product"
                            key={product.id}>
                            <img
                                src={
                                    product.image
                                }
                                alt={product.name}
                            />
                            <div className="product-info">
                                <h3>
                                    {product.name}
                                </h3>
                                <span className="product-price">
                                    ₹ {product.price *
                                        product.count}

                                </span>
                            </div>
                            <select
                                className="count"
                                value={
                                    product.count
                                }
                                onChange={(
                                    event
                                ) => {
                                    onQuantityChange(
                                        product.id,
                                        event
                                            .target
                                            .value
                                    );
                                }}>
                                {[
                                    ...Array(
                                        10
                                    ).keys(),
                                ].map(
                                    (number) => {
                                        const num =
                                            number +
                                            1;
                                        return (
                                            <option
                                                value={
                                                    num
                                                }
                                                key={
                                                    num
                                                }>
                                                {
                                                    num
                                                }
                                            </option>
                                        );
                                    }
                                )}
                            </select>
                            <button
                                className="btn remove-btn"
                                onClick={() =>
                                    onProductRemove(
                                        product
                                    )
                                }>
                                <RiDeleteBin6Line
                                    size={20}
                                />
                            </button>
                        </div>
                    ))}
                    {products.length > 0 && (
                        <div className="total-summary">
                            <div className="total-count">
                                <span>Total Count: {Number(totalCount)}</span>
                            </div>
                            <div className="total-amount">
                                <span>Total Amount: ₹{totalAmount}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ShoppingCart;