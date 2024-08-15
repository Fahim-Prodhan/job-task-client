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
    const [filterBrand, setFilterBrand] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100000);
    const [loadingData, setLoadingData] = useState(true);

    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()].map(e => e + 1);

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
    const handleBrandChange = e => {
        setFilterBrand(e.target.value);
        setCurrentPage(1);
    };

    const handleSortChange = e => {
        setSortBy(e.target.value);
        setCurrentPage(1);
    };

    const handlePriceRangeChange = e => {
        const [min, max] = e.target.value.split('-').map(Number);
        setMinPrice(min);
        setMaxPrice(max || maxPrice);
        setCurrentPage(1);
    };

    useEffect(() => {
        // setLoadingData(true);
        axios.get(`${baseUrl}/api/products`, {
            params: {
                page: currentPage - 1,
                size: itemsPerPage,
                search,
                category: filterCategory,
                brand:filterBrand,
                sortBy,
                minPrice,
                maxPrice
            }
        }).then(res => {
            setProducts(res.data.products);
            SetCount(res.data.totalProducts);
            setLoadingData(false);
        });
    }, [currentPage, itemsPerPage, search, filterCategory, sortBy, minPrice, maxPrice,filterBrand]);

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

                <select className="select select-bordered w-full max-w-44" onChange={handleCategoryChange}>
                    <option value="" selected>All Categories</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Smartwatch">Smartwatch</option>
                    <option value="Keyboard">Keyboard</option>
                    <option value="Headphone">Headphone</option>
                    <option value="Earpods">Earpods</option>
                </select>
                <select className="select select-bordered w-full max-w-44" onChange={handleBrandChange}>
                    <option value="" selected>All Brands</option>
                    <option value="Iphone">Iphone</option>
                    <option value="Samsung">Samsung</option>
                    <option value="Hp">HP</option>
                    <option value="Realme">Realme</option>
                    <option value="Boat">Boat</option>
                    <option value="A4Tech">A4Tech</option>
                </select>

                <select className="select select-bordered w-full max-w-44" onChange={handlePriceRangeChange}>
                    <option value="0-100000">All Prices</option>
                    <option value="50-100">50-100</option>
                    <option value="101-200">101-200</option>
                    <option value="201-300">201-300</option>
                    <option value="301-500">301-500</option>
                    <option value="501-100000">501+</option>
                </select>
                <select className="select select-bordered w-full max-w-44" onChange={handleSortChange}>
                    <option value="" selected>Sort By</option>
                    <option value="High to low">High to Low</option>
                    <option value="Low to high">Low to High</option>
                </select>
            </div>

            <div className={`grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-6`}>
                {Products.map(p => (
                    <div key={p._id} className="animate__animated animate__zoomIn shadow-lg h-[400px] md:h-[560px] relative">
                        <div className=''>
                            <p className='bg-orange-400 absolute top-2 right-2 px-1 rounded-lg text-white'>Rating: {p.ratings}</p>
                            <img src={p.productImage} className="" />
                            <div>
                                <h2 className="md:text-[14px] text-[12px] font-bold text-center px-2 pt-1">
                                    {p.productName.length > 25 ? `${p.productName.slice(0, 25)}...` : p.productName}
                                </h2>
                                <p className='text-center font-mono font-semibold py-1 text-xl'>
                                    Brand: {p.brand}
                                </p>
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
