import React, { useEffect, useState } from 'react';
import './orders.css';
import { useSelector } from 'react-redux';
import { allorder } from '../Api.js/addtocartApi';
import { useParams, useSearchParams } from 'react-router';
const OrderSummaryPage = () => {
    const data = useSelector((state) => state.Itemreducer)
    let [product, setproduct] = useState([])
    let [params] = useSearchParams()
    useEffect(() => {
        let getAllOrder = async () => {
            try {
                let responseData = await allorder(params.get("id"))
                setproduct([...responseData.data])
            } catch (e) {
                alert(e)
            }
        }
        getAllOrder()
    }, [])
    return (
        < div className="container mt-5" >
            <h2 className="text-center mb-4">Product List</h2>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {product.map((product) => (
                    <div key={product.id} className="col mt-5">
                        <div className="card h-100 shadow-sm">
                            <img
                                src={product.image}
                                className="card-img-top"
                                alt={product.title}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{product.title}</h5>
                                <p className="card-text">
                                    <strong>Brand:</strong> {product.brand}
                                </p>
                                <p className="card-text">
                                    <strong>Price:</strong> Rs.{product.price}
                                </p>
                                <p className="card-text">
                                    <strong>Quantity:</strong> {product.quantity}
                                </p>
                                <p className="card-text">
                                    <strong>Description:</strong> {product.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
};

export default OrderSummaryPage;
