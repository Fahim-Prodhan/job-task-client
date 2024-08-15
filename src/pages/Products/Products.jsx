/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoGridSharp } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import 'animate.css';
import axios from 'axios';
import baseUrl from '../../services/helper';
import { Helmet } from 'react-helmet';

const Products = () => {
    const [GridActive, setGridActive] = useState(true)
    const [TableActive, setTableActive] = useState(false)
    const [Products, setProducts] = useState([])
    const [count, SetCount] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(8)
    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState('')
    const [loadingData, setLoadingData] = useState(true)

    const numberOfPages = Math.ceil(count / itemsPerPage)

    const pages = [...Array(numberOfPages).keys()].map(e => e + 1)

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }
    const handleNext = () => {
        if (currentPage < pages.length) {
            setCurrentPage(currentPage + 1)
        }
    }

    const handleSearch = e => {
        e.preventDefault()
        const text = e.target.search.value
        setSearch(text)
        setCurrentPage(1)
    }

    useEffect(() => {
       
        axios.get(`${baseUrl}/api/products?page=${currentPage - 1}&size=${itemsPerPage}&search=${search}`)
            .then(res => {
                setProducts(res.data)
                setLoadingData(false)
            })
    }, [currentPage, itemsPerPage, search])



    const handleGrid = () => {
        setGridActive(true)
        setTableActive(false)
    }

    const handleTable = () => {
        setGridActive(false)
        setTableActive(true)
    }

    
    if (loadingData) {
        return( <div className="flex justify-center"><span className="loading loading-ring loading-xs"></span>
            <span className="loading loading-ring loading-sm"></span>
            <span className="loading loading-ring loading-md"></span>
            <span className="loading loading-ring loading-lg"></span></div>)
    }

    return (
        <div className="max-w-sm px-6 md:max-w-3xl md:px-8 lg:max-w-7xl mx-auto lg:mt-12 mb-12">
            <Helmet>
                <title>Estarch | all products</title>
            </Helmet>
            <h1 className='text-center my-12 bg-base-200 text-3xl py-4 font-bold'>All Products</h1>
            <div className='flex my-4 gap-4 flex-wrap'>

                <button onClick={handleGrid} className='btn text-xl'><IoGridSharp /></button>
                <button onClick={handleTable} className='btn text-xl'><GiHamburgerMenu /></button>
                <form className='flex gap-1' onSubmit={handleSearch}>
                    <label className="input input-bordered flex items-center gap-2">
                        <input name='search' type="text" className="grow" placeholder="Search" />
                    </label>
                    <button type='submit' className="btn bg-[#F6B17A] text-white">Search</button>

                </form>
            </div>
            <div className={`md:grid-cols-2 gap-6 ${GridActive ? 'grid' : 'hidden'}`}>
                {
                    Products.map(p => <div key={p._id} className="flex card shadow-lg animate__animated animate__zoomIn">
                        <div className="hero-content flex-col lg:flex-row">
                            <img src={p.image} className="max-w-[270px] rounded-lg shadow-2xl" />
                            <div>
                                <h1 className="text-xl font-bold pb-4 text-[#7077A1]">{p.title}</h1>
                                <div>
                                    <p className='text-[17px]'><span className='font-bold'>Deadline:</span> {p.deadline}</p>
                                    <p className='text-[17px]'><span className='font-bold'>Location:</span> {p.location}</p>
                                    <Link to={`/details/${p._id}`}><button className='text-[18px] text-white bg-[#424769] px-3 py-1 mt-2 rounded-md'>View Details</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>)
                }
            </div>

            <div className={`${TableActive ? 'grid' : 'hidden'}`}>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Location</th>
                                <th>Deadline</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                Products.map((p) =>
                                    <tr className='animate__animated animate__zoomIn' key={p._id}>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={p.image} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="font-bold text-[#7077A1]">{p.title}</div>
                                        </td>
                                        <td>
                                            {p.category}
                                        </td>
                                        <td>
                                            {p.location}
                                        </td>
                                        <td>{p.deadline}</td>
                                        <th>
                                            <Link to={`/details/${p._id}`}> <button className="btn text-white bg-[#424769]">View Details</button></Link>
                                        </th>
                                    </tr>
                                )
                            }

                        </tbody>
                    </table>
                </div>
            </div>
          
        </div>
    );
};

export default Products;