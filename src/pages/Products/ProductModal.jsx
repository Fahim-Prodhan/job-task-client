import React from 'react';
import { FaTimes } from 'react-icons/fa';

const ProductModal = ({ product, onClose }) => {

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
    
        // Format date
        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleDateString(undefined, dateOptions);
    
        // Format time
        const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
        const formattedTime = date.toLocaleTimeString(undefined, timeOptions);
    
        return `${formattedDate} at ${formattedTime}`;
    };

    if (!product) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 overflow-y-auto">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                >
                    <FaTimes size={20} />
                </button>
                <img src={product.productImage} alt={product.productName} className="w-4/12 mx-auto object-cover rounded-md" />
                <h2 className="text-xl font-bold mt-4">{product.productName}</h2>
                <p className="text-lg font-semibold mt-2">Brand: {product.brand}</p>
                <p className="text- font-semibold mt-2">Category: {product.category}</p>
                <p className="text-lg font-semibold mt-2 font-mono">Price: Tk. {product.price}</p>
                <p className="text-sm font-semibold mt-2">Creation Date: {formatDateTime(product.createdAt)}</p>
                <p className="text-sm mt-2">Rating: {product.ratings}</p>
                <p className="mt-4">{product.description}</p>
                <div className="flex justify-center mt-4">
                    <button className="btn bg-[#F6B17A] text-white">BUY NOW</button>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
