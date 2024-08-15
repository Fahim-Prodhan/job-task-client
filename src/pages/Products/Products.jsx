/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import baseUrl from '../../services/helper';

const Products = () => {
    const [Products, setProducts] = useState([]);
    const [count, SetCount] = useState(0);
    const [itemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [loadingData, setLoadingData] = useState(true);

    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()].map(e => e + 1);
    console.log(Products.length);

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    const handleNext = () => {
        if (currentPage < pages.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleSearch = e => {
        e.preventDefault();
        const text = e.target.search.value;
        setSearch(text);
        setCurrentPage(1);
    };

    const handleCategoryChange = e => {
        setFilterCategory(e.target.value);
        setCurrentPage(1);
    };

    const handleSortChange = e => {
        setSortBy(e.target.value);
        setCurrentPage(1);
    };

    useEffect(() => {
        setLoadingData(true);
        axios.get(`${baseUrl}/api/products`, {
            params: {
                page: currentPage - 1,
                size: itemsPerPage,
                search,
                category: filterCategory,
                sortBy
            }
        }).then(res => {
            setProducts(res.data);
            setLoadingData(false);
            SetCount(Products.length)
        });
    }, [currentPage, itemsPerPage, search, filterCategory, sortBy]);

    useEffect(() => {
        axios.get(`${baseUrl}/api/productCounts`, {
            params: {
                search,
                category: filterCategory
            }
        }).then(res => {
            SetCount(res.data.count);
            setLoadingData(false);
        });
    }, [search, filterCategory]);

    if (loadingData) {
        return (
            <div className="flex justify-center">
                <span className="loading loading-ring loading-xs"></span>
                <span className="loading loading-ring loading-sm"></span>
                <span className="loading loading-ring loading-md"></span>
                <span className="loading loading-ring loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="max-w-sm px-6 md:max-w-3xl md:px-8 lg:max-w-7xl mx-auto lg:mt-12 mb-12">
            <Helmet>
                <title>Estarch | all products</title>
            </Helmet>

            <div className='flex my-4 gap-4 flex-wrap justify-between'>
                <form className='flex gap-1' onSubmit={handleSearch}>
                    <label className="input input-bordered flex items-center gap-2">
                        <input name='search' type="text" className="grow" placeholder="Search" />
                    </label>
                    <button type='submit' className="btn bg-[#F6B17A] text-white">Search</button>
                </form>

                <select className="select select-bordered w-full max-w-xs" onChange={handleCategoryChange}>
                    <option value="" selected>All Categories</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Smartwatch">Smartwatch</option>
                    <option value="Keyboard">Keyboard</option>
                    {/* Add more categories as needed */}
                </select>

                <select className="select select-bordered w-full max-w-xs" onChange={handleSortChange}>
                    <option value="" selected>Sort By</option>
                    <option value="High to low">High to Low</option>
                    <option value="Low to high">Low to High</option>
                </select>
            </div>

            <div className={`grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-6`}>
                {Products.map(p => (
                    <div key={p._id} className="animate__animated animate__zoomIn shadow-lg h-[400px] md:h-[540px] relative">
                        <div>
                            <img src={p.productImage} className="" />
                            <div>
                                <h2 className="md:text-[16px] text-[12px] font-bold text-center px-2 pt-1">
                                    {p.productName.length > 25 ? `${p.productName.slice(0, 25)}...` : p.productName}
                                </h2>
                                <p className='text-center font-mono font-semibold py-1 absolute bottom-14 md:left-16 left-7'>
                                    Tk. {p.price}
                                </p>
                            </div>
                        </div>
                        <div className='text-center absolute bottom-4 left-7 md:left-[65px]'>
                            <button className='btn btn-sm shadow-lg'>BUY NOW</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className='flex justify-center mt-12 gap-4'>
                <button onClick={handlePrev} className="btn">Prev</button>
                {pages.map(page => (
                    <button
                        onClick={() => setCurrentPage(page)}
                        className={`btn  ${page === currentPage ? 'bg-[#F6B17A] text-white' : ''}`}
                        key={page}>
                        {page}
                    </button>
                ))}
                <button onClick={handleNext} className="btn">Next</button>
            </div>
        </div>
    );
};

export default Products;
