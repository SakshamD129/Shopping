"use client";
import React from "react";
import useCart from "../cart/page";
import './yesko.css'

function Page() {
    const { herek } = useCart();

    if (herek.size === 0) {
        return <div className="no-cart">Waiting</div>;
    }

    return (
        <div className="cart-items-true">
            {[...herek].map(([item, count]) => (
                <div key={item.productId} className="cart-items-products">
                    <div>{item.name}</div>
                    <div>Quantity: {count}</div>
                </div>
            ))}
        </div>
    );
}

export default Page;
