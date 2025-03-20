"use client";
import React, { useEffect, useState } from 'react';
import { Suspense } from 'react';
import useCart from '../cart/page';
import forCart, { forFilter } from '../apis/api';
function Complete({ item }) {

    const { count, increase, decrease, put, cutdown } = useCart();
    const [data, setData] = useState(localStorage.getItem(item.productId) || 0);

    function Increase(item) {
        if (data >= item.stock) return;
        setData(prev => Math.min(prev + 1, item.stock));
        increase();
        put(item);
        localStorage.setItem(item.productId, data + 1);
        localStorage.setItem("count", parseInt(count + 1));

    }
    function Decrease(item) {
        setData(prev => Math.max(prev - 1, 0));
        if (data) {
            localStorage.setItem(item.productId, data - 1);
            decrease();
            cutdown(item);
        }
        localStorage.setItem("count", parseInt(count - 1));

    }

    return (

        < div key={item.productId} className='indi-products'>
            <div>{item.name}</div>
            <div>{item.category}</div>
            <div>${item.price}</div>
            <div>{item.stock}</div>
            <div className='execution'>
                <button className="stock-button-left" onClick={() => Decrease(item)}>-</button>
                <div className='data'>{data}</div>
                <button className="stock-button-right" onClick={() => Increase(item)}>+</button>
            </div>

            <br />
        </div >
    )
}

function Page() {
    const [api, setData] = useState([]);
    async function Filtering(e) {
        const a = await forFilter(e);
        setData(a);
    }
    async function DataFunction(e) {
        const a = await forCart(e);
        setData(a);
    }
    useEffect(() => {
        DataFunction();
    }, [])

    return (
        <>
            <div>
                <input type="text" placeholder="Search by name" onChange={(e) => DataFunction(e.target.value)} />
                <select name="Filter" onChange={(e) => Filtering(e.target.value)}>
                    <option value="initial">Filter</option>
                    <option value="low">Low to High</option>
                    <option value="high">High to Low</option>
                </select>
            </div>
            <br />
            <br />
            {api.length === 0 ? <div>Waiting....</div> : ""}
            < div className='products' >

                {
                    api.map(item => (
                        <Complete item={item} key={item.productId} />
                    ))
                }
            </div >

        </>

    );
}

export default Page;